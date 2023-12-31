<script lang="ts" setup>
import { GetAddressByIdAndType } from '~/graphql/queries';
import { AddressType } from '~/config/constants';
import { PaymentReportError } from '~/errors';
import services from '~/services';

interface State {
  card: Square.Card | null;
}

interface CheckBillingResponse {
  addressLine1: string;
  locality: string;
  postalCode: string;
  country: string;
}

const { $notify } = useNuxtApp();
const { SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID } = useRuntimeConfig().public;

const graphql = useStrapiGraphQL();
const auth = useAuthStore();
const cart = useCartStore();
const productStore = useProductStore();
const checkout = useCheckoutStore();
const invoice = useInvoiceStore();

const state = reactive<State & Record<any, any>>({
  card: null,
  isLoading: false,
  cardButtonDisabled: false,
});

const isLoadingCard = ref(false);
const btnRef = ref(null);

const checkBilling = async (): Promise<CheckBillingResponse> => {
  const defaultResponse = {
    addressLine1: 'no aplicable',
    locality: 'no aplicable',
    postalCode: '0000',
    country: 'VE',
  };

  try {
    const body = {
      id: +auth.user.id,
      type: AddressType.Billing,
    };

    const { data } = await graphql<any>(GetAddressByIdAndType, body);
    const isDataAnArray =
      data?.addresses && Array.isArray(data.addresses?.data);
    const isDataValid = data?.addresses?.data.length;

    if (!data.addresses || (isDataAnArray && !isDataValid)) {
      return defaultResponse;
    }

    const { address } = data?.addresses?.data[0]?.attributes;

    return {
      addressLine1: address.address || defaultResponse.addressLine1,
      locality: address.city || defaultResponse.locality,
      postalCode: address.zipCode || defaultResponse.postalCode,
      country: address.country || defaultResponse.country,
    };
  } catch (error) {
    console.log('error checking billing: ', error);
    return defaultResponse;
  }
};

const createPayment = async (paymentBody: any, products: Product[]) => {
  try {
    const { data } = (await services.generatePayment(paymentBody)) as {
      data: Ref<any>;
    };

    if (data.value.status !== 'COMPLETED') {
      $notify({
        group: 'all',
        title: 'Error',
        text: 'El pago no fué realizado',
      });
      state.isLoading = false;
      return;
    }

    $notify({
      group: 'all',
      title: 'Éxito',
      text: 'El pago se ha realizado con éxito',
    });

    const invoiceItems: CartItem[] = cart.cartItems.filter((item) => {
      return products.find((product) => product.id === item.id);
    });

    const response = await invoice.createVisaInvoice(data.value, invoiceItems);

    if (!response?.data?.createInvoice?.data?.id) {
      $notify({
        group: 'all',
        title: 'Error',
        text: 'Hubo un problema al generar la factura',
      });
      state.isLoading = false;
      return;
    }

    await productStore.update();

    $notify({
      group: 'all',
      title: 'Éxito',
      text: 'Su recibo fué creado, puede revisarlo en sus ordenes',
    });

    await invoice.sendVisaEmail(invoiceItems, data.value);

    console.log('email sent');
  } catch (error) {
    console.log('createPayment: ', error);
    if (error instanceof PaymentReportError) {
      $notify({
        group: 'all',
        title: 'Error',
        text: 'Hubo un error en el pago, intente de nuevo',
      });
      return;
    }
  }
};

const makePayment = async (tokenResult: Square.TokenResult) => {
  try {
    state.isLoading = true;
    state.cardButtonDisabled = true;

    const idempotencyKey = crypto.randomUUID();

    if (tokenResult.status !== 'OK') {
      $notify({
        group: 'all',
        title: 'Error',
        text: 'Hubo un problema al iniciar proceso de compra, intente de nuevo',
      });
      return;
    }

    const [validProducts, noStockProducts] = await productStore.checkStock();

    if (noStockProducts.length) {
      noStockProducts.forEach((product) => {
        $notify({
          group: 'all',
          title: 'Error',
          text: `El producto ${product.name} está agotado o superas la cantidad disponible`,
        });
      });
      return;
    }

    const payment = {
      idempotencyKey,
      locationId: SQUARE_LOCATION_ID,
      sourceId: tokenResult.token,
      customerId: auth.user?.customerId ?? '',
      amountMoney: {
        amount: cart.amount * 100,
        currency: 'USD',
      },
      buyerEmailAddress: auth.user.email,
      shippingAddress: {
        addressLine1: `${checkout.address}`,
        home: checkout.home,
        locality: checkout.city,
        postalCode: checkout.zipCode,
        country: 'VE',
        phone: checkout.phone,
      },
      billingAddress: {},
      note: checkout.fullName,
    };

    const billing = await checkBilling();
    payment.billingAddress = billing;
    await createPayment(payment, validProducts);
  } catch (err) {
    console.log(err);
  } finally {
    state.isLoading = false;
    state.cardButtonDisabled = false;
  }
};

const loadSquareCard = async () => {
  try {
    isLoadingCard.value = true;
    const payments = Square.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID);

    const card = await payments.card();
    await card.attach('#card-container');

    // @ts-ignore
    btnRef.value.$ref.addEventListener('click', async () => {
      const tokenResult = await card.tokenize();
      makePayment(tokenResult);
    });
  } catch (error) {
    $notify({
      group: 'all',
      title: 'Error',
      text: 'Hubo un error el formulario de la tarjeta, por favor, recargue la página',
    });
    console.error('error: ', { error });
  } finally {
    isLoadingCard.value = false;
  }
};

onMounted(async () => {
  await loadSquareCard();
});
</script>

<template>
  <div>
    <form id="payment-form">
      <div class="animate-pulse my-8" v-if="isLoadingCard">
        <div class="w-full h-12 bg-gray-200 rounded-md"></div>
      </div>
      <div id="card-container"></div>
      <div class="visa__terms-wrapper">
        <p class="visa__text">
          By making this purchase you agree to
          <a href="#" class="visa__link">our terms and conditions</a>.
        </p>
        <app-button
          :loading="state.isLoading"
          :disabled="state.cardButtonDisabled"
          ref="btnRef"
        >
          Pagar
        </app-button>
      </div>
    </form>
    <div id="payment-status-container"></div>
  </div>
</template>

<style scoped>
.visa__terms-wrapper {
  @apply text-dark-200;
}

.visa__text {
  @apply text-xs mb-8 text-center lg:text-sm;
}

.visa__link {
  @apply text-color-2 font-semibold;
}
</style>

<script lang="ts" setup>
import { injectKeys } from '~/config/constants';

const { $notify } = useNuxtApp();
const cart = useCartStore();
const wishlist = useWishlistStore();
const router = useRouter();
const quantity = ref<number>(1);

const product = inject(injectKeys.productDetail) as Ref<Product>;

const handleIncreaseQuantity = () => quantity.value++;
const handleDescreaseQuantity = () =>
  quantity.value > 1 ? quantity.value-- : quantity;

const addItemToCart = async (payload: CartItem) => {
  cart.addProductToCart(payload);

  if (!cart.cartItems.length) return;

  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${product.value.name} ha sido agregado al carrito!`,
  });
};

const goToCheckout = () => setTimeout(() => router.push('/checkout'), 500);

const handleAddItemToWishlist = () => {
  const item = {
    id: product.value.id,
  };

  wishlist.addItem(item);

  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${product.value.name} ha sido agregado a la lista de deseos!`,
  });
};

const handleAddToCart = (isBuyNow = false) => {
  const existItem = cart.cartItems.find((item) => item.id === product.value.id);
  const item = {
    id: product.value.id,
    quantity: quantity.value,
    price: product.value.price,
  };

  if (!existItem) {
    addItemToCart(item);
    if (isBuyNow) goToCheckout();
    return;
  }

  const isQuantityGreaterThanTen = quantity.value + existItem.quantity > 10;

  if (!isQuantityGreaterThanTen) {
    addItemToCart(item);
    if (isBuyNow) goToCheckout();
    return;
  }

  $notify({
    group: 'all',
    title: 'Advertencia!',
    text: `No puede añadir más de 10 elementos`,
  });
};
</script>

<template>
  <div>
    <div class="mt-2 lg:mt-4">
      <div class="text-sm font-bold lg:text-base">Tallas</div>
      <div class="mt-2">
        <button
          class="w-9 h-9 rounded-full bg-color-3 text-white text-xs font-bold shadow shadow-md lg:(w-12 h-12)"
        >
          XS
        </button>
      </div>
    </div>

    <div class="flex gap-2 mt-4 md:gap-4">
      <div
        class="max-w-[6.25rem] flex items-center justify-between rounded-full shadow shadow-md lg:px-4"
      >
        <button class="px-2" @click.prevent="handleDescreaseQuantity">
          <div class="i-ph-minus-light text-xs text-gray-5 lg:text-sm" />
        </button>
        <input
          v-model="quantity"
          class="h-3 w-4 text-center bg-transparent text-black text-xs lg:text-sm"
          type="text"
          disabled
        />
        <button class="px-2" @click.prevent="handleIncreaseQuantity">
          <div class="i-ph-plus-light text-xs text-gray-5 lg:text-sm" />
        </button>
      </div>
      <button
        class="bg-color-5 shadow shadow-md text-xs font-bold px-2.5 py-2 rounded-full flex items-center justify-center md:(px-4) lg:(px-8 text-sm)"
        @click="handleAddToCart(false)"
      >
        Agregar al carrito
        <!-- <span class="i-ph-shopping-cart text-lg"></span> -->
      </button>
      <button
        class="bg-color-5 shadow shadow-md text-sm font-bold w-10 h-10 rounded-full flex items-center justify-center"
        @click="handleAddItemToWishlist"
      >
        <span class="i-ph-heart text-lg"></span>
      </button>
    </div>
    <div class="flex justify-center mt-8 md:justify-initial">
      <button
        class="px-6 py-2 text-sm bg-color-2 text-white font-bold rounded-full md:px-10 lg:px-12"
        @click="handleAddToCart(true)"
      >
        Comprar
      </button>
    </div>
  </div>
</template>

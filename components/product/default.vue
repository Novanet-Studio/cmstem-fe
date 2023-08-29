<script lang="ts" setup>
import mapper from 'smapper';
import { injectKeys } from '~/config/constants';
import { GetProductById } from '~/graphql/queries';

const props = defineProps<{ product: Product }>();

const cart = useCartStore();
const graphql = useStrapiGraphQL();
const pruductStore = useProductStore();
const { $notify } = useNuxtApp();

async function handleAddToCart() {
  const newProduct = {
    id: props.product.id,
    quantity: 1,
    price: props.product.price,
  };

  cart.addProductToCart(newProduct);

  const itemsList = cart.cartItems.map((item) => {
    return graphql<ProductRequest>(GetProductById, { id: item.id });
  });

  const itemsResult = await Promise.all(itemsList);

  const temp: any[] = [];

  mapper<any[]>(itemsResult).map((item) => {
    temp.push(item.products[0]);
  });

  pruductStore.addCartProducts(temp);

  $notify({
    group: 'all',
    title: '¡Éxito!',
    text: `Producto ${newProduct.id} ha sido agregado al carrito!`,
  });
}

provide(injectKeys.product, props.product);

// const handleQuickView = (open: boolean) => (state.quickView = open);
</script>

<template>
  <div class="lg:(p-[20px_20px_0] pb-8) flex flex-col items-center">
    <div class="product relative p-3 lg:p-0">
      <div class="product__thumbnail lg:pb-4">
        <product-thumbnail-image />
        <!-- <product-actions @quick-view="handleQuickView" /> -->
      </div>
      <div
        class="!absolute -bottom-5 lg:-bottom-8 left-0 w-full flex justify-center"
      >
        <product-price
          class="!my-1 w-40px h-40px text-xs lg:(w-50px h-50px text-base) bg-color-3 flex justify-center items-center rounded-full !text-white font-bold"
          >{{ product.price }}</product-price
        >
      </div>
    </div>
    <div class="mt-6 lg:mt-8">
      <product-title :id="product.id">{{ product.name }}</product-title>
    </div>
    <div class="w-full mt-2 px-4 mx-12 pb-2">
      <button
        class="py-2 px-8 rounded-full w-full bg-color-5 shadow-md shadow-black/20 text-color-2 font-bold text-xs lg:text-base"
        @click="handleAddToCart"
      >
        Comprar
      </button>
    </div>
  </div>
</template>

<style scoped>
.product {
  @apply h-full box-border relative block box-border border rounded-xl transition ease hover:(border border-gray-300) w-[168px] max-w-[168px] lg:(w-250px max-w-[250px] p-[20px_20px_0]);
}

.product__thumbnail {
  @apply relative overflow-hidden;
}

.product__thumbnail:hover > ul {
  transform: translate(-50%, 0);
}
</style>

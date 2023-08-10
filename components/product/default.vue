<script lang="ts" setup>
import { injectKeys } from '~/config/constants';

const props = defineProps<{ product: Product }>();

const state = reactive({
  modal: false,
  preload: false,
  isImageLoaded: false,
  quickView: false,
});

provide(injectKeys.product, props.product);

const handleQuickView = (open: boolean) => (state.quickView = open);
</script>

<template>
  <div class="lg:(p-[20px_20px_0] pb-8) flex flex-col items-center">
    <div class="product relative">
      <div class="product__thumbnail pb-4">
        <product-thumbnail-image />
        <product-actions @quick-view="handleQuickView" />
      </div>
      <div class="!absolute -bottom-8 left-0 w-full flex justify-center">
        <product-price
          class="!my-1 w-50px h-50px bg-color-3 flex justify-center items-center rounded-full !text-white font-bold"
          >{{ product.price }}</product-price
        >
      </div>
    </div>
    <div class="mt-8">
      <product-title :id="product.id">{{ product.name }}</product-title>
    </div>
    <div class="w-full mt-2 px-4 mx-12">
      <button
        class="py-2 px-8 rounded-full w-full bg-color-5 shadow-md shadow-black/20 text-color-2 font-bold"
      >
        Comprar
      </button>
    </div>
  </div>
</template>

<style scoped>
.product {
  @apply h-full box-border relative block box-border border rounded-xl transition ease hover:(border border-gray-300) max-w-[168px] lg:(w-250px max-w-[250px] p-[20px_20px_0]);
}

.product__thumbnail {
  @apply relative overflow-hidden;
}

.product__thumbnail:hover > ul {
  transform: translate(-50%, 0);
}
</style>

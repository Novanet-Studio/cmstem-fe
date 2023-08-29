<script lang="ts" setup>
import { injectKeys } from '~/config/constants';
const product = inject(injectKeys.productDetail);
</script>

<template>
  <section class="container">
    <h4 class="font-bold text-lg py-8 md:text-2xl">
      {{ product?.category.name }}
    </h4>
    <div class="app-gradient mb-8">
      <div class="flex flex-col md:(flex-row gap-6)">
        <h5 class="text-center mb-4 text-sm font-bold md:hidden">
          {{ product?.name }}
        </h5>
        <thumbnail-default />
        <product-information-default />
      </div>
    </div>
  </section>
</template>

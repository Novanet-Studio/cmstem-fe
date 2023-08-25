<script lang="ts" setup>
import { injectKeys } from '~/config/constants';
const product = inject(injectKeys.productDetail);
</script>

<template>
  <section class="container">
    <h4 class="font-bold text-lg py-8">{{ product?.category.name }}</h4>
    <div class="app-gradient mb-8">
      <div>
        <h5 class="text-center mb-4 text-sm font-bold">
          {{ product?.name }}
        </h5>
        <thumbnail-default />
        <product-information-default />
      </div>
    </div>
  </section>
</template>

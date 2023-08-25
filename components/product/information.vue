<script lang="ts" setup>
import { injectKeys } from '~/config/constants';
const product = inject(injectKeys.productDetail) as Ref<Product>;
</script>

<template>
  <div>
    <div class="text-sm font-bold">Descripcion</div>
    <p class="text-xs">
      {{ product?.description ?? 'No hay descripcion' }}
    </p>
  </div>
</template>

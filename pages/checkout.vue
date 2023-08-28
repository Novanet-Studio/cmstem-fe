<script setup lang="ts">
definePageMeta({
  middleware: 'authentication',
});
</script>

<template>
  <section class="checkout">
    <header class="checkout__header">
      <h4 class="checkout__title">Informacion de facturación</h4>
    </header>
    <div class="checkout__content">
      <div class="checkout__main">
        <checkout-information-form />
      </div>
      <div class="checkout__aside">
        <app-order-summary />
      </div>
    </div>
  </section>
</template>

<style scoped>
.checkout {
  @apply w-full py-10 px-3 container;
}

.checkout__header {
  @apply mb-12 text-center md:pb-[6.25rem];
}

.checkout__title {
  @apply text-sm font-bold text-black md:text-5xl;
}

.checkout__content {
  @apply flex flex-col-reverse gap-8 md:flex-row;
}

.checkout__main {
  @apply flex-[0_0_100%] md:flex-[0_0_65%];
}

.checkout__aside {
  @apply flex-[0_0_100%] md:flex-[0_0_35%];
}
</style>

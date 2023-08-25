<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  middleware: 'authentication',
});

const sectionTitle = inject('sectionTitle') as Ref<string>;

sectionTitle.value = 'Ordenes de compra';
</script>

<template>
  <section class="invoices">
    <!-- TODO: Add condition to render this text -->
    <h5 class="text-sm font-bold text-color-7 text-center mb-12">
      No hay ordenes de compra
    </h5>
    <div class="invoices__content">
      <invoices-table />
    </div>
  </section>
</template>

<style scoped>
.invoices {
  @apply lg:(ml-8 w-full);
}

.invoices__content {
  @apply p-5 bg-white;
}
</style>

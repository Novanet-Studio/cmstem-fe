<script lang="ts" setup>
const { isLoading, categories } = useCategory({ ordered: true });
</script>

<template>
  <div>
    <app-banner />
    <section class="container mt-8">
      <app-message
        title="¿Quieres conocer nuestra colección?"
        subtitle="Tenemos artículos para todos"
      />
      <product-loader v-if="isLoading" />
      <template v-else>
        <product-landing
          v-for="category in categories"
          :key="category.id"
          :category="category"
        />
      </template>
    </section>
  </div>
</template>

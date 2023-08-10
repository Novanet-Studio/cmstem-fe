<script lang="ts" setup>
type Props = {
  category: Category;
};

const props = defineProps<Props>();
const productStore = useProductStore();

const products = ref<Product[] | null>(null);

onMounted(async () => {
  const result = await productStore.getByCategory(props.category.id);
  products.value = result;
});
</script>

<template>
  <div class="landing" v-if="products?.length">
    <div class="landing__wrapper">
      <div class="landing__header">
        <h3 class="landing__title">
          {{ category.name }}
        </h3>
      </div>
      <div class="landing__content">
        <app-slider
          :items="products"
          :slides-per-view="5"
          :space-between="0"
          v-if="products.length"
        >
          <template #default="{ product }">
            <product-default :product="product" />
          </template>
        </app-slider>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing {
  @apply pb-20 mt-12;
}

.landing__header {
  @apply flex flex-nowrap justify-between items-center px-5 py-4 bg-light-600;
}

.landing__title {
  @apply mb-0 inline-block text-2xl font-900 text-black;
}

.landing__content {
  @apply relative pt-6;
}

.landing__slide {
  @apply !w-[167px] mr-2 md:( !w-180px mr-10px) lg:( !w-[260px] mr-0);
}
</style>

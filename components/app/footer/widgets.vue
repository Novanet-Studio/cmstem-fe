<script setup>
const appConfig = useAppConfig();
const widgets = appConfig.footer.widgets;

const icons = {
  instagram: 'i-ph-instagram-logo-light',
  whatsapp: 'i-ph-whatsapp-logo-light',
  email: 'i-ph-envelope-light',
};
</script>

<template>
  <div class="widgets">
    <aside class="widgets__wrapper">
      <h3 class="widgets__title">Contáctanos</h3>
      <ul class="widgets__list">
        <li v-for="(item, index) in widgets" :key="index" class="widgets__item">
          <a class="widgets__link" :href="item.link" target="_blank">
            <div :class="icons[item.icon]" class="lg:text-3xl text-color-3" />
          </a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<style scoped>
.widgets {
  @apply pb-4 lg:(mx-4 mx-auto);
}

.widgets__wrapper {
  @apply max-w-full w-full relative pb-5 mb-5 flex flex-col items-center;
}

.widgets__title {
  @apply text-3xl pb-4 font-bold text-black font-900;
}

.widgets__list {
  @apply mt-4 w-full flex justify-center;
}

.widgets__item {
  @apply relative inline-flex items-center mr-[20px] gap-1 md:mr-2;
}

.widgets__link {
  @apply flex text-lg;
}
</style>

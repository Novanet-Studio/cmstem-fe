<script setup>
const appConfig = useAppConfig();
const sections = [
  'Sumérgete en el mundo de la natación con nuestros trajes de baño de última generación, gafas de alta calidad y accesorios de entrenamiento especializados.',
  'Si prefieres encontrar la armonía interior, tenemos esterillas de yoga duraderas, bloques y correas para ayudarte a alcanzar posturas perfectas. Para los amantes de la adrenalina, ofrecemos zapatillas de running de vanguardia, ropa transpirable y relojes deportivos con seguimiento de ritmo cardíaco.',
  'Si prefieres encontrar la armonía interior, tenemos esterillas de yoga duraderas, bloques y correas para ayudarte a alcanzar posturas perfectas. Para los amantes de la adrenalina, ofrecemos zapatillas de running de vanguardia, ropa transpirable y relojes deportivos con seguimiento de ritmo cardíaco.',
];
</script>

<template>
  <div>
    <div class="banner">
      <div class="banner__wrapper">
        <div class="banner__slider">
          <app-slider :items="appConfig.nosotros.slider" />
        </div>
      </div>
    </div>
    <section class="contenedor">
      <div class="content-wrapper">
        <div class="wrapper-container">
          <div class="item-container">
            <h3 class="title font-400 text-center">
              ¡Descubre nuestra amplia selección de artículos
            </h3>
            <h3 class="title font-700 text-center">
              para nadadores, yoguis, corredores y ciclistas!
            </h3>
          </div>
          <div class="grid grid-cols-1 gap-8 md:(grid-cols-3 gap-6) lg:(my-32)">
            <div
              v-for="(section, index) in sections"
              :key="index"
              class="flex flex-col items-center px-8 border-b border-[#707070] last:border-none pb-8 md:(border-r border-b-0 pb-0)"
            >
              <div
                class="i-ph-check-circle-fill text-color-3 text-4xl mb-4 lg:mb-6"
              ></div>
              <p class="text-11px text-center text-[#292929] lg:text-base">
                {{ section }}
              </p>
            </div>
          </div>
          <app-message
            title="¡Prepárate para superar tus límites y disfrutar al máximo"
            subtitle="de tu deporte favorito con nuestros productos especializados!"
            class="text-xs leading-6 !py-6 md:(mt-12 !py-12) lg:(!py-20 leading-12)"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.content-wrapper {
  @apply py-22;
}

.wrapper-container {
  @apply w-full py-3 mx-auto container;
}

.item-container {
  @apply max-w-full mx-auto mb-12;
}

.title {
  @apply text-sm text-black md:text-xl lg:text-4xl;
}

.content {
  @apply text-xl leading-[1.6em] mb-4 text-[#666] mt-22 border;
}
</style>

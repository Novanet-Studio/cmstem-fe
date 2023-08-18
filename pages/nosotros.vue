<script setup>
const sections = [
  'Sumérgete en el mundo de la natación con nuestros trajes de baño de última generación, gafas de alta calidad y accesorios de entrenamiento especializados.',
  'Si prefieres encontrar la armonía interior, tenemos esterillas de yoga duraderas, bloques y correas para ayudarte a alcanzar posturas perfectas. Para los amantes de la adrenalina, ofrecemos zapatillas de running de vanguardia, ropa transpirable y relojes deportivos con seguimiento de ritmo cardíaco.',
  'Si prefieres encontrar la armonía interior, tenemos esterillas de yoga duraderas, bloques y correas para ayudarte a alcanzar posturas perfectas. Para los amantes de la adrenalina, ofrecemos zapatillas de running de vanguardia, ropa transpirable y relojes deportivos con seguimiento de ritmo cardíaco.',
];
</script>

<template>
  <section>
    <div class="grid grid-cols-2 relative border-b border-color-5">
      <div
        class="w-194px h-194px -left-40px -top-38px opacity-10 bg-color-4 rounded-full absolute -z9 lg:(w-591px h-591px -top-116px -left-122px)"
      ></div>
      <div class="relative ml-8 mt-20 lg:(ml-22 p-24 mt-42)">
        <h1
          class="text-xl leading-6 max-w-xs font-800 lg:(leading-12 max-w-md)"
        >
          ¡Artículos para todas las edades!
        </h1>
        <logo-dots />
      </div>
      <div>
        <nuxt-img src="/atleta.jpg" w-full h-52 />
      </div>
    </div>
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
        <div class="grid grid-cols-1 gap-8 lg:(grid-cols-3 my-32)">
          <div
            v-for="(section, index) in sections"
            :key="index"
            class="flex flex-col items-center px-8 border-b border-[#707070] last:border-none pb-8 lg:(border-r pb-0)"
          >
            <div
              class="i-ph-check-circle-fill text-color-3 text-4xl mb-4 lg:mb-6"
            ></div>
            <p class="text-sm text-center md:text-base">{{ section }}</p>
          </div>
        </div>
        <app-message
          title="¡Prepárate para superar tus límites y disfrutar al máximo"
          subtitle="de tu deporte favorito con nuestros productos especializados!"
          class="text-xs leading-6 !py-6"
        />
      </div>
    </div>
  </section>
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
  @apply text-sm text-black lg:text-4xl;
}

.content {
  @apply text-xl leading-[1.6em] mb-4 text-[#666] mt-22 border;
}
</style>

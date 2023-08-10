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
        class="w-591px h-591px opacity-10 bg-color-4 rounded-full absolute -top-116px -left-122px -z9"
      ></div>
      <div class="relative p-24 mt-42 ml-22">
        <h1 class="font-800 max-w-md leading-12">
          ¡Artículos para todas las edades!
        </h1>
        <logo-dots />
      </div>
      <div>
        <nuxt-img src="/atleta.jpg" w-full />
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
        <div class="grid grid-cols-1 my-32 lg:(grid-cols-3 gap-8)">
          <div
            v-for="(section, index) in sections"
            :key="index"
            class="flex flex-col items-center border-r last:border-none px-8"
          >
            <div
              class="i-ph-check-circle-fill text-color-3 text-4xl mb-6"
            ></div>
            <p class="text-center">{{ section }}</p>
          </div>
        </div>
        <app-message
          title="¡Prepárate para superar tus límites y disfrutar al máximo"
          subtitle="de tu deporte favorito con nuestros productos especializados!"
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
  @apply text-4xl text-black;
}

.content {
  @apply text-xl leading-[1.6em] mb-4 text-[#666] mt-22 border;
}
</style>

<template>
  <client-only>
    <div class="default">
      <div class="default__wrapper">
        <div class="default__container">
          <div class="default__content">
            <app-header />
            <main class="default__main">
              <nuxt-page />
            </main>
            <app-footer />
            <app-notify />
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<style scoped>
.default {
  @apply flex relative;
}
.default__container {
  @apply transition animate-ease-[cubic-bezier(0.4,0,0.2,1)];
}

.default__wrapper {
  @apply flex-auto backface-hidden flex flex-col min-h-screen max-w-full;
}
.default__content {
  @apply flex-auto transition ease;
}
.default__main {
  @apply px-5 transition ease w-full mx-auto md:px-0;
}
</style>

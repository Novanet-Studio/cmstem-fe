<script lang="ts" setup>
import { injectKeys } from '~/config/constants';

const product = inject(injectKeys.productDetail) as Ref<Product>;
const thumbsSwiper = ref(null);
const breakpoint = useBreakpoint({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1366,
});

const setThumbsSwiper = (swiper: any) => (thumbsSwiper.value = swiper);
</script>

<template>
  <client-only>
    <div class="md:(flex flex-row-reverse gap-4)">
      <figure>
        <div class="ps-wrapper max-w-3xl md:max-w-16rem">
          <!-- Gallery-->
          <div class="ps-product__gallery relative">
            <swiper-container
              class="main-swiper"
              :space-between="10"
              navigation
              autoplay
              pagination
              thumbs-swiper=".swiper-thumbs"
              free-mode
            >
              <swiper-slide v-for="image in product.images" :key="image.id">
                <img
                  class="rounded-2xl"
                  :src="image.url"
                  :alt="image.alternativeText"
                />
              </swiper-slide>
            </swiper-container>

            <div class="absolute -bottom-4 flex w-full justify-center z-9999">
              <button
                class="w-13 h-13 rounded-full bg-color-3 text-white text-xs font-bold shadow shadow-md"
              >
                00
              </button>
            </div>
          </div>
        </div>
      </figure>
      <!-- Thumbnail -->
      <div class="ps-product__variants max-w-48 mt-5 md:(max-w-24 mt-0)">
        <swiper-container
          class="swiper-thumbs"
          @swiper="setThumbsSwiper"
          :space-between="10"
          :slides-per-view="4"
          free-mode
          watch-slides-progress
          autoplay
          navigation
          pagination
          thumbs
          :direction="['md', 'lg', 'xl', '2xl'].includes(breakpoint!) ? 'vertical' : 'horizontal'"
        >
          <swiper-slide v-for="image in product.images" :key="image.id">
            <img
              class="object-contain rounded-xl"
              :src="image.url"
              :alt="image.alternativeText"
            />
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </client-only>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.main-swiper {
  /* height: 80%; */
  width: 100%;
}

.swiper-thumbs {
  @apply h-100px w-300px box-border px-0 py-10px md:w-auto lg:w-400px;
}

.swiper-thumbs .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.swiper-thumbs .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

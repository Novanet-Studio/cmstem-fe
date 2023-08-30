import gql from '@rollup/plugin-graphql';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      titleTemplate: (title) => `${title} - TeM`,
      htmlAttrs: {
        lang: 'es',
      },
      script: [
        {
          type: 'module',
          src: 'https://sandbox.web.squarecdn.com/v1/square.js',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'page' },
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/strapi',
    '@unocss/nuxt',
    '@kevinmarrec/nuxt-pwa',
    '@nuxt/image-edge',
    '@sidebase/nuxt-pdf',
  ],

  css: ['@unocss/reset/tailwind.css'],

  pinia: {
    autoImports: ['defineStore'],
  },

  imports: {
    dirs: ['stores'],
  },

  runtimeConfig: {
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY,
      senderEmail: process.env.SENDGRID_SENDER_MAIL,
      receiverEmail: process.env.SENDGRID_RECEIVER_MAIL,
    },
    public: {
      strapi: {
        url: process.env.STRAPI_URL || 'http://localhost:1337',
      },
      SQUARE_APPLICATION_ID: process.env.SQUARE_APPLICATION_ID,
      SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID,
      // SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN,
      PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    },
  },

  pwa: {
    meta: {
      title: 'Caracas Multi Sport - Tienda',
      name: 'Caracas Multi Sport Aplicación web',
      author: 'Novanet Studio <info@novanet.studio>',
      description: 'Tienda en online para vender tus productos online',
      theme_color: '#f18a00',
      lang: 'es',
    },
    manifest: {
      name: 'Caracas Multi Sport Aplicación web',
      short_name: 'Caracas Multi Sport',
      description: 'Tienda en online para vender tus productos online',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#f18a00',
    },
    icon: { source: 'static/favicon.png' },
    /*workbox: {
      enabled: true,
    },*/
  },

  image: {
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
  },

  vite: {
    plugins: [gql()],
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) =>
        ['swiper-container', 'swiper-slide'].includes(tag),
    },
  },

  nitro: {
    preset: 'netlify-edge',
  },
});

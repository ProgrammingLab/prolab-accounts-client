export default {
  mode: 'universal',

  head: {
    title: '久留米高専プログラミングラボ部',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

      {
        name: 'description',
        content:
          'プロラボ部(プログラミングラボ部)は、久留米高専でプログラミングを中心として活動する集団です',
      },
      { property: 'og:title', content: '久留米高専プログラミングラボ部' },
      {
        property: 'og.description',
        content:
          'プロラボ部(プログラミングラボ部)は、久留米高専でプログラミングを中心として活動する集団です',
      },
      { property: 'og:site_name', content: '久留米高専プログラミングラボ部' },
      { property: 'og:image', content: 'https://prolab.club/og_image.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@prolabknct' },
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap-reboot.min.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP:700&amp;subset=japanese',
      },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Barlow' },
      { rel: 'preconnect', href: 'https://accounts.prolab.club' },
    ],
  },

  loading: { color: '#fff' },

  css: ['@/src/assets/index.css'],

  modules: ['@nuxtjs/axios'],

  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};

export default {
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'umutaktas.me',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/spinner.css' },
      { rel: 'stylesheet', href: '/scrollbar.css' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/iit5iam.css' },
    ],
    script: [{ hid: 'darkMode', src: '/dark-mode.js' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '~/node_modules/highlight.js/styles/monokai.css', lang: 'css' }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://umutaktas.me/api',
    proxyHeaders: false,
    credentials: false,
    headers: {
      common: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  },
  markdownit: {
    runtime: true, // Support `$md()`
    injected: true,
    preset: 'default',
    linkify: true,
    breaks: true,
    typographer: true,
    html: false,
    use: ['markdown-it-highlightjs', 'markdown-it-attrs'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}

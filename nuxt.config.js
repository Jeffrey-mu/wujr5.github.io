export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '吴家荣',
    htmlAttrs: {
      lang: 'zh-cn',
    },
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/wu.png' },
      { rel: 'stylesheet', href: '/css/reset.css' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/v-md-editor.js', mode: 'client' },
    { src: '~/plugins/element-ui.js', mode: 'client' },
    { src: '~/plugins/atomcss.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-property-in-object', { loose: true }]],
    },
    extend(config, ctx) {
      // 处理原子类
      config.module.rules.push({
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-atomcss-loader',
          },
        ],
      });
    },
  },
  axios: {
    proxy: true,
  },
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  // 执行 npm run generate 后，生成的文件放在 docs 目录下
  generate: {
    dir: 'docs',
  },
};

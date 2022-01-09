<template lang="pug">
div
  .h-55.bg-white.pst-rlt(style="border-bottom: 1px solid #e1e5ee; background-color: #f8f8f8")
    .layout-default.ovfl-hd
      nuxt-link.inbl.vtal-top.h-55.lh-55.w-130.t-c.fw-500.menu.bs-bd(
        v-for="menu in aMenu"
        :key="menu.link"
        :to="menu.link"
        :class="{ 'active-menu': menu.link == $route.path }"
        style="text-decoration: none; color: gray"
      )
        .h-50.lh-50 {{ menu.title }}
        .h-5.vh-parent
          .h-5.w-80.vh.menu-bar

  Nuxt.layout-default.bg-white.pst-rlt(style="min-height: calc(100vh - 50px)")

  .h-150.pst-rlt(style="background-color: hsl(0, 0%, 95%)")
    .layout-default.pst-rlt
      a.pst-absl.t-20.r-0(href="https://cosmicjs.com" target="_blank")
        img.h-30(src="https://web-assets.cosmicjs.com/images/powered-by-cosmic.svg")

      .h-78.lh-78.t-c.fs-36 雄关漫道真如铁，而今迈步从头越
      .h-12.lh-12.fs-12.t-r.pr-350(style="color: #999") —— 毛泽东·《忆秦娥·娄山关》
      .h-30.lh-30.fs-14.t-c(style="color: #aaa") Copyright @ wujr5.cn, {{ year }},
        a.ml-8(href="https://github.com/wujr5/wujr5.github.io" target="_blank" style="text-decoration: none; color: #aaa") github.com/wujr5/wujr5.github.io
        a.ml-8(href="https://beian.miit.gov.cn/" target="_blank" style="text-decoration: none; color: #aaa") 京ICP备2021029802号-1

      .h-30.lh-30.fs-14.t-c(style="color: #aaa")
        span {{ sVersion }}
        span （{{ sComment }}）
</template>

<script>
import config from '@/assets/config';

export default {
  data() {
    return {
      year: new Date().getFullYear(),
      sVersion: config.sVersion,
      sComment: config.sComment,
      aMenu: [
        {
          title: '日程',
          link: '/',
        },
        {
          title: '博客',
          link: '/blog',
        },
        {
          title: '幻灯片',
          link: '/slide',
        },
        {
          title: '色相轮',
          link: '/color',
        },
        {
          title: '简历',
          link: '/resume',
        },
        {
          title: '资源',
          link: '/resource',
        },
      ],
    };
  },
  methods: {},
};
</script>

<style>
.layout-default {
  width: 1156px;
  height: 100%;
  margin: 0 auto;
  overflow-x: hidden;
}

/* markdown 样式 */
.github-markdown-body {
  line-height: 2 !important;
  font-size: 18px !important;
}

.menu {
  border-bottom: 5px solid transparent;
}

.active-menu {
  color: #477e96 !important;
}
.active-menu .menu-bar {
  background-color: #477e96 !important;
}
</style>

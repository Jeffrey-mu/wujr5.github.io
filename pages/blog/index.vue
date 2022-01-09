<template lang="pug">
div
  .p-20(v-loading="bLoading" style="min-height: calc(100vh - 60px)")
    div(v-if="aCategory.length")
      .inbl.vtal-top.h-35.lh-35.px-40.bd-1.br-4.cs-pt.mr-10(
        v-for="(category, index0) in aCategory"
        :key="`blog-category-${index0}`"
        @click="selectCategory(index0)"
        :style="nCurrentIndex == index0 ? 'border-color: blue; color: blue' : ''"
      ) {{ category.title }}

      nuxt-link.fl-r.mt-10.inbl.vtal-top.w-100.fs-14.t-c.cs-pt(v-if="bShowEditBtn" :to="`/admin/edit?pid=new`" target="_blank") 添加文章

      div(v-for="(toc, index1) in oBlogList[aCategory[nCurrentIndex].title]" :key="`blog-list-${index1}`")
        h2 {{ toc.title }}
        .bd-1.br-4.h-50.lh-50.mb-5.fs-16.pst-rlt(v-if="toc.post" v-for="(item, index2) in toc.post" :key="`blog-article-${index2}`")
          nuxt-link.px-20.inbl.vtal-top(:to="'blog/detail?slug=' + item.slug") {{ index2 + 1 }}. {{ item.title }}
          .pst-absl.r-50.t-0.inbl.vtal-top.h-50.lh-50.fs-14.c-gray {{ item.modified_at }}

          nuxt-link.pst-absl.r-10.t-0.inbl.vtal-top.h-50.lh-50.fs-12.c-blue.cs-pt(v-if="bShowEditBtn" :to="'admin/edit?pid=' + item.id" target="_blank") 编辑
</template>

<script>
import Keyboard from 'keyboardjs';
import Cosmic from 'cosmicjs';
import config from '@/assets/config';

const api = Cosmic();

export default {
  head() {
    return {
      title: '博客列表' + config.sPageBaseTitle,
    };
  },
  data() {
    return {
      oBlogList: [],
      aCategory: [],
      nCurrentIndex: 0,
      bShowEditBtn: false,
      bLoading: true,
    };
  },
  methods: {
    selectCategory(index) {
      this.nCurrentIndex = index;

      localStorage.setItem('$blog-category-index', index);
    },
    getCategory() {
      api
        .bucket({
          slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
          read_key: 'KW8eCqNzGJ8U05aYWCUNHKueNH5COLxAOv1Ou71XIPArrTIDeU',
        })
        .getObjects({
          query: {
            type: 'categories',
          },
          sort: 'created_at',
          limit: 20,
        })
        .then((res) => {
          this.aCategory = res.objects.map((i) => {
            return {
              title: i.title,
              type: i.type,
              id: i.id,
            };
          });

          this.nCurrentIndex = +localStorage.getItem('$blog-category-index');

          this.getBlogs();
        });
    },
    getBlogs() {
      api
        .bucket({
          slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
          read_key: 'KW8eCqNzGJ8U05aYWCUNHKueNH5COLxAOv1Ou71XIPArrTIDeU',
        })
        .getObjects({
          query: {
            type: 'posts',
          },
          limit: 200,
        })
        .then((res) => {
          let aResult = res.objects.map((item) => {
            return {
              id: item.id,
              title: item.title,
              modified_at: this.dateFormat(new Date(item.modified_at), 'yyyy-MM-dd hh:mm'),
              slug: item.slug,
              content: item.metadata.blog_content,
              category: item.metadata.category.title,
              toc: item.metadata.toc ? item.metadata.toc.title : '未归类',
            };
          });

          // 根据 category 整理分组
          let oBlogList = {};
          this.aCategory.forEach((item) => {
            let aBlogs = aResult.filter((i) => i.category == item.title);
            let aTocBlogs = [];

            // 去重函数
            function uniq(value, index, self) {
              return value && self.indexOf(value) === index;
            }
            // 根据 toc 整理分组
            let aToc = aBlogs.map((i) => i.toc).filter(uniq);
            aToc.forEach((toc) => {
              aTocBlogs.push({
                title: toc,
                post: aBlogs.filter((i) => i.toc == toc),
              });
            });

            oBlogList[item.title] = aTocBlogs;
          });

          this.oBlogList = oBlogList;
        })
        .finally(() => {
          this.bLoading = false;
        });
    },
    bindEditKey() {
      this.bShowEditBtn = !this.bShowEditBtn;
    },
    // https://www.cnblogs.com/xianfengzhike/p/9656382.html
    dateFormat(date, fmt) {
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
      };

      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));

      for (var k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));

      return fmt;
    },
  },
  mounted() {
    this.bLoading = true;
    this.getCategory();

    // 绑定键盘
    Keyboard.bind('alt + q', this.bindEditKey);
  },
  destroyed() {
    // 解除绑定关键安检
    Keyboard.unbind('alt + q', this.bindEditKey);
  },
};
</script>

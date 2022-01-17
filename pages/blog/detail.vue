<template lang="pug">
.p-20.pst-rlt
  .h-250.bg-loading(v-if="!oBlogDetail.content")

  nuxt-link.pst-absl.r-30.t-20.fs-14(:to="'/admin/edit?pid=' + oBlogDetail.id" v-if="sWriteKey" target="_blank") 编辑

  v-md-preview.px-80(:text="oBlogDetail.content" style="line-height: 2")
</template>

<script>
import config from '@/assets/config';
import Cosmic from 'cosmicjs';

const api = Cosmic();

export default {
  head() {
    return {
      title: this.sBlogTitle + config.sPageBaseTitle,
    };
  },
  computed: {
    sWriteKey() {
      return this.$store.state.auth.writeKey;
    },
  },
  data() {
    return {
      oBlogDetail: {
        content: '',
      },
      sBlogTitle: '博客详情',
    };
  },
  mounted() {
    api
      .bucket({
        slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
        read_key: 'KW8eCqNzGJ8U05aYWCUNHKueNH5COLxAOv1Ou71XIPArrTIDeU',
      })
      .getObjects({
        query: {
          slug: this.$route.query.slug,
        },
      })
      .then((res) => {
        let post = res.objects[0];
        this.sBlogTitle = post.title;
        this.oBlogDetail = {
          id: post.id,
          created_at: post.created_at,
          content: post.metadata.blog_content,
          category: post.metadata.category.title,
          toc: post.metadata.toc ? post.metadata.toc.title : '未定义',
        };
      });
  },
};
</script>

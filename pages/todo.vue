<template lang="pug">
.p-20.pst-rlt
  .h-250.bg-loading(v-if="!sTodoMarkdown")

  nuxt-link.pst-absl.r-30.t-20.fs-14(:to="'/admin/edit?pid=' + sPostId" v-if="sWriteKey" target="_blank") 编辑

  v-md-preview.px-80(:text="sTodoMarkdown" style="line-height: 2")
</template>

<script>
import config from '@/assets/config';
import Cosmic from 'cosmicjs';

const api = Cosmic();

export default {
  head() {
    return {
      title: '待办' + config.sPageBaseTitle,
    };
  },
  computed: {
    sWriteKey() {
      return this.$store.state.auth.writeKey;
    },
  },
  data() {
    return {
      sTodoMarkdown: '',
      sPostId: '',
    };
  },
  methods: {
    getTodoMarkdown() {
      api
        .bucket({
          slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
          read_key: 'KW8eCqNzGJ8U05aYWCUNHKueNH5COLxAOv1Ou71XIPArrTIDeU',
        })
        .getObjects({
          query: {
            slug: 'todo',
          },
        })
        .then((res) => {
          let post = res.objects[0];
          this.sPostId = post.id;
          this.sTodoMarkdown = post.metadata.blog_content;
        });
    },
  },
  mounted() {
    this.getTodoMarkdown();
  },
};
</script>

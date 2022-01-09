<template lang="pug">
.p-20
  div(v-loading="bPageLoading")
    h2 一些资源（{{ nTotal }}）
    ul
      li.my-10(v-for="(item, index) in aResource" :key="`resource-${index}`")
        a(:href="item.metadata.file.url" target="_blank") {{ item.title }}
</template>

<script>
import config from '@/assets/config';
import Cosmic from 'cosmicjs';
const api = Cosmic();

export default {
  head() {
    return {
      title: '资源' + config.sPageBaseTitle,
    };
  },
  data() {
    return {
      aResource: [],
      nTotal: 0,
      bPageLoading: true,
    };
  },
  mounted() {
    this.bPageLoading = true;

    api
      .bucket({
        slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
        read_key: 'KW8eCqNzGJ8U05aYWCUNHKueNH5COLxAOv1Ou71XIPArrTIDeU',
      })
      .getObjects({
        query: {
          type: 'files',
        },
        props: 'slug,title,content,metadata.file.url',
        sort: 'created_at',
        limit: 100,
      })
      .then((res) => {
        this.aResource = res.objects;
        this.nTotal = res.total;
      })
      .finally(() => {
        this.bPageLoading = false;
      });
  },
};
</script>

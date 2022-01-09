<template lang="pug">
.p-20
  h2 一些幻灯片
  a.bd-1.inbl.vtal-top.mr-20.mb-20.br-4.h-150.w-200.p-10(:href="item.link" target="_blank" v-for="(item, index) in aSlide" :key="`slide-${index}`")
    .h-120.bg-image.vh-parent
      img.wp-100.vh(:src="item.thumbnail")
    .h-30.lh-30.t-c {{ item.title }}
</template>

<script>
import axios from 'axios';
import config from '@/assets/config';

export default {
  head() {
    return {
      title: '幻灯片' + config.sPageBaseTitle,
    };
  },
  data() {
    return {
      aSlide: [],
    };
  },
  mounted() {
    axios({
      url: '/ppt.json',
    }).then((res) => {
      this.aSlide = res.data;
    });
  },
};
</script>

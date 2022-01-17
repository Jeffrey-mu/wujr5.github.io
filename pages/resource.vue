<template lang="pug">
.p-20
  div(v-loading="bPageLoading")
    h2 一些资源（{{ nTotal }}）
      .fl-r(v-if="sWriteKey")
        el-button(size="mini" @click="showDialog('new')" type="primary") 添加
    div
      .bd-1.br-4.my-10.h-60.mb-10.pst-rlt.pl-20(v-for="(item, index) in aResource" :key="`resource-${index}`")
        a.lh-60(:href="item.url" target="_blank") {{ item.metadata.name }}

        .fl-r.inbl.vtal-top.mr-10.lh-60(v-if="sWriteKey")
          el-button(size="mini" type="danger" :loading="item.loading" @click="deleteMedia(item)") 删除
          el-button(size="mini" type="primary" :loading="item.loading" @click="showDialog('edit', item)") 修改

        .fl-r.lh-60.mr-10
          span.fs-12.c-gray.cs-pt(@click="copyToClipboard(item.url)") 复制链接

  el-dialog(:title="oDialog.type == 'new' ? '新建' : '编辑'" :visible.sync="bShowDialog" width="500px")
    .h-300.bg-text.p-10
      div
        .h-30.lh-30 名称
        el-input(v-model="oDialog.name" size="small")
      .mt-10
        .h-30.lh-30 文件
        input(v-if="oDialog.type == 'new'" type="file" size="mini" plain round @change="handleChangeFile($event)")
        div(v-else)
          .c-gray {{ oDialog.url }}
    div(slot="footer")
      el-button(v-if="oDialog.type == 'new'" size="mini" @click="saveNewMedia" type="success" :loading="oDialog.loading") 新建
      el-button(v-else size="mini" @click="updateMedia" type="primary" :loading="oDialog.loading") 保存
</template>

<script>
import config from '@/assets/config';
import axios from 'axios';
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
      aEditResource: [],
      nTotal: 0,
      bPageLoading: true,
      bShowDialog: false,
      oDialog: {
        type: 'new',
        name: '',
        file: null,
        url: '',
        loading: false,
      },
    };
  },
  computed: {
    sWriteKey() {
      return this.$store.state.auth.writeKey;
    },
  },
  mounted() {
    this.getMediaList();
  },
  methods: {
    copyToClipboard(link) {
      this.copy(link);
      this.$message.success('复制成功');
    },
    showDialog(type, media) {
      this.oDialog.type = type;

      if (type == 'edit') {
        this.oDialog.id = media.id;
        this.oDialog.bucket = media.bucket;
        this.oDialog.name = media.metadata.name;
        this.oDialog.url = media.url;
      } else {
        this.oDialog.name = '';
        this.oDialog.url = '';
      }

      this.oDialog.loading = false;
      this.bShowDialog = true;
    },
    handleChangeFile(event) {
      this.oDialog.file = event.target.files[0];
      if (this.oDialog.type == 'edit') {
        this.oDialog.url = event.target.files[0].name;
      }
    },
    // 保存新建的资源
    saveNewMedia() {
      if (!this.oDialog.name) return this.$message.warning('需写名称');
      if (!this.oDialog.file) return this.$message.warning('需上传文件');

      this.oDialog.loading = true;

      api
        .bucket({
          slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
          write_key: this.sWriteKey,
        })
        .addMedia({
          media: this.oDialog.file,
          metadata: {
            name: this.oDialog.name,
          },
        })
        .then((res) => {
          this.$message.success('新建成功');
          this.bShowDialog = false;
          this.getMediaList();
        })
        .catch((err) => {
          this.$message.error('保存失败：' + err.message);
        })
        .finally(() => {
          this.oDialog.loading = false;
        });
    },
    // 修改信息，只支持修改名称
    updateMedia() {
      if (!this.oDialog.name) return this.$message.warning('需写名称');

      this.oDialog.loading = true;

      axios
        .patch(`https://api.cosmicjs.com/v2/buckets/4d7c8cd0-2822-11ec-8e75-2f845ec5c57c/media/${this.oDialog.id}`, {
          headers: {
            Authorization: this.sWriteKey,
          },
          data: {
            metadata: {
              name: this.oDialog.name,
            },
          },
        })
        .then((res) => {
          this.$message.success('修改成功');
          this.bShowDialog = false;
          this.getMediaList();
        })
        .catch((err) => {
          this.$message.error('修改失败：' + err.message);
        })
        .finally(() => {
          this.oDialog.loading = false;
        });
    },
    // 删除媒体
    deleteMedia(item) {
      this.$confirm('确认删除？')
        .then(() => {
          item.loading = true;

          api
            .bucket({
              slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
              write_key: this.sWriteKey,
            })
            .deleteMedia({
              id: item.id,
            })
            .then((res) => {
              this.$message.success('删除成功');
              this.getMediaList();
            })
            .catch((err) => {
              this.$message.error('删除失败：' + err.message);
            });
        })
        .catch(() => {});
    },
    // 获取资源列表
    getMediaList() {
      this.bPageLoading = true;

      api
        .bucket({
          slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
          read_key: 'KW8eCqNzGJ8U05aYWCUNHKueNH5COLxAOv1Ou71XIPArrTIDeU',
        })
        .getMedia({
          sort: 'created_at',
          limit: 100,
        })
        .then((res) => {
          this.aResource = res.media.map((i) => {
            i.loading = false;
            return i;
          });
          this.nTotal = res.total;
        })
        .finally(() => {
          this.bPageLoading = false;
        });
    },
    copy(text) {
      let input = document.createElement('textarea');
      input.innerHTML = text;
      document.body.appendChild(input);
      input.select();
      let result = document.execCommand('copy');
      document.body.removeChild(input);
      return result;
    },
  },
};
</script>

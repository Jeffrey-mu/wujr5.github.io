<template lang="pug">
div(v-if="bAuth" v-loading="bLoading")
  .h-50.lh-50
    .fs-16.inbl.vtal-top.ml-30.fw-400.bs-bd.c-gray 标题：
    el-input.inbl.vtal-top.w-350(v-model="oBlogDetail.title" size="medium")
    .fs-16.inbl.vtal-top.ml-30.fw-400.bs-bd.c-gray slug：
    el-input.inbl.vtal-top.w-350(v-model="oBlogDetail.slug" size="medium")

    .fs-16.inbl.vtal-top.ml-30.fw-400.bs-bd.c-gray 分类：
    el-select.inbl.vtal-top(v-model="oCategory.id" size="medium")
      el-option(v-for="item in aCategory" :key="item.id" :label="item.title" :value="item.id")

    .fs-12.inbl.vtal-top.ml-5.fw-400.bs-bd.c-gray.cs-pt.td-underline(style="font-style: italic" @click="sDialogType = 'category'; bShowDialog = true") 编辑分类

    .fs-16.inbl.vtal-top.ml-30.fw-400.bs-bd.c-gray 主题：
    el-select.inbl.vtal-top(v-model="oToc.id" size="medium")
      el-option(v-for="item in aToc" :key="item.id" :label="item.title" :value="item.id")

    .fs-12.inbl.vtal-top.ml-5.fw-400.bs-bd.c-gray.cs-pt.td-underline(style="font-style: italic" @click="sDialogType = 'toc'; bShowDialog = true") 编辑主题

    .inbl.vtal-top.bs-ct.lh-46.ml-80
      el-button(type="default" size="mini" @click="closeWindow") 关闭
      el-button(type="primary" size="mini" v-if="$route.query.pid == 'new'" @click="addPost") 新建
      el-button(type="primary" size="mini" v-else @click="savePost") 保存
      el-button(type="danger" size="mini" v-if="$route.query.pid != 'new'" @click="deletePost") 删除

  el-dialog(title="编辑" :visible.sync="bShowDialog" width="60%")
    .h-600.bg-text.pt-10.pl-20.pb-20(style="overflow-y: auto")
      div(v-loading="bDialogLoading" style="min-height: 100%")
        .h-36.lh-36
          .inbl.vtal-top.w-300.t-c.fw-600 标题
          .inbl.vtal-top.w-300.t-c.fw-600 slug

        .mb-10(v-for="(item, index) in (sDialogType == 'category' ? aCategory : aToc)" :key="`category-${index}`")
          el-input.inbl.vtal-top.w-300.mr-10(size="medium" v-model="item.title")
          el-input.inbl.vtal-top.w-300.mr-10(size="medium" v-model="item.slug")

          el-button.inbl.vtal-top.mt-4(v-if="item.id != 'new'" size="mini" type="danger" @click="deleteDialogItem(index)") 删除
          el-button.inbl.vtal-top.mt-4(v-if="item.id != 'new'" size="mini" type="primary" @click="saveDialogItem(index)") 保存
          el-button.inbl.vtal-top.mt-4(v-if="item.id == 'new'" size="mini" type="default" @click="cancelNewItem(index)") 取消
          el-button.inbl.vtal-top.mt-4(v-if="item.id == 'new'" size="mini" type="success" @click="saveNewItem(index)") 新建

        el-button.inbl.vtal-top(size="mini" @click="addNewItem") 添加

  v-md-editor(v-model="sMarkdownContent" height="calc(100vh - 50px)" left-toolbar="undo redo | h bold italic strikethrough quote | table hr | link code" ref="editor")
</template>

<script>
import Cosmic from 'cosmicjs';
import Promise from 'promise';
import { getWriteKey } from '@/assets/common';

const api = Cosmic();

export default {
  layout: 'admin-layout',
  data() {
    return {
      sMarkdownContent: '',
      bAuth: false,
      sWriteKey: '',
      oBlogDetail: {
        title: '',
      },

      oCategory: {},
      aCategory: [],

      oToc: {},
      aToc: [],
      bLoading: true,

      bShowDialog: false,
      bDialogLoading: false,

      sDialogType: 'category',
    };
  },
  methods: {
    addNewItem() {
      let key = this.sDialogType == 'category' ? 'aCategory' : 'aToc';
      this[key].push({
        title: '',
        slug: '',
        id: 'new',
      });
    },
    cancelNewItem(index) {
      let key = this.sDialogType == 'category' ? 'aCategory' : 'aToc';
      this[key][index].id = 'delete';

      this[key] = this[key].filter((i) => i.id !== 'delete');
    },
    saveNewItem(index) {
      this.bDialogLoading = true;
      let key = this.sDialogType == 'category' ? 'aCategory' : 'aToc';

      let oNewItem = this[key][index];
      this.addObject({
        title: oNewItem.title,
        slug: oNewItem.slug,
        type: this.sDialogType == 'category' ? 'categories' : 'tocs',
      })
        .then((res) => {
          this.$message.success('新建成功');
          this.$set(this[key], index, res.object);
        })
        .catch((err) => {
          this.$message.error('新建失败：', err.message);
        })
        .finally(() => {
          this.bDialogLoading = false;
        });
    },
    deleteDialogItem(index) {
      let key = this.sDialogType == 'category' ? 'aCategory' : 'aToc';

      this.bDialogLoading = true;
      this.deleteObject({
        id: this[key][index].id,
      })
        .then((res) => {
          this.$message.success('删除成功');
          this[key][index].id = '';
          this[key] = this[key].filter((i) => i.id);
        })
        .catch((err) => {
          this.$message.error('删除失败：' + err.message);
        })
        .finally(() => {
          this.bDialogLoading = false;
        });
    },
    saveDialogItem(index) {
      let key = this.sDialogType == 'category' ? 'aCategory' : 'aToc';

      this.bDialogLoading = true;
      this.saveObject({
        id: this[key][index].id,
        title: this[key][index].title,
        slug: this[key][index].slug,
      })
        .then((res) => {
          this.$message.success('保存成功');
        })
        .catch((err) => {
          this.$message.error('保存失败：' + err.message);
        })
        .finally(() => {
          this.bDialogLoading = false;
        });
    },
    getAuth() {
      return new Promise((resolve, reject) => {
        if (this.sWriteKey) {
          this.bAuth = true;
          return resolve();
        }

        getWriteKey()
          .then((key) => {
            this.sWriteKey = key;
            this.bAuth = true;
            this.$message.success('授权成功');
            resolve();
          })
          .catch(() => {
            // 授权失败，关闭页面
            window.close();
            reject();
          });
      });
    },
    getPostContent() {
      api
        .bucket({
          slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
          read_key: 'KW8eCqNzGJ8U05aYWCUNHKueNH5COLxAOv1Ou71XIPArrTIDeU',
        })
        .getObject({
          id: this.$route.query.pid,
        })
        .then((res) => {
          // 默认显示 toc
          this.$refs['editor'].toggleToc();

          this.oBlogDetail = res.object;
          this.sMarkdownContent = res.object.metadata.blog_content;
          this.oCategory = res.object.metadata.category || {};
          this.oToc = res.object.metadata.toc || {};
          this.bLoading = false;
        });
    },
    closeWindow() {
      window.close();
    },
    addObject(params) {
      return new Promise((resolve, reject) => {
        api
          .bucket({
            slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
            write_key: this.sWriteKey,
          })
          .addObject(params)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deleteObject(params) {
      return new Promise((resolve, reject) => {
        api
          .bucket({
            slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
            write_key: this.sWriteKey,
          })
          .deleteObject(params)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    saveObject(params) {
      return new Promise((resolve, reject) => {
        api
          .bucket({
            slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
            write_key: this.sWriteKey,
          })
          .editObject(params)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deletePost() {
      this.$confirm('确定删除文章吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.confirmDeletePost();
      });
    },
    confirmDeletePost() {
      this.bLoading = true;
      this.deleteObject({
        id: this.oBlogDetail.id,
      })
        .then((res) => {
          this.$message.success('删除成功');
          setTimeout(window.close, 1000);
        })
        .catch((err) => {
          alert('删除失败：' + err.message);
        })
        .finally(() => {
          this.bLoading = false;
        });
    },
    addPost() {
      let oSelectedCategory = this.aCategory.find((i) => i.id == this.oCategory.id);
      let oSelectedToc = this.aToc.find((i) => i.id == this.oToc.id);

      if (!oSelectedCategory) return this.$message.warning('请选择分类');
      if (!oSelectedToc) return this.$message.warning('请选择主题');

      this.bLoading = true;

      this.addObject({
        title: this.oBlogDetail.title,
        slug: this.oBlogDetail.slug,
        type: 'posts',
        metafields: [
          {
            title: 'blog_content',
            key: 'blog_content',
            type: 'markdown',
            value: this.sMarkdownContent,
          },
          {
            title: 'category',
            key: 'category',
            type: 'object',
            object_type: oSelectedCategory.type,
            value: oSelectedCategory.id,
          },
          {
            title: 'toc',
            key: 'toc',
            type: 'object',
            object_type: oSelectedToc.type,
            value: oSelectedToc.id,
          },
        ],
      })
        .then((res) => {
          this.$message.success('新建成功');
          setTimeout(() => {
            location.href = '/admin/edit?pid=' + res.object.id;
          }, 500);
        })
        .catch((err) => {
          this.$message.error('新建失败：' + err.message);
        })
        .finally(() => {
          this.bLoading = false;
        });
    },
    savePost() {
      let oSelectedCategory = this.aCategory.find((i) => i.id == this.oCategory.id);
      let oSelectedToc = this.aToc.find((i) => i.id == this.oToc.id);

      if (!oSelectedCategory) return this.$message.warning('请选择分类');
      if (!oSelectedToc) return this.$message.warning('请选择主题');

      this.bLoading = true;

      this.saveObject({
        id: this.oBlogDetail.id,
        title: this.oBlogDetail.title,
        slug: this.oBlogDetail.slug,
        metafields: [
          {
            type: 'markdown',
            title: 'blog_content',
            key: 'blog_content',
            id: this.oBlogDetail.id,
            value: this.sMarkdownContent,
          },
          {
            title: 'category',
            key: 'category',
            type: 'object',
            object_type: oSelectedCategory.type,
            value: oSelectedCategory.id,
          },
          {
            title: 'toc',
            key: 'toc',
            type: 'object',
            object_type: oSelectedToc.type,
            value: oSelectedToc.id,
          },
        ],
      })
        .then((res) => {
          this.$message.success('保存成功');
        })
        .catch((err) => {
          this.$message.error('保存失败：' + err.message);
        })
        .finally(() => {
          this.bLoading = false;
        });
    },
    getCategoryAndToc() {
      api
        .bucket({
          slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
          read_key: 'KW8eCqNzGJ8U05aYWCUNHKueNH5COLxAOv1Ou71XIPArrTIDeU',
        })
        .getObjects({
          query: {
            type: 'categories',
          },
        })
        .then((res) => {
          this.aCategory = res.objects;
        })
        .catch(() => {
          this.$message.error('获取 categories 出错');
        });

      api
        .bucket({
          slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
          read_key: 'KW8eCqNzGJ8U05aYWCUNHKueNH5COLxAOv1Ou71XIPArrTIDeU',
        })
        .getObjects({
          query: {
            type: 'tocs',
          },
        })
        .then((res) => {
          this.aToc = res.objects;
        })
        .catch(() => {
          this.$message.error('获取 tocs 出错');
        });
    },
  },
  mounted() {
    this.getAuth().then(() => {
      if (this.$route.query.pid == 'new') {
        setTimeout(() => {
          this.$refs['editor'].toggleToc();
          this.bLoading = false;
        });
      } else {
        this.getPostContent();
      }

      this.getCategoryAndToc();
    });
  },
};
</script>

<style>
.v-md-editor {
  box-shadow: none;
  border: 1px solid #ddd;
}
</style>

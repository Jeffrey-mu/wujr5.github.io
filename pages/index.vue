<template lang="pug">
.p-20
  h2.pb-15(style="border-bottom: 1px solid #eaecef") 历史数据

  .bd-1.br-5.px-10.py-20
    calendar-heatmap(:values="aContribution" :end-date="sToday" tooltip-unit="% 完成度" :max="100")

  h2.pb-15(style="border-bottom: 1px solid #eaecef") {{ sDateStr }}
    i.el-icon-loading.c-gray.ml-20(v-if="bRoutineLoading")

  .mt-10
    h3.inbl.vtal-top.my-10 日程
    .inbl.vtal-top.w-730.h-46.vh-parent.ml-200
      el-progress.vh.wp-100(:percentage="nTodoCheckCount")
  .my-20
    .todo-item.inbl.vtal-top.w-168.h-60.lh-60.bd-1.t-c.mr-18.mb-10.br-4.pst-rlt.cs-pt(
      v-for="(todo, index) in aTodoList"
      :key="`todo-${index}`"
      :style="todo.bCheck ? 'background-color: #ddd' : ''"
      @click="checkTodo(index)"
    )
      a(v-if="todo.link" :href="`${todo.link}?t=${sTimeStamp}`" target="_blank" style="text-decoration: none; color: blue") {{ todo.title }}
      span(v-else) {{ todo.title }}

  //- 运动数据
  h3 运动数据
  .bd-1.br-8.px-20.py-10
    div
      .inbl.vtal-top.w-200.h-50.lh-50.fs-18.mr-20.t-c 2公里
      .inbl.vtal-top.w-730.h-50.vh-parent.mr-20
        el-progress.vh.wp-100(:percentage="oSport.run")
      .inbl.vtal-top.w-100.h-50.pt-12(v-if="sWriteKey")
        el-button(icon="el-icon-minus" @click="decrease('run', 50)" size="mini")
        el-button(icon="el-icon-plus" @click="increase('run', 50)" size="mini")
    div
      .inbl.vtal-top.w-200.h-50.lh-50.fs-18.mr-20.t-c 100俯卧撑
      .inbl.vtal-top.w-730.h-50.vh-parent.mr-20
        el-progress.vh.wp-100(:percentage="oSport.pushUp")
      .inbl.vtal-top.w-100.h-50.pt-12(v-if="sWriteKey")
        el-button(icon="el-icon-minus" @click="decrease('pushUp', 20)" size="mini")
        el-button(icon="el-icon-plus" @click="increase('pushUp', 20)" size="mini")
    div
      .inbl.vtal-top.w-200.h-50.lh-50.fs-18.mr-20.t-c 100仰卧起坐
      .inbl.vtal-top.w-730.h-50.vh-parent.mr-20
        el-progress.vh.wp-100(:percentage="oSport.sitUp")
      .inbl.vtal-top.w-100.h-50.pt-12(v-if="sWriteKey")
        el-button(icon="el-icon-minus" @click="decrease('sitUp', 20)" size="mini")
        el-button(icon="el-icon-plus" @click="increase('sitUp', 20)" size="mini")
    div
      .inbl.vtal-top.w-200.h-50.lh-50.fs-18.mr-20.t-c 5组开合跳
      .inbl.vtal-top.w-730.h-50.vh-parent.mr-20
        el-progress.vh.wp-100(:percentage="oSport.kaihe")
      .inbl.vtal-top.w-100.h-50.pt-12(v-if="sWriteKey")
        el-button(icon="el-icon-minus" @click="decrease('kaihe', 20)" size="mini")
        el-button(icon="el-icon-plus" @click="increase('kaihe', 20)" size="mini")
    div
      .inbl.vtal-top.w-200.h-50.lh-50.fs-18.mr-20.t-c 5组提膝触肘
      .inbl.vtal-top.w-730.h-50.vh-parent.mr-20
        el-progress.vh.wp-100(:percentage="oSport.tixi")
      .inbl.vtal-top.w-100.h-50.pt-12(v-if="sWriteKey")
        el-button(icon="el-icon-minus" @click="decrease('tixi', 20)" size="mini")
        el-button(icon="el-icon-plus" @click="increase('tixi', 20)" size="mini")
    div
      .inbl.vtal-top.w-200.h-50.lh-50.fs-18.mr-20.t-c 5组深蹲
      .inbl.vtal-top.w-730.h-50.vh-parent.mr-20
        el-progress.vh.wp-100(:percentage="oSport.shendun")
      .inbl.vtal-top.w-100.h-50.pt-12(v-if="sWriteKey")
        el-button(icon="el-icon-minus" @click="decrease('shendun', 20)" size="mini")
        el-button(icon="el-icon-plus" @click="increase('shendun', 20)" size="mini")
    div
      .inbl.vtal-top.w-200.h-50.lh-50.fs-18.mr-20.t-c 5组高抬腿
      .inbl.vtal-top.w-730.h-50.vh-parent.mr-20
        el-progress.vh.wp-100(:percentage="oSport.taitui")
      .inbl.vtal-top.w-100.h-50.pt-12(v-if="sWriteKey")
        el-button(icon="el-icon-minus" @click="decrease('taitui', 20)" size="mini")
        el-button(icon="el-icon-plus" @click="increase('taitui', 20)" size="mini")

  div(v-if="aBJnews && aBJnews.length > 0")
    h3.mb-10 新京报
    a.news.inbl.vtal-top.h-50.lh-50.fs-20.w-100.t-c.bd-1.br-4.mr-20.mb-20(
      v-for="(item, index) in aBJnews"
      :href="item.url"
      target="_blank"
      :style="item.disable ? 'color: gray; background: #ccc; pointer-events: none;' : ''"
    ) {{ index + 1 }}

  div(v-if="aRMDailyNews && aRMDailyNews.length > 0")
    h3.my-10 人民日报
    a.news.inbl.vtal-top.h-50.lh-50.fs-20.w-100.t-c.bd-1.br-4.mr-20.mb-20(
      v-for="(item, index) in aRMDailyNews"
      :href="item.url"
      target="_blank"
      :style="item.disable ? 'color: gray; background: #ccc; pointer-events: none;' : ''"
    ) {{ index + 1 }}

  div(v-if="aEconomyDaily && aEconomyDaily.length > 0")
    h3.mb-10 经济日报
    div(v-if="aEconomyDaily && aEconomyDaily.length > 0")
      a.news.inbl.vtal-top.h-50.lh-50.fs-20.w-100.t-c.bd-1.br-4.mr-20.mb-20(
        v-for="(item, index) in aEconomyDaily"
        :href="item.url"
        target="_blank"
        :style="item.disable ? 'color: gray; background: #ccc; pointer-events: none;' : ''"
      ) {{ index + 1 }}

  div(v-if="aEnvironmentNews && aEnvironmentNews.length > 0")
    h3.mb-10 中国环境报
    a.news.inbl.vtal-top.h-50.lh-50.fs-20.w-100.t-c.bd-1.br-4.mr-20.mb-20(
      v-for="(item, index) in aEnvironmentNews"
      :href="item.url"
      target="_blank"
      :style="item.disable ? 'color: gray; background: #ccc; pointer-events: none;' : ''"
    ) {{ index + 1 }}

  div(v-if="aYangchengNews && aYangchengNews.length > 0")
    h3.mb-10 羊城晚报
    a.news.inbl.vtal-top.h-50.lh-50.fs-20.w-100.t-c.bd-1.br-4.mr-20.mb-20(
      v-for="(item, index) in aYangchengNews"
      :href="item.url"
      target="_blank"
      :style="item.disable ? 'color: gray; background: #ccc; pointer-events: none;' : ''"
    ) {{ index + 1 }}

  div
    h3.mb-10 环球时报、参考消息
    a.news.inbl.vtal-top.h-50.lh-50.fs-18.w-100.t-c.bd-1.br-4.mr-20.mb-20(:href="`http://www.haitc.com/?t=${sTimeStamp}`" target="_blank") 打开
</template>

<style>
.todo-item .check-item {
  opacity: 0;
}
.todo-item:hover .check-item {
  opacity: 1;
}
.news:visited {
  color: gray;
}
</style>

<script>
import 'vue-calendar-heatmap/dist/vue-calendar-heatmap.css';
import { CalendarHeatmap } from 'vue-calendar-heatmap';
import config from '@/assets/config';
import Cosmic from 'cosmicjs';
import Promise from 'promise';
const api = Cosmic();

export default {
  head() {
    return {
      title: '日程' + config.sPageBaseTitle,
    };
  },
  computed: {
    nTodoCheckCount() {
      return (this.aTodoList.filter((i) => i.bCheck).length / this.aTodoList.length).toFixed(3) * 100;
    },
    sWriteKey() {
      return this.$store.state.auth.writeKey;
    },
  },
  components: {
    CalendarHeatmap,
  },
  data() {
    let dToday = new Date();

    config.aTodoList.forEach((item) => {
      item.bCheck = false;
    });

    let sWeekDay = ['日', '一', '二', '三', '四', '五', '六'];

    return {
      sDateStr: `${dToday.getFullYear()}年${dToday.getMonth() + 1}月${dToday.getDate()}日，星期${sWeekDay[dToday.getDay()]}`,
      sTimeStamp: `${dToday.getFullYear()}${dToday.getMonth() + 1}${dToday.getDate()}`,
      sToday: this.dateFormat(new Date(), 'yyyy-MM-dd'),
      aTodoList: config.aTodoList,
      aBJnews: [],
      aRMDailyNews: [],
      aEconomyDaily: [],
      aYangchengNews: [],
      aEnvironmentNews: [],
      aCankaoxiaoxi: [],

      // 运动数据
      oSport: {
        run: 0,
        pushUp: 0,
        sitUp: 0,
        kaihe: 0,
        tixi: 0,
        shendun: 0,
        taitui: 0,
      },
      sRoutineId: '',
      bRoutineLoading: false,

      aContribution: [],
    };
  },
  watch: {
    sWriteKey(val) {
      if (val) {
        this.getTodayRoutine();
      }
    },
  },
  mounted() {
    this.getTodayRoutine();
    this.initNewsData();
    this.getAllRoutine();
  },
  methods: {
    decrease(type, step) {
      if (this.bRoutineLoading) return;

      if (this.oSport[type] - step >= 0) {
        this.oSport[type] -= step;
      }

      this.updateTodayRoutine();
    },
    increase(type, step) {
      if (this.bRoutineLoading) return;

      if (this.oSport[type] + step <= 100) {
        this.oSport[type] += step;
      }

      this.updateTodayRoutine();
    },
    checkTodo(index) {
      if (!this.sWriteKey || this.bRoutineLoading) return;

      this.aTodoList[index].bCheck = !this.aTodoList[index].bCheck;

      this.updateTodayRoutine();
    },

    // 获取新京报数据
    getBJnewsData() {
      let aBJnewsInfo = [
        {
          index: 'A',
          num: 20,
        },
        {
          index: 'B',
          num: 8,
        },
        {
          index: 'C',
          num: 8,
        },
      ];

      let aBJnews = [],
        sCount = 0,
        dToday = new Date();

      let nMonth = dToday.getMonth() + 1;
      let sMonth = `${nMonth > 9 ? '' : '0'}${nMonth}`;
      let nDate = dToday.getDate();
      let sDate = `${nDate > 9 ? '' : '0'}${nDate}`;

      for (let i = 0; i < aBJnewsInfo.length; i++) {
        for (let j = 0; j < aBJnewsInfo[i].num; j++) {
          sCount = `${j >= 9 ? '' : '0'}${j + 1}`;
          aBJnews.push({
            url: `http://appimg2.tbnimg.com/ipaper/data/${dToday.getFullYear()}-${sMonth}/${sDate}/${aBJnewsInfo[i].index}${sCount}/xjb${dToday.getFullYear()}${sMonth}${sDate}${
              aBJnewsInfo[i].index
            }${sCount}.pdf`,
            title: `${aBJnewsInfo[i].index}${j + 1}版`,
            disable: false,
          });
        }
      }

      this.aBJnews = aBJnews;
    },
    // 获取人民日报数据
    getRMDailyNewsData() {
      let aNews = [],
        dToday = new Date();
      let sMonth = `${dToday.getMonth() + 1 > 9 ? '' : '0'}${dToday.getMonth() + 1}`;
      let sDate = `${dToday.getDate() > 9 ? '' : '0'}${dToday.getDate()}`;
      for (let i = 0; i < 20; i++) {
        let sCount = `${i >= 9 ? '' : '0'}${i + 1}`;
        aNews.push({
          url: `http://paper.people.com.cn/rmrb/images/${dToday.getFullYear()}-${sMonth}/${sDate}/${sCount}/rmrb${dToday.getFullYear()}${sMonth}${sDate}${sCount}.pdf`,
          disable: false,
        });
      }

      this.aRMDailyNews = aNews;
    },
    // 获取经济日报数据
    getEconomyDailyNewsData() {
      let aNews = [],
        dToday = new Date();
      let sMonth = `${dToday.getMonth() + 1 > 9 ? '' : '0'}${dToday.getMonth() + 1}`;
      let sDate = `${dToday.getDate() > 9 ? '' : '0'}${dToday.getDate()}`;

      for (let i = 0; i < 20; i++) {
        let sCount = `${i >= 9 ? '' : '0'}${i + 1}`;
        aNews.push({
          url: `http://paper.ce.cn/jjrb/page/1/${dToday.getFullYear()}-${sMonth}/${sDate}/${sCount}/${dToday.getFullYear()}${sMonth}${sDate}${sCount}_pdf.pdf`,
          disable: false,
        });
      }

      this.aEconomyDaily = aNews;
    },
    // 获取中国环境报数据
    getEnvironmentNewsData() {
      let aNews = [],
        dToday = new Date();
      let sMonth = `${dToday.getMonth() + 1 > 9 ? '' : '0'}${dToday.getMonth() + 1}`;
      let sDate = `${dToday.getDate() > 9 ? '' : '0'}${dToday.getDate()}`;

      for (let i = 0; i < 8; i++) {
        let sCount = `${i >= 9 ? '' : '0'}${i + 1}`;

        aNews.push({
          url: `http://epaper.cenews.com.cn/html/1/${dToday.getFullYear()}-${sMonth}/${sDate}/${sCount}B/${dToday.getFullYear()}${sMonth}${sDate}${sCount}B_pdf.pdf`,
          disable: false,
        });
      }

      this.aEnvironmentNews = aNews;
    },
    // 获取羊城晚报数据
    getYangchengData() {
      let aNews = [];

      let nLength = 16,
        sCount = 0,
        dToday = new Date();
      let nMonth = dToday.getMonth() + 1;
      let sMonth = `${nMonth > 9 ? '' : '0'}${nMonth}`;
      let nDate = dToday.getDate();
      let sDate = `${nDate > 9 ? '' : '0'}${nDate}`;
      let nYear = dToday.getFullYear();

      for (let i = 0; i < nLength; i++) {
        sCount = `${i >= 9 ? '' : '0'}${i + 1}`;

        // 无法确定 G 后缀的规律，因此添加两个 url
        let url1 = `http://ep.ycwb.com/epaper/ycwb/resfile/${nYear}-${sMonth}-${sDate}/A${sCount}/ycwb${nYear}${sMonth}${sDate}A${sCount}.pdf`;
        let url2 = `http://ep.ycwb.com/epaper/ycwb/resfile/${nYear}-${sMonth}-${sDate}/A${sCount}G/ycwb${nYear}${sMonth}${sDate}A${sCount}G.pdf`;

        aNews.push({
          url: url1,
          disable: false,
        });
        i > 0 &&
          aNews.push({
            url: url2,
            disable: false,
          });
      }

      this.aYangchengNews = aNews;
    },
    initNewsData() {
      this.getBJnewsData();
      this.getRMDailyNewsData();
      this.getEconomyDailyNewsData();
      this.getEnvironmentNewsData();
      this.getYangchengData();
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
    getTodayRoutine() {
      this.bRoutineLoading = true;

      const bucket = api.bucket({
        slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
        read_key: 'KW8eCqNzGJ8U05aYWCUNHKueNH5COLxAOv1Ou71XIPArrTIDeU',
      });
      bucket
        .getObjects({
          query: {
            slug: this.sToday,
          },
          props: 'slug,title,id,metadata.todo,metadata.sport',
          sort: 'created_at',
          limit: 20,
        })
        .then((res) => {
          let data = res.objects[0];
          this.aTodoList = data.metadata.todo;

          this.oSport.run = data.metadata.sport.run || 0;
          this.oSport.pushUp = data.metadata.sport.pushUp || 0;
          this.oSport.sitUp = data.metadata.sport.sitUp || 0;
          this.oSport.kaihe = data.metadata.sport.kaihe || 0;
          this.oSport.tixi = data.metadata.sport.tixi || 0;
          this.oSport.shendun = data.metadata.sport.shendun || 0;
          this.oSport.taitui = data.metadata.sport.taitui || 0;

          this.sRoutineId = data.id;
        })
        .catch((err) => {
          // 找不到今天日程则创建
          if (err.status == 404 && this.sWriteKey) {
            this.addObject({
              title: this.sToday,
              slug: this.sToday,
              type: 'routines',
              metafields: [
                {
                  title: 'todo',
                  key: 'todo',
                  type: 'json',
                  value: config.aTodoList,
                },
                {
                  title: 'sport',
                  key: 'sport',
                  type: 'json',
                  value: this.oSport,
                },
              ],
            }).then(() => {
              this.getTodayRoutine();
            });
          }
        })
        .finally(() => {
          this.bRoutineLoading = false;
        });
    },
    // 获取所有的日程数据
    getAllRoutine() {
      const bucket = api.bucket({
        slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
        read_key: 'KW8eCqNzGJ8U05aYWCUNHKueNH5COLxAOv1Ou71XIPArrTIDeU',
      });
      bucket
        .getObjects({
          query: {
            type: 'routines',
          },
          props: 'slug,title,id,metadata.todo,metadata.sport',
          sort: 'created_at',
          limit: 400,
        })
        .then((res) => {
          this.aContribution = res.objects.map((item) => {
            let count = 0;
            Object.keys(item.metadata.sport).forEach((i) => (count += item.metadata.sport[i]));
            count = count + (item.metadata.todo.filter((i) => i.bCheck).length / item.metadata.todo.length) * 100;
            count = count / (Object.keys(item.metadata.sport).length + 1);
            return {
              date: item.slug,
              count: count.toFixed(2),
            };
          });
        })
        .catch((err) => {});
    },
    updateTodayRoutine() {
      this.bRoutineLoading = true;
      this.saveObject({
        id: this.sRoutineId,
        title: this.sToday,
        slug: this.sToday,
        metafields: [
          {
            title: 'todo',
            key: 'todo',
            type: 'json',
            value: this.aTodoList,
          },
          {
            title: 'sport',
            key: 'sport',
            type: 'json',
            value: this.oSport,
          },
        ],
      })
        .catch(() => {
          this.$message.warning('更新失败，请重试');
        })
        .finally(() => {
          this.bRoutineLoading = false;
        });
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
  },
};
</script>

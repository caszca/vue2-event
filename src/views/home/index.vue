<template>
  <div>
    <div class="header">
      <div>
        <div class="content">
          <strong>{{ message }}</strong>
          <span>篇</span>
        </div>
        <p>总文章数</p>
      </div>
      <div>
        <div class="content">
          <strong>{{ newMessage }}</strong>
          <span>篇</span>
        </div>
        <p>日增新文章数</p>
      </div>
      <div>
        <div class="content">
          <strong>0</strong>
        </div>
        <p>待定功能</p>
      </div>
      <div>
        <div class="content">
          <strong>0</strong>
        </div>
        <p>待定功能</p>
      </div>
    </div>

    <div class="main">
      <div id="chart1"></div>
    </div>

    <div class="footer">
      <div id="chart2"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getAllArticleNum, getNewArticleNum, getCateArticleNum } from "@/api";

export default {
  name: "MyHome",
  data() {
    return {
      message: 0,
      newMessage: 0,
      cateArticle: [],
    };
  },
  mounted() {
    this.getArticleNum();
    this.getNewArticleNum();
    this.getCateArticle();
  },
  methods: {
    async getArticleNum() {
      const result = await getAllArticleNum();
      const { data } = result.data;
      this.message = data;
    },
    async getNewArticleNum() {
      const result = await getNewArticleNum();
      const { data } = result.data;
      this.newMessage = data;
    },
    async getCateArticle() {
      const result = await getCateArticleNum();
      const { data } = result.data;
      this.cateArticle = data;
    },

    columnChartFn(cateArticle) {
      const myChart = echarts.init(document.querySelector("#chart1"), null, {
        width: 1200,
        height: 400,
      });
      const cate_name = [];
      const num = [];

      for (const item of cateArticle) {
        cate_name.push(item.cate_name);
        num.push(item.count);
      }

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: "分类文章数量：",
        },
        xAxis: {
          data: cate_name,
        },
        yAxis: {},
        legend: {
          data: ["数量"],
        },
        series: [
          {
            name: "数量",
            type: "bar",
            data: num,
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    circleChartFn(cateArticle) {
      const cate_name = [];
      const data = [];
      for (const item of cateArticle) {
        cate_name.push(item.cate_name);
        data.push({ value: item.count, name: item.cate_name });
      }
      const myChart = echarts.init(document.querySelector("#chart2"), null, {
        width: 1000,
        height: 400,
      });
      const option = {
        title: {
          top: 10,
          text: "分类文章数量比",
          x: "center",
        },
        tooltip: {
          trigger: "item", // 在图形上才会触发提示
          formatter: "{a} <br/>{b} : {c} ({d}%)", // 提示的文字显示的格式
          // a: 系列名
          // b: 数据名
          // c: 数值
          // d: 百分比 (只有饼状图生效)
        },

        legend: {
          // 图例组件
          x: "center",
          top: 65,
          data: cate_name, // 每个部分对应的数据名(要和series里name对应)
        },
        toolbox: {
          // 工具箱
          show: true,
          x: "center",
          top: 35,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
              option: {
                funnel: {
                  x: "25%",
                  width: "50%",
                  funnelAlign: "left",
                  max: 1548,
                },
              },
            },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["45%", "60%"],
            center: ["50%", "65%"],
            data,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  watch: {
    cateArticle: function (cateArticle) {
      this.columnChartFn(cateArticle);
      this.circleChartFn(cateArticle);
    },
  },
};
</script>



<style scoped>
/* 记得加scoped，该组件样式奏效 */
* {
  margin: 0;
  padding: 0;
}
.el-header,
.el-footer {
  padding: 0;
  background-color: #fff;
  color: #333;
}

.el-main {
  padding: 0;
  background-color: #e9eef3;
  color: #333;
}

.header {
  display: flex;
  justify-content: space-between;
}

.header > div {
  flex: 1;
  background-color: #fff;
  margin-right: 10px;
  text-align: center;
}

.header > div:last-child {
  margin-right: 0;
}

.content {
  color: #83a2ed;
  margin-top: 10px;
}
.content strong {
  font-size: 30px;
}

.content span {
  font-size: 12px;
}
.header p {
  background-color: #e5e5e5;
  color: #23262e;
  font-size: 10px;
  margin-top: 10px;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  background-color: #ffffff;
}
#chart1 {
  margin-top: 50px;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  background-color: #ffffff;
}
</style>


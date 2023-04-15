<template>
  <div>
    <div class="header">
      <div>
        <div class="content">
          <strong>{{ message }}</strong>
          <span>篇</span>
        </div>
        <p>总日志数</p>
      </div>
      <div>
        <div class="content">
          <strong>{{ newMessage }}</strong>
          <span>篇</span>
        </div>
        <p>每日增新日志数</p>
      </div>
      <div>
        <div class="content">
          <strong>{{ cate_num }}</strong>
          <span>种</span>
        </div>
        <p>日志分类种数</p>
      </div>
    </div>

    <div class="main">
      <div id="chart1"></div>
    </div>

    <div class="center">
      <div id="chart2"></div>
      <div id="chart4"></div>
    </div>
    <div class="footer">
      <div id="chart3"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {
  getAllArticleNum,
  getNewArticleNum,
  getCateArticleNum,
  getMonthNum,
  getHumorNum,
} from "@/api";

export default {
  name: "MyHome",
  data() {
    return {
      message: 0,
      newMessage: 0,
      cate_num: 0,
    };
  },
  mounted() {
    this.getArticleNum();
    this.getNewArticleNum1();
    this.columnChartFn();
    this.circleChartFn();
    this.circleHumortFn();
    this.setCurveChartFn();
  },
  methods: {
    async getArticleNum() {
      const result = await getAllArticleNum();
      const { data } = result.data;

      this.message = data;
    },
    async getNewArticleNum1() {
      const result = await getNewArticleNum();
      const { data } = result.data;

      this.newMessage = data;
    },

    columnChartFn() {
      const myChart = echarts.init(document.querySelector("#chart1"), null, {
        width: 1000,
        height: 400,
      });
      myChart.showLoading();

      getCateArticleNum().then((result) => {
        myChart.hideLoading();
        const { data } = result.data;

        const cate_name = [];
        const num = [];

        for (const item of data) {
          cate_name.push(item.cate_name);
          num.push(item.count);
        }
        this.cate_num = cate_name.length;
        const option = {
          title: {
            text: "分类日志数量：",
            left: "center",
          },
          xAxis: {
            data: cate_name,
          },
          yAxis: {},
          legend: {
            data: ["数量"],
            top: "25",
          },
          tooltip: {
            trigger: "axis",
          },
          toolbox: {
            // 工具栏
            show: true,
            feature: {
              // 各工具配置项
              mark: { show: true }, // 辅助线开关
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          series: [
            {
              name: "数量",
              type: "bar",
              data: num,
            },
          ],
        };
        myChart.setOption(option);
      });
    },

    circleChartFn() {
      const myChart = echarts.init(document.querySelector("#chart2"), null, {
        width: 760,
        height: 450,
      });
      myChart.showLoading();
      getCateArticleNum().then((result) => {
        myChart.hideLoading();
        const { data } = result.data;

        const cate_name = [];
        const data1 = [];
        for (const item of data) {
          cate_name.push(item.cate_name);
          data1.push({ value: item.count, name: item.cate_name });
        }

        const option = {
          title: {
            top: 10,
            text: "分类日志数量比",
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
              radius: ["40%", "60%"],
              center: ["50%", "65%"],
              data: data1,
            },
          ],
        };
        myChart.setOption(option);
      });
    },

    circleHumortFn() {
      const myChart = echarts.init(document.querySelector("#chart4"), null, {
        width: 520,
        height: 450,
      });
      myChart.showLoading();
      getHumorNum().then((result) => {
        myChart.hideLoading();
        const { data } = result.data;

        const cate_name = ["不错", "较差", "一般"];
        const data1 = [
          { name: "不错", value: data.positiveNum },
          { name: "较差", value: data.negativeNum },
          { name: "一般", value: data.commonNum },
        ];

        const option = {
          title: {
            top: 10,
            text: "不同心情日志数量比",
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
              radius: ["40%", "60%"],
              center: ["50%", "65%"],
              data: data1,
            },
          ],
        };
        myChart.setOption(option);
      });
    },

    setCurveChartFn() {
      // 基于准备好的dom，初始化echarts实例
      const curveChart = echarts.init(document.getElementById("chart3"), null, {
        width: 1000,
        height: 500,
      });
      curveChart.showLoading();

      getMonthNum().then((result) => {
        curveChart.hideLoading();
        const { data } = result.data;
        const aListAll = data.reverse();
        const aCount = [];
        const aDate = [];

        for (let i = 0; i < aListAll.length; i++) {
          aCount.push(aListAll[i].count);
          aDate.push(aListAll[i].date);
        }
        const option = {
          title: {
            text: "每月日志数",
            left: "center",
            top: "10",
          },
          tooltip: {
            // 提示框组件
            trigger: "axis", // 坐标轴触发(鼠标放在坐标轴就能出提示框)
          },
          legend: {
            // 图例组件(每种颜色的意思)
            data: ["每月日志"], // 图例文字解释(要和series里name对应)
            top: "40",
          },
          toolbox: {
            // 工具栏
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          xAxis: [
            // 水平轴显示
            {
              name: "日",
              type: "category",
              boundaryGap: false, // 坐标轴两边留白策略 (不留白)
              data: aDate, // 水平轴上的数字数据 (时间)
            },
          ],
          yAxis: [
            // 垂直轴显示
            {
              name: "每月日志数",
              type: "value", // 以series里的data值做划分段
            },
          ],
          series: [
            // 系列(控制图表类型和数据)
            {
              name: "每月日志",
              type: "line",
              smooth: true, // 区域填充样式。设置后显示成区域面积图。
              areaStyle: { type: "default" },
              itemStyle: { color: "#5c7bd9", lineStyle: { color: "#5c7bd9" } },
              data: aCount,
            },
          ],
          grid: {
            show: true,
            x: 50,
            x2: 50,
            y: 80,
            height: 350,
          },
        };

        curveChart.setOption(option);
      });
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
.center {
  display: flex;
  margin-top: 60px;
  justify-content: space-between;
}
#chart2,
#chart4 {
  background-color: #ffffff;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  background-color: #ffffff;
}
</style>


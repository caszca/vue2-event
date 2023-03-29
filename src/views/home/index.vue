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
} from "@/api";

export default {
  name: "MyHome",
  data() {
    return {
      message: 0,
      newMessage: 0,
    };
  },
  mounted() {
    this.getArticleNum();

    this.columnChartFn();
    this.circleChartFn();
    this.setCurveChartFn();
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
        console.log("cate_name", cate_name);
        console.log("num", num);
        const option = {
          title: {
            text: "分类文章数量：",
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
          toolbox: {
            // 工具栏
            show: true, // 要显示
            feature: {
              // 各工具配置项
              mark: { show: true }, // 辅助线开关
              dataView: { show: true, readOnly: false }, // 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
              magicType: { show: true, type: ["line", "bar"] }, // 动态类型切换
              restore: { show: true }, // 配置项还原
              saveAsImage: { show: true }, // 点击保存下载图片
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

      // 指定图表的配置项和数据

      // 使用刚指定的配置项和数据显示图表。
    },

    circleChartFn(cateArticle) {
      const myChart = echarts.init(document.querySelector("#chart2"), null, {
        width: 1000,
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
        console.log("data1", data1);
        console.log("cate_name", cate_name);
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

    setCurveChartFn(monthNum) {
      // 基于准备好的dom，初始化echarts实例
      const curveChart = echarts.init(document.getElementById("chart3"), null, {
        width: 1000,
        height: 500,
      });
      curveChart.showLoading();
      // 绘制面积图表
      // 数据源(模拟后台返回的数据)
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
            text: "每月文章数", // 标题
            left: "center", // 位置居中
            top: "10", // 标题距离容器顶部px
          },
          tooltip: {
            // 提示框组件
            trigger: "axis", // 坐标轴触发(鼠标放在坐标轴就能出提示框)
          },
          legend: {
            // 图例组件(每种颜色的意思)
            data: ["每月文章"], // 图例文字解释(要和series里name对应)
            top: "40", // 距离容器顶部px
          },
          toolbox: {
            // 工具栏
            show: true, // 要显示
            feature: {
              // 各工具配置项
              mark: { show: true }, // 辅助线开关
              dataView: { show: true, readOnly: false }, // 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
              magicType: { show: true, type: ["line", "bar"] }, // 动态类型切换
              restore: { show: true }, // 配置项还原
              saveAsImage: { show: true }, // 点击保存下载图片
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
              name: "每月文章数",
              type: "value", // 以series里的data值做划分段
            },
          ],
          series: [
            // 系列(控制图表类型和数据)
            {
              name: "每月文章",
              type: "line", // 折线图
              smooth: true, // 是否平滑视觉引导线，默认不平滑，可以设置成 true 平滑显示
              areaStyle: { type: "default" }, // 区域填充样式。设置后显示成区域面积图。
              itemStyle: { color: "#f80", lineStyle: { color: "#f80" } }, // 折线拐点标志的样式。
              data: aCount, // 真正数据源(用下标和x轴数组对应)
            },
          ],
          grid: {
            // 直角坐标系内绘图网格
            show: true,
            x: 50, // grid 组件离容器偏移量, 左侧
            x2: 50, // 右侧
            y: 80, // 上
            height: 350, // 高度
          },
        };

        curveChart.setOption(option);
      });

      // 但是图标要求直接给数字的值, 所以要把对象的值取出来形成2个只有值的数组

      // 面积图的echarts配置项(参考文档复制)
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


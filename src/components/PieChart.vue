<template>
  <div class="chart" ref="chart"></div>
</template>
<script>
import * as echarts from "echarts/core";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { SVGRenderer } from "echarts/renderers";

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  SVGRenderer,
  LabelLayout,
]);

const COLORS = [
  "#68ceb7",
  "#e18576",
  "#d0e344",
  "#e9bd4c",
  "#ee85c8",
  "#5b8ff9",
  "#5d28de",
  "#667898",
  "#799866",
];

export default {
  props: ["items"],
  watch: {
    items() {
      if (this.myChart) {
        this.myChart.setOption(this.chartConfig);
      }
    },
  },

  computed: {
    chartConfig() {
      return {
        tooltip: {
          trigger: "item",
        },
        legend: {
          bottom: "1%",
          left: "center",
          itemWidth: 6,
          itemHeight: 6,
          padding: 0,
          icon: "circle",
          textStyle: {
            color: "rgba(0, 0, 0, 0.45)",
            fontSize: 12,
          },
        },
        series: [
          {
            type: "pie",
            bottom: 75,
            radius: ["55%", "85%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "inside",
              formatter: (data) => {
                if (data.percent >= 10) {
                  return parseInt(data.percent) + "%";
                }
                return "";
              },
              color: "#fff",
              fontSize: 12,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 12,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.items.map((item, index) => {
              return {
                ...item,
                itemStyle: {
                  color: COLORS[index],
                },
              };
            }),
          },
        ],
      };
    },
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.chart);
    this.myChart.setOption(this.chartConfig);

    let timeout;
    window.addEventListener("resize", () => {
      // clear the timeout
      clearTimeout(timeout);
      // start timing for event "completion"
      timeout = setTimeout(() => {
        this.myChart.resize();
      }, 500);
    });
  },
};
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 268px;
}
</style>

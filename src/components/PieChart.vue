<template>
  <div class="chart" ref="chart"></div>
</template>
<script>
import * as echarts from "echarts/core";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { SVGRenderer } from "echarts/renderers";
import { MATERIAL_COLORS } from "../utils/constants";

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  SVGRenderer,
  LabelLayout,
]);

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
            data: this.items.map((item) => {
              return {
                ...item,
                itemStyle: {
                  color: MATERIAL_COLORS[item.name],
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
  height: 450px;
}
</style>

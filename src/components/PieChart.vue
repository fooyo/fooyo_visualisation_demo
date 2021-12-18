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
  mounted() {
    this.myChart = echarts.init(this.$refs.chart);
    this.myChart.setOption({
      tooltip: {
        trigger: "item",
      },
      legend: {
        bottom: "0%",
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
          bottom: 40,
          radius: ["50%", "90%"],
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
          data: [
            { value: 1048, name: "Bag", itemStyle: { color: "#68ceb7" } },
            { value: 735, name: "Bottle" },
            { value: 580, name: "Wrapper" },
            { value: 484, name: "Cig" },
            { value: 300, name: "Packing" },
            { value: 735, name: "Mask" },
            { value: 580, name: "Glass" },
            { value: 484, name: "Can" },
            { value: 300, name: "Others" },
          ].map((item, index) => {
            return {
              ...item,
              itemStyle: {
                color: COLORS[index],
              },
            };
          }),
        },
      ],
    });

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

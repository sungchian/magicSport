import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

import i18n from "@/i18n";

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

const useChart = (element) => {
  const Chart = echarts.init(element);
  const setOption = (data) => {
    const option = {
      color: ["#4d87de", "#4FBFCD", "#FA816D"],
      title: {
        text: i18n.t("pages.analysis.user.field.chart.title"),
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: [
          i18n.t("pages.analysis.user.field.chart.use"),
          i18n.t("pages.analysis.user.field.chart.register"),
          i18n.t("pages.analysis.user.field.chart.login"),
        ],
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data.stats.dates,
      },
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: i18n.t("pages.analysis.user.field.chart.login"),
          type: "line",
          stack: "Total", // 累加
          smooth: true, // 曲線
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#4d87de",
              },
              {
                offset: 1,
                color: "#8fb4ef",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: data.stats.login,
        },
        {
          name: i18n.t("pages.analysis.user.field.chart.register"),
          type: "line",
          stack: "Total", // 累加
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#4FBFCD",
              },
              {
                offset: 1,
                color: "#6FDABB",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: data.stats.register,
        },
        {
          name: i18n.t("pages.analysis.user.field.chart.use"),
          type: "line",
          stack: "Total", // 累加
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#FA816D",
              },
              {
                offset: 1,
                color: "#FFB64E",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: data.stats.use,
        },
      ],
    };
    return Chart.setOption(option);
  };

  const resize = () => Chart.resize();

  return { setOption, resize };
};

export default useChart;

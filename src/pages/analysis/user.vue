<template>
  <div>
    <h1 class="page-header">{{ t("$current.page.title") }}</h1>
    <div
      class="px-2 pb-8 flex space-y-4 flex-col sm:flex-row sm:space-x-4 sm:space-y-0 border-b border-gray-300"
    >
      <div
        class="p-3 pr-1 flex flex-col rounded-xl space-y-1 h-20 w-full sm:w-1/3 card_pink"
      >
        <p class="text-white">{{ t("$field.realtime.use") }}</p>
        <span class="ml-1 text-xl text-white">
          <i class="fa fa-chart-bar"></i>
        </span>
        <p class="relative bottom-7 right-2 text-2xl text-right">
          {{ Number(data.realTime.use).toLocaleString() }}
        </p>
      </div>
      <div
        class="p-3 pr-1 flex flex-col rounded-xl space-y-1 h-20 w-full sm:w-1/3 card_purple"
      >
        <p class="text-white">{{ t("$field.realtime.register") }}</p>
        <span class="ml-1 text-xl text-white">
          <i class="fa fa-address-card"></i>
        </span>
        <p class="relative bottom-7 right-2 text-2xl text-right">
          {{ Number(data.realTime.register).toLocaleString() }}
        </p>
      </div>
      <div
        class="p-3 pr-1 flex flex-col rounded-xl space-y-1 h-20 w-full sm:w-1/3 card_cyan"
      >
        <p class="text-white">{{ t("$field.realtime.login") }}</p>
        <span class="ml-1 text-xl text-white">
          <i class="fa fa-file-import"></i>
        </span>
        <p class="relative bottom-7 right-2 text-2xl text-right">
          {{ Number(data.realTime.login).toLocaleString() }}
        </p>
      </div>
    </div>

    <div class="mt-10">
      <div id="sevenDayStats"></div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";

import * as echarts from "echarts";
// import echarts from "@/hooks/echarts";
// import * as echarts from "echarts/core";
// import { LineChart } from "echarts/charts";
// import {
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent,
//   GridComponent,
// } from "echarts/components";
// import { CanvasRenderer } from "echarts/renderers";

export default {
  breadcrumb: ["MODULE_ANALYSIS", "ANALYSIS_USER"],
  setup() {
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix({
      $current: "pages.analysis.user",
      $field: "$current.field",
    });

    const data = reactive({
      realTime: {
        use: 0,
        register: 0,
        login: 0,
      },
      stats: {
        dates: [],
        use: [],
        register: [],
        login: [],
      },
    });

    // echarts.use([
    //   LineChart,
    //   TitleComponent,
    //   TooltipComponent,
    //   LegendComponent,
    //   GridComponent,
    //   CanvasRenderer,
    // ]);

    const drawChart = () => {
      const Chart = echarts.init(document.getElementById("sevenDayStats"));
      Chart.setOption({
        color: ["#4d87de", "#4FBFCD", "#FA816D"],
        title: {
          text: t("$field.chart.title"),
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
            t("$field.chart.use"),
            t("$field.chart.register"),
            t("$field.chart.login"),
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
            name: t("$field.chart.login"),
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
            name: t("$field.chart.register"),
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
            name: t("$field.chart.use"),
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
      });
    };
    const getRealtime = async () => {
      const res = await store.dispatch("analysis/user/read/realtime");
      if (res.state === 0) {
        data.realTime = res.result;
      } else {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("$field.data.nonfound"),
        });
      }
    };
    const getSevenday = async () => {
      const res = await store.dispatch("analysis/user/read/sevenday");
      if (res.state === 0) {
        data.stats = res.result;
        drawChart();
      } else {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("$field.data.nonfound"),
        });
      }
    };

    onMounted(() => {
      getRealtime();
      getSevenday();
    });

    return {
      t,
      data,
    };
  },
};
</script>

<style lang="scss" scoped>
.card_pink {
  background: linear-gradient(170deg, #ffb64e 25%, #eb9270 60%, #fa816d 100%);
}
.card_purple {
  background: linear-gradient(170deg, #6fdabb 25%, #5be2e2 60%, #4fbfcd 100%);
}
.card_cyan {
  background: linear-gradient(170deg, #8fb4ef 25%, #6194e6 60%, #4d87de 100%);
}
#sevenDayStats {
  width: 100%;
  height: 40em;
}
</style>

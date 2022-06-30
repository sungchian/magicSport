<template>
  <div class="discount-detail flex flex-col h-full">
    <div
      class="discount-detail-img flex-none"
      v-bind:style="
        'background-image: url(' + discount.data.image ??
        discount.data.title_image + ')'
      "
    ></div>
    <div
      class="discount-detail-content flex-1 overflow-x-hidden overflow-y-auto"
    >
      <div class="discount-detail-date">
        <div class="icon-daily"></div>
        <p class="text-center text-sm py-8">
          {{ discount.data.start }} {{ t("pages.activity.during") }}
          {{ discount.data.end }}
        </p>
      </div>
      <div class="discount-detail-info text-center text-base p-3">
        {{ discount.data.content }}
      </div>
    </div>
    <div class="discount-detail-button flex-none p-5">
      <p v-if="discount.data.auto_away" class="discount-detail-tip">
        <span
          >{{ t("pages.activity.auto_away") }} :
          {{ t("pages.activity.ineligible") }}</span
        >
      </p>
      <a
        v-if="discount.data.joined === 0 || discount.data.joined === 2"
        href="javascript:void(0)"
        @click="discount_apply(discount.data.joined)"
      >
        <span>{{
          t("pages.activity.joined_btn." + discount.data.joined)
        }}</span>
      </a>
      <a v-else href="javascript:void(0)" class="disabled">
        <span>{{
          t("pages.activity.joined_btn." + discount.data.joined)
        }}</span>
      </a>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import useI18n from "@/hooks/use-i18n";
import axios from "@/axios";
export default {
  layout: "layout-trade",
  setup() {
    const swal = inject("$swal");
    const store2 = inject("$storage");
    const router = useRouter();
    const route = useRoute();
    const { t } = useI18n();
    const discount = reactive({
      id: parseInt(route.params.id),
      data: {
        image: "",
        title_image: "",
        start: "",
        end: "",
        auto_away: "",
        joined: 0,
      },
    });
    const setTitle = (title) => {
      document.querySelector(".title").textContent = title;
    }; //設定標題
    const getDiscountDetail = () => {
      axios.get("/app/promotes").then((res) => {
        if (res.code === 1) {
          let tempData = res.data.find(function (item) {
            return item.id === discount.id;
          });
          if (!tempData) return alertError();
          discount.data = tempData;
          console.log(discount.data);
          discount.data.auto_away = false;
          if (discount.data.record.length > 0) {
            if (discount.data.record[0].status === "auto_away") {
              discount.data.auto_away = true;
              discount.data.reason =
                discount.data.record[0].reason === "others"
                  ? t(
                      "pages.activity.others." +
                        discount.data.record[0].reason_text
                    )
                  : t("pages.activity." + discount.data.record[0].reason);
            }
          }
          setTitle(discount.data.title);
        } else {
          alertError();
        }
      });
    }; // 取得優惠詳情
    const alertError = () => {
      swal.alert({
        text: t("feedback.read.failed"),
        willClose: function () {
          router.push("/discount");
        },
      });
    };
    const showError = (code, typ) => {
      let title = typ
        ? t("pages.activity.apply.1.failed")
        : t("pages.activity.apply.0.failed");
      swal.alert({
        title: title,
        text: t("error.code.activity.apply." + code),
        willClose: function () {
          router.push("/discount");
        },
      });
    };
    const discount_apply = (typ) => {
      typ = !typ ? 1 : 0;
      axios
        .post("/app/promotes/apply", {
          action: typ,
          promote_id: discount.id,
        })
        .then((res) => {
          if (res.code == 1) {
            store2.set("showAlert", typ, true);
            router.push("/discount");
          } else {
            showError(res.code, typ);
          }
        });
    };
    onMounted(() => {
      getDiscountDetail();
    });
    return {
      showError,
      alertError,
      discount,
      t,
      discount_apply,
    };
  },
};
</script>

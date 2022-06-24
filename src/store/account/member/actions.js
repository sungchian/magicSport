import axios from "@/axios";
import qs from "qs";

const actions = {
  async "read/list"(_, payload) {
    const res = await axios.get(
      "/member/roster/list?" + qs.stringify(payload, { encode: false })
    );
    return res;
  },

  async "read/one"(_, payload) {
    const res = await axios.get("/member/roster/get", {
      params: {
        id: payload.id,
      },
    });
    return res;
  },

  async "read/gold/history"(_, payload) {
    const res = await axios.get("/member/gold/history", {
      params: {
        pageIndex: payload.pageIndex,
        pageSize: payload.pageSize,
        id: payload.id,
      },
    });
    return res;
  },

  async create(_, payload) {
    const res = await axios.post("/member/roster/add", payload);
    return res;
  },

  async update(_, payload) {
    const res = await axios.post("/member/roster/edit", payload);
    return res;
  },

  async "update/audit"(_, payload) {
    const res = await axios.post("/member/setarticleaudit", payload);
    return res;
  },

  // 不能刪除，只能停用
  // async delete(_, payload) {
  //   const res = await axios.post("/member/roster/del", [
  //     {
  //       id: payload[0].id,
  //     },
  //   ]);
  //   return res;
  // },

  async disable(_, payload) {
    const res = await axios.post("/member/roster/disable", payload);
    return res;
  },

  async disableOne(_, payload) {
    const res = await axios.post("/member/roster/disable", [payload]);
    return res;
  },

  async upload(_, payload) {
    const res = await axios.post(
      "/article/imgupload",
      {
        attachPic: payload,
      },
      {
        isFormData: true,
      }
    );
    return res;
  },
};

export default actions;

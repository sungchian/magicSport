import axios from "@/axios";

const actions = {
  async "read/list"(_, payload) {
    const res = await axios.get("/manager/list", {
      params: {
        pageIndex: payload.pageIndex,
        pageSize: payload.pageSize,
      },
    });
    return res;
  },

  async "read/one"(_, payload) {
    const res = await axios.get("/manager/first", {
      params: {
        id: payload.id,
      },
    });
    return res;
  },

  async create(_, payload) {
    const res = await axios.post("/manager/add", payload);
    return res;
  },

  async update(_, payload) {
    const res = await axios.post("/manager/update", payload);
    return res;
  },

  // 不能刪除，只能停用
  // async delete(_, payload) {
  //   const res = await axios.post("/manager/delete", payload);
  //   return res;
  // },

  async disable(_, payload) {
    const res = await axios.post("/manager/disable", payload);
    return res;
  },

  async disableOne(_, payload) {
    const res = await axios.post("/manager/disable", [payload]);
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

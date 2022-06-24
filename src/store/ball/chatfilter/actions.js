import axios from "@/axios";

const actions = {
  async "read/list"(_, payload) {
    const res = await axios.get("/chat/content-filter/list", {
      params: {
        pageIndex: payload.pageIndex,
        pageSize: payload.pageSize,
      },
    });
    return res;
  },

  async "read/one"(_, payload) {
    const res = await axios.get("/chat/content-filter/first", {
      params: {
        id: payload.id,
      },
    });
    return res;
  },

  async create(_, payload) {
    const res = await axios.post("/chat/content-filter/add", payload);
    return res;
  },

  async update(_, payload) {
    const res = await axios.post("/chat/content-filter/update", payload);
    return res;
  },

  async delete(_, payload) {
    const res = await axios.post("/chat/content-filter/delete", payload);
    return res;
  },
};

export default actions;

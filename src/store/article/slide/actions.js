import axios from "@/axios";

const actions = {
  async "read/list"(_, payload) {
    const res = await axios.get("/article/slideshow/list", {
      params: {
        pageIndex: payload.pageIndex,
        pageSize: payload.pageSize,
      },
    });
    return res;
  },

  async "read/one"(_, payload) {
    const res = await axios.get("/article/slideshow/first", {
      params: {
        id: payload.id,
      },
    });
    return res;
  },

  async create(_, payload) {
    const res = await axios.post("/article/slideshow/add", payload);
    return res;
  },

  async update(_, payload) {
    const res = await axios.post("/article/slideshow/update", payload);
    return res;
  },

  async delete(_, payload) {
    const res = await axios.post("/article/slideshow/delete", payload);
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

  async getArticles(_, payload) {
    const res = await axios.post("/article/detail/id-search", payload);
    return res;
  },
};

export default actions;

import axios from "@/axios";
import storage from "store2";

const actions = {
  async "mock/test"() {
    const res = await axios.post("/sys/renewrefresh", {
      token: storage.get("refreshToken"),
    });
    if (res.state === 0) {
      storage.set("token", res.result.jwtToken);
      storage.set("refreshToken", res.result.refreshToken);
    }
    if (res.state === 5002) console.log("expire");
    return res;
  },

  async "article/category"(_, payload) {
    const res = await axios.get("/article/category/list", {
      params: {
        pageIndex: payload.pageIndex,
        pageSize: payload.pageSize,
      },
    });
    return res;
  },

  async "read/one"(_, payload) {
    const res = await axios.get(`/article/category/get/${payload.id}`);
    return res;
  },

  async create(_, payload) {
    const res = await axios.post("/article/category/add", {
      name: payload.name,
    });
    if (res.state === 0) {
      console.log(res.result);
    }
    if (res.state === 5002) console.log("expire");
    return res;
  },

  async update(_, payload) {
    const res = await axios.post("/article/category/edit", payload, {
      headers: { "Content-Type": "text/plain" },
    });
    if (res.state === 0) {
      console.log(res.result);
    }
    if (res.state === 5002) console.log("expire");
    return res;
  },

  // async delete(_, payload) {
  //   const res = await axios.delete("/article/category", {
  //     data: { id: payload.id },
  //   });
  //   return res;
  // },
  async delete(_, payload) {
    const res = await axios.post("/article/category/del", payload);
    return res;
  },
};

export default actions;

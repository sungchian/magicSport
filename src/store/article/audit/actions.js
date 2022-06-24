import axios from "@/axios";
import qs from "qs";

const actions = {
  async "read/list"(_, payload) {
    const res = await axios.get(
      "/article/detail/Unaudited/list?" +
        qs.stringify(payload, { encode: false }),
      {
        params: {
          pageIndex: payload.pageIndex,
          pageSize: payload.pageSize,
        },
      }
    );
    return res;
  },

  async "read/one"(_, payload) {
    const res = await axios.get(`/article/detail/get/${payload.id}`);
    return res;
  },

  async audit(_, payload) {
    const res = await axios.post("/article/articleaudit", payload, {
      headers: { "Content-Type": "text/plain" },
    });
    return res;
  },

  async delete(_, payload) {
    const res = await axios.post("/article/detail/del", payload);
    return res;
  },

  // async "search/football/team"(_, payload) {
  //   const res = await axios.post("/data/football/team/search", payload);
  //   return res;
  // },

  // async "search/basketball/team"(_, payload) {
  //   const res = await axios.post("/data/basketball/team/search", payload);
  //   return res;
  // },

  // async "search/football/player"(_, payload) {
  //   const res = await axios.post("/data/football/player/search", payload);
  //   return res;
  // },

  // async "search/basketball/player"(_, payload) {
  //   const res = await axios.post("/data/basketball/player/search", payload);
  //   return res;
  // },
};

export default actions;

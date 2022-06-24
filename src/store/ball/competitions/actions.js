import axios from "@/axios";
import JSONbig from "json-bigint";

const actions = {
  async "read/list"(_, payload) {
    const res = await axios.get("/ball/competitions/list", {
      params: {
        pageIndex: payload.pageIndex,
        pageSize: payload.pageSize,
      },
    });
    if (res.state === 0) {
      console.log(JSONbig.parse(JSONbig.stringify(res)));
    }
    if (res.state === 5002) console.log("expire");
    return res;
  },

  async "read/one"(_, payload) {
    const res = await axios.get(`/ball/competitions/first`, {
      params: {
        competitionId: payload.competitionId,
        sportType: payload.sportType,
      },
    });
    return res;
  },

  async create(_, payload) {
    // const res = await axios.post("/ball/competitions/add", {
    //   competitionId: payload.competitionId,
    //   competitionName: payload.competitionName,
    //   competitionNameByBallard: payload.competitionNameByBallard,
    //   sort: payload.sort,
    //   sportType: payload.sportType,
    // });
    const res = await axios.post("/ball/competitions/add", payload);
    if (res.state === 0) {
      console.log(res.result);
    }
    if (res.state === 5002) console.log("expire");
    return res;
  },

  async update(_, payload) {
    const res = await axios.post("/ball/competitions/edit", payload);
    if (res.state === 0) {
      console.log(res.result);
    }
    if (res.state === 5002) console.log("expire");
    return res;
  },

  async updateList(_, payload) {
    const res = await axios.post("/ball/competitions/list/edit", payload, {
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
    const res = await axios.post("/ball/competitions/del", payload);
    return res;
  },

  async "read/football"() {
    const res = await axios.get("/data/football/competitions");
    return res;
  },

  async "read/basketball"() {
    const res = await axios.get("/data/basketball/competitions");
    return res;
  },
};

export default actions;

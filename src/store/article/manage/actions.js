import axios from "@/axios";

const actions = {
  async "read/list"(_, payload) {
    const res = await axios.get("/article/detail/list", {
      params: {
        pageIndex: payload.pageIndex,
        pageSize: payload.pageSize,
      },
    });
    return res;
  },

  async "read/one"(_, payload) {
    const res = await axios.get(`/article/detail/get/${payload.id}`);
    return res;
  },

  async create(_, payload) {
    // payload.tagTeam = payload.tagTeam.join();
    // payload.tagPlayer = payload.tagPlayer.join();
    const res = await axios.post("/article/detail/add", payload);
    return res;
  },

  async update(_, payload) {
    // const request = {
    //   approver: payload.approver,
    //   articleContent: payload.articleContent,
    //   auditStatus: payload.auditStatus,
    //   id: payload.id,
    //   publisher: payload.publisher,
    //   tagPlayer: payload.tagPlayer,
    //   tagTeam: payload.tagTeam,
    //   title: payload.title,
    //   type: payload.type,
    // };

    // payload.tagTeam = payload.tagTeam.join();
    // payload.tagPlayer = payload.tagPlayer.join();
    const res = await axios.post("/article/detail/edit", payload, {
      headers: { "Content-Type": "text/plain" },
    });
    return res;
  },

  // async delete(_, payload) {
  //   const res = await axios.delete("/article/category", {
  //     data: { id: payload.id },
  //   });
  //   return res;
  // },
  async delete(_, payload) {
    const res = await axios.post("/article/detail/del", payload);
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

  async "search/football/team"(_, payload) {
    const res = await axios.post("/data/football/team/search", payload);
    return res;
  },

  async "search/basketball/team"(_, payload) {
    const res = await axios.post("/data/basketball/team/search", payload);
    return res;
  },

  async "search/football/player"(_, payload) {
    const res = await axios.post("/data/football/player/search", payload);
    return res;
  },

  async "search/basketball/player"(_, payload) {
    const res = await axios.post("/data/basketball/player/search", payload);
    return res;
  },
};

export default actions;

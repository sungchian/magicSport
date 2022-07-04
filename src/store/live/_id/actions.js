import axios from "@/axios";

const actions = {
  async "read/competitionList"() {
    const res = await axios.get("com/DataAnalysis/GetBallCompetitionList");
    console.log(res);
    return res;
  },
};

export default actions;

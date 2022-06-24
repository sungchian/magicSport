import axios from "@/axios";

const actions = {
  async "read/realtime"() {
    const res = await axios.get("/dashboard/current-date/get");
    return res;
  },
  async "read/sevenday"() {
    const res = await axios.get("/dashboard/seven-day/get");
    return res;
  },
};

export default actions;

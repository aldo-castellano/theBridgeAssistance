const axios = require("axios");
const ENDPOINT = "http://localhost:3003/api";

export default function usercourses(userid) {
  return axios.get(`${ENDPOINT}/course/user/${userid}`).then((res) => {
    if (!res.data) throw new Error("Response is NOT ok");
    return res.data;
  });
}

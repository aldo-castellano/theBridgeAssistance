const axios = require("axios");
const ENDPOINT = "http://localhost:3003/api";

export default function adminCourses() {
  return axios.get(`${ENDPOINT}/course/all`).then((res) => {
    if (!res.data) throw new Error("Response is NOT ok");
    return res.data;
  });
}

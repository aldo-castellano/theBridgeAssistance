const axios = require("axios");
const ENDPOINT = `${process.env.REACT_APP_API_URL}`;

export default function adminCourses() {
  return axios.get(`${ENDPOINT}/course/all`).then((res) => {
    if (!res.data) throw new Error("Response is NOT ok");
    return res.data;
  });
}

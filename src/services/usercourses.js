const axios = require("axios");
const ENDPOINT = `${process.env.REACT_APP_API_URL}`;

export default function usercourses(userid) {
  return axios.get(`${ENDPOINT}/course/user/${userid}`).then((res) => {
    console.log(res.data,"RES.DATA");
    if (!res.data) throw new Error("Response is NOT ok");
    return res.data;
  });
}

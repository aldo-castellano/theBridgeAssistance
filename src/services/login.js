const axios = require("axios");
const ENDPOINT = "http://localhost:3003/api";

export default function login(sessionParams) {
  // return fetch(`${ENDPOINT}/login`, {
  //   method: "POST",
  //   headers: {"Content-Type": "application/json"},
  //   body: JSON.stringify(sessionParams),
  // })
  return axios.post(`${ENDPOINT}/login`, sessionParams).then((res) => {
    if (!res.data.ok) throw new Error("Response is NOT ok");
    const { jwt } = res.data;
    return jwt;
  });
}

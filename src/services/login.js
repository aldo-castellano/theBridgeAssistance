const axios = require("axios");
const ENDPOINT = "http://localhost:3003/api";

export default function loger(sessionParams) {
    return axios.post(`${ENDPOINT}/login`, sessionParams).then((res) => {
        if (!res.data.token) throw new Error("Response is NOT ok");
        return res.data;
    });
}
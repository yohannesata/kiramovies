import axios from "axios";
import queryString from "query-string";

const baseURL = "https://kiramovies-mfqilr7gd-yohannesatas-projects.vercel.app/api/v1/";

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  }
});

privateClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${process.env.TOKEN_SECRET_KEY}`
    }
  };
});

privateClient.interceptors.response.use((response) => {
  if (response && response.data) return response.data;
  return response;
}, (err) => {
  throw err.response.data;
});

export default privateClient;

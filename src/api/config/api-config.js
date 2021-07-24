import axios from "axios";
import { Util } from "../../constants/util-constants";

const AxiosIntance = () => {
  const TOKEN = localStorage.getItem(Util.ACCESS_TOKEN);
  const instance = axios.create();

  let header;
  if (TOKEN) {
    header = {
      "x-access-token": TOKEN,
      "Content-Type": "application/json",
    };
  } else {
    header = {
      "Content-Type": "application/json",
    };
  }

  instance.defaults.baseURL = "https://wnc2021be.herokuapp.com/api";
  instance.defaults.headers.common = header;

  instance.interceptors.request.use(
    (request) => {
      console.log("Request ", request);
      // Edit request config
      return request;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      console.log("Response ", response);

      // Edit response config
      return response;
    },
    (err) => {
      console.log("Error ", err.response);
      return new Promise((resolve, reject) => {
        const originalReq = err.config;
        if (
          err.response.status === 401 &&
          err.config &&
          !err.config.__isRetryRequest
        ) {
          originalReq._retry = true;
          let res = fetch("https://wnc2021be.herokuapp.com/api/auth/refresh", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              Device: "device",
              Token: localStorage.getItem("token"),
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify({
              access_token: localStorage.getItem(Util.ACCESS_TOKEN),
              refresh_token: localStorage.getItem(Util.REFRESH_TOKEN),
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res.data);
              // this.setSession({ token: res.token, refresh_token: res.refresh });
              localStorage.setItem(Util.ACCESS_TOKEN, res.data);
              originalReq.headers["x-access-token"] = res.data;

              return instance(originalReq);
            });

          resolve(res);
        }

        return Promise.reject(err);
      });
    }
  );
  return instance;
};

export default AxiosIntance;

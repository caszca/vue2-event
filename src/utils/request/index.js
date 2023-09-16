import axios from "axios";

import { BASE_URL } from "./config";
import store from "@/store";

class HYRequest {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL,
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (store.state.token) {
          config.headers.Authorization = store.state.token;
          console.log(store.state.token);
        }
        return config;
      },
      (err) => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log("error", error);
        if (error.response.status === 401) {
          //token过期
          store.commit("updateToken", "");
          store.commit("updateUser", "");
          router.push("/log");
          return new Promise(() => {});
        }
      }
    );
  }

  request(config) {
    return this.instance.request(config);
  }

  get(config) {
    return this.request({ ...config, method: "get" });
  }

  post(config) {
    return this.request({ ...config, method: "post" });
  }

  put(config) {
    return this.request({ ...config, method: "put" });
  }

  patch(config) {
    return this.request({ ...config, method: "patch" });
  }

  delete(config) {
    return this.request({ ...config, method: "delete" });
  }
}

const edRequest = new HYRequest(BASE_URL);
export { edRequest };

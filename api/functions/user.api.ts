import ApiRequest from "../axiosInstance/request";
import { endpoints } from "../endpoints";

export const loginFunction = async (data) => {
  const res = await ApiRequest.post(endpoints.auth.login, data);

  return res;
};

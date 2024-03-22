import { axiosClient } from "./axiosClient";

export const getAllUsers = async () => {
  return await axiosClient.get("/admin/all-users", { withCredentials: true });
};



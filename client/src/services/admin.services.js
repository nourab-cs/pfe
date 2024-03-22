import { axiosClient } from "./axiosClient";

export const getAllUsers = async () => {
  return await axiosClient.get("/admin/all-users", { withCredentials: true });
};

export const assignRole = async (id, role) => {
  return await axiosClient.post(
    "/admin/assign-role",
    { id, role },
    { withCredentials: true }
  );
};

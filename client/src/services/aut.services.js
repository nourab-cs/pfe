import { axiosClient } from "./axiosClient";

export const login = async (email, password) => {
 const data = await  axiosClient.post("/login", { email, password })
 console.log(data)
};

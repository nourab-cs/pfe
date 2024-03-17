import { axiosClient } from "./axiosClient";

export const login = async (email, password) => {
  return await axiosClient.post("/login", { email, password } , {withCredentials:true} );
};

export const sendEmail = async (username, email) => {
  return await axiosClient.post("/send-email", { username, email });
};

export const verifyEmail = async (code) => {
  return await axiosClient.post("/verify-email", { code });
};


export const register = async (username,email,password) => {
    return await axiosClient.post("/register", { username,email,password });
  };
  export const logout = async () => {
    return await axiosClient.get("/logout" ,{withCredentials:true} );
  };
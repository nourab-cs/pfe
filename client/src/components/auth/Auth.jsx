import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosClient } from "../../services/axiosClient";
import { useUser } from "../../stores/userStore";

const Auth = function () {
  const [setUser] = useUser((state) => [state.setUser]);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.search.split("=")[1]);

  useEffect(() => {
    axiosClient
      .get(`/code?code=${location.search.split("=")[1]}`, {
        withCredentials: true,
      })
      .then(async (res) => {
        setUser(res.data);
        console.log(res);
        if (res.data.role == "admin") navigate("/admin/dashbord");
        else navigate("/");
      })
      .catch((err) => console.log(err));
  }, []);

  return <></>;
};

export default Auth;

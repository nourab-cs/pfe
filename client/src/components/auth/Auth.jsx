import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosClient } from "../../services/axiosClient";

const Auth = function () {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.search.split("=")[1]);

  useEffect(() => {
    axiosClient
      .get(`/code?code=${location.search.split("=")[1]}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status == 200) navigate("/");
      })
      .catch((err) => console.log(err));
  }, []);

  return <></>;
};

export default Auth;

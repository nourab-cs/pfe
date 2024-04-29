import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosClient } from "../../services/axiosClient";

const Auth = function () {
  const location = useLocation();
  console.log(location.search.split("=")[1]);

  useEffect(() => {
    axiosClient
      .get(`/code?code=${location.search.split("=")[1]}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return <></>;
};

export default Auth;

import { useState, Suspense, useEffect } from "react";
import { useUser } from "../../stores/userStore" 
import { checkAuth } from "../../services/aut.services";
import { Navigate } from "react-router-dom";

export function User({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const [setUser] = useUser((state) => [state.setUser]);

  useEffect(() => {
    checkAuth("private")
      .then((res) => {
        console.log(res)
        setIsAuth(res);
        if (res == false) setUser({});
      })
      .catch((err) => {
        setUser({});
        setIsAuth(null);
      });
  }, []);

  return (
    <>{isAuth != null ? isAuth ? children : <Navigate to="/login" /> : null}</>
  );
}
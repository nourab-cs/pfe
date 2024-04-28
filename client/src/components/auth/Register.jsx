import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Email from "./chuncks/Email";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

function Register() {
  const navigate = useNavigate();
  const [iscode, setcode] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const location = useLocation();
//   useEffect(() => {
//     user.email && navigate("/");
//   }, [user]);
  const loadAndUseVerifCode = () => {
    import("../../services/aut.services")
      .then((module) => {
        module
          .verifyEmail(location.search.split("=")[1])
          .then((res) => {
            console.log(res);
            setEmail(res?.data?.email);
            setUserName(res?.data?.username);
            toast.success("account verified");
            setcode(true);
          })
          .catch((error) => {
            console.log(error)
            toast.error(error.response.data.message);
          });
      })
      .catch((error) => {
        console.error("Dynamic import failed:", error);
      });
  }

  useEffect(() => {
    if (location.search.split("=").includes("?code")) {
      loadAndUseVerifCode();
    }
  }, []);

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
      <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign Up
        </Typography>
       

      <Email iscode={iscode} email={email} username={username} />
      <p className="mt-8 text-xs font-light text-center text-gray-700">
        {" "}
        Already registred?{" "}
        <Link
          to="/login"
          className="font-medium text-red-600 hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
    </section>
  );
}

export default Register;
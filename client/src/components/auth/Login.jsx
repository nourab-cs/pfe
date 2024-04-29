import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../stores/userStore";
import { Typography } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useUser((state) => [state.user, state.setUser]);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const [constants] = useState({
    EMAIL_REGEX:
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    PASSWORD_REGEX:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/,
  });
  const [schema] = useState(
    Yup.object().shape({
      email: Yup.string()
        .required("Required")
        .matches(constants.EMAIL_REGEX, "Invalid email"),
      password: Yup.string()
        .required("Please enter a password")
        .min(8, "Password must have at least 8 characters")
        .matches(
          constants.PASSWORD_REGEX,
          "Use upper and lower case characters, digits and special character"
        ),
    })
  );
  const loadAndUseLogin =
    (email, password) => {
      import("../../services/aut.services")
        .then((module) => {
          module
            .login(email, password)
            .then((res) => {
              if (res && res?.data?.user) {
                setUser(res?.data?.user)
                navigate("/");
                toast.success(
                  `Welcome back ${res.data.user.username}`
                );
              }
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            });
        })
        .catch((error) => {
          console.error("Dynamic import failed:", error);
        });
    }

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2 ">
          Sign In
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            loadAndUseLogin(values.email, values.password);
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-6 mx-auto max-w-[24rem] text-left">
              <div className="mb-2">
                <label htmlFor="email" >
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Your Email
                  </Typography>
                </label>
                <Field
                  className=" block w-full px-4 py-2 mt-2  placeholder:opacity-100  rounded-md focus:border-t-primary border-t-blue-gray-200 "
                  name="email"
                  placeholder="name@mail.com"

                />
                {errors.email && touched.email ? <div>{errors.email}</div> : null}
              </div>
              <div className="mb-2">
                <label htmlFor="password">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Password
                  </Typography>
                </label>
                <Field
                  placeholder="********"

                  className=" block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-black "
                  name="password"
                  labelProps={{
                    className: "hidden",
                  }}
                  type="password"

                />
                {errors.password && touched.password ? <div>{errors.password}</div> : null}
              </div>
              <Link to="/forgot-password" className="mt-8 text-s font-light text-center text-gray-700 hover:underline">Forgot Password</Link>
              <div className="mt-3">
                <button
                  type="submit"
                  name="submit"
                  className="w-full px-4 py-2 tracking-wide text-white font-light transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"            >


                  Log in

                </button>
              </div>
              <div className="mt-3">

                <button
                  type="button"
                  onClick={() => {
                    import("../../services/aut.services").then(module => module.google().then(
                      googleUser => {
                        console.log(googleUser);
                        window.location.href = googleUser.data.authorizationUrl
                      }
                    ).catch());
                  }}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"            >
                  <img
                    src={`https://www.material-tailwind.com/logos/logo-google.png`}
                    alt="google"
                    className="h-6 w-6 inline-block"
                  />
                  <span className="ml-2 font-light">Sign in with Google</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-red-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>






  );
}

export default Login;
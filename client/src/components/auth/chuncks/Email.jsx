import { Formik, Form, Field } from "formik";
import { useState, useCallback } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Password from "./Password";
import { Typography } from "@material-tailwind/react";

function Email({ iscode, username, email }) {
  const [EMAIL_REGEX] = useState(
    /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const [userEmailSchema] = useState(
    Yup.object().shape({
      email: Yup.string()
        .required("Required")
        .matches(EMAIL_REGEX, "Invalid email"),
      username: Yup.string()
        .required("Please enter a username")
        .min(6, "username must have at least 6 characters"),
    })
  );
  const emailHandler = async (username, email) => {
    import("../../../services/aut.services")
      .then((module) => {
        module
          .sendEmail(username, email)
          .then((res) => {
            if (res?.response?.data) toast.error(res.response.data.message);
            toast.success("verification code sent to : " + email);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      })
      .catch((error) => {
        console.error("Dynamic import failed:", error);
      });
  };

  return (
    <div>
      {" "}
      <Formik
        initialValues={{
          username: "",
          email: "",
        }}
        validationSchema={userEmailSchema}
        onSubmit={async (values) => {
          await emailHandler(values.username, values.email);
        }}
      >
        {({ errors, touched }) => (
          <Form className="mt-6 mx-auto max-w-[24rem] text-center">
            {!iscode ? (
              <div className="mb-2">
                <label
                  htmlFor="username"
                >
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Nom d'utilisateur
                  </Typography>
                </label>
                <Field
                  className=" block w-full px-4 py-2 mt-2  placeholder:opacity-100  rounded-md focus:border-t-primary border-t-blue-gray-200 "
                  name="username"
                />
                {errors.username && touched.username ? (
                  <div>{errors.username}</div>
                ) : null}
              </div>
            ) : (
              <div className="mb-2">
                <label
                  htmlFor="username"
                >
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
Nom d'utilisateur
                  </Typography>
                </label>
                <Field
                  disabled={true}
                  className=" block w-full px-4 py-2 mt-2  placeholder:opacity-100  rounded-md focus:border-t-primary border-t-blue-gray-200 "
                  name="usernameholder"
                  value={username}
                />
              </div>
            )}

            {!iscode ? (
              <div className="mb-2">
                <label
                  htmlFor="email"

                >
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Email
                  </Typography>
                </label>
                <Field
                  disabled={iscode}
                  type="email"
                  className=" block w-full px-4 py-2 mt-2  placeholder:opacity-100  rounded-md focus:border-t-primary border-t-blue-gray-200 "
                  name="email"
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>
            ) : (
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >Email</Typography>

                </label>
                <Field
                  value={email}
                  disabled={true}
                  type="email"
                  className="opacity-70 block w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="emailholder"
                />
              </div>
            )}
            {/* <a href="#" className="text-xs text-purple-600 hover:underline">
        Forget Password?
      </a> */}
            <div className={iscode ? "invisible" : "mt-6"}>
              <button
                type="submit"
                name="submit"
                className={
                  iscode
                    ? "invisible"
                    : "w-full px-4 py-2 tracking-wide font-light text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                }
              >
                S'inscrire
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {iscode && (
        <Password email={email} username={username} />
      )}
    </div>
  );
}

export default Email;

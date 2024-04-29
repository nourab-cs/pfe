import { Formik, Form, Field } from "formik";
import { useState, useCallback } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
function Password({ username, email }) {
  const navigate = useNavigate()
  const [PASSWORD_REGEX] = useState(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
  );
  const [passwordSchema] = useState(
    Yup.object().shape({
      password: Yup.string()
        .required("Please enter a password")
        .min(8, "Password must have at least 8 characters")
        .matches(
          PASSWORD_REGEX,
          "Use upper and lower case characters, digits and special character"
        ),
      confirm: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    })
  );
  const handleRegister = useCallback(async (username, email, password) => {
    try {
      const { register } = await import("../../../services/aut.services");
      const res = await register(username, email, password);
      console.log(res);
      
      toast.success(`Welcome${""}`);
      navigate("/login")
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }, []);

  return (
    <div>
      {" "}
      <Formik
        initialValues={{
          password: "",
          confirm: "",
        }}
        validationSchema={passwordSchema}
        onSubmit={async (values) => {
          await handleRegister(username, email, values.password);
          
        }}
      >
        {({ errors, touched }) => (
          <Form className="mt-6 mx-auto max-w-[24rem] text-center">
            <div className="mb-2">
              <label
                htmlFor="password"
              >
                 <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
              </label>
              <Field
                type="password"
                className=" block w-full px-4 py-2 mt-2  placeholder:opacity-100  rounded-md focus:border-t-primary border-t-blue-gray-200 "
                name="password"
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label
                htmlFor="confirm"
              >
                  <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >Confirm
              </Typography>
              </label>
              <Field
                type="password"
                className=" block w-full px-4 py-2 mt-2  placeholder:opacity-100  rounded-md focus:border-t-primary border-t-blue-gray-200 "
                name="confirm"
              />
              {errors.confirm && touched.confirm ? (
                <div>{errors.confirm}</div>
              ) : null}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                name="submit"
                className={
                  "w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                }
              >
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Password;
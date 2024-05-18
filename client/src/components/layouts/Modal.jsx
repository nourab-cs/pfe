import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { assignRole } from "../../services/admin.services";

export default function Modal({ setOpenModal, user }) {
  console.log(user);
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModal(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div>
              <Formik
                initialValues={{
                  email: user?.email,
                  username: user?.username,
                  role: user?.role,
                }}
                //   validationSchema={schema}
                onSubmit={(values) => {
                  assignRole(user._id, values.role).then(res=>console.log(res)).catch(err=>console.log(err))
                }}
              >
                {({ errors, touched }) => (
                  <Form className="mt-6">
                    <div className="mb-2">
                      <label
                        htmlFor="username"
                        className="block text-sm font-semibold text-gray-800"
                      >
                        username
                      </label>
                      <Field
                        type="username"
                        className="block opacity-70 w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        name="username"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-800"
                      >
                        Email address
                      </label>
                      <Field
                        className="block opacity-70 w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        name="email"
                        value={user.email}
                      />
                    </div>
                    <div className="">
                      {/* <select >
                <option>ReactJS Dropdown</option>
                <option>Laravel 9 with React</option>
                <option>React with Tailwind CSS</option>
                <option>React With Headless UI</option>
            </select> */}
                    </div>

                    <div className="flex flex-col mb-4">
                      <label
                        htmlFor="dropdown"
                        className="mb-2 text-sm font-medium"
                      >
                        Select an option:
                      </label>
                      <Field
                         component="select"
                         id="role"
                         name="role"
                        as="select"
                      
                        className="border bg-white border-gray-300 rounded-md px-3 py-2 focus:outline-none "
                      >
                        <option value="">{user.role}</option>
                        {["recruter", "admin", "mod"].map((e, i) => {
                          return <option value={e}>{e}</option>;
                        })}
                      </Field>
                    </div>
                    <div className="mt-6">
                      <button
                        type="submit"
                        name="submit"
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                      >
                        Save{" "}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

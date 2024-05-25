// // import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
// // import * as Yup from "yup";
// // import { axiosClient } from "../../services/axiosClient";

// // const QuizForm = () => {
// //   const initialValues = {
// //     name: "",
// //     questions: [
// //       {
// //         question: "",
// //         options: ["", "", "", ""],
// //         answer: "",
// //       },
// //     ],
// //   };

// //   const validationSchema = Yup.object().shape({
// //     name: Yup.string().required("Quiz name is required"),
// //     questions: Yup.array().of(
// //       Yup.object().shape({
// //         question: Yup.string().required("Question is required"),
// //         options: Yup.array()
// //           .of(Yup.string().required("Option is required"))
// //           .min(3, "At least four options are required"),
// //         answer: Yup.string().required("Answer is required"),
// //       })
// //     ),
// //   });

// //   const handleSubmit = (values) => {
// //     axiosClient
// //       .post("/quiz/create", values)
// //       .then((res) => {
// //         console.log(res.data);
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });
// //   };

// //   return (
// //     <div className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
// //       <h1 className="text-3xl font-bold mb-6">Create Quiz</h1>
// //       <Formik
// //         initialValues={initialValues}
// //         validationSchema={validationSchema}
// //         onSubmit={handleSubmit}
// //       >
// //         {({ values }) => (
// //           <Form>
// //             <Field
// //               type="text"
// //               name="name"
// //               placeholder="Quiz Name"
// //               className="w-full border-2 border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
// //             />
// //             <ErrorMessage name="name" className="text-red-500" />

// //             <FieldArray name="questions">
// //               {({ insert, remove, push }) => (
// //                 <div>
// //                   {values.questions.map((question, index) => (
// //                     <div key={index} className="mb-6">
// //                       <Field
// //                         type="text"
// //                         name={`questions.${index}.question`}
// //                         placeholder="Question"
// //                         className="w-full border-2 border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:border-blue-500"
// //                       />
// //                       <ErrorMessage
// //                         name={`questions.${index}.question`}
// //                         className="text-red-500"
// //                       />

// //                       <FieldArray name={`questions.${index}.options`}>
// //                         {({ push: pushOptions }) => (
// //                           <div>
// //                             {question.options.map((option, optionIndex) => (
// //                               <div key={optionIndex} className="flex items-center mb-2">
// //                                 <Field
// //                                   type="text"
// //                                   name={`questions.${index}.options.${optionIndex}`}
// //                                   placeholder={`Option ${optionIndex + 1}`}
// //                                   className="w-full border-2 border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
// //                                 />
// //                               </div>
// //                             ))}
// //                           </div>
// //                         )}
// //                       </FieldArray>

// //                       <Field

// //                         as="select"
// //                         name={`questions.${index}.answer`}
// //                         className="w-full border-2 border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:border-blue-500"
// //                       >
// //                           <option value="" disabled selected>Select the correct answer</option>

// //                         {question.options.map((option, optionIndex) => (
// //                           <option key={optionIndex} value={option}>
// //                             {option}
// //                           </option>
// //                         ))}
// //                       </Field>
// //                       <ErrorMessage
// //                         name={`questions.${index}.answer`}
// //                         className="text-red-500"
// //                       />

// // <button
// //   type="button"
// //   onClick={() => remove(index)}
// //   className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150"
// // >
  
// //   Remove Question
// // </button>
// //                     </div>
// //                   ))}
// //                   <button
// //                     type="button"
// //                     onClick={() =>
// //                       push({
// //                         question: "",
// //                         options: ["", "", "", ""],
// //                         answer: "",
// //                       })
// //                     }
// //                     className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
// //                   >
// //                     Add Question
// //                   </button>
// //                 </div>
// //               )}
// //             </FieldArray>

// //             <button
// //               type="submit"
// //               className="bg-green-500 text-white py-2 px-4 mt-6 rounded hover:bg-green-600"
// //             >
// //               Submit
// //             </button>
            
// //           </Form>
// //         )}
// //       </Formik>
// //     </div>
// //   );
// // };

// // export default QuizForm;
// import React from "react";
// import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
// import * as Yup from "yup";
// import { Button, Input } from '@nextui-org/react';
// import { Select, SelectItem } from "@nextui-org/select";
// import { axiosClient } from "../../services/axiosClient";

// const QuizForm = () => {
//   const initialValues = {
//     name: "",
//     questions: [
//       {
//         question: "",
//         options: ["", "", "", ""],
//         answer: "",
//       },
//     ],
//   };

//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required("Quiz name is required"),
//     questions: Yup.array().of(
//       Yup.object().shape({
//         question: Yup.string().required("Question is required"),
//         options: Yup.array()
//           .of(Yup.string().required("Option is required"))
//           .min(3, "At least four options are required"),
//         answer: Yup.string().required("Answer is required"),
//       })
//     ),
//   });

//   const handleSubmit = (values) => {
//     axiosClient
//       .post("/quiz/create", values)
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold mb-6 ">Ajouter un test</h1>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ values }) => (
//           <Form>
//             <Field
//               as={Input}
//               type="text"
//               name="name"
//               placeholder="Quiz Name"
//               className="w-full mb-4"
//             />
//             <ErrorMessage name="name" className="text-red-500" />

//             <FieldArray name="questions">
//               {({ insert, remove, push }) => (
//                 <div>
//                   {values.questions.map((question, index) => (
//                     <div key={index} className="mb-6">
//                       <Field
//                         as={Input}
//                         type="text"
//                         name={`questions.${index}.question`}
//                         placeholder="Question"
//                         className="w-full mb-2"
//                       />
//                       <ErrorMessage
//                         name={`questions.${index}.question`}
//                         className="text-red-500"
//                       />

//                       <FieldArray name={`questions.${index}.options`}>
//                         {({ push: pushOptions }) => (
//                           <div>
//                             {question.options.map((option, optionIndex) => (
//                               <div key={optionIndex} className="flex items-center mb-2">
//                                 <Field
//                                   as={Input}
//                                   type="text"
//                                   name={`questions.${index}.options.${optionIndex}`}
//                                   placeholder={`Option ${optionIndex + 1}`}
//                                   className="w-full mr-2"
//                                 />
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </FieldArray>

//                       <Field
//                         as={Select}
//                         name={`questions.${index}.answer`}
//                         className="w-full mb-2"
//                         aria-label="Select the correct answer"
//                       >
//                         <SelectItem value="" disabled selected>
//                           Select the correct answer
//                         </SelectItem>
//                         {question.options.map((option, optionIndex) => (
//                           <SelectItem key={optionIndex} value={option}>
//                             {option}
//                           </SelectItem>
//                         ))}
//                       </Field>
//                       <ErrorMessage
//                         name={`questions.${index}.answer`}
//                         className="text-red-500"
//                       />

//                       <Button
//                         variant="error"
//                         onClick={() => remove(index)}
//                         className="inline-flex items-center text-sm rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150"
//                       >
//                         Remove Question
//                       </Button>
//                     </div>
//                   ))}
//                   <Button
//                     variant="primary"
//                     onClick={() =>
//                       push({
//                         question: "",
//                         options: ["", "", "", ""],
//                         answer: "",
//                       })
//                     }
//                     className="mb-4"
//                   >
//                     Add Question
//                   </Button>
//                 </div>
//               )}
//             </FieldArray>

//             <Button
//               type="submit"
//               className="mt-6"
//             >
//               Submit
//             </Button>
            
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default QuizForm;

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { Button, Input } from '@nextui-org/react';
import { Select, SelectItem } from "@nextui-org/select";
import { axiosClient } from "../../services/axiosClient";

const QuizForm = () => {
  const initialValues = {
    name: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Le nom du quiz est requis"),
    questions: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("La question est requise"),
        options: Yup.array()
          .of(Yup.string().required("L'option est requise"))
          .min(3, "Au moins quatre options sont requises"),
        answer: Yup.string().required("La réponse est requise"),
      })
    ),
  });

  const handleSubmit = (values) => {
    axiosClient
      .post("/quiz/create", values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Ajouter un test</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <Field
              as={Input}
              type="text"
              name="name"
              placeholder="Nom du quiz"
              className="w-full mb-4"
            />
            <ErrorMessage name="name" className="text-red-500" />

            <FieldArray name="questions">
              {({ insert, remove, push }) => (
                <div>
                  {values.questions.map((question, index) => (
                    <div key={index} className="mb-6">
                      <Field
                        as={Input}
                        type="text"
                        name={`questions.${index}.question`}
                        placeholder="Question"
                        className="w-full mb-2"
                      />
                      <ErrorMessage
                        name={`questions.${index}.question`}
                        className="text-red-500"
                      />

                      <FieldArray name={`questions.${index}.options`}>
                        {({ push: pushOptions }) => (
                          <div>
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center mb-2">
                                <Field
                                  as={Input}
                                  type="text"
                                  name={`questions.${index}.options.${optionIndex}`}
                                  placeholder={`Option ${optionIndex + 1}`}
                                  className="w-full mr-2"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </FieldArray>

                      <Field
                        as={Select}
                        name={`questions.${index}.answer`}
                        className="w-full mb-2"
                        aria-label="Sélectionner la bonne réponse"
                        placeholder="Sélectionner la bonne réponse"
                      >
                        <SelectItem value="" disabled selected>
                          Sélectionner la bonne réponse
                        </SelectItem>
                        {question.options.map((option, optionIndex) => (
                          <SelectItem key={optionIndex} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </Field>
                      <ErrorMessage
                        name={`questions.${index}.answer`}
                        className="text-red-500"
                      />

                      <Button
color="danger" variant="solid"                        onClick={() => remove(index)}
                      >
                        Supprimer la question
                      </Button>
                    </div>
                  ))}
                  <Button
color="primary" variant="solid"                    onClick={() =>
                      push({
                        question: "",
                        options: ["", "", "", ""],
                        answer: "",
                      })
                    }
                    className="mb-4"
                  >
                    Ajouter une question
                  </Button>
                </div>
              )}
            </FieldArray>

            <Button
            color="primary" variant="solid"
              type="submit"
            >
              Soumettre
            </Button>
            
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default QuizForm;


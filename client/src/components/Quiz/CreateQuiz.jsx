import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
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
    name: Yup.string().required("Quiz name is required"),
    questions: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("Question is required"),
        options: Yup.array()
          .of(Yup.string().required("Option is required"))
          .min(4, "At least four options are required"),
        answer: Yup.string().required("Answer is required"),
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
    <div className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Create Quiz</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <Field
              type="text"
              name="name"
              placeholder="Quiz Name"
              className="w-full border-2 border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage name="name" className="text-red-500" />

            <FieldArray name="questions">
              {({ insert, remove, push }) => (
                <div>
                  {values.questions.map((question, index) => (
                    <div key={index} className="mb-6">
                      <Field
                        type="text"
                        name={`questions.${index}.question`}
                        placeholder="Question"
                        className="w-full border-2 border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:border-blue-500"
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
                                  type="text"
                                  name={`questions.${index}.options.${optionIndex}`}
                                  placeholder={`Option ${optionIndex + 1}`}
                                  className="w-full border-2 border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </FieldArray>

                      <Field

                        as="select"
                        name={`questions.${index}.answer`}
                        className="w-full border-2 border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:border-blue-500"
                      >
                          <option value="" disabled selected>Select the correct answer</option>

                        {question.options.map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name={`questions.${index}.answer`}
                        className="text-red-500"
                      />

<button
  type="button"
  onClick={() => remove(index)}
  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150"
>
  
  Remove Question
</button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        question: "",
                        options: ["", "", "", ""],
                        answer: "",
                      })
                    }
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Add Question
                  </button>
                </div>
              )}
            </FieldArray>

            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 mt-6 rounded hover:bg-green-600"
            >
              Submit
            </button>
            
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default QuizForm;

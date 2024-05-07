import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { axiosClient } from "../../services/axiosClient";

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

const QuizForm = () => {
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
    <div>
      <h1>Create Quiz</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <Field type="text" name="name" placeholder="Quiz Name" />
            <ErrorMessage name="name" />

            <FieldArray name="questions">
              {({ insert, remove, push }) => (
                <div>
                  {values.questions.length > 0 &&
                    values.questions.map((question, index) => (
                      <div key={index}>
                        <Field
                          type="text"
                          name={`questions.${index}.question`}
                          placeholder="Question"
                        />
                        <ErrorMessage name={`questions.${index}.question`} />

                        <FieldArray name={`questions.${index}.options`}>
                          {({ push: pushOptions }) => (
                            <div>
                              {question.options.length > 0 &&
                                question.options.map((option, optionIndex) => (
                                  <div key={optionIndex}>
                                    <Field
                                      type="text"
                                      name={`questions.${index}.options.${optionIndex}`}
                                      placeholder={`Option ${optionIndex + 1}`}
                                    />
                                    <ErrorMessage
                                      name={`questions.${index}.options.${optionIndex}`}
                                    />
                                  </div>
                                ))}
                            </div>
                          )}
                        </FieldArray>

                        <Field
                          as="select"
                          name={`questions.${index}.answer`}
                          placeholder="Answer"
                        >
                          {question.options.map((option, optionIndex) => (
                            <option key={optionIndex} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name={`questions.${index}.answer`} />

                        <button type="button" onClick={() => remove(index)}>
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
                  >
                    Add Question
                  </button>
                </div>
              )}
            </FieldArray>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default QuizForm;

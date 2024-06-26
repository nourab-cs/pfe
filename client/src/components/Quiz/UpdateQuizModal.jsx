import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { axiosClient } from "../../services/axiosClient";
import { Button, Modal, ModalContent } from "@nextui-org/react";
import toast from "react-hot-toast";

// Validation schema
const validationSchema = Yup.object().shape({
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required"),
      options: Yup.array()
        .of(Yup.string().required("Option is required"))
        .min(4, "At least four options are required"),
      answer: Yup.string().required("Answer is required"),
    })
  )
});

function UpdateQuizModal  ({ isOpen, onOpenChange, quiz }) {
  const handleSubmit = (values, { setSubmitting }) => {
    axiosClient
      .put(`/quiz/update/${quiz._id}/questions`, values)
      .then((res) => {
        toast.success("Quiz updated successfully");
        onOpenChange(false);
      })
      .catch((err) => {
        console.error("Error updating quiz", err);
        toast.error("Error updating quiz");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
      <ModalContent>
        {quiz ? (
          <Formik
            initialValues={quiz}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <FieldArray name="questions">
                  {({ push, remove }) => (
                    <div>
                      {values.questions.map((question, index) => (
                        <div key={index} className="mb-6">
                          <Field
                            type="text"
                            name={`questions.${index}.question`}
                            placeholder="Question"
                            className="form-control mb-2"
                          />
                          <ErrorMessage
                            name={`questions.${index}.question`}
                            component="div"
                            className="text-danger"
                          />

                          <FieldArray name={`questions.${index}.options`}>
                            {() => (
                              <div>
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="mb-2">
                                    <Field
                                      type="text"
                                      name={`questions.${index}.options.${optionIndex}`}
                                      placeholder={`Option ${optionIndex + 1}`}
                                      className="form-control"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </FieldArray>

                          <Field
                            as="select"
                            name={`questions.${index}.answer`}
                            className="form-control mb-2"
                          >
                            <option value="" disabled>
                              Select the correct answer
                            </option>
                            {question.options.map((option, optionIndex) => (
                              <option key={optionIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name={`questions.${index}.answer`}
                            component="div"
                            className="text-danger"
                          />

                          <Button
                            variant="danger"
                            onClick={() => remove(index)}
                            className="mb-2"
                          >
                            Remove Question
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="primary"
                        onClick={() =>
                          push({
                            question: "",
                            options: ["", "", "", ""],
                            answer: "",
                          })
                        }
                      >
                        Add Question
                      </Button>
                    </div>
                  )}
                </FieldArray>
                <Button type="submit" className="mt-3">
                  Update Quiz
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <div>Loading...</div>
        )}
      </ModalContent>
    </Modal>
  );
}

export default UpdateQuizModal;

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { axiosClient } from "../../services/axiosClient";
import { Button, ButtonGroup, Modal, ModalContent,Input,ModalHeader,ModalFooter } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
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
        toast.success("Le test est modifié avec succés");
        onOpenChange(false);
      })
      .catch((err) => {
        console.error("Error updating quiz", err);
        toast.error("Error updating quiz");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">

    <Modal isOpen={isOpen} onOpenChange={onOpenChange}     size="xl">
      <ModalContent>
      <ModalHeader className="flex flex-col gap-1">
                Modifier le test 
              </ModalHeader>
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
                          as={Input}
                            type="text"
                            name={`questions.${index}.question`}
                            placeholder="Question"
                            className="form-control mb-2"
                          />
                          <ErrorMessage
                            name={`questions.${index}.question`}
                            component="div"
                            className="text-primary"
                          />

                          <FieldArray name={`questions.${index}.options`}>
                            {() => (
                              <div>
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="mb-2">
                                    <Field
                                     as={Input}
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

                            as={Select}
                            name={`questions.${index}.answer`}
                            className="form-control mb-2"
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
                            component="div"
                            className="text-danger"
                          />
<ButtonGroup>
                          <Button
                           
                            onClick={() => remove(index)}
                            
                          >
                            Supprimer la question
                          </Button>
                      
                      <Button
                       
                        onClick={() =>
                          push({
                            question: "",
                            options: ["", "", "", ""],
                            answer: "",
                          })
                        }
                      >
                        Ajouter une question
                      </Button>
                      </ButtonGroup>
                      </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
                <ModalFooter>
                <div className="flex justify-end mt-3">
        <Button color="primary" variant="solid" type="submit">
         Modifier
        </Button>

      </div>
      </ModalFooter>
              </Form>
            )}
          </Formik>
        ) : (
          <div>Loading...</div>
        )}
      </ModalContent>
    </Modal>
    </div>
  );
}

export default UpdateQuizModal;

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";


function CreateOffre() {
    return (
        <div>
            <Formik
                initialValues={{
                    subject: "",
                    description: "",
                    tech: [],
                    places: 0,
                    duration: ""
                }}
                validationSchema={Yup.object().shape({
                    subject: Yup.string().required("Subject is required"),
                    description: Yup.string().required("Description is required"),
                    tech: Yup.array().required("At least one tech is required"),
                    places: Yup.number().required("Number of places is required").positive("Number of places must be positive"),
                    duration: Yup.string().required("Duration is required")
                })}
                onSubmit={(values) => {
                    import("../../services/offre.service").then(module => {
                        module.createOfffre(values).then(res => console.log(res)).catch(err => {
                            console.log(err);
                        })
                    })

                }}
            >

                {({ errors, touched, values }) => (


                    <Form className="mt-6">
                        <div className="mb-2">
                            <label htmlFor="subject" className="block text-sm font-semibold text-gray-800">
                                Subject
                            </label>
                            <Field
                                type="text"
                                className="opacity-70 block w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                name="subject"
                            />
                            <ErrorMessage name="subject" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-800">
                                Description
                            </label>
                            <Field
                                type="text"
                                className="block opacity-70 w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                name="description"
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500" />
                        </div>
                        <FieldArray
                            name="tech"
                            render={arrayHelpers => (
                                <div>
                                    {values.tech && values.tech.length > 0 ? (
                                        values.tech.map((friend, index) => (
                                            <div key={index}>
                                                <Field name={`tech.${index}`} disabled={index != 0} />
                                                {index == 0 && <>  <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                >
                                                    -
                                                </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                                    >
                                                        +
                                                    </button>

                                                </>}

                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.remove(index)} // insert an empty string at a position
                                                >
                                                    delete
                                                </button>
                                            </div>
                                        ))

                                    ) : (
                                        <button type="button" onClick={() => arrayHelpers.push('')}>
                                            {/* show this when user has removed all tech from the list */}
                                            Add a Skill
                                        </button>
                                    )}

                                </div>
                            )}
                        />            <div className="mb-2">
                            <label htmlFor="places" className="block text-sm font-semibold text-gray-800">
                                Number of Places
                            </label>
                            <Field
                                type="number"
                                className="block opacity-70 w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                name="places"
                            />
                            <ErrorMessage name="places" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="duration" className="block text-sm font-semibold text-gray-800">
                                Duration
                            </label>
                            <Field
                                type="number"
                                className="block opacity-70 w-full px-4 py-2 mt-2 text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                name="duration"
                            />
                            <ErrorMessage name="duration" component="div" className="text-red-500" />
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                name="submit"
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CreateOffre;

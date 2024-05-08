import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { useLocation } from "react-router-dom";
import { createcandidature } from "../services/candidature.service";
import { axiosClient } from "../services/axiosClient";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
function CandidatureForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];

  const [data, setData] = useState("");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      setData(reader.result);
    };

    reader.readAsDataURL(file);
  };

  console.log(id);

  const validationSchema = Yup.object().shape({
    qualite: Yup.string().required("Ce champ est requis"),
    cin: Yup.number()
      .typeError("Le CIN doit être un nombre")
      .required("Ce champ est requis")
      .test(
        "len",
        "Le CIN doit avoir exactement 8 chiffres",
        (val) => val && val.toString().length === 8
      ),
    nom: Yup.string().required("Ce champ est requis"),
    prénom: Yup.string().required("Ce champ est requis"),
    datedenaissance: Yup.date().required("Ce champ est requis"),
    sexe: Yup.string().required("Ce champ est requis"),
    telephone: Yup.string().required("Ce champ est requis"),
    region: Yup.string().required("Ce champ est requis"),
    email: Yup.string().email("Email invalide").required("Ce champ est requis"),
    diplome: Yup.string().required("Ce champ est requis"),
    universite: Yup.string().required("Ce champ est requis"),
    domaine: Yup.string().required("Ce champ est requis"),
  });
  return (
    <div
      className="bg-no-repeat bg-contain bg-fixed  p-6 rounded-lg shadow-lg"
      style={{ backgroundImage: `url('images/diversite.jpg')` }}
    >
      <div className="max-w-2xl mx-auto mt-6 p-9 bg-white rounded-lg shadow-lg overflow-y-auto">
        <Formik
          initialValues={{
            qualite: "",
            cin: "",
            nom: "",
            prénom: "",
            datedenaissance: "",
            sexe: "",
            telephone: "",
            region: "",
            email: "",
            diplome: "",
            universite: "",
            domaine: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            values.cv = data;
            values.offer_id = id;
            const v = {
              offre_id: id,
              data: values,
            };
            axiosClient
              .post("/postuler/create", v)
              .then((res) => {
                toast.success("Offre created");
                navigate("/quiz/" + id);
              })
              .catch((error) => {
                console.log(error);
                toast.error("Error");
              });
          }}
        >
          {({ errors, touched }) => (
            <Form encType="multipart/form-data">
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Section 1: Information du candidat
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="qualite"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Qualité
                    </label>
                    <Field
                      as="select"
                      id="qualite"
                      name="qualite"
                      className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Choisir une option</option>
                      <option value="mademoiselle">Mademoiselle</option>
                      <option value="madame">Madame</option>
                      <option value="monsieur">Monsieur</option>
                    </Field>
                    {errors.qualite && touched.qualite ? (
                      <div>{errors.qualite}</div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="cin"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CIN
                    </label>
                    <Field
                      type="numbers "
                      id="cin"
                      name="cin"
                      className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.cin && touched.cin ? <div>{errors.cin}</div> : null}
                  </div>
                  {/* Ajout des champs nom et prenom */}
                  <div>
                    <label
                      htmlFor="nom"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nom
                    </label>
                    <Field
                      type="text"
                      id="nom"
                      name="nom"
                      className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.nom && touched.nom ? <div>{errors.nom}</div> : null}
                  </div>
                  <div>
                    <label
                      htmlFor="prenom"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Prénom
                    </label>
                    <Field
                      type="text"
                      id="prénom"
                      name="prénom"
                      className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.prénom && touched.prénom ? (
                      <div>{errors.prénom}</div>
                    ) : null}
                  </div>
                  {/* Fin ajout des champs nom et prenom */}

                  <div>
                    <label
                      htmlFor="datedenaissance"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date de naissance
                    </label>
                    <Field
                      type="date"
                      id="datedenaissance"
                      name="datedenaissance"
                      className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.datedenaissance && touched.datedenaissance ? (
                      <div>{errors.datedenaissance}</div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="sexe"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Sexe
                    </label>
                    <Field
                      as="select"
                      id="sexe"
                      name="sexe"
                      className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {errors.sexe && touched.sexe ? (
                        <div>{errors.sexe}</div>
                      ) : null}
                      <option value="">Choisir une option</option>
                      <option value="masculin">Masculin</option>
                      <option value="féminin">Féminin</option>
                    </Field>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Section 2: Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="telephone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Téléphone personnel
                    </label>
                    <Field
                      type="tel"
                      id="telephone"
                      name="telephone"
                      className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.telephone && touched.telephone ? (
                      <div>{errors.telephone}</div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Région/Gouvernorat
                    </label>
                    <Field
                      type="text"
                      id="region"
                      name="region"
                      className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.region && touched.region ? (
                      <div>{errors.region}</div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
                    ) : null}
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Section 3: Formation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="diplome"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Diplôme
                    </label>
                    <Field
                      type="text"
                      id="diplome"
                      name="diplome"
                      className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.diplome && touched.diplome ? (
                      <div>{errors.diplome}</div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="universite"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Université
                    </label>
                    <Field
                      type="text"
                      id="universite"
                      name="universite"
                      className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.universite && touched.universite ? (
                      <div>{errors.universite}</div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="domaine"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Domaine
                    </label>
                    <Field
                      type="text"
                      id="domaine"
                      name="domaine"
                      className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.domaine && touched.domaine ? (
                      <div>{errors.domaine}</div>
                    ) : null}
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Section 4: Pièces jointes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="cv"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CV (PDF)
                    </label>
                    <input
                      required={true}
                      onChange={handleFileInputChange}
                      type="file"
                      id="cv"
                      name="cv"
                      accept=".pdf"
                      className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </section>

              <div className="mt-6">
                <button
                  type="submit"
                  name="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                >
                  Soumettre
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CandidatureForm;

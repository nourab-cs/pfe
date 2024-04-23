import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";


function CandidatureForm({ offreId }) {
  const handleSubmit = async (values) => {
    // Logique de soumission de formulaire ici (par exemple, envoi à une API)
    console.log("Formulaire soumis : ", values);
  };
  const validationSchema = Yup.object().shape({
    qualite: Yup.string().required("Ce champ est requis"),
    cin: Yup.string()
      .matches(/^\d{8}$/, "Le CIN doit avoir exactement 8 chiffres")
      .required("Ce champ est requis"),
    nom: Yup.string().required("Ce champ est requis"),
    prenom: Yup.string().required("Ce champ est requis"),
    dateNaissance: Yup.date().required("Ce champ est requis"),
    sexe: Yup.string().required("Ce champ est requis"),
    telephone: Yup.string().required("Ce champ est requis"),
    region: Yup.string().required("Ce champ est requis"),
    email: Yup.string().email("Email invalide").required("Ce champ est requis"),
    diplome: Yup.string().required("Ce champ est requis"),
    universite: Yup.string().required("Ce champ est requis"),
    domaine: Yup.string().required("Ce champ est requis"),
  });
  return (
    <div className="bg-no-repeat bg-contain bg-fixed  p-6 rounded-lg shadow-lg" style={{ backgroundImage: `url('images/diversite.jpg')` }}>

    <div className="max-w-2xl mx-auto mt-6 p-9 bg-white rounded-lg shadow-lg overflow-y-auto">
      <Formik
      
        initialValues={{
            
          qualite: "",
          cin: "",
          nom: "",
          prenom: "",
          dateNaissance: "",
          sexe: "",
          telephone: "",
          region: "",
          email: "",
          diplome: "",
          universite: "",
          domaine: "",
          cv: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Section 1: Information du candidat</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="qualite" className="block text-sm font-medium text-gray-700">
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
                </div>
                <div>
                  <label htmlFor="cin" className="block text-sm font-medium text-gray-700">
                    CIN
                  </label>
                  <Field
                    type="text"
                    id="cin"
                    name="cin"
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  
                  />
                  
                  
                  
                </div>
                {/* Ajout des champs nom et prenom */}
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <Field
                    type="text"
                    id="nom"
                    name="nom"
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                    Prénom
                  </label>
                  <Field
                    type="text"
                    id="prenom"
                    name="prenom"
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Fin ajout des champs nom et prenom */}
               
                <div>
                  <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700">
                    Date de naissance
                  </label>
                  <Field
                    type="date"
                    id="dateNaissance"
                    name="dateNaissance"
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="sexe" className="block text-sm font-medium text-gray-700">
                    Sexe
                  </label>
                  <Field
                    as="select"
                    id="sexe"
                    name="sexe"
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Choisir une option</option>
                    <option value="masculin">Masculin</option>
                    <option value="féminin">Féminin</option>
                  </Field>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Section 2: Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                    Téléphone personnel
                  </label>
                  <Field
                    type="tel"
                    id="telephone"
                    name="telephone"
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                    Région/Gouvernorat
                  </label>
                  <Field
                    type="text"
                    id="region"
                    name="region"
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Section 3: Formation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="diplome" className="block text-sm font-medium text-gray-700">
                    Diplôme
                  </label>
                  <Field
                    type="text"
                    id="diplome"
                    name="diplome"
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="universite" className="block text-sm font-medium text-gray-700">
                    Université
                  </label>
                  <Field
                    type="text"
                    id="universite"
                    name="universite"
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="domaine" className="block text-sm font-medium text-gray-700">
                    Domaine
                  </label>
                  <Field
                    type="text"
                    id="domaine"
                    name="domaine"
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Section 4: Pièces jointes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cv" className="block text-sm font-medium text-gray-700">
                    CV (PDF)
                  </label>
                  <Field
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

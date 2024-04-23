import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CreerOffre = () => {
  const sitesDisponibles = [
    { id: 'site1', nom: 'Site 1' },
    { id: 'site2', nom: 'Site 2' },
    { id: 'site3', nom: 'Site 3' },
  ];
  const validationSchema = Yup.object().shape({
    lieu: Yup.string().required('Le lieu est requis'),
    titre: Yup.string().required('Le titre est requis'),
    description: Yup.string().required('La description est requise'),
    responsabilites: Yup.string().required('Les responsabilités sont requises'),
    qualifications: Yup.string().required('Les qualifications sont requises'),
    dureeStage: Yup.number().required('La durée de stage est requise').positive('La durée de stage doit être positive'),
    nombreStagiaires: Yup.number().required('Le nombre de stagiaires est requis').positive('Le nombre de stagiaires doit être positif'),
    competences: Yup.string().required('Les compétences sont requises'),
    dateLimite: Yup.date().required('La date limite est requise').min(new Date(), 'La date limite doit être ultérieure à aujourd\'hui'),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/offres/creer', values);
      console.log(response.data);
      // Ajouter une logique de redirection ou un message de succès ici
    } catch (err) {
      console.error(err);
      // Afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Créer une nouvelle offre</h2>
      <Formik
        initialValues={{
          lieu: '', 
          titre: '',
          description: '',
          responsabilites: '',
          qualifications: '',
          dureeStage: '',
          nombreStagiaires: 0,
          competences: '',
          dateLimite: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
                Titre
              </label>
              <Field
                id="titre"
                name="titre"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="titre" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Field
                id="description"
                name="description"
                type="text"
                as="textarea"
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="responsabilites" className="block text-sm font-medium text-gray-700">
                Profil
              </label>
              <Field
                id="profil"
                name="profil"
                type="text"
                as="textarea"
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="responsabilites" component="div" className="text-red-600 text-sm" />
            </div>
            
              <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Lieu
              </label>
              <Field
                as="select"
                id="lieu"
                name="lieu"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Choisissez le lieu</option>
                {sitesDisponibles.map(site => (
                  <option key={site.id} value={site.id}>{site.nom}</option>
                ))}
              </Field>
              <ErrorMessage name="lieu" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
             
            <label htmlFor="dureeStage" className="block text-sm font-medium text-gray-700">
                Durée de stage (en mois)
              </label>
              <Field
                id="dureeStage"
                name="dureeStage"
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="dureeStage" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="nombreStagiaires" className="block text-sm font-medium text-gray-700">
                Nombre de stagiaires demandés
              </label>
              <Field
                id="nombreStagiaires"
                name="nombreStagiaires"
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="nombreStagiaires" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="competences" className="block text-sm font-medium text-gray-700">
                Compétences requises
              </label>
              <Field
                id="competences"
                name="competences"
                type="text"
                as="textarea"
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="competences" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="dateLimite" className="block text-sm font-medium text-gray-700">
                Date limite de soumission de candidature
              </label>
              <Field
                id="dateLimite"
                name="dateLimite"
                type="date"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="dateLimite" component="div" className="text-red-600 text-sm" />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Créer
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreerOffre;

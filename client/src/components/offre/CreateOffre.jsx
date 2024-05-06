import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createOfffre } from "../../services/offre.service";
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
const CreerOffre = () => {
  const navigate = useNavigate()
  const sitesDisponibles = [
    { id: 'site1', nom: 'Site 1' },
    { id: 'site2', nom: 'Site 2' },
    { id: 'site3', nom: 'Site 3' },
  ];
  const domainesDisponible = [
    { id: 'domaine1', nom: 'Domaine 1' },
    { id: 'domaine2', nom: 'Domaine 2' },
    { id: 'domaine3', nom: 'Domaine 3' },
  ];
  const validationSchema = Yup.object().shape({
    lieu: Yup.string().required('Le lieu est requis'),
    titre: Yup.string().required('Le titre est requis'),
    mission: Yup.string().required('La mission est requise'),
    domaine: Yup.string().required('Le domaine est requis'),
    profil: Yup.string().required('Le profil est requises'),
    dureeStage: Yup.number().required('La durée de stage est requise').positive('La durée de stage doit être positive'),
    nombreStagiaires: Yup.number().required('Le nombre de stagiaires est requis').positive('Le nombre de stagiaires doit être positif'),
    competences: Yup.string().required('Les compétences sont requises'),
    dateLimite: Yup.date().required('La date limite est requise').min(new Date(), 'La date limite doit être ultérieure à aujourd\'hui'),
  });



  return (


    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Créer une nouvelle offre</h2>
      <Formik
        initialValues={{
          lieu: '',
          titre: '',
          description: '',
          profil: '',
          dureeStage: '',
          nombreStagiaires: 0,
          domaine: '',
          mission: '',
          competences: '',
          dateLimite: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {


          createOfffre(values).then(res => {
            toast.success("Offre created")
            navigate("/alloffres")
          }).catch(error => {
            console.log(error);
            toast.error("Error")
          })


        }}
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
              <label htmlFor="mission" className="block text-sm font-medium text-gray-700">
                Mission
              </label>
              <Field
                id="mission"
                name="mission"
                type="text"
                as="textarea"
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="mission" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="doamine" className="block text-sm font-medium text-gray-700">
                Domaine
              </label>
              <Field
                as="select"
                id="doamine"
                name="domaine"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Choisissez le domaine</option>
                {domainesDisponible.map(domaine => (
                  <option key={domaine.id} value={domaine.id}>{domaine.nom}</option>
                ))}
              </Field>
              <ErrorMessage name="lieu" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="profil" className="block text-sm font-medium text-gray-700">
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
              <ErrorMessage name="profil" component="div" className="text-red-600 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="lieu" className="block text-sm font-medium text-gray-700">
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
              name="submit"

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

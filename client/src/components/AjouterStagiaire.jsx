import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ajouterStagiaire } from '../services/stagiaire.service';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AjouterStagiaire = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    nom: Yup.string().required('Le nom est requis'),
    prenom: Yup.string().required('Le prénom est requis'),
    email: Yup.string().required('L\'email est requis').email('L\'email n\'est pas valide'),
    telephone: Yup.string().required('Le téléphone est requis'),
    universite: Yup.string().required('L\'université est requise'),
    specialite: Yup.string().required('La spécialité est requise'),
    dateDebut: Yup.date().required('La date de début est requise'),
    dateFin: Yup.date().required('La date de fin est requise'),
  });

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Ajouter un Stagiaire</h2>
      <Formik
        initialValues={{
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          universite: '',
          specialite: '',
          dateDebut: '',
          dateFin: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          
             ajouterStagiaire(values).then(res => {
                console.log(res.data);
            toast.success("Stagiaire ajouté avec succès");
            navigate("/admin/stagiaires-list");
        }).catch(error => {
            console.log(error);
            toast.error("Error")
          })
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
              <Field
                id="nom"
                name="nom"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="nom" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom</label>
              <Field
                id="prenom"
                name="prenom"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="prenom" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Téléphone</label>
              <Field
                id="telephone"
                name="telephone"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="telephone" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="universite" className="block text-sm font-medium text-gray-700">Université</label>
              <Field
                id="universite"
                name="universite"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="universite" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="specialite" className="block text-sm font-medium text-gray-700">Spécialité</label>
              <Field
                id="specialite"
                name="specialite"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="specialite" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">Date de début</label>
              <Field
                id="dateDebut"
                name="dateDebut"
                type="date"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="dateDebut" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">Date de fin</label>
              <Field
                id="dateFin"
                name="dateFin"
                type="date"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="dateFin" component="div" className="text-red-600 text-sm" />
            </div>
            <button
              type="submit"
              name="submit"
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Ajouter stagiaire
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AjouterStagiaire;

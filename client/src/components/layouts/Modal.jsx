import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { updateStagiaire } from "../../services/stagiaire.service";
import toast from 'react-hot-toast';

const validationSchema = Yup.object().shape({
    nom: Yup.string().required("Le nom est requis"),
    prenom: Yup.string().required("Le prénom est requis"),
    specialite: Yup.string().required("La spécialité est requise"),
    email: Yup.string().email("Email invalide").required("L'email est requis"),
    telephone: Yup.string().required("Le téléphone est requis"),
    universite: Yup.string().required("L'université est requise"),
    dateDebut: Yup.date().required("La date de début est requise"),
    dateFin: Yup.date().required("La date de fin est requise")
});

export default function StagiaireModal({ setOpenModal, stagiaire }) {
    return (
        <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={() => setOpenModal(false)}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                        <div>
                            <Formik
                                initialValues={{
                                    nom: stagiaire?.nom || '',
                                    prenom: stagiaire?.prenom || '',
                                    specialite: stagiaire?.specialite || '',
                                    email: stagiaire?.email || '',
                                    telephone: stagiaire?.telephone || '',
                                    universite: stagiaire?.universite || '',
                                    dateDebut: stagiaire?.dateDebut ? new Date(stagiaire.dateDebut).toISOString().split('T')[0] : '',
                                    dateFin: stagiaire?.dateFin ? new Date(stagiaire.dateFin).toISOString().split('T')[0] : ''
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    updateStagiaire(stagiaire._id, values)
                                        .then(() => {
                                            toast.success("Stagiaire mis à jour avec succès");
                                            setOpenModal(false);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            toast.error("Erreur lors de la mise à jour du stagiaire");
                                        })
                                        .finally(() => setSubmitting(false));
                                }}
                            >
                                {({ errors, touched }) => (
                                    <Form className="mt-6">
                                        <div className="mb-2">
                                            <label
                                                htmlFor="nom"
                                                className="block text-sm font-semibold text-gray-800"
                                            >
                                                Nom
                                            </label>
                                            <Field
                                                type="text"
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                name="nom"
                                            />
                                            {errors.nom && touched.nom ? (
                                                <div className="text-red-500 text-sm">{errors.nom}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="prenom"
                                                className="block text-sm font-semibold text-gray-800"
                                            >
                                                Prénom
                                            </label>
                                            <Field
                                                type="text"
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                name="prenom"
                                            />
                                            {errors.prenom && touched.prenom ? (
                                                <div className="text-red-500 text-sm">{errors.prenom}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="specialite"
                                                className="block text-sm font-semibold text-gray-800"
                                            >
                                                Spécialité
                                            </label>
                                            <Field
                                                type="text"
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                name="specialite"
                                            />
                                            {errors.specialite && touched.specialite ? (
                                                <div className="text-red-500 text-sm">{errors.specialite}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-semibold text-gray-800"
                                            >
                                                Email
                                            </label>
                                            <Field
                                                type="email"
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                name="email"
                                            />
                                            {errors.email && touched.email ? (
                                                <div className="text-red-500 text-sm">{errors.email}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="telephone"
                                                className="block text-sm font-semibold text-gray-800"
                                            >
                                                Téléphone
                                            </label>
                                            <Field
                                                type="text"
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                name="telephone"
                                            />
                                            {errors.telephone && touched.telephone ? (
                                                <div className="text-red-500 text-sm">{errors.telephone}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="universite"
                                                className="block text-sm font-semibold text-gray-800"
                                            >
                                                Université
                                            </label>
                                            <Field
                                                type="text"
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                name="universite"
                                            />
                                            {errors.universite && touched.universite ? (
                                                <div className="text-red-500 text-sm">{errors.universite}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="dateDebut"
                                                className="block text-sm font-semibold text-gray-800"
                                            >
                                                Date de début
                                            </label>
                                            <Field
                                                type="date"
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                name="dateDebut"
                                            />
                                            {errors.dateDebut && touched.dateDebut ? (
                                                <div className="text-red-500 text-sm">{errors.dateDebut}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="dateFin"
                                                className="block text-sm font-semibold text-gray-800"
                                            >
                                                Date de fin
                                            </label>
                                            <Field
                                                type="date"
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                name="dateFin"
                                            />
                                            {errors.dateFin && touched.dateFin ? (
                                                <div className="text-red-500 text-sm">{errors.dateFin}</div>
                                            ) : null}
                                        </div>
                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                            >
                                                Enregistrer
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

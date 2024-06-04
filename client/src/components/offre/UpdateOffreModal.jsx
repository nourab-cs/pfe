// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { updateOffre } from "../../services/offre.service";
// import toast from 'react-hot-toast';

// const validationSchema = Yup.object().shape({
//     titre: Yup.string().required("Le titre est requis"),
//     lieu: Yup.string().required("Le lieu est requis"),
//     dureeStage: Yup.number().required("La durée du stage est requise"),
//     nombreStagiaires: Yup.number().required("Le nombre de stagiaires est requis"),
//     dateLimite: Yup.date().required("La date limite est requise"),
//     profil: Yup.string().required("Le profil est requis"),
//     mission: Yup.array().of(Yup.string().required("La mission est requise")),
//     competences: Yup.array().of(Yup.string().required("La compétence est requise")),
//     domaine: Yup.string().required("Le domaine est requis")
// });

//  function UpdateOffreModal({ setOpenModal, offer }) {
//     return (
        
//             <div className="fixed inset-0 z-10 overflow-y-auto">
//                 <div
//                     className="fixed inset-0 w-full h-full bg-black opacity-40"
//                     onClick={() => setOpenModal(false)}
//                 ></div>
//                 <div className="flex items-center min-h-screen px-4 py-8">
//                     <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
//                         <div>
                            
//                             <Formik
//                                 initialValues={{
//                                     titre: offer?.titre || '',
//                                     lieu: offer?.lieu || '',
//                                     dureeStage: offer?.dureeStage || '',
//                                     nombreStagiaires: offer?.nombreStagiaires || '',
//                                     dateLimite: offer?.dateLimite ? new Date(offer.dateLimite).toISOString().split('T')[0] : '',
//                                     profil: offer?.profil || '',
//                                     mission: offer?.mission || [''],
//                                     competences: offer?.competences || [''],
//                                     domaine: offer?.domaine || ''
//                                 }}
//                                 validationSchema={validationSchema}
//                                 onSubmit={(values, { setSubmitting }) => {
//                                     updateOffre(offer._id, values)
//                                         .then(() => {
//                                             toast.success("Offre mise à jour avec succès");
//                                             setOpenModal(false);
//                                         })
//                                         .catch((err) => {
//                                             console.log(err);
//                                             toast.error("Erreur lors de la mise à jour de l'offre");
//                                         })
//                                         .finally(() => setSubmitting(false));
//                                 }}
//                             >
//                                 {({ errors, touched }) => (
//                                     <Form className="mt-6">
//                                         <div className="mb-2">
//                                             <label
//                                                 htmlFor="titre"
//                                                 className="block text-sm font-semibold text-gray-800"
//                                             >
//                                                 Titre
//                                             </label>
//                                             <Field
//                                                 type="text"
//                                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                                                 name="titre"
//                                             />
//                                             {errors.titre && touched.titre ? (
//                                                 <div className="text-red-500 text-sm">{errors.titre}</div>
//                                             ) : null}
//                                         </div>
//                                         <div className="mb-2">
//                                             <label
//                                                 htmlFor="lieu"
//                                                 className="block text-sm font-semibold text-gray-800"
//                                             >
//                                                 Lieu
//                                             </label>
//                                             <Field
//                                                 type="text"
//                                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                                                 name="lieu"
//                                             />
//                                             {errors.lieu && touched.lieu ? (
//                                                 <div className="text-red-500 text-sm">{errors.lieu}</div>
//                                             ) : null}
//                                         </div>
//                                         <div className="mb-2">
//                                             <label
//                                                 htmlFor="dureeStage"
//                                                 className="block text-sm font-semibold text-gray-800"
//                                             >
//                                                 Durée du stage (en mois)
//                                             </label>
//                                             <Field
//                                                 type="number"
//                                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                                                 name="dureeStage"
//                                             />
//                                             {errors.dureeStage && touched.dureeStage ? (
//                                                 <div className="text-red-500 text-sm">{errors.dureeStage}</div>
//                                             ) : null}
//                                         </div>
//                                         <div className="mb-2">
//                                             <label
//                                                 htmlFor="nombreStagiaires"
//                                                 className="block text-sm font-semibold text-gray-800"
//                                             >
//                                                 Nombre de stagiaires
//                                             </label>
//                                             <Field
//                                                 type="number"
//                                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                                                 name="nombreStagiaires"
//                                             />
//                                             {errors.nombreStagiaires && touched.nombreStagiaires ? (
//                                                 <div className="text-red-500 text-sm">{errors.nombreStagiaires}</div>
//                                             ) : null}
//                                         </div>
//                                         <div className="mb-2">
//                                             <label
//                                                 htmlFor="dateLimite"
//                                                 className="block text-sm font-semibold text-gray-800"
//                                             >
//                                                 Date limite
//                                             </label>
//                                             <Field
//                                                 type="date"
//                                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                                                 name="dateLimite"
//                                             />
//                                             {errors.dateLimite && touched.dateLimite ? (
//                                                 <div className="text-red-500 text-sm">{errors.dateLimite}</div>
//                                             ) : null}
//                                         </div>
//                                         <div className="mb-2">
//                                             <label
//                                                 htmlFor="profil"
//                                                 className="block text-sm font-semibold text-gray-800"
//                                             >
//                                                 Profil
//                                             </label>
//                                             <Field
//                                                 type="text"
//                                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                                                 name="profil"
//                                             />
//                                             {errors.profil && touched.profil ? (
//                                                 <div className="text-red-500 text-sm">{errors.profil}</div>
//                                             ) : null}
//                                         </div>
//                                         <div className="mb-2">
//                                             <label
//                                                 htmlFor="mission"
//                                                 className="block text-sm font-semibold text-gray-800"
//                                             >
//                                                 Mission
//                                             </label>
//                                             <Field
//                                                 as="textarea"
//                                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                                                 name="mission"
//                                                 rows="3"
//                                             />
//                                             {errors.mission && touched.mission ? (
//                                                 <div className="text-red-500 text-sm">{errors.mission}</div>
//                                             ) : null}
//                                         </div>
//                                         <div className="mb-2">
//                                             <label
//                                                 htmlFor="competences"
//                                                 className="block text-sm font-semibold text-gray-800"
//                                             >
//                                                 Compétences
//                                             </label>
//                                             <Field
//                                                 as="textarea"
//                                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                                                 name="competences"
//                                                 rows="3"
//                                             />
//                                             {errors.competences && touched.competences ? (
//                                                 <div className="text-red-500 text-sm">{errors.competences}</div>
//                                             ) : null}
//                                         </div>
//                                         <div className="mb-2">
//                                             <label
//                                                 htmlFor="domaine"
//                                                 className="block text-sm font-semibold text-gray-800"
//                                             >
//                                                 Domaine
//                                             </label>
//                                             <Field
//                                                 type="text"
//                                                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                                                 name="domaine"
//                                             />
//                                             {errors.domaine && touched.domaine ? (
//                                                 <div className="text-red-500 text-sm">{errors.domaine}</div>
//                                             ) : null}
//                                         </div>
//                                         <div className="mt-6">
//                                             <button
//                                                 type="submit"
//                                                 className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//                                             >
//                                                 Enregistrer
//                                             </button>
//                                         </div>
//                                     </Form>
//                                 )}
//                             </Formik>
//                         </div>
//                     </div>
//                 </div>
//             </div>
       
//     );
// }
// export default UpdateOffreModal;



import { Modal, ModalContent,  ModalBody, ModalFooter, Button, Input, Textarea } from '@nextui-org/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateOffre } from '../../services/offre.service';
import toast from 'react-hot-toast';
import { useOffre } from '../../stores/offreStore';

const validationSchema = Yup.object().shape({
  titre: Yup.string().required('Le titre est requis'),
  lieu: Yup.string().required('Le lieu est requis'),
  dureeStage: Yup.number().required("La durée du stage est requise").positive("La durée du stage doit être un nombre positif"),
  nombreStagiaires: Yup.number().required("Le nombre de stagiaires est requis").positive("Le nombre de stagiaires doit être un nombre positif"),
  dateLimite: Yup.date().required("La date limite est requise"),
  profil: Yup.string().required('Le profil est requis'),
  mission: Yup.array().of(Yup.string().required('La mission est requise')),
  competences: Yup.array().of(Yup.string().required('La compétence est requise')),
  domaine: Yup.string().required('Le domaine est requis'),
});

function UpdateOffreModal({ isOpen, onOpenChange, offer,set,i }) {
  const [offres,setOffres]=useOffre((state)=>[state.Offre,state.setOffre])
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent >
          {(onClose) => (
            <>
              <ModalBody>
                <Formik
                  initialValues={{
                    titre: offer?.titre || '',
                    lieu: offer?.lieu || '',
                    dureeStage: offer?.dureeStage || '',
                    nombreStagiaires: offer?.nombreStagiaires || '',
                    dateLimite: offer?.dateLimite ? new Date(offer.dateLimite).toISOString().split('T')[0] : '',
                    profil: offer?.profil || '',
                    mission: offer?.mission || [''],
                    competences: offer?.competences || [''],
                    domaine: offer?.domaine || ''
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    updateOffre(offer._id, values)
                      .then((res) => {
                        console.log(res);
                          let aux = offres
                          
                          aux.splice(i,1,res.data)
                          setOffres(aux)
                        toast.success("Offre mise à jour avec succès");
                        set(res.data)
                        onClose();
                      })
                      .catch((err) => {
                        console.log(err);
                        toast.error("Erreur lors de la mise à jour de l'offre");
                      })
                      .finally(() => setSubmitting(false));
                  }}
                >
                  {({ errors, touched }) => (
                    <Form id="formik-form">
                      
                        
                          <label htmlFor="titre">Titre</label>
                          <Field as={Input} type="text" name="titre" />
                          <ErrorMessage name="titre" component="div" className="text-red-500 text-sm" />
                          <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="lieu">Lieu</label>
                          <Field as={Input} type="text" name="lieu" />
                          <ErrorMessage name="lieu" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                          <label htmlFor="dureeStage">Durée du stage (en mois)</label>
                          <Field as={Input} type="number" name="dureeStage" />
                          <ErrorMessage name="dureeStage" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                          <label htmlFor="nombreStagiaires">Nombre de stagiaires</label>
                          <Field as={Input} type="number" name="nombreStagiaires" />
                          <ErrorMessage name="nombreStagiaires" component="div" className="text-red-500 text-sm" />
                        </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="dateLimite">Date limite</label>
                          <Field as={Input} type="date" name="dateLimite" />
                          <ErrorMessage name="dateLimite" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                        <label htmlFor="domaine">Domaine</label>
                          <Field as={Input} type="text" name="domaine" />
                          <ErrorMessage name="domaine" component="div" className="text-red-500 text-sm" />
                          
                        </div>
                        </div>
                        <div>
                          <label htmlFor="mission">Mission</label>
                          <Field as={Textarea} name="mission" />
                          <ErrorMessage name="mission" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                          <label htmlFor="competences">Compétences</label>
                          <Field as={Textarea} name="competences" />
                          <ErrorMessage name="competences" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                        <label htmlFor="profil">Profil</label>
                          <Field as={Textarea} name="profil" />
                          <ErrorMessage name="profil" component="div" className="text-red-500 text-sm" />
                        </div>
                      
                    </Form>
                  )}
                </Formik>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" form="formik-form" type="submit">
                  Enregistrer
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fermer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }
  
  export default UpdateOffreModal;
  

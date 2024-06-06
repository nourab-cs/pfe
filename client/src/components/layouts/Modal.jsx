import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { updateStagiaire } from "../../services/stagiaire.service";
import toast from 'react-hot-toast';
import { Modal, ModalBody, ModalHeader, ModalContent, ModalFooter, Button, Input } from '@nextui-org/react';
import React from 'react';

const validationSchema = Yup.object().shape({
  nom: Yup.string().required("Le nom est requis"),
  prenom: Yup.string().required("Le prénom est requis"),
  specialite: Yup.string().required("La spécialité est requise"),
  email: Yup.string()
    .matches(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email invalide")
    .required("L'email est requis"),
  telephone: Yup.string()
    .matches(/^\d{8}$/, "Le numéro de téléphone doit contenir 8 chiffres")
    .required("Le numéro de téléphone est obligatoire"),
  universite: Yup.string().required("L'université est requise"),
  dateDebut: Yup.date().required("La date de début est requise"),
  dateFin: Yup.date()
    .min(Yup.ref("dateDebut"), "La date de fin doit être après la date de début")
    .required("La date de fin est requise"),
});

export default function StagiaireModal({ isOpen, onOpenChange, stagiaire }) {
  const handleSubmit = (values, { setSubmitting }) => {
    updateStagiaire(stagiaire._id, values)
      .then(() => {
        toast.success("Stagiaire mis à jour avec succès");
        onOpenChange(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erreur lors de la mise à jour du stagiaire");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Modifier le stagiaire
          </ModalHeader>
          <ModalBody>
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
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Field
                        as={Input}
                        label="Nom"
                        type="text"
                        name="nom"
                        placeholder="Nom"
                        className="form-control mb-2"
                      />
                      {errors.nom && touched.nom ? (
                        <div className="text-red-500 text-sm">{errors.nom}</div>
                      ) : null}
                    </div>
                    <div>
                      <Field
                        as={Input}
                        label="Prénom"
                        type="text"
                        name="prenom"
                        placeholder="Prénom"
                        className="form-control mb-2"
                      />
                      {errors.prenom && touched.prenom ? (
                        <div className="text-red-500 text-sm">{errors.prenom}</div>
                      ) : null}
                    </div>
                    <div>
                      <Field
                        as={Input}
                        label="Spécialité"
                        type="text"
                        name="specialite"
                        placeholder="Spécialité"
                        className="form-control mb-2"
                      />
                      {errors.specialite && touched.specialite ? (
                        <div className="text-red-500 text-sm">{errors.specialite}</div>
                      ) : null}
                    </div>
                    <div>
                      <Field
                        as={Input}
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control mb-2"
                      />
                      {errors.email && touched.email ? (
                        <div className="text-red-500 text-sm">{errors.email}</div>
                      ) : null}
                    </div>
                    <div>
                      <Field
                        as={Input}
                        label="Téléphone"
                        type="text"
                        name="telephone"
                        placeholder="Téléphone"
                        className="form-control mb-2"
                      />
                      {errors.telephone && touched.telephone ? (
                        <div className="text-red-500 text-sm">{errors.telephone}</div>
                      ) : null}
                    </div>
                    <div>
                      <Field
                        as={Input}
                        label="Université"
                        type="text"
                        name="universite"
                        placeholder="Université"
                        className="form-control mb-2"
                      />
                      {errors.universite && touched.universite ? (
                        <div className="text-red-500 text-sm">{errors.universite}</div>
                      ) : null}
                    </div>
                    <div>
                      <Field
                        as={Input}
                        label="Date de début"
                        type="date"
                        name="dateDebut"
                        className="form-control mb-2"
                      />
                      {errors.dateDebut && touched.dateDebut ? (
                        <div className="text-red-500 text-sm">{errors.dateDebut}</div>
                      ) : null}
                    </div>
                    <div>
                      <Field
                        as={Input}
                        label="Date de fin"
                        type="date"
                        name="dateFin"
                        className="form-control mb-2"
                      />
                      {errors.dateFin && touched.dateFin ? (
                        <div className="text-red-500 text-sm">{errors.dateFin}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-6">
                    <ModalFooter>
                      <div className="flex justify-end mt-3">
                        <Button color="primary" variant="solid" type="submit">
                          Modifier
                        </Button>
                      </div>
                    </ModalFooter>
                  </div>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

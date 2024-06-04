import React from 'react'
// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
// import { axiosClient } from "../../services/axiosClient";





const DeleteOffreModal = () => {


//     const handleDelete = (id) => {
//         axiosClient
//           .delete(`/offre/delete/${id}`)
//           .then(() => {
//             onClose()
//             toast.success("Offre supprimée avec succès");
//             setOffers(offers.filter((offer) => offer._id !== id));
//           })
//           .catch((err) => {
//             console.error("Erreur lors de la suppression de l'offre", err);
//             toast.error("Erreur lors de la suppression de l'offre");
//           });
//       };

//   return ( 

// <>


//       <Button onPress={onOpen}>Open Modal</Button>
//       <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//         <ModalHeader className="flex flex-col gap-1">Confirmer la suppression</ModalHeader>
//               <ModalBody>
//               <p>Êtes-vous sûr de vouloir supprimer ?</p>
//           {/* Optional: Afficher les détails de ce qui sera supprimé */}
//           {/* <p>Cela supprimera {nom de l'élément} (détails sur l'élément).</p> */}
//               </ModalBody>
//               <ModalFooter>
//               <Button color="secondary" variant="light" onPress={onClose}>
//             Annuler
//           </Button>
//           <Button color="primary" onPress={() => { handleDelete(offer._id) ; }}>
//             Supprimer
//           </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>


//    )
}
export default DeleteOffreModal ;

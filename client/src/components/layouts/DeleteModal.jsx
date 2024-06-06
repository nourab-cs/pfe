import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";


import React from "react";

function DeleteModal({ f, set ,quiz  ,c}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal isOpen={true} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Supprimer test 
              </ModalHeader>
              <ModalBody>
              êtes-vous sûr de vouloir supprimer le test  suivant ? 
              </ModalBody>
              <ModalFooter>
              
                
                <Button
                  
                  Hand
                  color="primary"
                  onPress={() => {
                    onClose();
                    set(!c);
                    f(quiz._id)
                  }}
                >
                  Supprimer
                </Button>
                <Button color="default" variant="flat" onPress={onClose}>
            Annuler 
          </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteModal;

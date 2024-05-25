import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,

} from "@nextui-org/react";
import Picker from "./DatePicker";
import { axiosClient } from "../../services/axiosClient";

export default function ModalNext({
  open,
  set,
  setDate,
  date,
  setCandidature,
  id,re,refetch
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal
        onClose={() => {
          set(false);
        }}
        isOpen={open}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Pick a Date
              </ModalHeader>
              <ModalBody>
                <Picker setDate={setDate} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {




                    setCandidature(id, "acceptée", date);

                    set(false);
                    re(!refetch)
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

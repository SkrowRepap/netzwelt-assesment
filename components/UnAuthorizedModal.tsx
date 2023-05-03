import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

function UnAuthorizedModal() {
  const route = useRouter();

  const onClose = () => {
    route.push("/account/login");
  };
  return (
    <>
      <Modal
        isOpen={true}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Unauthorized</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Text>
              You are not authorized to access this page. Please login first to
              continue.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              variant={"outline"}
              mr={3}
              onClick={onClose}
            >
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UnAuthorizedModal;

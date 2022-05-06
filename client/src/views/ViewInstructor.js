import React from "react";
import {
  Stack,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectSingleInstructorById } from "../store/instructorsSlice";
import { useParams, useNavigate } from "react-router-dom";
import * as types from "../store/actions";
import { useDispatch } from "react-redux";

function ViewInstructor(props) {
  const { instructorId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const instructor = useSelector(state => selectSingleInstructorById(state, instructorId));

  const handleDelete = async (event) => {
    event.preventDefault();

    dispatch({
      type: types.DELETE_INSTRUCTOR,
      payload: {
        instructorId: instructorId,
        onSuccess: () => {
          navigate(-1);
          toast({
            title: "Instructor has been deleted!",
            position: "top",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    });
  };

  return (
    <Stack bg="white" w="100%" mt="2rem">
      <Heading fontSize="1.75rem" fontFamily={"Merriweather"}>
        Instructors
      </Heading>

      <Text>{JSON.stringify(instructor)}</Text>
      <div>
        <Button colorScheme="red" onClick={onOpen}>Delete</Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="410px">
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this instructor?
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}

export default ViewInstructor;

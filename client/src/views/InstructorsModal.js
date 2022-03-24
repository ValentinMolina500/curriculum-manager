import {
    Heading,
    Box,
    Input,
    FormControl,
    FormLabel,
    Grid,
    Flex,
    Button,
    Checkbox,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Lorem
} from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const InstructorsModal = props => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [wsuEmail, setWsuEmail] = useState('');
    const [isAdjunct, setIsAdjunct] = useState(false);
    const [hadSafetyOrientation, setHadSafetyOrientation] = useState(false);
    const isNoInput = firstName === '' || lastName === '' || wsuEmail === '';
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const renderAddInstructorForm = () => {
        const firstNameChangeHandler = (event) => {
            setFirstName(event.target.value);
        }

        const lastNameChangeHandler = (event) => {
            setLastName(event.target.value);
        }

        const wsuEmailChangeHandler = (event) => {
            setWsuEmail(event.target.value);
        }

        const isAdjunctChangeHandler = (event) => {
            setIsAdjunct(event.target.checked);
        }

        const hadSafetyOrientationChangeHandler = (event) => {
            setHadSafetyOrientation(event.target.checked);
        }

        return (
            <Grid
                gridTemplateColumns={"1fr 1fr"}
                columnGap={"1rem"}
                rowGap={"1rem"}
                gridColumn="1 / 5"
                borderRadius={"md"}
                p="1.5rem"
                onSubmit={addInstructor}>
                <FormControl gridRow="1" isRequired>
                    <FormLabel htmlFor="firstName" fontSize="1rem">First Name</FormLabel>
                    <Input id="firstName" value={firstName} onChange={firstNameChangeHandler} />
                </FormControl>
                <FormControl gridRow="1" isRequired>
                    <FormLabel htmlFor="lastName" fontSize="1rem">Last Name</FormLabel>
                    <Input id="lastName" value={lastName} onChange={lastNameChangeHandler} />
                </FormControl>
                <FormControl gridRow="2" gridColumn={"1/3"} isRequired>
                    <FormLabel htmlFor="wsuEmail" fontSize="1rem">WSU Email</FormLabel>
                    <Input id="wsuEmail" type='email' value={wsuEmail} onChange={wsuEmailChangeHandler} />
                </FormControl>
                <FormControl gridRow="3" gridColumn={"1/2"}>
                    <Checkbox id="isAdjunct" colorScheme='gray' isChecked={isAdjunct} onChange={isAdjunctChangeHandler}>Adjunct</Checkbox>
                </FormControl>
                <FormControl gridRow="3" gridColumn={"2/2"}>
                    <Checkbox id="hadSafetyOrientation" colorScheme='gray' isChecked={hadSafetyOrientation} onChange={hadSafetyOrientationChangeHandler}>Safety Orientation</Checkbox>
                </FormControl>
            </Grid>
        );
    }

    const addInstructor = (event) => {
        event.preventDefault();

        const instructorData = {
            id: uuidv4(),
            firstName: firstName,
            lastName: lastName,
            wsuEmail: wsuEmail,
            isAdjunct: isAdjunct,
            hadSafetyOrientation: hadSafetyOrientation
        }

        console.log(instructorData);

        toast({
            title: 'Success',
            description: "Instructor has been added!",
            position: 'top',
            status: 'success',
            duration: 5000,
            isClosable: true,
        })

        setFirstName('');
        setLastName('');
        setWsuEmail('');
        setIsAdjunct(false);
        setHadSafetyOrientation(false);
    }

    return (
        <>
            <Button onClick={onOpen} color='white' backgroundColor='#A60F2D'
                _hover={{ bg: '#A60F2D', filter: 'brightness(125%)' }}>
                Add Instructor
            </Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent maxW="600px" >
                    <ModalHeader>Add Instructor</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {renderAddInstructorForm()}
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>Cancel</Button>
                        <Button isDisabled={isNoInput} type="submit" color='white'
                            backgroundColor="#A60F2D"
                            _hover={{ bg: '#A60F2D', filter: 'brightness(125%)' }} onClick={addInstructor}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default InstructorsModal;


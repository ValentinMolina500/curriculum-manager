import {
    Heading,
    Box,
    Input,
    FormControl,
    FormLabel,
    Select,
    Grid,
    Flex,
    Button,
    Center,
    Text,
    Divider,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    Textarea,
    NumberDecrementStepper,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { v4 as uuidv4 } from 'uuid';
  import API from "../utils/API.js"
  
  function CoursesModal() {
    const [coursePrefix, setCoursePrefix] = useState('CPT_S');
    const [courseTitle, setCourseTitle] = useState('');
    const [courseNum, setCourseNum] = useState('');
    const [courseCredits, setCourseCredits] = useState('');
    const isNoInput = coursePrefix === '' || courseTitle === '' || courseNum === '' || courseCredits === '';
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const renderAddCourseForm = () => {
  
      const coursePrefixChangeHandler = (event) => {
        setCoursePrefix(event.target.value);
      }
  
      const courseTitleChangeHandler = (event) => {
        setCourseTitle(event.target.value);
      }
  
      const courseNumChangeHandler = (event) => {
        setCourseNum(event.target.value);
      }
  
      const courseCreditsChangeHandler = (event) => {
        setCourseCredits(event);
      }
  
      return (
        <Grid
          gridTemplateColumns={"1fr 1fr"}
          columnGap={"1rem"}
          rowGap={"1rem"}
          gridColumn="1 / 5"
          // key={section.id}
          borderRadius={"md"}
          p="1.5rem">

          <FormControl gridRow="1" isRequired>
            <FormLabel htmlFor="prefix">Prefix</FormLabel>
            <Select id="coursePrefix" value={coursePrefix} onChange={coursePrefixChangeHandler}>
              <option value="CPT_S">CPT_S</option>
              <option value="EE">EE</option>
            </Select>
          </FormControl>
  
          <FormControl gridRow="1" isRequired>
            <FormLabel htmlFor="title">Course Number</FormLabel>
            <Input id="courseNum" type="number" value={courseNum} onChange={courseNumChangeHandler} />
          </FormControl>
  
          <FormControl gridRow="2" gridColumn={"1 / 3"} isRequired>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input id="courseTitle" value={courseTitle} onChange={courseTitleChangeHandler} />
          </FormControl>
  
          <FormControl gridRow="3" gridColumn={"1 / 3"} isRequired>
            <FormLabel htmlFor="title">Description</FormLabel>
            <Textarea>
            </Textarea>
  
          </FormControl>

          <Flex
            gridRow="3"
            gridColumn={"3 / 3"}
            justifyContent="right"
          >
  
          </Flex>
        </Grid>
      );
    }
  
    const addCourse = async (event) => {
      event.preventDefault();
  
      const courseData = {
        id: uuidv4(),
        coursePrefix: coursePrefix,
        courseTitle: courseTitle,
        courseNum: courseNum,
        courseCredits: courseCredits,
      };
  
      console.log(courseData);
      await API.addNewCourse(courseData);
  
      toast({
        title: 'Success',
        description: "Course has been added!",
        position: 'top',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
  
      setCoursePrefix('CPT_S');
      setCourseTitle('');
      setCourseNum('');
      setCourseCredits('');
    }
  
    return (
      <>
        <Button onClick={onOpen} color='white' backgroundColor='#A60F2D'
          _hover={{ bg: '#A60F2D', filter: 'brightness(125%)' }}>
          Add Course
        </Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} >
          <ModalOverlay />
          <ModalContent maxW="600px" >
            <ModalHeader>Add Course</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {renderAddCourseForm()}
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={onClose} mr={3}>Cancel</Button>
              <Button isDisabled={isNoInput} type="submit" color='white'
                backgroundColor="#A60F2D"
                _hover={{ bg: '#A60F2D', filter: 'brightness(125%)' }} onClick={addCourse}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  
  export default CoursesModal;
  
  
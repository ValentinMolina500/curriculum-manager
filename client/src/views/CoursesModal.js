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
    Checkbox,
    Stack,
    CheckboxGroup,
    FormHelperText,
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
    NumberDecrementStepper,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { v4 as uuidv4 } from 'uuid';
  
  function CoursesModal() {
    // const [sections, setSections] = useState([]);
    // const [labs, setLabs] = useState([]);
  
    const [coursePrefix, setCoursePrefix] = useState('CPT_S');
    const [courseTitle, setCourseTitle] = useState('');
    const [courseNum, setCourseNum] = useState('');
    const [courseCredits, setCourseCredits] = useState('');
    // const [courseInstructor, setCourseInstructor] = useState('Luis De La Torre');
    // const [courseLocation, setCourseLocation] = useState('');
    // const [courseDays, setCourseDays] = useState({
    //   onMonday: false,
    //   onTuesday: false,
    //   onWednesday: false,
    //   onThursday: false,
    //   onFriday: false
    // });
    // const [courseStartTime, setCourseStartTime] = useState('');
    // const [courseEndTime, setCourseEndTime] = useState('');
    const isNoInput = coursePrefix === '' || courseTitle === '' || courseNum === '' || courseCredits === '';
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const renderAddCourseForm = () => {
      // if (sections.length === 0) {
      //   return (
      //     <Center gridColumn="1 / 5" p="3rem" border="1px dashed #E2E8F0" color="gray.600">
      //       No Sections
      //     </Center>
      //   )
      // }
  
      // return sections.map((section, index) => {
      // const sectionCount = index + 1;
      // let sectionLabel;
  
      // if (sectionCount > 9) {
      //   sectionLabel = `Section ${sectionCount}`
      // } else {
      //   sectionLabel = `Section 0${sectionCount}`;
      // }
  
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
        // console.log(event);
        setCourseCredits(event);
      }
  
      // const courseInstructorChangeHandler = (event) => {
      //   setCourseInstructor(event.target.value);
      // }
  
      // const courseLocationChangeHandler = (event) => {
      //   setCourseLocation(event.target.value);
      // }
  
      // const mondayChangeHandler = () => {
      //   setCourseDays(prevState => ({
      //     ...courseDays,
      //     onMonday: !prevState.onMonday
      //   }))
      // }
  
      // const tuesdayChangeHandler = () => {
      //   setCourseDays(prevState => ({
      //     ...courseDays,
      //     onTuesday: !prevState.onTuesday
      //   }))
      // }
  
      // const wednesdayChangeHandler = () => {
      //   setCourseDays(prevState => ({
      //     ...courseDays,
      //     onWednesday: !prevState.onWednesday
      //   }))
      // }
  
      // const thursdayChangeHandler = () => {
      //   setCourseDays(prevState => ({
      //     ...courseDays,
      //     onThursday: !prevState.onThursday
      //   }))
      // }
  
      // const fridayChangeHandler = () => {
      //   setCourseDays(prevState => ({
      //     ...courseDays,
      //     onFriday: !prevState.onFriday
      //   }))
      // }
  
      // const courseStartTimeChangeHandler = (event) => {
      //   setCourseStartTime(event.target.value);
      // }
  
      // const courseEndTimeChangeHandler = (event) => {
      //   setCourseEndTime(event.target.value);
      // }
  
      return (
        <Grid
          gridTemplateColumns={"1fr 1fr"}
          columnGap={"1rem"}
          rowGap={"1rem"}
          gridColumn="1 / 5"
          // key={section.id}
          borderRadius={"md"}
          p="1.5rem">
          {/* <Heading fontSize={"1rem"} gridColumn="1 / 5" fontFamily={"Merriweather"}>{sectionLabel}</Heading> */}
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
  
          <FormControl gridRow="3" gridColumn={"1 / 2"} isRequired>
            <FormLabel htmlFor="title" >Credits</FormLabel>
            <NumberInput min={1} max={18} value={courseCredits} onChange={courseCreditsChangeHandler}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
  
          </FormControl>
  
          {/* <FormControl gridRow="3" gridColumn={"2/2"} isRequired>
            <FormLabel htmlFor="title" >Instructor</FormLabel>
            <Select id="prefix" value={courseInstructor} onChange={courseInstructorChangeHandler}>
              <option value="Luis De La Torre">Luis De La Torre</option>
              <option value="Bob Lewis">Bob Lewis</option>
            </Select>
          </FormControl> */}
  
          {/* <FormControl gridRow="3" gridColumn={"3"} isRequired>
            <FormLabel htmlFor="title" >Building & Room</FormLabel>
            <Input id="title"  value={courseLocation} onChange={courseLocationChangeHandler} />
          </FormControl> */}
          {/* <Divider gridRow={"4"} gridColumn={"1 / 5"} /> */}
          {/* <FormControl gridRow={"3"} gridColumn={"1 / 5"} isRequired>
            <FormLabel htmlFor="title" fontSize="1rem">Days</FormLabel>
            <CheckboxGroup colorScheme='gray'>
              <Stack spacing={[1, 5]} direction={['column', 'row']}>
                <Checkbox fontSize={"1rem"} isChecked={courseDays.onMonday} onChange={mondayChangeHandler}>Monday</Checkbox>
                <Checkbox fontSize={"1rem"} isChecked={courseDays.onTuesday} onChange={tuesdayChangeHandler} >Tuesday</Checkbox>
                <Checkbox fontSize={"1rem"} isChecked={courseDays.onWednesday} onChange={wednesdayChangeHandler} >Wednesday</Checkbox>
                <Checkbox fontSize={"1rem"} isChecked={courseDays.onThursday} onChange={thursdayChangeHandler} >Thursday</Checkbox>
                <Checkbox fontSize={"1rem"} isChecked={courseDays.onFriday} onChange={fridayChangeHandler} >Friday</Checkbox>
              </Stack>
            </CheckboxGroup>
            <FormHelperText>(Weekly)</FormHelperText>
          </FormControl> */}
  
          {/* <FormControl gridRow={"4"} gridColumn={"1"} isRequired>
            <FormLabel htmlFor="title" fontSize="1rem">Start Time</FormLabel>
            <Input type='time'  value={courseStartTime} onChange={courseStartTimeChangeHandler} />
          </FormControl>
  
          <FormControl gridRow={"4"} gridColumn={"2"} isRequired>
            <FormLabel htmlFor="title" fontSize="1rem">End Time</FormLabel>
            <Input type='time' value={courseEndTime} onChange={courseEndTimeChangeHandler} />
          </FormControl> */}
          <Flex
            gridRow="3"
            gridColumn={"3 / 3"}
            justifyContent="right"
          >
  
            {/* <Button gridRow={"4"} type="submit" gridColumn={"2"} marginTop="2em"
              color='white' backgroundColor='#A60F2D' _hover={{ bg: '#A60F2D', filter: 'brightness(125%)' }}
              isDisabled={isNoInput} onClick={addCourse}>
              Submit
            </Button> */}
          </Flex>
        </Grid>
      );
      // }
      // );
    }
  
    const addCourse = (event) => {
      event.preventDefault();
  
      const courseData = {
        id: uuidv4(),
        coursePrefix: coursePrefix,
        courseTitle: courseTitle,
        courseNum: courseNum,
        courseCredits: courseCredits,
        // courseInstructor: courseInstructor,
        // courseLocation: courseLocation,
        // courseDays: courseDays,
        // courseStartTime: courseStartTime,
        // courseEndTime: courseEndTime
      };
  
      console.log(courseData);
  
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
      // setCourseInstructor('Luis De La Torre');
      // setCourseLocation('');
      // setCourseStartTime('');
      // setCourseEndTime('');
      // setCourseDays({
      //   onMonday: false,
      //   onTuesday: false,
      //   onWednesday: false,
      //   onThursday: false,
      //   onFriday: false
      // });
    }
  
    return (
      // <Box maxW="990px" margin="0 auto" w="100%" as="form">
      //   <Heading fontSize="1.75rem" mb="1rem" fontFamily={"Merriweather"}>
      //     Add Course
      //   </Heading>
      //   <Grid
      //     gridTemplateColumns={"1fr 1fr 1fr 1fr"}
      //     columnGap={"1rem"}
      //     rowGap={"1rem"}
      //   >
  
      //     <Flex
      //       gridRow="2"
      //       mt="1rem"
      //       gridColumn={"1 / 5"}
      //       justifyContent="space-between"
      //     >
      //     </Flex>
      //     {renderAddCourseForm()}
      //   </Grid>
      // </Box>
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
  
  
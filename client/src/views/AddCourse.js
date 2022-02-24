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
  Divider
} from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function Courses() {
  // const [sections, setSections] = useState([]);
  // const [labs, setLabs] = useState([]);

  const [coursePrefix, setCoursePrefix] = useState('CPT_S');
  const [courseTitle, setCourseTitle] = useState('');
  const [courseNum, setCourseNum] = useState('');
  const [courseCredits, setCourseCredits] = useState('');
  const [courseInstructor, setCourseInstructor] = useState('Luis De La Torre');
  const [courseLocation, setCourseLocation] = useState('');
  const [courseDays, setCourseDays] = useState([]);
  const [courseStartTime, setCourseStartTime] = useState('');
  const [courseEndTime, setCourseEndTime] = useState('');

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
      setCourseCredits(event.target.value);
    }

    const courseInstructorChangeHandler = (event) => {
      setCourseInstructor(event.target.value);
    }

    const courseLocationChangeHandler = (event) => {
      setCourseLocation(event.target.value);
    }

    const courseStartTimeChangeHandler = (event) => {
      setCourseStartTime(event.target.value);
    }

    const courseEndTimeChangeHandler = (event) => {
      setCourseEndTime(event.target.value);
    }

    return (
      <Grid
        gridTemplateColumns={"1fr 1fr 1fr"}
        border="1px solid #E2E8F0"
        columnGap={"1rem"}
        rowGap={"1rem"}
        gridColumn="1 / 5"
        // key={section.id}
        borderRadius={"md"}
        p="1.5rem">
        {/* <Heading fontSize={"1rem"} gridColumn="1 / 5" fontFamily={"Merriweather"}>{sectionLabel}</Heading> */}
        <FormControl gridRow="1" isRequired>
          <FormLabel htmlFor="prefix" fontSize="0.875rem">Prefix</FormLabel>
          <Select id="coursePrefix" size="sm" value={coursePrefix} onChange={coursePrefixChangeHandler}>
            <option value="CPT_S">CPT_S</option>
            <option value="EE">EE</option>
          </Select>
        </FormControl>

        <FormControl gridColumn={"2 / 5"} isRequired>
          <FormLabel htmlFor="title" fontSize="0.875rem">Title</FormLabel>
          <Input id="courseTitle" size="sm" value={courseTitle} onChange={courseTitleChangeHandler} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="title" fontSize="0.875rem">Course Number</FormLabel>
          <Input id="courseNum" size="sm" value={courseNum} onChange={courseNumChangeHandler} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="title" fontSize="0.875rem">Credits</FormLabel>
          <Input id="title" size="sm" value={courseCredits} onChange={courseCreditsChangeHandler} />
        </FormControl>

        <FormControl gridRow="3" gridColumn={"1/3"} isRequired>
          <FormLabel htmlFor="title" fontSize="0.875rem">Instructor</FormLabel>
          <Select id="prefix" size="sm" value={courseInstructor} onChange={courseInstructorChangeHandler}>
            <option value="Luis De La Torre">Luis De La Torre</option>
            <option value="Bob Lewis">Bob Lewis</option>
          </Select>
        </FormControl>

        <FormControl gridRow="3" gridColumn={"3"} isRequired>
          <FormLabel htmlFor="title" fontSize="0.875rem">Building & Room</FormLabel>
          <Input id="title" size="sm" value={courseLocation} onChange={courseLocationChangeHandler} />
        </FormControl>
        {/* <Divider gridRow={"4"} gridColumn={"1 / 5"} /> */}
        <FormControl gridRow={"5"} gridColumn={"1 / 5"} isRequired>
          <FormLabel htmlFor="title" fontSize="0.875rem">Days</FormLabel>
          <CheckboxGroup colorScheme='gray'>
            <Stack spacing={[1, 5]} direction={['column', 'row']}>
              <Checkbox value='M' fontSize={"0.875rem"}>Monday</Checkbox>
              <Checkbox value='TU' fontSize={"0.875rem"}>Tuesday</Checkbox>
              <Checkbox value='W' fontSize={"0.875rem"}>Wednesday</Checkbox>
              <Checkbox value='TH' fontSize={"0.875rem"}>Thursday</Checkbox>
              <Checkbox value='F' fontSize={"0.875rem"}>Friday</Checkbox>
            </Stack>
          </CheckboxGroup>
          <FormHelperText>(Weekly)</FormHelperText>
        </FormControl>

        <FormControl gridRow={"6"} gridColumn={"1"} isRequired>
          <FormLabel htmlFor="title" fontSize="0.875rem">Start Time</FormLabel>
          <Input type='time' size="sm" value={courseStartTime} onChange={courseStartTimeChangeHandler} />
        </FormControl>

        <FormControl gridRow={"6"} gridColumn={"2"} isRequired>
          <FormLabel htmlFor="title" fontSize="0.875rem">End Time</FormLabel>
          <Input type='time' size="sm" value={courseEndTime} onChange={courseEndTimeChangeHandler} />
        </FormControl>

        <Button gridRow={"6"} type="submit" gridColumn={"3"} marginTop="2em" size="sm"
          color='white' backgroundColor='#A60F2D' _hover={{ bg: '#4D4D4D' }}
          onClick={addCourse}>
          Submit
        </Button>
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
      courseInstructor: courseInstructor,
      courseLocation: courseLocation,
      courseStartTime: courseStartTime,
      courseEndTime: courseEndTime
    };

    console.log(courseData);

    setCoursePrefix('CPT_S');
    setCourseTitle('');
    setCourseNum('');
    setCourseCredits('');
    setCourseInstructor('Luis De La Torre');
    setCourseLocation('');
    setCourseStartTime('');
    setCourseEndTime('');
  }

  // const renderLabs = () => {
  //   if (labs.length === 0) {
  //     return (
  //       <Center gridColumn="1 / 5" p="3rem" border="1px dashed #E2E8F0" color="gray.600">
  //         No Labs
  //       </Center>
  //     )
  //   }

  //   return labs.map((section, index) => {
  //     return (
  //       <Grid
  //         gridTemplateColumns={"1fr 1fr 1fr"}
  //         border="1px solid #E2E8F0"
  //         columnGap={"1rem"}
  //         rowGap={"1rem"}
  //         gridColumn="1 / 5"
  //         key={section.id}
  //         borderRadius={"md"}
  //         p="1.5rem">
  //         <Heading fontSize={"1rem"} gridColumn="1 / 5" fontFamily={"Merriweather"}>Section 0{index + 1} Lab</Heading>
  //         <FormControl>
  //           <FormLabel htmlFor="title" fontSize="0.875rem">Class Number</FormLabel>
  //           <Input id="title" size="sm" />
  //         </FormControl>

  //         <FormControl gridRow="3" gridColumn={"1/3"}>
  //           <FormLabel htmlFor="title" fontSize="0.875rem">Instructor</FormLabel>
  //           <Select id="prefix" size="sm">
  //             <option>Luis De La Torre</option>
  //             <option>Bob Lewis</option>
  //           </Select>
  //         </FormControl>

  //         <FormControl gridRow="3" gridColumn={"3"}>
  //           <FormLabel htmlFor="title" fontSize="0.875rem">Building & Room</FormLabel>
  //           <Input id="title" size="sm" />
  //         </FormControl>

  //         <Divider gridRow={"4"} gridColumn={"1 / 5"} />
  //         <FormControl gridRow={"5"} gridColumn={"1 / 5"}>
  //           <FormLabel htmlFor="title" fontSize="0.875rem">Days</FormLabel>
  //           <CheckboxGroup colorScheme='purple' defaultValue={['naruto', 'kakashi']}>
  //             <Stack spacing={[1, 5]} direction={['column', 'row']}>
  //               <Checkbox value='naruto' fontSize={"0.875rem"}>Monday</Checkbox>
  //               <Checkbox value='sasuke' fontSize={"0.875rem"}>Tuesday</Checkbox>
  //               <Checkbox value='kakashi' fontSize={"0.875rem"}>Wednesday</Checkbox>
  //               <Checkbox value='th' fontSize={"0.875rem"}>Thursday</Checkbox>
  //               <Checkbox value='fr' fontSize={"0.875rem"}>Friday</Checkbox>
  //             </Stack>
  //           </CheckboxGroup>
  //           <FormHelperText>(Weekly)</FormHelperText>
  //         </FormControl>

  //         <FormControl gridRow={"6"} gridColumn={"1"}>
  //           <FormLabel htmlFor="title" fontSize="0.875rem">Start Time</FormLabel>
  //           <Input size="sm" />
  //         </FormControl>

  //         <FormControl gridRow={"6"} gridColumn={"2"}>
  //           <FormLabel htmlFor="title" fontSize="0.875rem">End Time</FormLabel>
  //           <Input size="sm" />
  //         </FormControl>
  //       </Grid>
  //     );
  //   });
  // }

  // const addSection = () => {
  //   const newSection = {
  //     id: uuidv4(),
  //   }

  //   setSections(oldSections => oldSections.concat(newSection));
  // }

  // const addLab = () => {
  //   const newLab = {
  //     id: uuidv4(),
  //   }

  //   setLabs(oldLabs => oldLabs.concat(newLab))
  // }

  // const renderPrereqs = () => {
  //   if (labs.length === 0) {
  //     return (
  //       <Center gridColumn="1 / 5" p="3rem" border="1px dashed #E2E8F0" color="gray.600">
  //         No Prerequisites
  //       </Center>
  //     )
  //   }

  //   return labs.map((section, index) => {
  //     return (
  //       <Grid
  //         gridTemplateColumns={"1fr 1fr 1fr"}
  //         border="1px solid #E2E8F0"
  //         columnGap={"1rem"}
  //         rowGap={"1rem"}
  //         gridColumn="1 / 5"
  //         key={section.id}
  //         borderRadius={"md"}
  //         p="1.5rem">
  //         <Heading fontSize={"1rem"} gridColumn="1 / 5" fontFamily={"Merriweather"}>Section 0{index + 1} Lab</Heading>
  //         <FormControl>
  //           <FormLabel htmlFor="title" fontSize="0.875rem">Class Number</FormLabel>
  //           <Input id="title" size="sm" />
  //         </FormControl>
  //       </Grid>
  //     );
  //   });
  // }

  return (
    <Box maxW="990px" margin="0 auto" w="100%" as="form">
      <Heading fontSize="1.75rem" mb="1rem" fontFamily={"Merriweather"}>
        Add Course
      </Heading>
      <Grid
        gridTemplateColumns={"1fr 1fr 1fr 1fr"}
        columnGap={"1rem"}
        rowGap={"1rem"}
      >

        <Flex
          gridRow="2"
          mt="1rem"
          gridColumn={"1 / 5"}
          justifyContent="space-between"
        >
          {/* <Heading fontSize={"1.25rem"} fontFamily={"Merriweather"} color={"gray.800"}>
            Sections
          </Heading> */}

        </Flex>
        {renderAddCourseForm()}

        {/* <Flex
          mt="1rem"
          gridColumn={"1 / 5"}
          justifyContent="space-between"
        >
          <Heading fontSize={"1.25rem"} fontFamily={"Merriweather"} color={"gray.800"}>
            Labs
          </Heading>
          <Button size="sm" colorScheme="purple" onClick={addLab}>
            Add Lab
          </Button>
        </Flex> */}

        {/* {renderLabs()} */}

        {/* <Flex
          mt="1rem"
          gridColumn={"1 / 5"}
          justifyContent="space-between"
        >
          <Heading fontSize={"1.25rem"} fontFamily={"Merriweather"} color={"gray.800"}>
            Prerequisites
          </Heading>
          <Button size="sm" colorScheme="purple" onClick={addLab}>
            Add Prerequisite
          </Button>
        </Flex> */}

        {/* {renderPrereqs()} */}
      </Grid>
    </Box>
  );
}

export default Courses;

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
    Stack,
    CheckboxGroup,
    FormHelperText,
    Select
} from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const OfferingsModal = props => {
    const [subject, setSubject] = useState('CPT_S');
    const [courseNum, setCourseNum] = useState('111');
    const [courseInstructor, setCourseInstructor] = useState('Luis De La Torre');
    const [courseDays, setCourseDays] = useState({
        onMonday: false,
        onTuesday: false,
        onWednesday: false,
        onThursday: false,
        onFriday: false
    });
    const [courseStartTime, setCourseStartTime] = useState('');
    const [courseEndTime, setCourseEndTime] = useState('');
    const [building, setBuilding] = useState('CIC');
    const [roomNum, setRoomNum] = useState('');
    const isNoInput = subject === '' || courseNum === '' || courseInstructor === '' || courseStartTime === '' || courseEndTime === ''
        || building === '' || roomNum === '' || (courseDays.onMonday === false && courseDays.onTuesday === false
        && courseDays.onWednesday === false && courseDays.onThursday === false && courseDays.onFriday === false);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const renderAddOfferingForm = () => {
        const subjectChangeHandler = (event) => {
            setSubject(event.target.value);
        }

        const courseNumChangeHandler = (event) => {
            setCourseNum(event.target.value);
        }

        const courseInstructorChangeHandler = (event) => {
            setCourseInstructor(event.target.value);
        }

        const mondayChangeHandler = () => {
            setCourseDays(prevState => ({
                ...courseDays,
                onMonday: !prevState.onMonday
            }))
        }

        const tuesdayChangeHandler = () => {
            setCourseDays(prevState => ({
                ...courseDays,
                onTuesday: !prevState.onTuesday
            }))
        }

        const wednesdayChangeHandler = () => {
            setCourseDays(prevState => ({
                ...courseDays,
                onWednesday: !prevState.onWednesday
            }))
        }

        const thursdayChangeHandler = () => {
            setCourseDays(prevState => ({
                ...courseDays,
                onThursday: !prevState.onThursday
            }))
        }

        const fridayChangeHandler = () => {
            setCourseDays(prevState => ({
                ...courseDays,
                onFriday: !prevState.onFriday
            }))
        }

        const courseStartTimeChangeHandler = (event) => {
            setCourseStartTime(event.target.value);
        }

        const courseEndTimeChangeHandler = (event) => {
            setCourseEndTime(event.target.value);
        }

        const buildingChangeHandler = (event) => {
            setBuilding(event.target.value);
        }

        const roomNumChangeHandler = (event) => {
            setRoomNum(event.target.value);
        }

        return (
            <Grid
                gridTemplateColumns={"1fr 1fr"}
                columnGap={"1rem"}
                rowGap={"1rem"}
                gridColumn="1 / 5"
                borderRadius={"md"}
                p="1.5rem"
                onSubmit={addOffering}>
                <FormControl gridRow="1" isRequired>
                    <FormLabel htmlFor="subject" fontSize="1rem">Subject</FormLabel>
                    <Select id="subject" value={subject} onChange={subjectChangeHandler} >
                        <option value="CPT_S">CPT_S</option>
                        <option value="EE">EE</option>
                    </Select>
                </FormControl>
                <FormControl gridRow="1" isRequired>
                    <FormLabel htmlFor="courseNum" fontSize="1rem">Course Number</FormLabel>
                    <Select id="courseNum" value={courseNum} onChange={courseNumChangeHandler} >
                        <option value="111">111</option>
                        <option value="121">121</option>
                        <option value="122">122</option>
                        <option value="223">223</option>
                        <option value="224">224</option>
                        <option value="260">260</option>
                        <option value="302">302</option>
                        <option value="317">317</option>
                        <option value="322">322</option>
                        <option value="323">323</option>
                    </Select>
                </FormControl>
                <FormControl gridRow="2" gridColumn={"1/3"} isRequired>
                    <FormLabel htmlFor="courseInstructor" fontSize="1rem">Instructor</FormLabel>
                    <Select id="courseInstructor" value={courseInstructor} onChange={courseInstructorChangeHandler} >
                        <option value="Luis De La Torre">Luis De La Torre</option>
                        <option value="Bob Lewis">Bob Lewis</option>
                        <option value="Russell Swannack">Russell Swannack</option>
                        <option value="John Miller">John Miller</option>
                        <option value="Nathan Tenney">Nathan Tenney</option>
                    </Select>
                </FormControl>

                <FormControl gridRow={"3"} gridColumn={"1"} isRequired>
                    <FormLabel htmlFor="title" fontSize="1rem">Start Time</FormLabel>
                    <Input type='time' value={courseStartTime} onChange={courseStartTimeChangeHandler} />
                </FormControl>

                <FormControl gridRow={"3"} gridColumn={"2"} isRequired>
                    <FormLabel htmlFor="title" fontSize="1rem">End Time</FormLabel>
                    <Input type='time' value={courseEndTime} onChange={courseEndTimeChangeHandler} />
                </FormControl>

                <FormControl gridRow="4" gridColumn={"1"} isRequired>
                    <FormLabel htmlFor="building" fontSize="1rem">Building</FormLabel>
                    <Select id="building" value={building} onChange={buildingChangeHandler} >
                        <option value="CIC">CIC</option>
                        <option value="East">East</option>
                        <option value="Floyd">Floyd</option>
                        <option value="TCOL">TCOL</option>
                    </Select>
                </FormControl>

                <FormControl gridRow="4" gridColumn={"2"} isRequired>
                    <FormLabel htmlFor="roomNum" fontSize="1rem">Room Number</FormLabel>
                    <Input id="roomNum" type="number" value={roomNum} onChange={roomNumChangeHandler} />
                </FormControl>

                <FormControl gridRow="5" gridColumn={"1/5"} isRequired>
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
                </FormControl>
            </Grid>
        );
    }

    const addOffering = (event) => {
        event.preventDefault();

        const offeringData = {
            id: uuidv4(),
            subject: subject,
            courseNum: courseNum,
            courseInstructor: courseInstructor,
            courseStartTime: courseStartTime,
            courseEndTime: courseEndTime,
            building: building,
            roomNum: roomNum,
            courseDays: courseDays,
        }

        console.log(offeringData);

        toast({
            title: 'Success',
            description: "Offering has been added!",
            position: 'top',
            status: 'success',
            duration: 5000,
            isClosable: true,
        })

        setSubject('CPT_S');
        setCourseNum('111');
        setCourseInstructor('Luis De La Torre');
        setCourseDays({
            onMonday: false,
            onTuesday: false,
            onWednesday: false,
            onThursday: false,
            onFriday: false
        });
        setCourseStartTime('');
        setCourseEndTime('');
        setBuilding('CIC');
        setRoomNum('');
    }

    return (
        <>
            <Button onClick={onOpen} color='white' backgroundColor='#A60F2D'
                _hover={{ bg: '#A60F2D', filter: 'brightness(125%)' }}>
                Add Offering
            </Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent maxW="660px" >
                    <ModalHeader>Add Offering</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {renderAddOfferingForm()}
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>Cancel</Button>
                        <Button isDisabled={isNoInput} type="submit" color='white'
                            backgroundColor="#A60F2D"
                            _hover={{ bg: '#A60F2D', filter: 'brightness(125%)' }} onClick={addOffering}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default OfferingsModal;


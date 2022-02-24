import React, { useEffect } from "react";
import {
  Heading,
  Flex,
  Stack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Center,
  Grid,
  Box,
  Text,
  Divider
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  GridItem,
  Image,
  ScaleFade,
} from "@chakra-ui/react";

import {
  MdHome,
  MdDateRange,
  MdBook,
  MdPeople,
  MdNotifications,
  MdManageAccounts,
  MdArrowBack,
  MdLocalOffer
} from "react-icons/md"
import { setSelectedSemester } from "../store/semestersSlice";
import { Outlet } from "react-router-dom"
import ProfileImage from "../images/bob.jpeg";
import Logo from "../images/wsutc-logo.png";

import { selectSemestersById, } from "../store/semestersSlice";
import { useLocation, useParams, Link, useNavigate, NavLink } from "react-router-dom";
import * as types from "../store/actions";

function ViewSemester(props) {
  const { semesterId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: types.SELECT_SEMESTER,
      payload: semesterId
    })
  }, [semesterId]);

  const semester = useSelector(state => selectSemestersById(state, semesterId));

  const renderSidebarItems = () => {
    return SIDEBAR_ITEMS.map((item) => {
      const Icon = item.icon;
      const selectedStyles =
      {
        background: "#A60F2D",
        color: "white",
        borderRadius: "0.25rem",
      }
      const notSelectedStyles = {
        borderRadius: "0.25rem",
      }

      return (
        <Flex
          as={NavLink}
          to={item.to}
          style={({ isActive }) => isActive ? selectedStyles : notSelectedStyles}
          transition="background ease 250ms"
          cursor="pointer"
          alignItems="center"
          color="#868e96"
          p="0.25rem 0.75rem"
          minW="12rem"
          fontSize="1.25rem"

          _hover={{ background: "#efefef" }}
        >
          <Icon fontSize="inherit" />

          <Text
            ml="0.5rem"
            fontWeight={item.selected ? "600" : "medium"}
            fontSize="1rem"
          >
            {item.title}
          </Text>
        </Flex>
      );
    });
  };
  return (
    <Grid w="100%" h="100%" templateColumns="18rem 1fr" templateRows={"minmax(0, 1fr)"}>
      {/* Sidebar */}
      <GridItem
        zIndex={50}
        as="aside"
        bg="#fff"
        borderRight="1px solid #efefef"
      >
        <Box p="2rem 1.5rem">
          <Flex>
            <Heading
              fontSize="1.5rem"
              as="h2"
              fontWeight="700"
              fontFamily="Merriweather"
            >
              Curriculum
            </Heading>

          </Flex>

          <Image src={Logo} my="1.5rem" />

          <Stack spacing="0.75rem">{renderSidebarItems()}</Stack>

        </Box>
      </GridItem>

      {/* Main content */}
      <GridItem as="main" >
        <Grid
          rowGap="1rem"
          gridTemplateRows="auto minmax(0, 1fr)"
          p="2rem"
          gridRowGap="2rem"
          h="100%"
          w="100%"
        >
          <Flex alignItems="center" w="100%" justifySelf={"center"}
            maxW={"1280px"}>
            {/* User profile items */}
            <Flex bg="white" direction={"row"} align="center"
              border="1px solid #efefef"
              boxShadow="rgb(149 157 165 / 8%) 0px 0px 16px"
              padding="0.5rem 2rem"
              borderRadius={"1rem"}
              h="100%">
              <Flex as={NavLink} fontSize="1.25rem" to="/" alignItems="center" _hover={{
                cursor: "pointer"
              }}>
                <Button
                  leftIcon={<MdArrowBack />} color='#4D4D4D'
                  colorScheme="white" borderColor="black"
                >Go Back</Button>
              </Flex>
              <Divider orientation="vertical" mx="1rem" color={"#efefef"}/>
              <Text fontFamily={"Merriweather"}>{semester.school}</Text>
              <Divider orientation="vertical" mx="1rem" />
              <Text>
                {semester.season}{" "}{semester.year}
              </Text>
            </Flex>
            <Grid
              ml="auto"
              gridTemplateRows="auto auto"
              columnGap="1rem"
              bg="white"
              border="1px solid #efefef"
              boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
              padding="0.5rem 1rem"
              borderRadius="0.5rem"
              gridTemplateColumns="auto auto"
            >
              <GridItem
                alignSelf="end"
                gridRow="1"
                gridColumn="1"
                justifySelf="right"
                fontWeight="700"
                fontSize="0.875rem"

                fontFamily="Merriweather"
              >
                Bob Lewis
              </GridItem>
              <GridItem
                alignSelf="start"
                gridRow="2"
                gridColumn="1"
                fontSize="0.875rem"
                color="gray.500"
              >
                bobl@wsu.edu
              </GridItem>

              {/* */}
              <GridItem gridRow="1 / 3" gridColumn="2">
                <Image
                  src={ProfileImage}
                  borderRadius="100%"
                  h="48px"
                  w="48px"
                />
              </GridItem>
            </Grid>
          </Flex>
          <GridItem
            justifySelf={"center"}
            gridRow="2"
            bg="white"
            borderRadius="0.5rem"
            d="flex"
            w="100%"
            maxW={"1280px"}

          >
            <Outlet />
          </GridItem>

        </Grid>
      </GridItem>
    </Grid>


  );
}

const SIDEBAR_ITEMS = [
  // {
  //   title: "Home",
  //   icon: MdHome,
  //   to: "/"
  // },
  {
    title: "Schedule",
    icon: MdDateRange,
    to: ""
  },
  {
    title: "Offerings",
    icon: MdLocalOffer,
    to: "Offerings"
  },
  {
    title: "Courses",
    icon: MdBook,
    to: "courses"
  },
  {
    title: "Instructors",
    icon: MdPeople,
    to: "instructors"
  },
  {
    title: "Access",
    icon: MdManageAccounts,
    to: "schedule"
  }
];

export default ViewSemester;

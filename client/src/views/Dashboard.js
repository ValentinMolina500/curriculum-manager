import {
  Grid,
  Box,
  Flex,
  Text,
  Stack,
  Heading,
} from "@chakra-ui/layout";
import {
  GridItem,
  Image,
  ScaleFade,
} from "@chakra-ui/react";

import { Outlet, NavLink, useParams } from "react-router-dom";

import {
  MdHome,
  MdDateRange,
  MdPeople
} from "react-icons/md"

import { useEffect, useState } from "react";
import ProfileImage from "../images/bob.jpeg";
import { useSelector } from "react-redux";

const SIDEBAR_ITEMS = [
  // {
  //   title: "Home",
  //   icon: MdHome,
  //   to: "/"
  // },
  {
    title: "Semesters",
    icon: MdDateRange,
    to: "/"
  },
  {
    title: "Instructors",
    icon: MdPeople,
    to: "instructors"
  },
  // {
  //   title: "Courses",
  //   icon: MdBook,
  //   to: "courses"

  // },
];

function Dashboard(props) {

  const renderSidebarItems = () => {
 

    return SIDEBAR_ITEMS.map((item) => {
      const Icon = item.icon;
      const selectedStyles =
         {
            background: "#805AD5",
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
          style={({isActive}) => isActive ? selectedStyles : notSelectedStyles}
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
    <ScaleFade initialScale={1} in={true} w="100%" h="100%">
      <Grid w="100%" h="100%" templateColumns="18rem 1fr" templateRows={"minmax(0, 1fr)"}>
        {/* Sidebar */}
        <GridItem
          zIndex={50}
          as="aside"
          bg="#fff"
          borderRight="1px solid #efefef"
        >
          <Box p="2rem 1.5rem">
            <Heading
              fontSize="1.5rem"
              as="h2"
              fontWeight="700"
              mb="1rem"
              fontFamily="Merriweather"
            >
              Curriculum
            </Heading>
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
    </ScaleFade>
  );
}

export default Dashboard;

import { Grid, Box, Flex, Text, Stack, Heading, Divider } from "@chakra-ui/layout";
import { GridItem, Icon, Image, ScaleFade, Button } from "@chakra-ui/react";


import HomeIcon from "@material-ui/icons/HomeOutlined";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import DateRangeIcon from "@material-ui/icons/DateRangeOutlined";
import AnnouncementOutlinedIcon from "@material-ui/icons/AnnouncementOutlined";
import PlusIcon from "@material-ui/icons/Add"
import ProfileImage from "../images/bob.jpeg";
const SIDEBAR_ITEMS = [
  {
    title: "Home",
    icon: HomeIcon,
    selected: true,
  },
  {
    title: "Class Schedules",
    icon: DateRangeIcon,
  },
  {
    title: "Instructors",
    icon: PeopleIcon,
  },
  {
    title: "Notifications",
    icon: AnnouncementOutlinedIcon,
  },
];

function Dashboard() {
  const renderSidebarItems = () => {
    return SIDEBAR_ITEMS.map((item) => {
      const Icon = item.icon;
      const selectedStyles = item.selected
        ? { color: "purple.500", borderLeftColor: "purple.500", borderLeftWidth: "3px" }
        : {};
      return (
        <Flex
          transition="background ease 250ms"
          cursor="pointer"
          alignItems="center"
          color="#868e96"
          p="0.5rem 0.75rem"
      
          minW="12rem"
          fontSize="1.25rem"
          
          borderRadius={"0 0.5rem 0.5rem 0"}
          _hover={{ background: "gray.100" }}
          {...selectedStyles}
        >
          <Icon fontSize="inherit" />

          <Text ml="0.5rem" fontWeight={item.selected ? "700" : "600"} fontSize="1rem">
            {item.title}
          </Text>
        </Flex>
      );
    });
  };
  return (
    <ScaleFade initialScale={0.9} in={true} w="100%" h="100%">
      <Grid w="100%" h="100%"  bg="#f9f9fd" templateColumns="18rem 1fr">

        {/* Sidebar */}
        <GridItem as="aside" bg="white" boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px">
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
            <Divider my="1rem" />
            <Button colorScheme="purple" w="100%" leftIcon={<PlusIcon />}>Add Schedule</Button>
          </Box>
        </GridItem>

        {/* Main content */}
        <GridItem as="main">
          <Grid
            rowGap="1rem"
            gridTemplateRows="auto 1fr"
            p="2rem"
            h="100%"
            w="100%"
          >
            <Flex alignItems="center">
              {/* <Heading
                as="h1"
                fontWeight="700"
                fontSize="1.75rem"
                alignSelf="end  "
                fontFamily="Merriweather"
              >
                Welcome back Bob Lewis!
              </Heading> */}

              {/* User profile items */}
              <Grid
                ml="auto"
                gridTemplateRows="auto auto"
                columnGap="1rem"
                bg="white" boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
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
                  bob.lewis@wsu.edu
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
              boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
              gridRow="2"
              bg="white"
              borderRadius="0.5rem"
              d="flex"
              justifyContent="center"
              alignItems="center"              
            >
              <Text>Nothing to see here...</Text>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </ScaleFade>
  );
}

export default Dashboard;

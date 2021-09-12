import { Grid, Box, Flex, Text, Stack, Heading } from "@chakra-ui/layout";
import { GridItem, Icon } from "@chakra-ui/react";
import HomeIcon from "@material-ui/icons/HomeOutlined"
import SchoolIcon from "@material-ui/icons/SchoolOutlined"
import DateRangeIcon from '@material-ui/icons/DateRangeOutlined';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
const SIDEBAR_ITEMS = [
  {
    title: "Home",
    icon: HomeIcon,
    selected: true
  },
  {
    title: "Class Schedule",
    icon: DateRangeIcon
  },
  {
    title: "Instructors",
    icon: SchoolIcon
  },
  {
    title: "Notifications",
    icon: AnnouncementOutlinedIcon
  }
]
function Dashboard() {
  const renderSidebarItems = () => {
    return SIDEBAR_ITEMS.map(item => {
      const selectedStyles = item.selected ? { color: "purple.700", background: "purple.100" } : {};
      return (
        <Flex cursor="pointer" alignItems="center" color="gray.500" p="0.5rem 0.75rem" minW="12rem" borderRadius="0.5rem" _hover={{ background: !item.selected && "gray.100" }} {...selectedStyles}>
          <Icon as={item.icon} boxSize={12}  mr="0.5rem" />
          <Text  fontWeight="600" fontSize="0.875rem" >{item.title}</Text>
        </Flex>
      )
    });
  }
  return (
    <Grid w="100%" h="100%" bg="#F6F9FB" templateColumns="auto 1fr">
      <GridItem as="aside" bg="white">
        <Box p="2rem 1.5rem">

        <Heading fontSize="1.5rem" as="h2" fontWeight="700"  mb="1.5rem" fontFamily="Merriweather">Curriculum</Heading>
        <Stack spacing="0.75rem">
          {renderSidebarItems()}
        </Stack>
        </Box>
      </GridItem>
    </Grid>
  );
}

export default Dashboard;
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button
} from "@chakra-ui/react";

import { MdSearch } from "react-icons/md";
import { SUBJECTS } from "../utils/constants";
import { useState } from "react";

// A table with searching and filters
export default function FilterableTable(props) {
  const { tableItems, tableColumns, onRowClick = () => 32, showFilters = false, allowSearching = true } = props;

  const [searchFilter, setSearchFilter] = useState("");
  const [subjectFilters, setSubjectFilters] = useState([]);
  const renderTableItems = () => {

    let itemsToRender  = tableItems;

    if (searchFilter) {
      itemsToRender = tableItems.filter((item) => 
        tableColumns.some(
          ({ property }) => {
            const value = item[property].toString();

            
            return value.toLowerCase().includes(searchFilter.toLowerCase().trim());
          }
        ))

    }

    if (showFilters && subjectFilters.length) {
      itemsToRender = itemsToRender.filter((item) => {
        return subjectFilters.some(subject => subject == item.CrsSubject.trim());
      })
    }
  

    return itemsToRender.map((item) => {
      return (
        <Tr
          onClick={() => onRowClick(item)}
          key={item.id}
          fontSize="1rem"
          transition="ease 250ms"
          _hover={{ bg: "#efefef", cursor: "pointer" }}
          minHeight={0}
        >
          {tableColumns.map((column) => {
            if (column.render) {
              return column.render(item, column);
            }

            return (
              <Td
                py="0.25rem"
                minHeight={0}
                key={`${item.id}${column.property}`}
                width={column.width}
              >
                {item[column.property]}
              </Td>
            );
          })}
        </Tr>
      );
    });
  };

  const renderMenuItemOptions = (subject) => {
    return <MenuItemOption value={subject}>{subject}</MenuItemOption>
  }

  return (
    <Box>
      {
        allowSearching &&
        (
          <Flex>
          <InputGroup mb="1rem" maxW="500px" w="100%">
            <InputLeftElement
              color="gray.400"
              fontSize={"1.5rem"}
              pointerEvents={"none"}
              children={<MdSearch fontSize={"inherit"} />}
            />
            <Input value={searchFilter} onChange={e => setSearchFilter(e.target.value)} />
          </InputGroup>
          {
            showFilters && (
              <Menu closeOnSelect={false} >
              <MenuButton as={Button} colorScheme='blue' ml=".75rem">
                Subject Filter
              </MenuButton>
              <MenuList minWidth='240px'>
                <MenuOptionGroup type='checkbox' onChange={(value) => setSubjectFilters(value)}>
                  {SUBJECTS.map(renderMenuItemOptions)}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
            )
          }
          </Flex>
        )
      
      
      }
    

      <Table>
        <Thead>
          <Tr>
            {tableColumns.map((column) => (
              <Th w={column.width} key={column.property}>{column.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{renderTableItems()}</Tbody>
      </Table>
    </Box>
  );
}

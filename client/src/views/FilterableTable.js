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
} from "@chakra-ui/react";

import { MdSearch } from "react-icons/md";

import { useState } from "react";

// A table with searching and filters
export default function FilterableTable(props) {
  const { tableItems, tableColumns } = props;

  const [searchFilter, setSearchFilter] = useState("");
  
  const renderTableItems = () => {

    let itemsToRender;

    if (!searchFilter) {
      itemsToRender = tableItems;
    } else {
      itemsToRender = tableItems.filter((item) => 
        tableColumns.some(
          ({ property }) => 
          item[property].includes(searchFilter)
        ))
    }

    return itemsToRender.map((item) => {
      return (
        <Tr
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

  return (
    <Box>
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
      </Flex>

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

import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'

function QuakeTable({ columns = [], items = []}) {

  console.log({ columns, items })
  const renderItems = () => {
    return items.map((item) => {
      return (
        <Tr fontSize="0.875rem">
         
          {columns.map(column => {

            // Used the supplied render func
            if (column.render !== undefined) {
              return <Td>{column.render(item[column.property])}</Td>
            }

            return <Td>{item[column.property]}</Td>
          })}
        </Tr>
      )
    });
  }

  return (
    <Table>
      <Thead>
        <Tr>
         {columns.map(column => (
           <Th>{column.title}</Th>
         ))}
        </Tr>
      </Thead>
      <Tbody>
          {renderItems()}
      </Tbody>
    </Table>
  );
}

export default QuakeTable;
import React from 'react'
import { Checkbox, TableBody, TableCell, TableRow } from '@material-ui/core'
import formatTableCell from './ItemTableCells'

const ItemTableBody = props => {
  const { itemsMetadata, tableItems, handleSelectOne, selectedItems } = props

  return (
    <TableBody>
      {tableItems.map(item => {
        const rowSelected = selectedItems.indexOf(item.id) !== -1
        return (
          <TableRow hover key={item.id} selected={rowSelected}>
            <TableCell padding="checkbox">
              <Checkbox
                checked={rowSelected}
                color="primary"
                onChange={event => handleSelectOne(event, item.id)}
                value="true"
              />
            </TableCell>
            {itemsMetadata.map(data => <TableCell key={data.label}>{formatTableCell(item, data)}</TableCell>)}
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default ItemTableBody

import React from 'react'
import { Checkbox, TableBody, TableCell, TableRow } from '@material-ui/core'
import formatTableCell from './ItemTableCells'

const ItemTableBody = props => {
  const { itemTableMetadata, tableItems, handleSelectOne } = props

  return (
    <TableBody>
      {tableItems.map(item => {
        return (
          <TableRow hover key={item.id} selected={item.selected}>
            <TableCell padding="checkbox">
              <Checkbox
                checked={item.selected}
                color="primary"
                onChange={event => handleSelectOne(event, item)}
                value="true"
              />
            </TableCell>
            {itemTableMetadata.map(data => <TableCell key={data.label}>{formatTableCell(item, data)}</TableCell>)}
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default ItemTableBody

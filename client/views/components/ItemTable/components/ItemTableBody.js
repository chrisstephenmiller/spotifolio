import React from 'react'
import { Checkbox, TableBody, TableCell, TableRow } from '@material-ui/core'
import formatTableCell from './ItemTableCells'

const ItemTableBody = ({ itemTableConfig, tableItems, handleSelectOne }) => {
  return (
    <TableBody>
      {tableItems.map(item => {
        return (
          <TableRow hover key={item.id} selected={item.selected}>
            <TableCell padding="checkbox">
              <Checkbox
                checked={item.selected}
                disabled={!item.selectable}
                color="primary"
                onChange={event => handleSelectOne(event, item)}
                value="true"
              />
            </TableCell>
            {itemTableConfig.labels.map(label => (
              <TableCell key={label.name}>{formatTableCell(item, label)}</TableCell>
            ))}
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default ItemTableBody

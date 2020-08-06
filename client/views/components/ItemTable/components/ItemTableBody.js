import React from 'react'
import { Checkbox, TableBody, TableCell, TableRow } from '@material-ui/core'
import { PercentChange, AvatarAndName, DateCell } from './ItemTableCells'

const formatDataForTableCells = (item, data) => {
  const tableCellFormats = {
    avatar: AvatarAndName,
    percent: PercentChange,
    date: DateCell,
    default: () => data.value(item)
  }

  const cellFormat = tableCellFormats[data.format || 'default']

  return data.format === 'avatar' ? cellFormat(data.value(item), data.imageUrl(item)) : cellFormat(data.value(item))
}

const ItemTableBody = props => {
  const { itemData, tableItems, handleSelectOne, selectedItems } = props

  return (
    <TableBody>
      {tableItems.map(item => {
        return (
          <TableRow hover key={item.id} selected={selectedItems.indexOf(item.id) !== -1}>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selectedItems.indexOf(item.id) !== -1}
                color="primary"
                onChange={event => handleSelectOne(event, item.id)}
                value="true"
              />
            </TableCell>
            {itemData.map(data => <TableCell key={data.label}>{formatDataForTableCells(item, data)}</TableCell>)}
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default ItemTableBody

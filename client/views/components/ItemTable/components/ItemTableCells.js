import React from 'react'
import moment from 'moment'

import { Avatar, Typography } from '@material-ui/core'

const PercentChange = percent => {
  const color = percent > 0 ? 'green' : percent < 0 ? 'red' : 'grey'
  return (
    <Typography variant="h6" style={{ fontWeight: 'bold', color }}>
      {percent}%
    </Typography>
  )
}

const AvatarAndName = (name, images) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar style={{ marginRight: 8 }} src={images.length ? images.slice(-1)[0].url : null}>
        {name.split(' ').map(([i]) => i)}
      </Avatar>
      <Typography variant="h5">{name}</Typography>
    </div>
  )
}

const DateCell = date => (date ? moment(+date).format('M/DD/YYYY') : '-')

const Default = value => value

const cellFormats = {
  avatar: AvatarAndName,
  percent: PercentChange,
  date: DateCell,
  default: Default
}

const formatTableCell = (item, cellConfig) => {
  const { name, format } = cellConfig
  const cellValue = item[name.toLowerCase()]
  const cellFormat = cellFormats[format || 'default']
  return cellFormat(cellValue, item.images)
}

export default formatTableCell

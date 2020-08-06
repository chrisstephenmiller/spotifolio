import React from 'react'
import moment from 'moment'

import { Avatar, Typography } from '@material-ui/core'

export const PercentChange = percent => {
  const color = percent > 0 ? 'green' : percent < 0 ? 'red' : 'grey'
  return (
    <Typography variant="h6" style={{ fontWeight: 'bold', color }}>
      {percent}%
    </Typography>
  )
}

export const AvatarAndName = (name, imageUrl) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar style={{ marginRight: 8 }} src={imageUrl}>
        {name.split(' ').map(([i]) => i)}
      </Avatar>
      <Typography variant="h5">{name}</Typography>
    </div>
  )
}

export const DateCell = date => (date ? moment(+date).format('M/DD/YYYY') : '-')

export const Default = data => data

const Query = require('./query')
const Mutation = require('./mutation')

const Asset = {
  __resolveType(obj) {
    return obj.tracks ? 'Album' : obj.genres ? 'Artist' : 'Track'
  }
}

module.exports = { Asset, Query, Mutation }

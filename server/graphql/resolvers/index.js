const Query = require('./query')
const Mutation = require('./mutation')

const Asset = {
  __resolveType(obj, context, info) {
    return obj.genres ? 'Artist' : 'Track'
  }
}

module.exports = { Asset, Query, Mutation }

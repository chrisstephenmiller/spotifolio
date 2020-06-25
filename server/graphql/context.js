const { Session } = require('../db/models')

module.exports = ({ req }) => {
  const { graphql, host } = req.headers
  const localDev = graphql && host === 'localhost:' + process.env.PORT
  return localDev ? playground(graphql) : userAuth(req)
}

const userAuth = req => ({
  userId: req.user.id,
  accessToken: req.session.accessToken
})

const playground = async graphql => {
  try {
    const session = await Session.findByPk(graphql)
    const data = JSON.parse(session.data)
    return {
      userId: data.passport.user,
      accessToken: data.accessToken
    }
  } catch (err) {
    console.log(err, '<<< BAD SESSION >>>')
  }
}

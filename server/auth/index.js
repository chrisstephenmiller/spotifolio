const router = require('express').Router()

router.post('/logout', (req, res) => {
  req.logOut()
  // req.session.destroy() // destroy sessions on logout
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/spotify', require('./spotify'))

module.exports = router

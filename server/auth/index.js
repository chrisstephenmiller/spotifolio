const router = require('express').Router()

router.post('/logout', async (req, res) => {
  req.logOut()
  // req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/spotify', require('./spotify'))

module.exports = router

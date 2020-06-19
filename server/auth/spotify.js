const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.log('Spotify client ID / secret not found. Skipping Spotify OAuth.')
} else {
  const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_REDIRECT_URI,
    passReqToCallback: true
  }

  const strategy = new SpotifyStrategy(
    spotifyConfig,
    async (req, accessToken, refreshToken, expiresIn, profile, done) => {
      req.session.accessToken = accessToken
      req.session.refreshToken = refreshToken
      const spotifyId = profile.id
      const name = profile.displayName
      try {
        const [user] = await User.findOrCreate({where: {name}})
        return done(null, user)
      } catch (err) {
        done(err)
      }
    }
  )
  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('spotify', {
      scope: ['playlist-modify-private']
    })
  )

  router.get(
    '/callback',
    passport.authenticate('spotify', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}

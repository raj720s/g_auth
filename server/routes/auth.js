const router = require('express').Router()
const passport = require('passport')

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      err: false,
      msg: 'logged in success fully',
      user: req.user,
    })
  } else {
    res.status(403).json({
      err: true,
      msg: 'not auth',
    })
  }
})

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    err: true,
    msg: 'auth failed',
  })
})

router.get('/google', passport.authenticate('google', ['profile', 'email']))

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed',
  })
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect(process.env.CLIENT_URL)
})

export default router

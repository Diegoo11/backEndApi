const User = require('../models/user')
const Coment = require('../models/coment')
const Message = require('../models/message')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config('./.env');

const key = process.env.KEY;

exports.index_get = (req, res, next) => {
  Message.find({}).populate('user').exec((err, message) => {
    if(err) {return next(err)}
    res.json(message)
  }) 
};

exports.index_post = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if(err) {return next(err)}
    res.json(user)
  })
};

exports.login = (req, res, next) => {
  const { username, password } = req.body
  User.findOne({username}).exec((err, user) => {
    if(user === null) {
      res.json({error: "Password or username invalid."})
      return next()
    }
    if(user.password != password) {
      res.json({error: "Password or username invalid."})
      return next()
    } else {
      const userForToken = {
        id: user._id,
        username: user.username
      }
      const token = jwt.sign(userForToken, key, {expiresIn: 60*60*3})
      res.json({res: "Welcome " + user.username, token})
    }
  })
};

exports.signin = (req, res, next) => {
  const { username, password, email } = req.body
  User.findOne({username}).exec((err, user) => {
    if(user != null) {
      res.json({error: "Password or username invalid."})
      return next()
    }
    const newUser = new User({
      username,
      email,
      password,
      admin: false
    })

    newUser.save((err, theUser) => {
      if(err) {return next(err)}
      const userForToken = {
        id: theUser._id,
        username: theUser.username
      }
      const token = jwt.sign(userForToken, key, {expiresIn: 60*60*3})
      res.json({res: "Welcome " + theUser.username, token})
    })
  })
}
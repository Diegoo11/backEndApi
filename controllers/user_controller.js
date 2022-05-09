const User = require('../models/user')
const Coment = require('../models/coment')
const Message = require('../models/message')

exports.user_get = (req, res, next) => {
  User.find({}, 'username email').exec((err, user) => {
    if(err) {return next(err)}
    res.json(user);
  });
};

exports.user_create_post = (req, res, next) => {
  const { username, email, password } = req.body;
  const respuesta = {username, email, password};
  const user = new User({
    username: respuesta.username,
    email: respuesta.email,
    password: respuesta.password,
    admin: false
  });
  User.findOne({username: user.username}).exec((err, result) => {
    if(err) {return next(err)}
    if(result) {
      res.json({
        error: "El username ya existe, porfavor escoge otro"
      })
    } else {
      user.save((err) => {
        if(err) {return next(err)}
      })
    };
  });

};
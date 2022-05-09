const User = require('../models/user')
const Coment = require('../models/coment')
const Message = require('../models/message')


exports.message_get = (req, res, next) => {
  Message.find({}).populate('user').exec((err, message) => {
    if(err) {return next(err)}
    res.json(message)
  })
};

exports.message_create_post = (req, res, next) => {
  const {text, title} = req.body
  const info = {text, title}
  const message = new Message({
    user: req.userId,
    date: new Date(),
    text: info.text,
    title: info.title
  })

  message.save(err => {
    if(err) {return next(err)}
    res.json({res: "Message created"})
  })

};

exports.message_delete_post = (req, res, next) => {
  const { uid } = req.body
  Message.findOne({_id: uid}).exec((err, message) => {
    if(err) {return next(err)}
    if(!message) {
      res.json({error: 'Message not found'})
    } else {
      Message.findByIdAndRemove(message._id, function deleteMessage(err) {
        if(err) {return next(err)}
        res.json({res: 'Message Removed'})
      })
    }
  })
};

exports.message_detail = (req, res, next) => {
  Message.findById(req.params.id).populate('user').exec((err, message) => {
   if(err) {return next(err)}
    Coment.find({message: req.params.id}).populate('user').exec((err, coment) => {
      if(err) {return next(err)}
      res.json({
        message,
        coment
      })
    })
  })
}
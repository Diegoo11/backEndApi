const User = require('../models/user')
const Coment = require('../models/coment')
const Message = require('../models/message')


exports.coment_create_post = (req, res, next) => {
  const { text, message } = req.body;
  const info = { text, message };
  const coment = new Coment({
    user: req.userId,
    date: new Date(),
    text: info.text,
    message: info.message
  })

  coment.save(err => {
    if(err) {return next(err)}
    res.json({res: 'Coment created'})
  })
};

exports.coment_delete_get = (req, res, next) => {
  const { uid } = req.body;
  Coment.findOne({_id: uid}).exec((err, coment) => {
    if(err) {return next(err)}
    if(!coment) {
      res.json({error: 'Coment not found'})
    } else {
      Coment.findByIdAndRemove(coment._id, function deleteComent(err) {
        if(err) {return next(err)}
        res.json({res: 'Coment Removed'})
      })
    }
  })
};

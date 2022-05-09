const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authorization = req.get('authorization');
  let token = ''

  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.decode(token, process.env.KEY)

  if(!token || !decodedToken) {
    return res.json({error: 'token missing or invalid'})
  }

  const { id: userId } = decodedToken

  req.userId = userId

  next()
}
const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    const {error, value} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Provide valid Email Address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Password failed to match given rules:
                <br>
                1. It must contains given characters: lower case, upper case, numerics
                <br>
                2. It must be minimum 8 characters and maximum 32 characters
            `
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid Registration Info'
          })
      }
    }else {
      next()
    }
  }
}

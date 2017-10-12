const {History, User, Song} = require('../models')
const _ = require('lodash')
module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const historys = await History.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Song
          }
        ]
      }).map(history => history.toJSON())
        .map(history => _.extend({}, history.Song, history))
      res.send(_.uniqBy(historys, history => history.SongId))
    } catch (err) {
      res.status(500).send({
        error: 'Error in fetching historys'
      })
      console.log(err)
    }
  },
  async post (req, res) {
    try {
      const UserId = req.user.id
      const {SongId} = req.body
      const history = await History.create({
        SongId: SongId,
        UserId: UserId
      })
      res.send(history)
    } catch (err) {
      res.status(500).send({
        error: 'Error in create song history'
      })
      console.log(err)
    }
  }
}

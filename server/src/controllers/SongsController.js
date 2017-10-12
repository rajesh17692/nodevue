const {Song} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let songs = null
      const search = req.query.search
      if(search){
        songs = await Song.findAll({
          where: {
            $or: [
              'title', 'album', 'artist', 'genre'
            ].map(key => ({
              [key]: {
                like: `%${search}%`
              }
            }))
          }
        })
      }else {
        songs = await Song.findAll({ limit:10 })
      }


      res.send(songs)
    } catch (err) {
      res.status(500).send({
        error: 'Error in fetching songs'
      })
      console.log(err)
    }
  },
  async show (req, res) {
    try {
      const song = await Song.findById(req.params.songId)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'Error in view song'
      })
      console.log(err)
    }
  },
  async put (req, res) {
    try {
      const song = await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'Error in song updation'
      })
      console.log(err)
    }
  },
  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'Error in song creation'
      })
      console.log(err)
    }
  }
}

const {Bookmark, User, Song} = require('../models')
const _ = require('lodash')
module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const {songId} = req.query
      const where = {
        UserId: userId
      }
      if(songId){
        where.SongId = songId
      }
      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [
          {
            model: Song
          }
        ]
      }).map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend({
          bookmarkId: bookmark.id
        }, bookmark.Song, bookmark))
      res.send(bookmarks)
    } catch (err) {
      res.status(500).send({
        error: 'Error in fetching songs'
      })
      console.log(err)
    }
  },
  async post (req, res) {
    try {
      const UserId = req.user.id
      const {SongId} = req.body
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: SongId,
          UserId: UserId
        }
      })
      if(bookmark){
        return res.status(400).send({
          error: 'Already bookmarked'
        })
      }
      const newBookmark = await Bookmark.create(req.body)
      res.send(newBookmark)
    } catch (err) {
      res.status(500).send({
        error: 'Error in create song bookmark'
      })
      console.log(err)
    }
  },
  async delete (req, res) {
    try {
      const UserId = req.user.id
      const {bookmarkId} = req.params
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: UserId
        }
      })
      if(!bookmark){
        return res,status(403).send({
          error: 'Invalid Access'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'Error in delete song bookmark'
      })
      console.log(err)
    }
  }
}

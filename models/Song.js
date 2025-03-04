const mongoose = require('mongoose')

const SongSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  cover: String,
  userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  favorite: Boolean,
})

module.exports = mongoose.model('Song', SongSchema)
const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: String,
    password: String
  })

  const SongSchema = new mongoose.Schema(
    {
    title: String,
    artist: String,
    album: String,
    cover: String,
    userId: String,
    favorite: Boolean
  }
)

module.exports = mongoose.model('User', UserSchema)
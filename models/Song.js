const mongoose = require('mongoose')

const SongSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  cover: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },    //userId is the fieldname, & this line tells MongoDB to expect an ObjectID, ObjectId is the ID type for MongoDB docs, ref is to set up a reference to the user collection ??? still a little lost on this specific part, then required being set to true makes it mandatory
  favorite: Boolean,   //lets me know if a user favorited the song or not
})

module.exports = mongoose.model('Song', SongSchema)
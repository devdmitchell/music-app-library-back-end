const axios = require('axios')

const addSong = async (req, res) => {
  const song = new Song({ ...req.body, userId: req.userId });
  await song.save()
  res.json(song)
}

const getSongs = async (req, res) => {
  const songs = await Song.find({ userId: req.userId });
  res.json(songs)
}

const updateSong = async (req, res) => {
  const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(song)
}

const deleteSong = async (req, res) => {
  await Song.findByIdAndDelete(req.params.id)
  res.json({ message: 'Song deleted' })
}

module.exports = { searchSongs, addSong, getSongs, updateSong, deleteSong }

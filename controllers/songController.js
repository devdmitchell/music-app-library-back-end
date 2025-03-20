const Song = require('../models/Song')

const addSong = async (req, res) => {
  const song = new Song({ ...req.body, userId: req.userId })
  await song.save()
  res.json(song)
}

const getSongs = async (req, res) => {
  const query = req.query.search
  const filter = { userId: req.userId }
  if (query) {
    filter.title = query
  }
  try {
    const songs = await Song.find(filter)
    res.json(songs)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs', error: error.message })
  }
}

const updateSong = async (req, res) => {
  const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(song)
}

const deleteSong = async (req, res) => {
  await Song.findByIdAndDelete(req.params.id)
  res.json({ message: 'Song deleted' })
}

module.exports = { addSong, getSongs, updateSong, deleteSong }

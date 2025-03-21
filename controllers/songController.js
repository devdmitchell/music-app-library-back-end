const Song = require('../models/Song')

const addSong = async (req, res) => {  
  try {
    const song = new Song({ ...req.body, userId: req.userId })    //creates a new song using the data from the request body and attaches the current users id
    await song.save()    //saves song to MongoDB
    res.json(song)     //sends the new song back in response
  } catch (error) {         //catches any error and sends response
    res.status(400).json({ message: 'Error adding song', error: error.message })
  }
}

const getSongs = async (req, res) => {
  const query = req.query.search      //looks for a search term passed in the URL like /get-all-songs?search=tupac
  const filter = { userId: req.userId }        //filters to only songs created by the user thats logged-in
  if (query) {        //if the search term exists expand the filter to include matches in title or artist (case-insensitive)
    filter.$or = [
      { title: { $regex: query, $options: 'i' } },
      { artist: { $regex: query, $options: 'i' } },
    ]
  }
  try {
    const songs = await Song.find(filter)    //fetches & returns songs that match the filter
    res.json(songs)
  } catch (error) {        //catches any error and sends response
    res.status(500).json({ message: 'Error fetching songs', error: error.message })
  }
}

const getSongById = async (req, res) => {
  try {
    const song = await Song.findOne({ _id: req.params.id, userId: req.userId })   // find the song by ID but only if it belongs to the user
    if (!song) return res.status(400).json({ message: 'Song not found' })   //throws error if not found
    res.json(song)   //returns the song
  } catch (error) {        //catches any error and sends response
    res.status(500).json({ message: 'Error fetching song', error: error.message })
  }
}

const updateSong = async (req, res) => {
  try {
    const song = await Song.findOneAndUpdate(      //find & update the song by id
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }        //returns updated version
    )
    if (!song) return res.status(400).json({ message: 'Song not found or unauthorized' })  //returns error if nothing was updated
    res.json(song)  //returns updated song
  } catch (error) {         //catches any error and sends response
    res.status(500).json({ message: 'Error updating song', error: error.message })
  }
}

const deleteSong = async (req, res) => {
  try {
    const result = await Song.findOneAndDelete({ _id: req.params.id, userId: req.userId })    //deletes the song by id
    if (!result) return res.status(400).json({ message: 'Song not found or unauthorized' })   //throws error if it didn't exist
    res.json({ message: 'Song deleted' })   //responds with confirmation
  } catch (error) {                   //catches any error and sends response
    res.status(500).json({ message: 'Error deleting song', error: error.message })
  }
}

const toggleFavorite = async (req, res) => {
  try {
    const song = await Song.findOne({ _id: req.params.id, userId: req.userId })   //finds the song owned by the user
    if (!song) return res.status(400).json({ message: 'Song not found' })      //throw error if not found

    song.favorite = !song.favorite  //flips the favorite status
    await song.save()          //saves it
    res.json({ message: 'Favorite status updated', favorite: song.favorite })    //returns the new favorite value
  } catch (error) {           //catches any error and sends response
    res.status(500).json({ message: 'Error toggling favorite', error: error.message })
  }
}

module.exports = { addSong, getSongs, getSongById, updateSong, deleteSong, toggleFavorite }




// this controller creates songs & ties them with users
// ensures users can only access their data
// adds search, update, delete & favorite toggling
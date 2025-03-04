const axios = require('axios')
const { LAST_FM_API_KEY, LAST_FM_URL } = process.env

exports.searchSongs = async (req, res) => {
  try {
    const { query } = req.query
    const response = await axios.get(`${LAST_FM_URL}?method=track.search&track=${query}&api_key=${LAST_FM_API_KEY}&format=json`)
    const tracks = response.data.results.trackmatches.track.map(track => ({
      title: track.name,
      artist: track.artist,
      album: '',
      cover: track.image?.[2]['#text'] || '',
    }))
    res.json(tracks)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from Last.fm', error: error.message })
  }
}
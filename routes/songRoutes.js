const express = require('express')
const { addSong, getSongs, getSongById, updateSong, deleteSong, toggleFavorite } = require('../controllers/songController')
const auth = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/add-song', auth, addSong)                          //adds new song
router.get('/get-all-songs', auth, getSongs)     //gets all songs
router.get('/:id', auth, getSongById)               
router.put('/update-song-by-id/:id', auth, updateSong)     //updates song using id
router.delete('/delete-song-by-id/:id', auth, deleteSong)     //deletes song using id
router.patch('/toggle-favorite/:id', auth, toggleFavorite)

// added auth in routes so its protected by the auth middleware

module.exports = router
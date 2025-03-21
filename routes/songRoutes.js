const express = require('express')
const { addSong, getSongs, getSongById, updateSong, deleteSong } = require('../controllers/songController')
const auth = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/add-song', auth, addSong)                          //adds new song
router.get('/get-all-songs', auth, getSongs)     
router.get('/:id', auth, getSongById)               //gets all songs
router.put('/update-song-by-id/:id', auth, updateSong)         //updates song using id
router.delete('/delete-song-by-id/:id', auth, deleteSong)     //deletes song using id

// added auth in routes so its protected by the auth middleware

module.exports = router
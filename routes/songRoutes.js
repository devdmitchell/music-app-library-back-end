const express = require('express')
const { addSong, getSongs, updateSong, deleteSong } = require('../controllers/songController')
const auth = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/add-song', auth, addSong)
router.get('/get-all-songs', auth, getSongs)
router.put('/update-song-by-id/:id', auth, updateSong)
router.delete('/delete-song-by-id/:id', auth, deleteSong)

module.exports = router
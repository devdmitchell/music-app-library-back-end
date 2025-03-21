const express = require('express')
const { searchSongs } = require('../controllers/searchController')
const router = express.Router()

// GET /api/search?query=yourQuery
router.get('/', searchSongs)

module.exports = router
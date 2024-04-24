const express = require('express')

const path = require('path')
const router = express.Router()
const root = path.join(__dirname, '..', 'public')

router.get('/', (_, response) => {
	response.sendFile('index.html', { root })
})

module.exports = router
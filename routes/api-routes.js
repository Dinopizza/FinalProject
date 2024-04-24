const express = require('express')
// const { MongoClient, ObjectId } = require('mongodb')

const router = express.Router()

const { url } = require('../secrets/mongodb.json')
// const client = new MongoClient(url)

router.get("/", (_, response) => {
    response.json("Hi")
})

router.get("/api/menu/:id", async (request, response) => {
    const { id } = request.params
})

router.get("/api/events/:id", async (_, response) => {
    const { id } = request.params

})

router.get("/contact", async (_, response) => {
    const { id } = request.params

})

router.get("/admin")

module.exports = router
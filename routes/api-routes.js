const express = require('express')
// const { MongoClient, ObjectId } = require('mongodb')

const router = express.Router()

const { url } = require('../secrets/mongodb.json')
// const client = new MongoClient(url)

router.get("/", (_, response) => {
    response.json("Hi")
})

router.get("/api/menu/:id", async (_, response) => {

})

router.get("/api/events/:id", async (_, response) => {

})

router.get("/contact", async (_, response) => {

})

router.get("/admin")

module.exports = router
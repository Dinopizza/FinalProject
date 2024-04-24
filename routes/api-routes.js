const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const router = express.Router()

const { url } = require('../secrets/mongodb.json')
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

router.get("/", (_, response) => {
    response.json("Hi")
})

router.get("/menu/:id", async (request, response) => {
    const { id } = request.params
    const collection = await getCollection('FoodTruck', 'menu')
    const menuItem = await collection.find().toArray()
    //const menuItem = await collection.findOne({ "_id": new ObjectId(id) })
    response.json(menuItem[id])
})

router.get("/events/:id", async (_, response) => {
    const { id } = request.params
})

router.get("/contact", async (_, response) => {
    const { id } = request.params
})

router.get("/admin")

module.exports = router
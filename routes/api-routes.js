const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const router = express.Router()
const path = require('path')
const root = path.join(__dirname, '..', 'public')

const { url } = require('../secrets/mongodb.json')
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

router.get("/", (_, response) => {
    response.json("Hi")
})

//https://fvtc.software/appel/javascript/assignment-9

//#region Menu/
router.get("/menu/", async (request, response) => { //This route should return a list of all items on the menu. The response should be a JSON array of items. The items should include an id, name, description, and price.
    const collection = await getCollection('FoodTruck', 'menu')
    const menuItem = await collection.find().toArray()
    response.json(menuItem)
})

router.post("/menu/", async (request, response) => { //This route should allow the food truck owner to add a new item to the menu. The request body should contain the item name, description, and price.
    const collection = await getCollection('FoodTruck', 'menu')
    const { name, description, price } = request.body
    collection.insertOne({ name: name, description: description, price: price})
    response.json(request.body)
})

router.put("/menu/:id", async (request, response) => { //This route should allow the food truck owner to update an item on the menu. The route should accept an item ID as a parameter and update the item's name, description, and price.
    const { id } = request.params
    const collection = await getCollection('FoodTruck', 'menu')
    const { name, description, price } = request.body
    console.log(request.body, request.params)
    collection.updateOne({_id: new ObjectId(id)}, {$set:{name: name, description: description, price: price}})
    response.json(request.body)
})

router.delete("/menu/:id", async (request, response) => { //This route should allow the food truck owner to delete an item from the menu. The route should accept an item ID as a parameter and remove the item from the menu.
    const { id } = request.params
    const collection = await getCollection('FoodTruck', 'menu')
    collection.findOneAndDelete( { _id: new ObjectId(id) } )
})
//#endregion

//#region Events/
router.get("/events/", async (_, response) => {
    const collection = await getCollection('FoodTruck', 'events')
    const eventItem = await collection.find().toArray()
    response.json(eventItem)
})

router.get("/events/:id", async (request, response) => {
    const { id } = request.params
    const collection = await getCollection('FoodTruck', 'events')
    const eventItem = await collection.findOne({ _id: new ObjectId(id)})
    response.json(eventItem)
})

router.post("/events/", async (request, response) => { //This route should allow the food truck owner to add a new event. The request body should contain the event name, location, dates, and hours.
    const collection = await getCollection('FoodTruck', 'events')
    const { name, location, dates, hours } = request.body
    collection.insertOne({ name: name, location: location, dates: dates, hours: hours})
    response.json(request.body)
})

router.put("/events/:id", async (request, response) => { //This route should allow the food truck owner to update an event. The route should accept an event ID as a parameter and update the event's name, location, dates, and hours.
    const { id } = request.params
    const collection = await getCollection('FoodTruck', 'events')
    const { name, location, dates, hours } = request.body
    console.log(request.body, request.params)
    collection.updateOne({_id: new ObjectId(id)}, {$set:{name: name, location: location, dates: dates, hours: hours}})
    response.json(request.body)
})

router.delete("/events/:id", async (request, response) => { //This route should allow the food truck owner to delete an event. The route should accept an event ID as a parameter and remove the event from the list of events.
    const { id } = request.params
    const collection = await getCollection('FoodTruck', 'events')
    collection.findOneAndDelete( { _id: new ObjectId(id) } )
})
//#endregion

module.exports = router
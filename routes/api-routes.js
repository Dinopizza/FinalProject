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
    // const collection = await getCollection('FoodTruck', 'menu')
    const { name, description, price } = request.body
    console.log(name, description, price)
    response.json(request.body)
})

router.put("/menu/:id", async (request, response) => { //This route should allow the food truck owner to update an item on the menu. The route should accept an item ID as a parameter and update the item's name, description, and price.

})

router.delete("/menu/:id", async (request, response) => { //This route should allow the food truck owner to delete an item from the menu. The route should accept an item ID as a parameter and remove the item from the menu.
    const { id } = request.params
    const collection = await getCollection('FoodTruck', 'events')
    collection.findOneAndDelete( { _id: id } )
})
//#endregion

//#region Events/
router.get("/events/", async (_, response) => { //This route should return a list of all events where the food truck will be located. The response should be a JSON array of events. The events should include an id, and the name of the event.
    const { id } = request.params
    const collection = await getCollection('FoodTruck', 'events')
    const eventItem = await collection.find().toArray()
    response.json(eventItem)
})

router.get("/events/:id", async (_, response) => { //This route should return a single event by ID. The route should accept an event ID as a parameter and return the event's name, location, dates, and hours.
    const { id } = request.params
    const collection = await getCollection('FoodTruck', 'events')
    const eventItem = await collection.find().toArray()
    response.json(eventItem[id])
})

router.post("/events/", async (_, response) => { //This route should allow the food truck owner to add a new event. The request body should contain the event name, location, dates, and hours.
    
})

router.put("/events/:id", async (_, response) => { //This route should allow the food truck owner to update an event. The route should accept an event ID as a parameter and update the event's name, location, dates, and hours.
})

router.delete("/events/:id", async (_, response) => { //This route should allow the food truck owner to delete an event. The route should accept an event ID as a parameter and remove the event from the list of events.

})
//#endregion

//#region Other/
router.get("/contact", async (_, response) => { //Create a contact page that displays the contact information for the food truck. Include a (non-working) contact form.
    response.sendFile('contact.html', { root })
})

router.get("/admin", async (_, response) => { //Create an admin page that allows the food truck owner to manage the menu and events. The admin page should include forms to add, update, and delete menu items and events.
    response.sendFile('admin.html', { root })
})
//#endregion

module.exports = router
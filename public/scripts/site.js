const getMenuItems = async () => {
	const response = await fetch('/api/menu')
	const MenuItems = await response.json()

    MenuItems.forEach(Item => {
        const text = document.createElement('div')
        text.classList.add('wrapper');
        text.setAttribute('style', 'white-space: pre;');
        text.textContent = `Name: ${Item.name}\r\n`
        text.textContent += `Description: ${Item.description}\r\n`
        text.textContent += `Price: ${Item.price}\r\n`

        const currentDiv = document.getElementById("menu")
        document.body.insertBefore(text, currentDiv)
    });
}

const getEventItems = async () => {
	const response = await fetch('/api/events')
	const EventItems = await response.json()
    let count = 0
    EventItems.forEach(Item => {
        const text = document.createElement('div')
        text.classList.add('wrapper');
        text.setAttribute('style', 'white-space: pre;');
        count++
        text.textContent = `${count} - Name: ${Item.name}\r\n`
        const button = document.createElement('button')
        button.textContent = "View"
        button.onclick = async () => {
            const response = await fetch(`/api/events/${Item._id}`)
	        const eventItems = await response.json()
            text.removeChild(button)
            text.textContent += `Location: ${eventItems.location}\r\n`
            text.textContent += `Dates: ${eventItems.dates}\r\n`
            text.textContent += `Hours: ${eventItems.hours}`
        }
        
        text.appendChild(button)
        const currentDiv = document.getElementById("events")
        document.body.insertBefore(text, currentDiv)
    });
}

const getAdminIds = async () => {
    const menuResponse = await fetch('/api/menu')
	const MenuItems = await menuResponse.json()
    const eventsResponse = await fetch('/api/events')
	const EventItems = await eventsResponse.json()

    const div = document.createElement("div")
    div.classList.add("wrapper")
    const menuTitle = document.createElement('h3')
    menuTitle.textContent = "Menu ID's:"
    const eventTitle = document.createElement('h3')
    eventTitle.textContent = "Event ID's:"
    
    div.appendChild(menuTitle)
    MenuItems.forEach(Item => {
        text = document.createElement("p")
        text.textContent += `${Item.name} - ${Item._id}`
        div.appendChild(text)
    })
    div.appendChild(eventTitle)
    EventItems.forEach(Item => {
        text = document.createElement("p")
        text.textContent += `${Item.name} - ${Item._id}`
        div.appendChild(text)
    })
    const currentDiv = document.getElementById("im")
    document.body.insertBefore(div, currentDiv)
}

const Admin_AddItem = async () => {
    const form = document.getElementById("AddItem")
    const o = {}
    new FormData(form).forEach( (value, key) => o[ key ] = value)
    fetch( `/api/menu/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( o )
    })
    .then( raw => raw.json())
    .then( data => console.log(data))
    .catch( err => console.log(err))
}
const Admin_UpdateItem = async () => {
    const form = document.getElementById("UpdateItem")
    const o = {}
    new FormData(form).forEach( (value, key) => o[ key ] = value)
    fetch( `/api/menu/${form.id.value}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( o )
    })
    .then( raw => raw.json())
    .then( data => console.log(data))
    .catch( err => console.log(err))
}
const Admin_DeleteItem = async () => {
    const form = document.getElementById("DeleteItem")
    fetch( `/api/menu/${form.id.value}`, {
        method: "DELETE"
    })
    .then( raw => raw.json())
    .then( data => console.log(data))
}
///////////
const Admin_AddEvent = async () => {
    const form = document.getElementById("AddEvent")
    const o = {}
    new FormData(form).forEach( (value, key) => o[ key ] = value)
    fetch( `/api/events/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( o )
    })
    .then( raw => raw.json())
    .then( data => console.log(data))
    .catch( err => console.log(err))
}
const Admin_UpdateEvent = async () => {
    const form = document.getElementById("UpdateEvent")
    const o = {}
    new FormData(form).forEach( (value, key) => o[ key ] = value)
    fetch( `/api/events/${form.id.value}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( o )
    })
    .then( raw => raw.json())
    .then( data => console.log(data))
    .catch( err => console.log(err))
}
const Admin_DeleteEvent = async () => {
    const form = document.getElementById("DeleteEvent")
    fetch( `/api/events/${form.id.value}`, {
        method: "DELETE"
    })
    .then( raw => raw.json())
    .then( data => console.log(data))
}
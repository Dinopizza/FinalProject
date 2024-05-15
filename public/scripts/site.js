
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
	const MenuItems = await response.json()
    let count = 0
    MenuItems.forEach(Item => {
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
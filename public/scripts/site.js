
const getMenuItems = async () => {
    console.log("yes?")
	const response = await fetch('api/menu')
    console.log("YES")
	const MenuItems = await response.json()

    MenuItems.forEach(Item => {
        const text = document.createElement("div")
        text.textContent = { Item }
    });

}

const getEventItems = async () => {
	const response = await fetch(`/api/menu`)
	const MenuItems = await response.json()

    EventItems.forEach(Item => {
        const text = document.createElement("div")
    });

}


getMenuItems()

// document.querySelector('.menu button').addEventListener('click', getMenuItems)
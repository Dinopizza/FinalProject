const express = require("express")
const path = require('path')

const app = express()
const root = path.join(__dirname, 'public')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'))
app.use("/", require('./routes/static'))
app.use("/api", require('./routes/api-routes'))


app.listen(port, () => console.log(`Server running: http://localhost:${port}`))
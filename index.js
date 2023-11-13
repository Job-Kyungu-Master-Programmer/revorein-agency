const express = require('express')
const app = express()


app.get('/', (request,response) => {
     response.end('<h2>Node js </h2>')
})

const PORT= process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})
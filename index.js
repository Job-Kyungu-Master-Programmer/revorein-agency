require('dotenv').config()
const express = require('express')
const app = express()
// const cors = require('cors')
const Model = require('./model/Model')
// MiddleWare 
app.use(cors())
// app.use(express.static('build'))
app.use(express.json())

const requestLoogger = ( request, response, next ) => {
     console.log('Method' , request.method)
     console.log('Path' , request.path)
     console.log('Body' , request.body)
     next();
}

const unkownEndPoint = ( request,response ) => {
    return  response.status(404).end( '<h1>Error 404, page not found</h1>')
}
app.use(requestLoogger)
//Data  Json
let user = [
  
 ]

 /*

 // Database 
app.get('/api/user', (request,response) => {
     Model.find({}).then(result => {
          response.json(result)
     })
})

app.get('/api/user/:id', (request,response) => {
     Model.findById(request.params.id).then(result => {
          response.json(result)
     })
})

app.delete('/api/user/:id', (request,response) => {
     Model.findByIdAndDelete(request.params.id)
     .then(result => {
          response.json(result)
     })
})

app.post('/api/user', (request,response) => {
     const body = request.body
     usersInfos = new Model({
          nameContact : body.nameContact,
          phoneContact : body.phoneContact,
          important : body.important || false,
     })
     usersInfos.save().then(savedInfos => {
          response.json(savedInfos)
     })
})

app.put('/api/user/:id', (request,response) => {
     const body = request.body
     const userElementByUpdate = {
           nameContact : body.nameContact,
           phoneContact : body.phoneContact,
           important : body.important
     }
     Model.findByIdAndUpdate(request.params.id, userElementByUpdate, {new : true}).then(result => {
          response.json(result)
     })
})
*/



app.get('/', (request,response) => {
     response.end('<h1>Backend Contact </h1>')
})

app.get('/api/user', (request,response) => {
     response.json(user)
})


app.get('/api/user/:id' , (request, response) => {
    const userId = Number(request.params.id)
    const userGet = user.filter(users => users.id == userId)
    response.json(userGet)
})

app.delete('/api/user/:id', (request, response) => {
    const userId = Number(request.params.id)
    const userDel = user.filter(users => users.id !== userId)
    response.json(userDel)
})

const generateId = () => {
     const geneId = user.length > 0 ?
     Math.random(...user.map(us => us)) : 0
     return geneId + 1
}

app.post('/api/user', (request, response) => {
     const body = request.body
     const users = {
        nameContact  : body.nameContact,
        phoneContact : body.phoneContact,
        important    : body.important || false,
         id: generateId()
     }     

     user = user.concat(users)
     response.json(users)
})

app.use(unkownEndPoint)

//Our PORT
const PORT= process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})
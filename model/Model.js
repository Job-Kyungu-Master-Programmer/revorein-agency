// Connection DataBase

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI
console.log('Connected to ', url)
mongoose.connect(url).then(result => {
    console.log('Connected to MOngoDB')
}).catch((error) => {
    console.log('Connection Failed')
})
//Schema 
const userSchema = new mongoose.Schema({
    nameContact : String,
    phoneContact: String,
    important: Boolean
})
//Deleting __id or __iv
userSchema.set('toJSON', {
    transform : (document,deletingReturn) => {
         deletingReturn.id = deletingReturn._id.toString()
         delete deletingReturn._id 
         delete deletingReturn.__v
    }
})
//model and export 
module.exports = mongoose.model('DataBase', userSchema)
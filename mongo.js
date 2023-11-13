// connecting database

const mongoose = require('mongoose')

if(process.argv.length < 3) {
     console.log('Votre mon passe ?')
     process.exit(1)
}

const url = 
`mongodb+srv://joblodo97:jeancy@cluster0.dcprhik.mongodb.net/contact?retryWrites=true&w=majority`
const password = process.argv[2]
mongoose.set('strictQuery', false)
mongoose.connect(url)
//Schema 
const userSchema = new mongoose.Schema( {
    nameContact : String,
    numContact: Number,
    important: Boolean
})
//Model
const dataBase = new mongoose.model('dataBase', userSchema)
//Infos User
const usersInfos = new dataBase({
    nameContact : 'Daniel ',
    numContact: '+52445884',
    important: true
})

usersInfos.save().then(result => {
     console.log(result)
     mongoose.connection.close()
})
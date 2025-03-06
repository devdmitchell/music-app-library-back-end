require('dotenv').config()               //environment variables
const mongoose = require('mongoose')
const app = require('./app')

const port =  3000


const DB_ADDRESS = process.env.DB_ADDRESS
const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY
const LAST_FM_URL = process.env.LAST_FM_URL

console.log(DB_ADDRESS)

//mongoose connection
mongoose
    .connect(process.env.DB_ADDRESS)
    .then(()=>{
        console.log('MONGODB CONNECTED.')
        app.listen(port, ()=>{                        
            console.log(`Server Started on port ${port}.`)
        })
    })
    .catch((e)=>{                //error
        console.log(e)
    }
)

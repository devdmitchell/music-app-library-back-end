require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')

const port = 3000


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
        console.log(eval)
    }
)

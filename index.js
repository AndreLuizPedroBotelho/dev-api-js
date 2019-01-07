import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'

import routes from './routes'

const app = express()

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())


let db = mongoose.connect('mongodb://localhost:27017/dev_api_js', { useNewUrlParser: true })


routes(app)

const PORT = 3000

app.listen(PORT,()=>{
    console.log(`Express server has been started at ${PORT}`)
})


import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { usersRouter } from './routes/usersRoutes.js'
import { tasksRouter } from './routes/tasksRoutes.js'

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.get('/', (req, res) => res.send('Hello World!'))

// routes
app.use('/api/tasks', tasksRouter)
app.use('/api/users', usersRouter)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
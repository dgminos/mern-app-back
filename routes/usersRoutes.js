import express from 'express'

// controller functions
import { loginUser, signupUser } from '../controllers/userController.js'

export const usersRouter = express.Router()

// login route
usersRouter.post('/login', loginUser)

// signup route
usersRouter.post('/signup', signupUser)


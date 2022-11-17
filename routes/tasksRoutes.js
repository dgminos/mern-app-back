import express from 'express'
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/tasksController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const tasksRouter = express.Router()

// require auth for all tasks routes
tasksRouter.use(requireAuth)

// GET all tasks
tasksRouter.get('/', getTasks)

//GET a single task
tasksRouter.get('/:id', getTask)

// POST a new task
tasksRouter.post('/', createTask)

// UPDATE a task
tasksRouter.put('/:id', updateTask)

// DELETE a task
tasksRouter.delete('/:id', deleteTask)




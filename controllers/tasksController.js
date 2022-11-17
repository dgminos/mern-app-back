import mongoose from 'mongoose'
import Task  from '../models/TaskModel.js'

// get all tasks
export const getTasks = async (req, res) => {
  const user_id = req.user._id
  const tasks = await Task.find({user_id}).sort({createdAt: -1})

  res.status(200).json(tasks)
}

// get a single task
export const getTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such task'})
  }

  const task = await Task.findById(id)

  if (!task) {
    return res.status(404).json({error: 'No such task'})
  }
  
  res.status(200).json(task)
}

// create new task
export const createTask = async (req, res) => {
  const { title, createdBy, description } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }

  if (!createdBy) {
    emptyFields.push('createdBy')
  }

  if (!description) {
    emptyFields.push('description')
  }
  
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const task= await Task.create({title, createdBy, description, user_id})
    res.status(200).json(task)
    
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// update a task
export const updateTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such task'})
  }

  const task = await Task.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!task) {
    return res.status(400).json({error: 'No such task'})
  }

  console.log('task to be updated: ' + task)
  res.status(200).json(task)
}

// delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such task'})
  }

  const task = await Task.findOneAndDelete({_id: id})

  if (!task) {
    return res.status(400).json({error: 'No such task'})
  }

  res.status(200).json(task)
}
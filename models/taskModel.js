import mongoose from "mongoose"

const Schema = mongoose.Schema

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
  }, { timestamps: true }
  )

export default mongoose.model('Task', TaskSchema)




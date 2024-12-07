const Joi = require("joi");
const Task = require("../models/taskModel");

exports.getTasks = async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  const query = {  userId: req.userId };

  if(status){
    query.status = status;
  }
  try {
    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    status: Joi.string().valid("pending", "completed"),
    dueDate: Joi.date(),
})

exports.createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  const { error } = taskSchema.validate({ title, description, status, dueDate });
  if (error) return res.status(400).json({ error: error.details[0].message });

  const file = req.file ? req.file.path : null;
  try {
    const newTask = new Task({ userId: req.userId, title, description, status, dueDate, file });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if(!updatedTask) return res.status(404).json({ error: "Task not Found" });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId =  req.userId;

  try {
    
    const  task = await Task.findOne({ _id: id, userId });

    if(!task){
        return res.status(404).json({ error: "Task not found or unauthorized" }); 
    }

    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
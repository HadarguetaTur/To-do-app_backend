const taskService = require("./task.service.js")
const logger = require("../../services/logger.service")
const { json } = require("express")
const { Db } = require("mongodb")
const { dbURL } = require("../../config/prod.js")

async function getTasks(req, res) {
  try {
    var queryParams = req.query
    const Tasks = await taskService.query(queryParams)
    res.json(Tasks)
  } catch (err) {
    logger.error("Failed to get Tasks", err)
    res.status(500).send({ err: "Failed to get Tasks" })
  }
}

async function getTaskById(req, res) {
  try {
    const { id } = req.params
    const task = await taskService.getById(id)
    res.json(task)
  } catch (err) {
    logger.error("Failed to get task", err)
    res.status(500).send({ err: "Failed to get task" })
  }
}


async function addTask(req, res) {
  try {
    const task = req.body
    const addedtask = await taskService.add(task)
    res.json(addedtask)
  } catch (err) {
    logger.error("Failed to add task", err)
    res.status(500).send({ err: "Failed to add task" })
  }
}


async function updateTask(req, res) {
  try {
    const task = req.body
    const updatedtask = await taskService.update(task)
    res.json(updatedtask)
  } catch (err) {
    logger.error("Failed to update task", err)
    res.status(500).send({ err: "Failed to update task" })
  }
}


async function removeTask(req, res) {
  try {
    const taskId = req.params
    const removedId = await taskService.remove(taskId)
    res.send(removedId)
  } catch (err) {
    logger.error("Failed to remove task", err)
    res.status(500).send({ err: "Failed to remove task" })
  }
}

module.exports = {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  removeTask,
}

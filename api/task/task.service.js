const dbService = require("../../services/db.service")
const logger = require("../../services/logger.service")
const ObjectId = require("mongodb").ObjectId

async function query(filterBy = {}) {
  try {

    const collection = await dbService.getCollection("task")
    var tasks = await collection.find().toArray()
    if (filterBy === {}) return tasks
    let newtasks = tasks
    if (filterBy.txt) {
      newtasks = newtasks.filter((task) => task.title.includes(filterBy.txt))
    }
    if (filterBy.importance) {
      newtasks = newtasks.filter((task) => task.importance === filterBy.importance)
    }
    if (filterBy.status){
      newtasks = newtasks.filter((task) => task.status === filterBy.status)
    }
    return newtasks


  } catch (err) {
    logger.error("cannot find tasks", err)
    throw err
  }
}

async function getById(taskId) {
  try {
    console.log(taskId)
    const collection = await dbService.getCollection("task")
    var task = collection.findOne({ _id: ObjectId(taskId) })
    return task
  } catch (err) {
    logger.error(`while finding task ${taskId}`, err)
    throw err
  }
}

async function remove(taskId) {
  try {
    console.log('kkkkkkkkkkkk', taskId);
    const collection = await dbService.getCollection("task")


    await collection.deleteOne({ _id: ObjectId(taskId) })

    return
  } catch (err) {
    logger.error(`cannot remove task ${taskId}`, err)
    throw err
  }
}

async function add(task) {
  try {
    const collection = await dbService.getCollection("task")
    const addTask = await collection.insertOne(task)
    const id = addTask.insertedId.toString()
    task._id = id
    return task
  } catch (err) {
    logger.error("cannot insert task", err)
    throw err
  }
}
async function update(task) {
  try {
    var id = ObjectId(task._id)
    delete task._id
    const collection = await dbService.getCollection("task")
    await collection.updateOne({ _id: id }, { $set: { ...task } })
    return task
  } catch (err) {
    logger.error(`cannot update task ${id}`, err)
    throw err
  }
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
}



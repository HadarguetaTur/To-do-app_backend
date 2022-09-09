const express = require("express")
const {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  removeTask,
  removeAll,
  getNextTask,

} = require("./task.controller")

const router = express.Router()

router.get("/", getTasks)
router.get('/:id', getTaskById)
router.post("/", addTask)
router.put("/:id?", updateTask)
router.delete("/:id", removeTask)
router.delete('/', removeAll)
router.post('/getNextTask', getNextTask)


module.exports = router

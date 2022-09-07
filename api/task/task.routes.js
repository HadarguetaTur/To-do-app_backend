const express = require("express")
const {
  requireAuth,
  requireAdmin,
} = require("../../middlewares/requireAuth.middleware")
const { log } = require("../../middlewares/logger.middleware")
const {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  removeTask,
} = require("./task.controller")
const router = express.Router()

router.get("/", getTasks)
router.get('/:id', getTaskById)
router.post("/", addTask)
router.put("/:id?", updateTask)
router.delete("/:id", removeTask)


module.exports = router

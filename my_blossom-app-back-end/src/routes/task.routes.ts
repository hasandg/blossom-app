import express from 'express'
import { createTask, getAllCompletedTasks, getAllTasks, getAllTasksByCategoryId, getTasksForToday, toogleTaskStatus } from '../controllers/task.controller'
import { authenticationMiddleware } from '../middleware'


const taskRoutes = express.Router()

taskRoutes.use(authenticationMiddleware)


taskRoutes.route("/").get(getAllTasks)
taskRoutes.route("/compeleted").get(getAllCompletedTasks)
taskRoutes.route("/today").get(getTasksForToday)
taskRoutes.route("/tasks-by-category/:id").get(getAllTasksByCategoryId)
taskRoutes.route("/").post(createTask)
taskRoutes.route("/:id").put(toogleTaskStatus)
export default taskRoutes
import express from 'express'
import { createUser, loginUser } from '../controllers/user.controller'
import { getAllCategories } from '../controllers/category.controller'


const userRoutes = express.Router()

userRoutes.route("/create").post(createUser)
userRoutes.route("/login").post(loginUser)
userRoutes.route("/categories").post(getAllCategories)


export default userRoutes
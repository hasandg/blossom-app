import express from 'express'

import { getAllCategories } from '../controllers/category.controller'


const categoryRoutes = express.Router()

categoryRoutes.route("/categories").get(getAllCategories)


export default categoryRoutes
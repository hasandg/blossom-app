import { Request, Response } from "express"
import Category from "../models/category-model"
import { ICategory } from "../types"

export const getAllCategories = async (request: Request, response: Response) => {
    try {
        const categories = await Category.find({})
        return response.send(categories)
    } catch (error) {
        console.log("error in getAllCategories", error)
        throw error
    }
}

export const createCategory = async (request: Request, response: Response) => {
    try {
        const { name, isEditable, color, icon }: ICategory = request.body
        const categories = await Category.create({name, isEditable, color, icon})
        return response.send(categories)
    } catch (error) {
        console.log("error in createCategory", error)
        throw error
    }
}
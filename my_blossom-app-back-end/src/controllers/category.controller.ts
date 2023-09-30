import { Request, Response } from "express"
import Category from "../models/category-model"
import { ICategory } from "../types"
import { AuthRequest } from "../middleware";

export const getAllCategories = async (request: AuthRequest, response: Response) => {
    try {
        const { user } = request

        const categories = await Category.find({
            user: user,
        })
        return response.send(categories)
    } catch (error) {
        console.log("error in getAllCategories", error)
        response.send({ error: "Something went wrong" })
        throw error
    }
}

export const createCategory = async (request: AuthRequest, response: Response) => {
    try {
        const { name, isEditable, color, icon }: ICategory = request.body
        const { user } = request
        const category = await Category.create({ name, isEditable, color, icon, user })
        return response.send(category)
    } catch (error) {
        console.log("error in createCategory", error)
        response.send({ error: "Something went wrong" })
        throw error
    }
}

export const deleteCategory = async (
    request: AuthRequest,
    response: Response
) => {
    try {
        const { id } = request.params
        Category.deleteMany({ _id: id })
        return response.send({ message: "Category deleted!" })
    } catch (error) {
        console.log("error in deleteCategory", error)
        response.send({ error: "Something went wrong" })
        throw error
    }
}

export const updateCategory = async (request: AuthRequest, response: Response) => {
    try {
        const { _id, name, isEditable, color, icon }: ICategory = request.body
        const category = await Category.updateOne({
            _id,
        },
            {
                $set: { name, isEditable, color, icon },
            }
        )
        return response.send({message: "Category updated successfully"})
    } catch (error) {
        console.log("error in updateCategory", error)
        response.send({ error: "Error in updating the category" })
        throw error
    }
}
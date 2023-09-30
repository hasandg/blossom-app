import { Request, Response } from "express"
import Color from "../models/color-model"
import { IColor } from "../types"
import { AuthRequest } from "../middleware";

export const createColor = async (request: AuthRequest, response: Response) => {
    try {
        const { name, id, code}: IColor = request.body
        const color = await Color.create({ name, id, code })
        return response.send(color)
    } catch (error) {
        console.log("error in createColor", error)
        response.send({ error: "Something went wrong" })
        throw error
    }
} 
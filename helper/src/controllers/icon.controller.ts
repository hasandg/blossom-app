import { Request, Response } from "express"
import Icon from "../models/icon-model"
import { IIcon } from "../types"
import { AuthRequest } from "../middleware";

export const createIcon = async (request: AuthRequest, response: Response) => {
    try {
        const { name, id, symbol}: IIcon = request.body
        const icon = await Icon.create({ name, id, symbol })
        return response.send(icon)
    } catch (error) {
        console.log("error in createIcon", error)
        response.send({ error: "Something went wrong" })
        throw error
    }
}
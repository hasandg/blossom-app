import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import User from "../models/user-model"

export interface AuthRequest extends Request {
    user: string
}
export const authenticationMiddleware = async (
    request: AuthRequest,
    response: Response,
    next: NextFunction
    ) => {
    try {
        const { authorization } = request.headers
        if (!authorization) {
            return response.status(401).json({
                error: "Authorization is required",
            })
        }
        const token = authorization

        const { _id } = jwt.verify(token, "express")
        const existingUser = await User.findOne({ _id })
        if (existingUser) {
            console.log("existingUser", existingUser);
            
            request.user = existingUser.id
        }else{
            console.log("existingUser not found");            
        }

        next()
    } catch (error) {
        console.log("error in authenticationMiddleware",error)
        throw error
    }
}
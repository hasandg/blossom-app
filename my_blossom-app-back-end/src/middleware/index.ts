import {Request,Response} from "express"
import jwt from "jsonwebtoken"
import User from "../models/user-model"

interface CustomRequest extends Request {
    user: string
}
export const authenticationMiddleware = async (request: CustomRequest, response: Response) => {
    try {
        const {authorization} = request.headers
        if(!authorization){
            return response.status(401).json({
                error: "Authorization is required",                
            })
        }
        const token = authorization
        const {_id} = jwt.verify(token,"express")
        const existingUser = await User.findOne({_id})
        if(existingUser){
            request.user = existingUser.id
        }

     
    } catch (error) {
        console.log("error in authenticationMiddleware")
    }
}
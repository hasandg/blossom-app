import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import User from "../models/user-model"

export const createUser = async (request: Request, response: Response) => {
    try {
        const { name, email, password } = request.body
        const existingUser = await User.find({ email })

        if (existingUser) {
            return response.status(409).send("user already exist")
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await User.create({
            name,
            email,
            hashedPassword
        })


    } catch (error) {
        console.log('error in createUser', error);
        throw (error)
    }
}
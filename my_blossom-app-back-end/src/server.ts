import express, { Request, Response } from "express"
import connectToDatabase from "./db"
import userRoutes from "./routes/user.route"
const application = express()

application.use(express.json())


const PORT=1337

connectToDatabase()

application.get("/ping", (request: Request, response: Response) =>{
    response.send("Pong")
})

application.use("/users", userRoutes)



application.listen(PORT,() => {
    console.log("Server up and running")
})
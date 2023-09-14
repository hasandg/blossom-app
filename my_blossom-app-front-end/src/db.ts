import mongoose from "mongoose"

const connectToDatabase = async () => {
    try {
        console.log("tring to connect")
        const connetion = await mongoose.connect(
            "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6"
        )
        if(connetion){
            console.log("Connection established")
        }else{
            console.log("not connected!!!!")
        }
    } catch (error) {
        console.log('eroor in connectToDatabase', error)
        throw error
    }
}

export default connectToDatabase
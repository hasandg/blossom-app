import mongoose from "mongoose"

const connectToDatabase = async () => {
    try {
        console.log("tring to connect")
        const connetion = await mongoose.connect(
            "mongodb+srv://hasandg:QycdNszCy3WoargE@myapp.vnlq2wd.mongodb.net/?retryWrites=true&w=majority"
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
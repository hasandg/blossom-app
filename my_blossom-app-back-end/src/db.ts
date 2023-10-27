import mongoose from "mongoose"

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      //process.env.MONGODB_URI
      "mongodb+srv://hasandg:LwYOWvAswOKh2Ce8@myapp.vnlq2wd.mongodb.net/?retryWrites=true&w=majority"
    )

    if (connection) {
      console.log("Connection established")
    }
  } catch (error) {
    console.log("error in connectToDatabase", error)
    throw error
  }
}

export default connectToDatabase

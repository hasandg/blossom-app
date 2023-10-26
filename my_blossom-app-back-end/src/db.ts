import mongoose from "mongoose"

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_URI
      //"mongodb+srv://my_blossom_app_user:sTo12iuwNsAxZxHb@myblossomapp.wvwuiue.mongodb.net/?retryWrites=true&w=majority"
      //"mongodb+srv://omkhetwal:qfxoQkUzbzQWaoMo@youtube.lothdki.mongodb.net/blossom-app?retryWrites=true&w=majority"
      //"mongodb://admin:password@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6"
      //  "mongodb://127.0.0.1:27017/blossom-app?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6"
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

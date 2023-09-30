import mongoose, { Schema } from "mongoose";

const iconSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    }
})


const Icon=mongoose.model("Icon",iconSchema)

export default Icon
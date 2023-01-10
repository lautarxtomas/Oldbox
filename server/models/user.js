import mongoose from "mongoose"
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 25
    },
    address: {
        type: String,
        trim: true,
    },
    role: {
        type: Number,
        default: 0
    },
},
    { timestamps: true }
)

export default mongoose.model("User", userSchema)
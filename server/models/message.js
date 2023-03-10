import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema({
  message: String,
  from: String,
});

export default mongoose.model("Message", MessageSchema);

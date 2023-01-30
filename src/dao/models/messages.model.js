import mongoose from "mongoose";

const messagesCollection = "messeges";

const messagesSchema = new mongoose.Schema({
  name: String,
  id: String,
  message: String,
});

const messagesModel = mongoose.model(messagesCollection, messagesSchema);

export default messagesModel;

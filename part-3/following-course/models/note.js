import mongoose from "mongoose";
import {MONGODB_URI} from "../config.js"

const url = MONGODB_URI

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 }).then(() => {
  console.log("connected to mongodb");
}).catch(() => {
  console.log("failed to connect to mongodb")
});

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Note", noteSchema);
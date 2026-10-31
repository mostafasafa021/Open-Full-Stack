import mongoose from "mongoose";
import {MONGODB_URI} from "../config.js";
const url = MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 }).then(() => {
  console.log("connected to mongodb");
}).catch(() => {
  console.log("failed to connect to mongodb")
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        console.log(v)
        return /\d{2,3}-\d+/.test(v)
      }
      ,
      message: props => `${props.value} is not a valid number`
    }
    ,
    required: [true,"Phone number is Required"]
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

export default Person;

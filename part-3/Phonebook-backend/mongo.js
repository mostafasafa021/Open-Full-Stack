import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("Give a password as an argument");
  process.exit(1);
}

const password = process.argv[2]
console.log(process.argv);

const url = `mongodb+srv://mostafasafaarchon021_db_user:${password}@cluster0.8qkga1p.mongodb.net/phoneBookApp`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 }).then(() => {
  console.log("connected");
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(
      `Added ${result.name} number ${result.number} to the phonebook`,
    );
    mongoose.disconnect();
  });
} else {
  Person.find({}).then((result) => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.disconnect()
  })
}

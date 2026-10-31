import express from "express";
import morgan from "morgan";
import Person from "./models/person.js";
const app = express();

app.use(express.json());
morgan.token("body", (req, res) => `${JSON.stringify(req.body)}`);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);
app.use(express.static("dist"));

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    const date = new Date();
    const html = `<p>Phonebook has info for ${persons.length} people</p>
  <p>${date}</p>`;
    res.send(html);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) return res.json(person);

      res.status(404).json({ message: "Contact Not Found" });
    })
    .catch(next);
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((person) => {
      if (person) {
        res.status(204).end();
        return;
      }

      res.status(404).json({ message: "Contact Not Found" });
    })
    .catch(next);
});

app.post("/api/persons/", (req, res, next) => {
  const name = req.body?.name;
  const number = req.body?.number;
  if (!name) return res.status(400).json({ message: "You Must Enter Name" });

  if (!number)
    return res.status(400).json({ message: "You Must Enter Number" });
1
  const person = new Person({
    name,
    number,
  });
  person
    .save()
    .then((person) => {
      res.status(201).json(person);
    })
    .catch(next);
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).end();
      }

      person.name = name;
      person.number = number;

      return person.save().then((updatedPerson) => {
        res.json(updatedPerson);
      });
    })
    .catch(next);
});

const unknownEndpoint = (req, res, next) => {
  return res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandling = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ message: "malformatted Id" });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  next(err);
};

app.use(errorHandling);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

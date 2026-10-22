import express from "express";
import morgan from "morgan";
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cors())
morgan.token("body", (req, res) => `${JSON.stringify(req.body)}`);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);
app.use(express.static("dist"));

let phoneContacts = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(phoneContacts);
});

app.get("/info", (req, res) => {
  const date = new Date();
  const html = `<p>Phonebook has info for ${phoneContacts.length} people</p>
  <p>${date}</p>`;
  res.send(html);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const contact = phoneContacts.find((contact) => contact.id === id);
  if (contact) return res.json(contact);

  res.status(404).json({ message: "Contact Not Found" });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const contact = phoneContacts.find((contact) => contact.id === id);
  if (contact) {
    phoneContacts = phoneContacts.filter((contact) => contact.id !== id);
    res.status(204).end();
  }

  res.status(404).json({ message: "Contact Not Found" });
});

app.post("/api/persons/", (req, res) => {
  const name = req.body?.name;
  const number = req.body?.number;
  if (!name) return res.status(400).json({ message: "You Must Enter Name" });

  if (!number)
    return res.status(400).json({ message: "You Must Enter Number" });

  const contactAlreadyExist = phoneContacts.some(
    (contact) => contact.name === name,
  );

  if (contactAlreadyExist)
    return res.status(400).json({ message: "Name Must Be Unique" });

  const newContact = {
    name,
    number,
    id: crypto.randomUUID(),
  };
  phoneContacts = phoneContacts.concat(newContact);
  res.status(201).json(newContact);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

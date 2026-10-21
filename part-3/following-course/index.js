import express from "express";
import morgan from "morgan";
const app = express();

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.use(express.json());
morgan.token("body", (req, res) => `${JSON.stringify(req.body)}`);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);
app.use(express.static("dist"));

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  if (note) {
    return res.json(note);
  }

  return res.status(404).end();
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);

  return res.status(204).end();
});

const genrateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => Number(note.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content)
    return response.status(400).json({ error: "missing content" });

  const note = {
    content: body.content,
    important: body.important || false,
    id: genrateId(),
  };

  notes = notes.concat(note);
  return response.json(note);
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const errorHandling = (req, res, next) => {
  return res.status(404).send({ error: "unknown endpoint" });
};

app.use(errorHandling);

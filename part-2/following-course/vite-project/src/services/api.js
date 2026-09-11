import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (newObject) =>
  axios.post(baseUrl, newObject).then((response) => response.data);

const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then((response) => response.data);

const deleteNote = (id) => axios.delete(`${baseUrl}/${id}`);

export default {
  getAll,
  create,
  update,
  deleteNote,
};

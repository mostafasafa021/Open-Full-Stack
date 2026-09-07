import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const create = contactObject => {
  return axios.post(baseUrl, contactObject).then(response => response.data);
};

const deleteContact = id => axios.delete(`${baseUrl}/${id}`)

const updateContact = (id, updatedContact) => axios.put(`${baseUrl}/${id}`,updatedContact).then(response => response.data)

export default {
  getAll,
  create,
  deleteContact,
  updateContact,
}
import axios from "axios";

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const remove = id => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => console.log('deleted'))
}

const update = changedPerson => {
    const request = axios.put(`${baseUrl}/${changedPerson.id}`, changedPerson)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }
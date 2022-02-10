import axios from 'axios'
const baseUrl = '/api/login'
const createBaseUrl = '/api/users'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const create = async credentials => {
    const response = await axios.post(createBaseUrl, credentials)
    return response.data
}

export default { login, create }
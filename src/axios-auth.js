import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://whispering-ridge-68679.herokuapp.com/api/auth'
});

export default instance;
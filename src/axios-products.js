import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://sleepy-reaches-13632.herokuapp.com/api/product'
});

export default instance;
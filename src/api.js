import axios from 'axios';

export default axios.create({
    baseURL: 'https://chatbot-bsc.herokuapp.com/',
});
import axios from 'axios';

export default axios.create({
    baseURL: 'https://dialogflow.googleapis.com'
});
import axios from 'axios';

export const BASE_URL = 'http://localhost:4000/api';

const client = axios.create();

export default client;

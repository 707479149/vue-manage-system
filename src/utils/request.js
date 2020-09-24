import axios from 'axios';
import config from '../config'

const host = process.env.NODE_ENV == "development" ? config.api_host_dev : config.api_host_prod

console.log("host:", host)
const service = axios.create({
    timeout: 5000,
    baseURL: host
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;

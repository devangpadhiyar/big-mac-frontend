import axios from 'axios';

axios.defaults.baseURL =
  process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.validateStatus = (status) => {
  return status >= 200 && status < 500; // default
};
axios.defaults.proxy = {
  host: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000',
};

axios.interceptors.response.use(undefined, (error) => {
  switch (error.response.status) {
    default:
      break;
  }
  return Promise.reject(error);
});

export default axios;

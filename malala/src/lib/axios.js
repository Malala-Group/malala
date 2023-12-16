import axios from 'axios';

const Axios = axios.create({
  headers: {
    accept: 'application/json',
    common: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default Axios;

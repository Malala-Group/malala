import API_ENPOINT from './api-endpoint';
import Axios from '../../lib/axios';

class UserSource {
  static async getUser() {
    try {
      await Axios.get(`${API_ENPOINT.CSRF_COOKIE}`);
      return Axios.get(`${API_ENPOINT.USER}`).then((response) => response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default UserSource;

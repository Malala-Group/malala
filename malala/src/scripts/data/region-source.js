import API_ENPOINT from './api-endpoint';
import Axios from '../../lib/axios';

class RegionSource {
  static async provinces() {
    try {
      return await Axios.get(`${API_ENPOINT.LISTS_PROVINCE}`).then((response) => response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async regencies(provinceId) {
    try {
      return await Axios.get(`${API_ENPOINT.LISTS_REGENCY(provinceId)}`).then((response) => response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async districts(regencyId) {
    try {
      return await Axios.get(`${API_ENPOINT.LISTS_DISTRICT(regencyId)}`).then((response) => response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async villages(districtId) {
    try {
      return await Axios.get(`${API_ENPOINT.LISTS_VILLAGE(districtId)}`).then((response) => response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default RegionSource;

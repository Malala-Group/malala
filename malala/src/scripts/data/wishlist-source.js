import Swal from 'sweetalert2';
import API_ENPOINT from './api-endpoint';
import Axios from '../../lib/axios';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger me-2',
  },
  buttonsStyling: false,
});

class WishlistSource {
  static async get(page = 1) {
    await Axios.get(`${API_ENPOINT.CSRF_COOKIE}`);
    return Axios.get(`${API_ENPOINT.WISHLIST}?page=${page}`).then((response) => response.data);
  }

  static async getDetail(id) {
    await Axios.get(`${API_ENPOINT.CSRF_COOKIE}`);
    return Axios.get(`${API_ENPOINT.WISHLIST}/${id}`).then((response) => response.data.data);
  }

  static async add(destinationId) {
    await Axios.get(`${API_ENPOINT.CSRF_COOKIE}`);
    await Axios.post(`${API_ENPOINT.WISHLIST}`, {
      tourist_attraction_id: destinationId,
    }).then((response) => {
      if (response.status === 201) {
        swalWithBootstrapButtons.fire({
          title: 'Success!',
          text: 'Data has been added to wishlist.',
          icon: 'success',
        });
      }
    });
  }

  static async delete(destinationId) {
    await Axios.get(`${API_ENPOINT.CSRF_COOKIE}`);
    await Axios.delete(`${API_ENPOINT.WISHLIST}/${destinationId}`).then((response) => {
      if (response.status === 200) {
        swalWithBootstrapButtons.fire({
          title: 'Success!',
          text: 'Data has been removed from wishlist.',
          icon: 'success',
        });
      }
    });
  }
}

export default WishlistSource;

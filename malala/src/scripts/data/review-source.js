import Swal from 'sweetalert2';
import Axios from '../../lib/axios';
import API_ENPOINT from './api-endpoint';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger me-2',
  },
  buttonsStyling: false,
});

class ReviewSource {
  static async get(id) {
    return Axios.get(`${API_ENPOINT.REVIEW}/${id}`).then((response) => response.data);
  }

  static async add(comment) {
    try {
      await swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: 'Please check data!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, add!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Axios.get(`${API_ENPOINT.CSRF_COOKIE}`);
          await Axios.post(`${API_ENPOINT.REVIEW}`, comment, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }).then((response) => {
            if (response.status === 201) {
              swalWithBootstrapButtons.fire({
                title: 'Success!',
                text: 'Data has been added.',
                icon: 'success',
              }).then(() => {
                window.location.reload();
              });
            }
          });
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      if (error.response.status === 400) {
        swalWithBootstrapButtons.fire({
          title: 'Error',
          text: 'Failed to add data! Please check data',
          icon: 'error',
        });
      }
      throw error;
    }
  }
}

export default ReviewSource;

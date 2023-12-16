import Swal from 'sweetalert2';
import CONFIG from '../globals/config';
import API_ENPOINT from './api-endpoint';
import Axios from '../../lib/axios';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger me-2',
  },
  buttonsStyling: false,
});

class DestinationSource {
  static async list({ page = 1, name = '', provinceId = '' }) {
    if (name && provinceId) {
      return Axios.get(`${API_ENPOINT.DESTINATION}?name=${name}&province=${provinceId}&page=${page}`).then((response) => response.data);
    }

    if (name) {
      return Axios.get(`${API_ENPOINT.DESTINATION}?name=${name}&page=${page}`).then((response) => response.data);
    }

    if (provinceId) {
      return Axios.get(`${API_ENPOINT.DESTINATION}?province=${provinceId}&page=${page}`).then((response) => response.data);
    }

    return Axios.get(`${API_ENPOINT.DESTINATION}?page=${page}`).then((response) => response.data);
  }

  static async get(id) {
    return Axios.get(`${API_ENPOINT.DESTINATION}/${id}`).then((response) => response.data);
  }

  static async add(formData) {
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
          await Axios.post(`${API_ENPOINT.DESTINATION}`, formData, {
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
                window.location.href = `${CONFIG.BASE_URL}#/destination-list`;
              });
            }
          });
        }
      });
    } catch (error) {
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

  static async update(destinationId, destination) {
    try {
      await swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Axios.post(`${API_ENPOINT.DESTINATION}/${destinationId}`, destination).then((response) => {
            console.log(response);
            if (response.status === 200) {
              swalWithBootstrapButtons.fire({
                title: 'Success!',
                text: 'Data has been updated.',
                icon: 'success',
              }).then(() => {
                window.location.reload();
              });
            }
          });
        }
      });
    } catch (error) {
      console.error(error);
      if (error.response.status === 400) {
        swalWithBootstrapButtons.fire({
          title: 'Error',
          text: 'Failed to update data',
          icon: 'error',
        });
      }
      throw error;
    }
  }

  static async delete(destinationId) {
    try {
      await swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Axios.delete(`${API_ENPOINT.DESTINATION}/${destinationId}`).then((response) => {
            if (response.status === 200) {
              swalWithBootstrapButtons.fire({
                title: 'Success!',
                text: 'Data has been deleted.',
                icon: 'success',
              }).then(() => {
                window.location.reload();
              });
            }
          });
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default DestinationSource;

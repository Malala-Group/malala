import Swal from 'sweetalert2';
import CONFIG from '../globals/config';
import API_ENPOINT from './api-endpoint';
import Axios from '../../lib/axios';
import UserSource from './user-source';

class AuthSource {
  static async register(user) {
    try {
      await Axios.get(`${API_ENPOINT.CSRF_COOKIE}`);
      await Axios.post(`${API_ENPOINT.REGISTER}`, user).then((response) => {
        if (response.status === 201) {
          window.location.href = `${CONFIG.BASE_URL}#/dashboard`;
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async verifyEmail(url) {
    try {
      await Axios.get(`${API_ENPOINT.CSRF_COOKIE}`);
      await Axios.get(url).then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Your account verified!',
          icon: 'success',
        }).then(() => {
          window.location.href = `${CONFIG.BASE_URL}#/sign-in`;
        });
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async resendEmail() {
    try {
      await Axios.get(`${API_ENPOINT.CSRF_COOKIE}`);
      await Axios.post(`${API_ENPOINT.RESEND_EMAIL}`).then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Email verification has been sent!',
          icon: 'success',
        });
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async login(user) {
    try {
      await Axios.get(`${API_ENPOINT.CSRF_COOKIE}`);
      await Axios.post(`${API_ENPOINT.LOGIN}`, user).then((response) => {
        if (response.status === 200) {
          window.location.href = `${CONFIG.BASE_URL}#/dashboard`;
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async logout() {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger me-2',
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: 'You will be loged out!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, logout!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Axios.get(`${API_ENPOINT.CSRF_COOKIE}`);
          await Axios.post(`${API_ENPOINT.LOGOUT}`).then((response) => {
            if (response.status === 204) {
              swalWithBootstrapButtons.fire({
                title: 'Success!',
                text: 'Your session has been deleted.',
                icon: 'success',
              }).then(() => {
                window.location.href = `${CONFIG.BASE_URL}#/sign-in`;
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

  static async checkAccessPage(targetRoles = ['user'], guest = undefined) {
    try {
      const isLogin = await this.isLogin(guest);
      if (isLogin) {
        const user = await UserSource.getUser();
        const { roles } = user;
        const canAccessPage = await this.checkRoleAccess(roles, targetRoles);
        if (!canAccessPage) {
          window.location.href = `${CONFIG.BASE_URL}#/sign-in`;
        }
        return user;
      }
      return undefined;
    } catch (error) {
      if (error.response.data.message) {
        if (error.response.data.message === 'Your email address is not verified.') {
          window.location.href = `${CONFIG.BASE_URL}#/resend-email`;
        }
      }
      console.error(error);
      throw error;
    }
  }

  static async isLogin(guest = false) {
    try {
      await Axios.get(`${API_ENPOINT.CSRF_COOKIE}`);
      return await Axios.get(`${API_ENPOINT.IS_LOGIN}`).then(async (response) => {
        if (!guest) {
          if (!response.data) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please login first!',
            }).then(() => {
              window.location.href = `${CONFIG.BASE_URL}#/sign-in`;
            });
          }
        }

        return response.data;
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async checkRoleAccess(roles, targetRoles) {
    // eslint-disable-next-line max-len
    return roles.some((role) => targetRoles.some((targetRole) => role.name.toLowerCase() === targetRole.toLowerCase()));
  }
}

export default AuthSource;

import CONFIG from '../globals/config';

const API_ENPOINT = {
  // Destination
  DESTINATION: `${CONFIG.BASE_API_URL}api/destinations`,

  // Region
  LISTS_PROVINCE: `${CONFIG.BASE_API_URL}api/provinces`,
  LISTS_REGENCY: (provinceId) => `${CONFIG.BASE_API_URL}api/provinces/${provinceId}/regency`,
  LISTS_DISTRICT: (regencyId) => `${CONFIG.BASE_API_URL}api/regency/${regencyId}/districts`,
  LISTS_VILLAGE: (districtId) => `${CONFIG.BASE_API_URL}api/districts/${districtId}/villages`,

  // Sanctum Csrf Token
  CSRF_COOKIE: `${CONFIG.BASE_API_URL}sanctum/csrf-cookie`,

  // Auth
  REGISTER: `${CONFIG.BASE_API_URL}api/register`,
  LOGIN: `${CONFIG.BASE_API_URL}api/login`,
  LOGOUT: `${CONFIG.BASE_API_URL}api/logout`,
  IS_LOGIN: `${CONFIG.BASE_API_URL}api/isLogin`,
  RESEND_EMAIL: `${CONFIG.BASE_API_URL}api/email/verification-notification`,

  // User
  USER: `${CONFIG.BASE_API_URL}api/user`,

  // Review
  REVIEW: `${CONFIG.BASE_API_URL}api/reviews`,

  // Wishlist
  WISHLIST: `${CONFIG.BASE_API_URL}api/wishlists`,
};

export default API_ENPOINT;

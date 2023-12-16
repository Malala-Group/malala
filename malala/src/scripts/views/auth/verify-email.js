import AuthSource from '../../data/auth-source';

const VerifyEmail = {
  async render() {
    const currentUrl = window.location.href;
    let verifyUrl = currentUrl.split('=')[1];

    verifyUrl = decodeURIComponent(verifyUrl);

    await AuthSource.verifyEmail(verifyUrl);
  },

  async afterRender() {
    return `
    
    `;
  },
};

export default VerifyEmail;

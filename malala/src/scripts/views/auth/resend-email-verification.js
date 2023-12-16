import AuthSource from '../../data/auth-source';

const ResendEmailVerification = {
  async render() {
    // Tampilkan form input email
    return /* html */ `
      <button type="submit" class="btn btn-primary" id="btnResendEmail">Resend Email<button>
    `;
  },
  async afterRender() {
    // jika input email ditekan request kirim email ulang
    const btnResendEmail = document.querySelector('#btnResendEmail');
    btnResendEmail.addEventListener('click', (event) => {
      event.preventDefault();
      AuthSource.resendEmail();
    });
  },
};

export default ResendEmailVerification;

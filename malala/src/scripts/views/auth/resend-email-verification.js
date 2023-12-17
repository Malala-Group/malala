import AuthSource from '../../data/auth-source';

const ResendEmailVerification = {
  async render() {
    return /* html */ `
      <div class="container vh-100">
        <div class="row d-flex justify-content-center align-items-center vh-100">
          <div class="col-12 col-md-6 col-lg-4 card mx-auto d-flex justify-content-center align-items-center" style="height: 300px;">
            <h1 class="fs-1 mb-5">Resend Email</h1>
            <button type="submit" class="btn btn-primary mb-5" id="btnResendEmail">Resend Email</button>
            <p class="m-0 fs-6 text-center">If you haven't received the email, please click the 'Resend Email' button.</p>
          </div>
        </div>
      </div>
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

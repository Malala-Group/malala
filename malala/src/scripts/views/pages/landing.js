import CONFIG from '../../globals/config';

const Landing = {
  async render() {
    return /* html */`
      <style>
        .landing-container::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: rgba(0, 0, 0, .65);
          pointer-events: none;
        }
        .navbar, .content, footer {
          position: relative;
          z-index: 1;
        }
      </style>
      <div class="landing-container vh-100 position-relative overflow-hidden d-flex flex-column justify-content-between" style="background-image: url('/images/bglanding.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
        <nav class="navbar navbar-expand-lg navbar-dark bg-transparant">
          <div class="container">
            <a class="navbar-brand" href="#">
              <img src="images/logo.png" style="height: 70px;">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav ms-auto">
                <a class="nav-link active mx-2" href="${CONFIG.BASE_URL}#/about">About Us</a>
                <a class="nav-link active mx-2" href="#">Contact Us</a>
              </div>
            </div>
          </div>
        </nav>
        <div class="content row">
          <div class="col-12 col-md-8 col-lg-6 mx-auto">
            <div class="py-5">
              <h1 class="text-white text-center" style="font-size: 70px">Welcome</h1>
              <p class="text-white text-center fs-4">Temukan rekomendasi tempat wisata yang kamu sukai di seluruh Indonesia</p>
            </div>
            <div class="d-flex justify-content-around">
              <a href="${CONFIG.BASE_URL}#/sign-up" class="text-white text-decoration-none">Sign Up</a>
              <a href="${CONFIG.BASE_URL}#/sign-in" class="text-white text-decoration-none">Sign In</a>
            </div>
          </div>
        </div>
        <footer class="py-2">
          <p class="text-white text-center">&copy 2023 Copyright Malala Company</p>
        </footer>
      </div>
    `;
  },

  async afterRender() {
    return `
    
    `;
  },
};

export default Landing;

import AuthSource from '../../data/auth-source';
import '../../components/navbar';

const About = {
  async render() {
    return /* html */`
      <style>
        .card {
          background-color: #EAF2F6;
          transition: box-shadow 0.3s ease;
        }
        .card:hover {
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        }
      </style>
      <nav-bar></nav-bar>
      <div class="container">
        <div class="row min-vh-100">
          <div class="col-12 d-flex justify-content-center align-items-center">
            <h1 class="text-center mt-5 mb-5">"Coming together is a beginning. Keeping together is progress. Working together is success." - Henry Ford</h1> 
          </div>
        </div>

        <h3 class="text-center mb-5">Meet Our Team</h3>
        <div class="row justify-content-center">

          <!-- Card Anggota 1 -->
          <div class="col-6 col-md-4 mb-4 d-flex">
            <div class="card w-100 p-3 text-center">
              <img src="/images/about-us/rakan.png" class="card-img-top w-50 mx-auto mt-3" alt="Rakannanda Erdy Suprapto">
              <div class="card-body">
                <h5 class="card-title">Rakannanda Erdy Suprapto</h5>
                <p class="card-text">Front End Developer</p>
                <a href="https://www.linkedin.com/" target="_blank"><i class="bi bi-linkedin me-3"></i></a>
                <a href="https://www.github.com/" target="_blank"><i class="bi bi-github "></i></a>
                <a href="https://www.example.com/" target="_blank"><i class="bi bi-instagram ms-3"></i></a>
              </div>
            </div>
          </div>

          <!-- Card Anggota 2 -->
          <div class="col-6 col-md-4 mb-4 d-flex align-items-stretch">
            <div class="card w-100 p-3 text-center">
              <img src="/images/about-us/panji.png" class="card-img-top w-50 mx-auto mt-3" alt="Panji Revolusioner Saputro">
              <div class="card-body">
                <h5 class="card-title">Panji Revolusioner</h5>
                <p class="card-text">Front End Developer</p>
                <a href="https://www.linkedin.com/in/panji-revolusioner/" target="_blank"><i class="bi bi-linkedin me-3"></i></a>
                <a href="https://github.com/KakRevolusio" target="_blank"><i class="bi bi-github "></i></a>
                <a href="https://www.instagram.com/sipanjirevo/" target="_blank"><i class="bi bi-instagram ms-3"></i></a>
              </div>
            </div>
          </div>

          <!-- Card Anggota 3 -->
          <div class="col-6 col-md-4 mb-4 d-flex align-items-stretch">
            <div class="card w-100 p-3 text-center">
              <img src="/images/about-us/fatma.png" class="card-img-top w-50 mx-auto mt-3" alt="Fatma Hidayah">
              <div class="card-body">
                <h5 class="card-title">Fatma Hidayah</h5>
                <p class="card-text">UI Designer</p>
                <a href="https://www.linkedin.com/in/fatma-hidayah-3b0b34224/" target="_blank"><i class="bi bi-linkedin me-3"></i></a>
                <a href="https://github.com/iimnesia" target="_blank"><i class="bi bi-github "></i></a>
                <a href="https://www.instagram.com/iimnesia/" target="_blank"><i class="bi bi-instagram ms-3"></i></a>
              </div>
            </div>
          </div>

          <!-- Card Anggota 4 -->
          <div class="col-6 col-md-4 mb-4 d-flex align-items-stretch">
            <div class="card w-100 p-3 text-center">
              <img src="/images/about-us/juan.png" class="card-img-top w-50 mx-auto mt-3" alt="Martinus Juan Prasetyo">
              <div class="card-body">
                <h5 class="card-title">Martinus Juan Prasetyo</h5>
                <p class="card-text">Back End Developer</p>
                <a href="https://www.linkedin.com/in/juan-prasetyo/" target="_blank">
                  <i class="bi bi-linkedin me-3"></i>
                </a>
                <a href="http://github.com/juanprasetyo" target="_blank">
                  <i class="bi bi-github "></i>
                </a>
                <a href="https://www.instagram.com/juanprasetyo__/" target="_blank">
                  <i class="bi bi-instagram ms-3"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Card Anggota 5 -->
          <div class="col-6 col-md-4 mb-4 d-flex align-items-stretch">
            <div class="card w-100 p-3 text-center">
              <img src="/images/about-us/chris.png" class="card-img-top w-50 mx-auto mt-3" alt="Chrisnata Manihuruk">
              <div class="card-body">
                <h5 class="card-title">Chrisnata Manihuruk</h5>
                <p class="card-text">Back End Developer</p>
                <a href="https://www.linkedin.com/in/chrsnta//" target="_blank"><i class="bi bi-linkedin me-3"></i></a>
                <a href="https://github.com/Chrsnta" target="_blank"><i class="bi bi-github "></i></a>
                <a href="https://www.instagram.com/chrsnta/" target="_blank"><i class="bi bi-instagram ms-3"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <foo-ter></foo-ter>
    `;
  },

  async afterRender() {
    const user = await AuthSource.checkAccessPage(['user', 'mitra'], true);
    if (user) {
      const navbar = document.querySelector('nav-bar');
      navbar.user = user;
    }
  },
};

export default About;

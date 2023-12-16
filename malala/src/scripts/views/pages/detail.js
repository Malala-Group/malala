import AuthSource from '../../data/auth-source';
import DestinationSource from '../../data/destination-source';
import UrlParser from '../../routes/url-parser';
// import '../../components/navbar';
// import '../../components/footer';
import '../../components/destination-detail';

const Detail = {
  async render() {
    return /* html */`
      <style>
        .jam {
          background-color: #8EACBB;
          font-weight: bold;
        }
        .rating {
          font-size: 24px;
          color: #000;
          cursor: pointer;
        }
        .rating .star {
            transition: color 0.5s;
        }
        .rating .star:hover,
        .rating .star.active {
            color: #ffc107; 
        }
        footer {
          background-color: #476777;
          padding: 20px 0;
          color: #EAF2F6;
        }
        .footer-logo {
          max-width: 100px; /* Adjust the max-width as needed */
        }

        .social-icons img {
          max-width: 30px; /* Adjust the max-width as needed */
          margin-right: 10px;
        }

        /* Adjust spacing and styling as needed */
        .contact-info {
            margin-top: 10px;
        }

        /* Center align the company name */
        .company-name {
            text-align: center;
            margin-top: 20px;
        }
        .btn {
          background-color: #476777;
          color: #fff;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .btn:hover {
            background-color: #8EACBB;
            color: #fff;
        }
      </style>
      <nav-bar></nav-bar>
      <div class="detail-wisata"></div>

      <div class="ulasan mt-5 w-75 mx-auto">
        <div class="row justify-content-center align-items-center">
          <div class="card-body shadow">
            <h5 class="card-title">Ulasan</h5>
            <div class="card-text  p-3 rounded">
              <!-- Profil Pengguna dan Rating -->
              <div class="d-flex align-items-center mb-3">
                <!-- Profil Pengguna -->
                <div>
                  <img src="/images/profil.jpg" alt="Profil Pengguna" class="rounded-circle me-2" style="width: 40px; height: 40px;">
                  <span class="fw-bold">Nama Pengguna</span>
                </div>

                <!-- Rating Bintang -->
                <div class="rating ms-3">
                  <span class="star" data-rating="1">&#9733;</span>
                  <span class="star" data-rating="2">&#9733;</span>
                  <span class="star" data-rating="3">&#9733;</span>
                  <span class="star" data-rating="4">&#9733;</span>
                  <span class="star" data-rating="5">&#9733;</span>
                </div>
              </div>

              <!-- Ulasan -->
              <p>Ulasan yang diberikan oleh pengguna akan ditampilkan di sini.</p>

              <!-- Gambar untuk Ulasan (Lebih dari satu gambar) -->
              <div class="d-flex ">
                <img src="/images/data1.jpg" alt="Ulasan Gambar 1" class="img-fluid rounded mt-2 ms-2" style="width: 100px; height: 100px;">
                <img src="/images/data1.jpg" alt="Ulasan Gambar 2" class="img-fluid rounded mt-2 ms-2" style="width: 100px; height: 100px;">
                <!-- Tambah gambar sesuai kebutuhan -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ulasan mt-5 w-75 mx-auto text-center mb-5">
        <div class="row justify-content-center align-items-center">
          <div class="card-body shadow">
            <div class="d-flex align-items-center mb-3">
              <img src="/images/profil.jpg" alt="Foto Profil" class="rounded-circle me-3 ms-2 mt-3" style="width: 50px; height: 50px;">
              <div>
                <h5 class="card-title mb-0"> Juan Prasetyo </h5>
              </div>
            </div>
            <div class="mb-3">
              <div class="rating">
                <span class="star" data-rating="1">&#9733;</span>
                <span class="star" data-rating="2">&#9733;</span>
                <span class="star" data-rating="3">&#9733;</span>
                <span class="star" data-rating="4">&#9733;</span>
                <span class="star" data-rating="5">&#9733;</span>
            </div>
              <textarea class="form-control " id="ulasan" rows="3" placeholder="Bagikan pengalaman seru Anda di destinasi ini!"></textarea>
            </div>
            <div class="container mt-3">
              <button type="button" class="btn btn-light btn-lg rounded-pill" data-bs-toggle="modal" data-bs-target="#modalTambahFoto">
                <i class="bi bi-camera"></i>
                <span class="me-2">Tambahkan Foto</span>
              </button>
            </div>
            <button type="button" class="btn  float-end me-3 mb-3">Posting</button>
          </div>
        </div>
      </div>
      <foo-ter></foo-ter>
  `;
  },
  async afterRender() {
    const user = await AuthSource.checkAccessPage(['user', 'mitra']);
    const navbar = document.querySelector('nav-bar');
    navbar.user = user;

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const destination = await DestinationSource.get(url.id);
    console.log(destination);

    const detailElement = document.createElement('destination-detail');
    detailElement.destination = destination.data;

    const detailContainer = document.querySelector('.detail-wisata');
    detailContainer.append(detailElement);
  },
};

export default Detail;

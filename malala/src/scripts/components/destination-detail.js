class DestinationDetail extends HTMLElement {
  set destination(destination) {
    this._destination = destination;
    this.render();
  }

  render() {
    this._price = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    }).format(this._destination.price);

    this._images = this._destination.images;
    this._profilePicture = this._images.filter((image) => image.profile === 1);
    console.log(this._profilePicture);

    this.innerHTML = /* html */ `
      <div class="col-12 overflow-hidden" style="height: 300px;">
        <img src="${this._profilePicture[0].name}" class="w-100" alt="Deskripsi Gambar">
      </div>
      <div class="container mt-5">
        <div class="text-end my-3">
          <button type="button" class="btn btn-light">
            <i class="bi bi-bookmark"></i>
            Simpan
          </button>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="card">
              <div class="card-body py-5">
                <h4 class="card-title">${this._destination.name}</h4>
                <p class="card-text">${this._destination.name}, ${this._destination.description}</p>
              </div>
            </div>
            <div id="carouselImage" class="carousel slide mt-3" data-bs-ride="carousel">
              <div class="carousel-inner">
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselImage" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselImage" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card p-3">
              <p class="fs-6 fw-bold m-0"><i class="bi bi-geo-alt-fill"></i> Location</p>
              <a href="${this._destination.link_map}" target="_blank" class="fs-4 text-uppercase">${this._destination.province.name}, Indonesia</a>
              
              <hr>

              <p class="fs-6 fw-bold m-0"><i class="bi bi-whatsapp"></i> Contact</p>
              <a href="https://wa.me/${this._destination.contact}" target="_blank" class="text-decoration-none">
                <p class="fs-4 m-0">Whatsapp</p>
              </a>

              <hr>

              <p class="fs-6 fw-bold m-0"><i class="bi bi-cash-coin"></i> Harga Tiket</p>
              <p class="fs-4 m-0">${this._price}</p>

              <hr>
              
              <p class="fs-6 fw-bold m-0"><i class="bi bi-alarm"></i> Jam Operasional </p>
              <div class="card mb-4">
                <div class="card-body jam">
                  <p class="card-text">Senin : 08.00–18.00</p>
                  <p class="card-text">Senin : 08.00–18.00</p>
                  <p class="card-text">Senin : 08.00–18.00</p>
                  <p class="card-text">Senin : 08.00–18.00</p>
                  <p class="card-text">Senin : 08.00–18.00</p>
                  <p class="card-text">Senin : 08.00–18.00</p>
                  <p class="card-text">Senin : 08.00–18.00</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    `;

    const carouselContainer = this.querySelector('.carousel-inner');
    this._images.forEach((image) => {
      const carouselItem = /* html */`
        <div class="carousel-item active">
          <img src="${image.name}" class="d-block w-100" alt="Slide 1">
        </div>
      `;
      carouselContainer.innerHTML += carouselItem;
    });
  }
}

customElements.define('destination-detail', DestinationDetail);

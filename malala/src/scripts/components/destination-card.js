import CONFIG from '../globals/config';

class DestinationCard extends HTMLElement {
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

    this.classList.add('col-12', 'col-md-4', 'col-lg-3', 'mb-4', 'px-2', 'd-flex');
    this.innerHTML = /* html */ `
      <style>
        .custom-btn {
          background-color: #476777;
          color: #fff;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .custom-btn:hover {
          background-color: #8EACBB;
          color: #fff;
        }
      </style>
      <div class="card" style="box-shadow: 7px 4px 4px 0 rgba(0, 0, 0, .25)">
        <img src="${this._profilePicture[0].name}" class="card-img-top" alt="Card Image 1">
        <div class="card-body">
          <h5 class="card-title">${this._destination.name}</h5>
          <div class="profile-icon d-flex align-items-center">
            <i class="bi bi-geo-alt-fill"></i>
            <p class="ms-2 mb-0">${this._destination.province.name}</p>
          </div>
          <div class="profile-icon d-flex align-items-center">
            <i class="bi bi-cash-coin"></i>
            <p class="ms-2 mb-0">${this._price}</p>
          </div>
          <div class="profile-icon d-flex align-items-center">
            <i class="bi bi-alarm"></i>
            <p class="ms-2 mb-0"> 08:00 AM - 16:00 PM</p>
          </div>
          <div class="profile-icon d-flex align-items-center">
            <i class="bi bi-calendar-fill"></i>
            <p class="ms-2 mb-0">Every Day</p>
          </div>
          <div class="mt-4 d-flex justify-content-end">
            <a href="${CONFIG.BASE_URL}#/detail/${this._destination.id}" class="btn custom-btn">Detail</a>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('destination-card', DestinationCard);

import CONFIG from '../globals/config';
import AuthSource from '../data/auth-source';

class Navbar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set user(user) {
    this._user = user;
    console.log(user);
    this.render();
  }

  render() {
    this.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light', 'sticky-top');
    this.innerHTML = /* html */`
      <style>
        .navbar {
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
        }
        .navbar-item {
          margin: 0 5px;
        }
        .rounded-profile-img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 50%;
        }
      </style>

      <!-- Navbar -->
      <nav class="container-fluid">
        <!-- Logo -->
        <a class="navbar-brand me-auto" href="${CONFIG.BASE_URL}#/destination-list">
          <img src="/images/navbar.png" alt="Logo" height="40">
        </a>

        <!-- Navbar Toggler -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Items -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link navbar-item" href="${CONFIG.BASE_URL}#/search">Explore</a>
            </li>
            <li class="nav-item">
              <a class="nav-link navbar-item" href="${CONFIG.BASE_URL}#/wishlist">Wishlist</a>
            </li>
            <li class="nav-item">
              <a class="nav-link navbar-item" href="${CONFIG.BASE_URL}#/about">About Us</a>
            </li>
          </ul>
        </div>
      </nav>
    `;

    let last = '';
    if (this._user) {
      last = /* html */`
        <li class="nav-item dropdown" id="dropdownProfile">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${this._user.name}
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#/profile">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><button type="button" class="dropdown-item btn-logout">Logout</button></li>
          </ul>
        </li>
      `;
    } else {
      last = /* html */`
        <li class="nav-item">
          <a class="navbar-item btn btn-primary" href="${CONFIG.BASE_URL}#/sign-in">Sign In</a>
        </li>
        <li class="nav-item">
          <a class="navbar-item btn btn-primary" href="${CONFIG.BASE_URL}#/sign-up">Sign Up</a>
        </li>
      `;
    }

    document.querySelector('.navbar-nav').innerHTML += last;
    if (this._user) {
      if (this._user.roles.map((role) => role.name).includes('mitra')) {
        const profileDropdownItem = document.querySelector('.dropdown-item[href="#/profile"]');

        const newElement = document.createElement('li');
        newElement.innerHTML = `<a class="dropdown-item" href="${CONFIG.BASE_URL}#/dashboard-mitra">Dashboard Mitra</a>`;

        profileDropdownItem.parentNode.insertBefore(newElement, profileDropdownItem.nextSibling);
      }

      document.querySelector('.btn-logout').addEventListener('click', (event) => {
        event.preventDefault();
        AuthSource.logout();
      });
    }
  }
}

customElements.define('nav-bar', Navbar);

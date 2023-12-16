class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <footer class="footer pt-5" style="background-color: #476777; color: #EAF2F6;">
        <div class="container">

          <div class="row">
            <div class="w-75">
              <p>Get connected with us on social networks:</p>
            </div>
            <div class="w-25 d-flex justify-content-center">
              <div class="w-50 d-flex justify-content-around fs-4">
                <i class="bi bi-instagram"></i>
                <i class="bi bi-facebook"></i>
                <i class="bi bi-tiktok"></i>
              </div>
            </div>
          </div>

          <div class="row my-3 d-flex justify-content-between">
            <div class="col-md-4">
              <img src="/images/logo.png" alt="Company Logo" class="my-2 w-50">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet elementum ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi libero elit, iaculis ut est volutpat, vehicula blandit justo.</p>
            </div>
            <div class="col-md-4">
              <h5>Contact</h5>
              <div class=" d-flex align-items-center mt-3">
                <i class="bi bi-house-door-fill"></i>
                <p class="ms-2 mb-0">Paris, Yogyakarta</p>
              </div>
              <div class=" d-flex align-items-center mt-3">
                <i class="bi bi-envelope"></i>
                <p class="ms-2 mb-0">malalaapp@gmail.com</p>
              </div>
              <div class=" d-flex align-items-center mt-3">
                <i class="bi bi-whatsapp"></i>
                <p class="ms-2 mb-0"> +6271 8798 8788</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <p class="text-center">&copy 2023 Copyright Malala company</p>
            </div>
          </div>

        </div>
      </footer>
    `;
  }
}

customElements.define('foo-ter', Footer);

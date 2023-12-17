class ReviewItem extends HTMLElement {
  set review(review) {
    this._review = review;
    this.render();
  }

  render() {
    this.classList.add('row');
    this.innerHTML = /* html */ `
      <div class="col-lg-1 d-flex justify-content-center align-items-center">
        <div class="w-50 mx-auto">
          <i class="bi bi-person-circle fs-1"></i>
        </div>
      </div>
      <div class="col-lg-11">
        <ul class="rating d-flex p-0 m-0" style="list-style: none;">
          <li class="me-2"><i class="bi bi-star"></i></li>
          <li class="me-2"><i class="bi bi-star"></i></li>
          <li class="me-2"><i class="bi bi-star"></i></li>
          <li class="me-2"><i class="bi bi-star"></i></li>
          <li class="me-2"><i class="bi bi-star"></i></li>
        </ul>
        <p class="fs-5 m-0">${this._review.user.name}</p>
        <p class="fs-6 m-0">${this._review.comment}</p>
      </div>
    `;

    const ratingList = this.querySelector('.rating');
    const stars = ratingList.children;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i].querySelector('i');
      if (i < this._review.rating) {
        star.classList.add('bi-star-fill', 'text-warning');
        star.classList.remove('bi-star');
      }
    }
  }
}

customElements.define('review-item', ReviewItem);

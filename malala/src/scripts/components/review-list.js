import './review-item';

class ReviewList extends HTMLElement {
  set reviews(reviews) {
    this._reviews = reviews;
    this.render();
  }

  render() {
    this.classList.add('px-3');
    this.innerHTML = /* html */ `
      <div class="review-list"></div>
    `;

    const reviewListElement = this.querySelector('.review-list');

    this._reviews.forEach((review) => {
      const reviewItemElement = document.createElement('review-item');
      reviewItemElement.review = review;
      reviewItemElement.classList.add('mb-3');

      reviewListElement.append(reviewItemElement);
    });
  }
}

customElements.define('review-list', ReviewList);

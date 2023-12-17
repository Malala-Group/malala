class ButtonLike extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.classList.add('btn-like-container');
    this.innerHTML = `
      <button class="btn-like btn custom-btn" aria-label="Add to wishlist" title="Add to wishlist">
        <i class="bi bi-bookmark"></i>
        Save
      </button>
    `;
  }
}

customElements.define('button-like', ButtonLike);

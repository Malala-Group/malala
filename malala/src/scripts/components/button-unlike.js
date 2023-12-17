class ButtonUnlike extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.classList.add('btn-like-container');
    this.innerHTML = `
      <button class="btn-unlike btn custom-btn" aria-label="Remove from wishlist" title="Remove from wishlist">
        <i class="bi bi-bookmark-fill"></i>
        Delete
      </button>
    `;
  }
}

customElements.define('button-unlike', ButtonUnlike);

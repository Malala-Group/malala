import './destination-card';

class DestinationList extends HTMLElement {
  set destinations({
    destinations, currentPage, lastPage, params,
  }) {
    this._destinations = destinations;
    this._currentPage = currentPage;
    this._lastPage = lastPage;
    this._params = params;
    this.render();
  }

  render() {
    this.classList.add('container', 'mb-5');
    this.innerHTML = /* html */ `
      <div class="row destination-container"></div>
      <div class="row">
          <div class="col-12 d-flex justify-content-center align-items-center">
              <nav aria-label="Page navigation">
                  <ul class="pagination" id="pagination-controls">
                  </ul>
              </nav>
          </div>
      </div>
    `;

    this.renderDestinationCards(this._destinations);
    this.renderPagination(this._currentPage, this._lastPage);
  }

  renderDestinationCards(destinations) {
    const destinationContainer = this.querySelector('.destination-container');
    destinationContainer.innerHTML = '';

    destinations.forEach((destination) => {
      const destinationCard = document.createElement('destination-card');
      destinationCard.destination = destination;
      destinationContainer.appendChild(destinationCard);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handlePaginationClick(page) {
    window.dispatchEvent(new CustomEvent('PAGINATION_CLICK', { detail: { page, params: this._params } }));
  }

  renderPagination(currentPage, lastPage) {
    const paginationContainer = this.querySelector('#pagination-controls');
    paginationContainer.innerHTML = '';

    const prevPageItem = document.createElement('li');
    prevPageItem.classList.add('page-item');
    const prevPageLink = document.createElement('a');
    prevPageLink.classList.add('page-link');
    prevPageLink.textContent = 'Previous';
    prevPageLink.addEventListener('click', () => this.handlePaginationClick(currentPage - 1));
    prevPageItem.appendChild(prevPageLink);
    paginationContainer.appendChild(prevPageItem);

    // eslint-disable-next-line no-plusplus
    for (let page = 1; page <= lastPage; page++) {
      const pageItem = document.createElement('li');
      pageItem.classList.add('page-item');

      const pageLink = document.createElement('a');
      pageLink.classList.add('page-link');
      pageLink.textContent = page;
      pageLink.addEventListener('click', () => this.handlePaginationClick(page));

      if (page === currentPage) {
        pageLink.classList.add('active');
      }

      pageItem.appendChild(pageLink);
      paginationContainer.appendChild(pageItem);
    }

    const nextPageItem = document.createElement('li');
    nextPageItem.classList.add('page-item');
    const nextPageLink = document.createElement('a');
    nextPageLink.classList.add('page-link');
    nextPageLink.textContent = 'Next';
    nextPageLink.addEventListener('click', () => this.handlePaginationClick(currentPage + 1));
    nextPageItem.appendChild(nextPageLink);
    paginationContainer.appendChild(nextPageItem);

    if (currentPage === 1) {
      prevPageItem.classList.add('disabled');
    }

    if (currentPage === lastPage) {
      nextPageItem.classList.add('disabled');
    }
  }
}

customElements.define('destination-list', DestinationList);

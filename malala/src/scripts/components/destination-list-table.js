import './destination-card';
import DestinationSource from '../data/destination-source';

class DestinationListTable extends HTMLElement {
  set destinations({
    destinations, currentPage, lastPage,
  }) {
    this._destinations = destinations;
    this._currentPage = currentPage;
    this._lastPage = lastPage;
    this.render();
  }

  render() {
    this.classList.add('container', 'mb-5');
    this.innerHTML = /* html */ `
        <h2>Data Tempat Wisata</h2>
        <div class="row">
          <table class="table col-12">
            <thead>
              <tr>
                <th scope="col">Nama</th>
                <th scope="col">Alamat</th>
                <th scope="col">Deskripsi</th>
                <th scope="col">Harga Tiket</th>
                <th scope="col">Link GMap</th>
                <th scope="col">Jam Operasional</th>
                <th scope="col">Contact</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody id="destinationTableBody"></tbody>
          </table>
        </div>
        <div class="row">
          <div class="col-12 d-flex justify-content-center align-items-center">
              <nav aria-label="Page navigation">
                  <ul class="pagination" id="pagination-controls">
                  </ul>
              </nav>
          </div>
        </div>
    `;

    this.renderDestinationRow(this._destinations);
    this.renderPagination(this._currentPage, this._lastPage);
  }

  renderDestinationRow(destinations) {
    const destinationTableBody = this.querySelector('#destinationTableBody');
    destinationTableBody.innerHTML = '';

    destinations.forEach((destination) => {
      const row = document.createElement('tr');
      row.innerHTML = /* html */`
        <td>${destination.name}</td>
        <td>${destination.address}</td>
        <td>${destination.description}</td>
        <td>${destination.price}</td>
        <td><a href="${destination.link_map}" target="_blank">Link GMap</a></td>
        <td>08.00 - 16.00</td>
        <td>${destination.contact}</td>
        <td>
          <a href="#/detail/${destination.id}" class="btn btn-info btn-sm mt-1 detail-btn">
            <i class="bi bi-eye"></i>
          </a>
          <a href="#/destination-edit/${destination.id}" class="btn btn-warning btn-sm mt-1 edit-btn">
            <i class="bi bi-pencil"></i>
          </a>
          <button type="button" class="btn btn-danger btn-sm mt-1 delete-btn">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;

      const deleteButton = row.querySelector('.delete-btn');
      deleteButton.addEventListener('click', async () => {
        await DestinationSource.delete(destination.id);
      });

      destinationTableBody.appendChild(row);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handlePaginationClick(page) {
    window.dispatchEvent(new CustomEvent('PAGINATION_CLICK', { detail: { page } }));
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

customElements.define('destination-list-table', DestinationListTable);

/* eslint-disable max-len */
import AuthSource from '../../../data/auth-source';
import '../../../components/destination-list';
import '../../../components/navbar';
import '../../../components/footer';
import WishlistSource from '../../../data/wishlist-source';

const Wishlist = {
  async render() {
    return /* html */ `
        <nav-bar></nav-bar>
        <div class="container py-5">
            <h1 class="text-center fs-1 mb-5">Wishlist</h1>
            <div class="list-destination"></div>
        </div>
        <foo-ter></foo-ter>
    `;
  },

  async afterRender() {
    const user = await AuthSource.checkAccessPage(['user', 'mitra']);
    const navbar = document.querySelector('nav-bar');
    navbar.user = user;

    await this.getDataAndRender();
    window.addEventListener('PAGINATION_CLICK', async (event) => {
      await this.getDataAndRender(event.detail.page);
    });
  },

  async getDataAndRender(page = 1) {
    try {
      const response = await WishlistSource.get(page);
      const wishlists = response.data.data;
      const destinations = [];
      wishlists.forEach((wishlist) => {
        destinations.push(wishlist.tourist_attraction);
      });
      const containerElement = document.querySelector('.list-destination');
      const destinationList = document.createElement('destination-list');
      destinationList.destinations = { destinations, currentPage: response.data.current_page, lastPage: response.data.last_page };

      containerElement.innerHTML = '';
      containerElement.append(destinationList);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error after rendering:', error);
    }
  },
};

export default Wishlist;

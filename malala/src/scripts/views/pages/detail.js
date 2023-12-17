import AuthSource from '../../data/auth-source';
import DestinationSource from '../../data/destination-source';
import UrlParser from '../../routes/url-parser';
import '../../components/destination-detail';
import '../../components/review-list';
import ReviewSource from '../../data/review-source';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import WishlistSource from '../../data/wishlist-source';

const Detail = {
  async render() {
    return /* html */`
      <style>
        .jam {
          background-color: #8EACBB;
          font-weight: bold;
        }
        input[name="rating"] {
          display: none;
        }
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
      <nav-bar></nav-bar>
      <div class="detail-wisata mb-5"></div>

      <div class="row mb-5">
        <div class="card shadow border-0 py-5 col-12 col-md-10 col-lg-8 mx-auto">
          <h2 class="fs-2 text-center">Ulasan</h2>
          <hr class="w-75 mx-auto mb-4">
          <review-list></review-list>
        </div>
      </div>

      <div class="row mb-5">
        <div class="card shadow border-0 p-5 col-12 col-md-10 col-lg-8 mx-auto">
          <h2 class="fs-2 text-center mb-3">Tambah Ulasan</h2>
          <div class="card border-0">
            <form id="formAddRating">
              <div class="rating mb-3" id="starRating">
                <input type="radio" id="star1" name="rating" value="1" />
                <label for="star1" title="1 star"><i class="fs-3 bi bi-star"></i></label>
                <input type="radio" id="star2" name="rating" value="2" />
                <label for="star2" title="2 stars"><i class="fs-3 bi bi-star"></i></label>
                <input type="radio" id="star3" name="rating" value="3" />
                <label for="star3" title="3 stars"><i class="fs-3 bi bi-star"></i></label>
                <input type="radio" id="star4" name="rating" value="4" />
                <label for="star4" title="4 stars"><i class="fs-3 bi bi-star"></i></label>
                <input type="radio" id="star5" name="rating" value="5" />
                <label for="star5" title="5 stars"><i class="fs-3 bi bi-star"></i></label>
              </div> 
              <div class="mb-3">
                <textarea class="form-control" id="inputComment" required rows="5"></textarea>
              </div>
              <button type="submit" class="btn custom-btn">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <foo-ter></foo-ter>
    `;
  },

  async afterRender() {
    const user = await AuthSource.checkAccessPage(['user', 'mitra']);
    const navbar = document.querySelector('nav-bar');
    navbar.user = user;

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const destination = await DestinationSource.get(url.id);

    const detailElement = document.createElement('destination-detail');
    detailElement.destination = destination.data;

    const detailContainer = document.querySelector('.detail-wisata');
    detailContainer.append(detailElement);

    await LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('.button-container'),
      wishlistSource: WishlistSource,
      destinationId: url.id,
    });

    const reviewElement = document.querySelector('review-list');
    const { reviews } = destination.data;
    if (reviews.length === 0) {
      reviewElement.innerHTML = '<p class="m-0 fs-2 text-center">Tidak ada ulasan</p>';
    } else {
      reviewElement.reviews = destination.data.reviews;
    }

    const ratingInputs = document.querySelectorAll('#starRating input');
    ratingInputs.forEach((ratingInput) => {
      ratingInput.addEventListener('click', (event) => {
        const clickedIndex = event.target.value;

        this.removeColorRating(ratingInputs);
        this.applyColorRating(ratingInputs, clickedIndex);
      });
    });

    const formAddRating = document.querySelector('#formAddRating');
    formAddRating.addEventListener('submit', async (event) => {
      event.preventDefault();
      const comment = {
        rating: parseInt(document.querySelector('input[name="rating"]:checked').value, 10),
        comment: document.querySelector('#inputComment').value,
        tourist_attraction_id: destination.data.id,
      };
      await ReviewSource.add(comment);
    });
  },

  applyColorRating(ratingInputs, count) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < count; i++) {
      const ratingInput = ratingInputs[i];
      const iconStar = ratingInput.nextElementSibling.querySelector('i');
      iconStar.classList.add('bi-star-fill', 'text-warning');
      iconStar.classList.remove('bi-star');
    }
  },

  removeColorRating(ratingInputs) {
    ratingInputs.forEach((ratingInput) => {
      const iconStar = ratingInput.nextElementSibling.querySelector('i');
      iconStar.classList.remove('bi-star-fill', 'text-warning');
      iconStar.classList.add('bi-star');
    });
  },
};

export default Detail;

/* eslint-disable no-alert */
import '../components/button-like';
import '../components/button-unlike';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, wishlistSource, destinationId }) {
    this._likeButtonContainer = likeButtonContainer;
    this._destinationId = destinationId;
    this._wishlistSource = wishlistSource;
    await this._renderButton();
  },

  async _renderButton() {
    this._likeButtonContainer.innerHTML = '';
    if (await this._isRestoExist(this._destinationId)) {
      this._renderUnlike();
    } else {
      this._renderLike();
    }
  },

  async _isRestoExist(id) {
    const destination = await this._wishlistSource.getDetail(id);
    return !!destination;
  },

  _renderLike() {
    const buttonLikeElement = document.createElement('button-like');
    this._likeButtonContainer.appendChild(buttonLikeElement);

    buttonLikeElement.addEventListener('click', async (event) => {
      event.stopPropagation();
      if (await this._isRestoExist(this._destinationId) === false) {
        await this._wishlistSource.add(this._destinationId);
      }
      await this._renderButton();
    });
  },

  _renderUnlike() {
    const buttonUnlikeElement = document.createElement('button-unlike');
    this._likeButtonContainer.appendChild(buttonUnlikeElement);

    buttonUnlikeElement.addEventListener('click', async (event) => {
      event.stopPropagation();
      if (await this._isRestoExist(this._destinationId) === true) {
        await this._wishlistSource.delete(this._destinationId);
      }
      await this._renderButton();
    });
  },

};

export default LikeButtonPresenter;

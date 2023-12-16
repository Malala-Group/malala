import $ from 'jquery';
import AuthSource from '../../data/auth-source';

require('select2');

const Profile = {
  async render() {
    return /* html */`
        <nav-bar></nav-bar>
        <div class="container">
            <form id="formUpdateProfile" class="py-5">
                <div class="row">
                    <div class="col-12 col-md-4 py-lg-5 px-lg-3">
                        <div class="mb-3 w-75 mx-auto">
                            <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" class="w-100 border rounded-circle">
                        </div>
                        <div class="mb-3">
                            <label for="inputProfilePicture" class="form-label fw-semi-bold">Profile Picture</label>
                            <div class="input-group mb-3">
                                <input type="file" class="form-control" id="inputProfilePicture">
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-8">
                        <h1 class="fs-1 mb-4">Account Setting</h1>
                        <div class="mb-3">
                            <label for="inputName" class="form-label fw-semi-bold">Name</label>
                            <input type="text" class="form-control" id="inputName">
                        </div>
                        <div class="mb-3">
                            <label for="inputEmail" class="form-label fw-semi-bold">Email address</label>
                            <input type="email" class="form-control" id="inputEmail" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="inputContact" class="form-label fw-semi-bold">Contact</label>
                            <input type="text" class="form-control" id="inputContact">
                        </div>
                        <div class="mb-3 d-flex justify-content-end">
                            <button type="button" class="btn btn-primary mx-2">Kembali</button>
                            <button type="submit" class="btn btn-primary mx-2">Simpan</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <foo-ter></foo-ter>
        `;
  },

  async afterRender() {
    const user = await AuthSource.checkAccessPage(['user', 'mitra', 'admin']);
    const navbar = document.querySelector('nav-bar');
    navbar.user = user;

    $('#inputName').val(user.name);
    $('#inputEmail').val(user.email);
    $('#inputContact').val(user.name);
  },
};

export default Profile;

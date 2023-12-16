/* eslint-disable max-len */
import '../../components/footer';
import '../../components/destination-list';
import AuthSource from '../../data/auth-source';
import DestinationSource from '../../data/destination-source';
import CONFIG from '../../globals/config';

const Serch = {
  async render() {
    return /* html */`
        <style>
            body {
                overflow-x: hidden;
            }

            #sidebar {
                width: 250px;
            }

            .welcome::before {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background: rgba(0, 0, 0, .65);
                pointer-events: none;
            }
            .content {
                position: relative;
                z-index: 1;
            }

        </style>
        <div class="d-flex flex-row" id="wrapper">

            <!-- Sidebar -->
            <div class="min-vh-100 bg-dark d-flex flex-column p-3" id="sidebar">
                <div class="w-75 mx-auto mb-3">
                    <img src="images/logo.png" class="w-100">
                    </div>
                    
                <div class="d-flex py-2 text-white">
                    <img src="images/profil.jpg" class="rounded-circle" style="width: 35px; height: 35px;">
                    <p class="ms-2 mb-0" style="font-family: 'Poppins', sans-serif; font-weight: bold;">Hai, Martinus Juan</p>
                    <div class="d-flex align-items-center px-2">
                        <p class="user-login-name m-0 text-white"></p>
                    </div>
                </div>

                <div class="d-flex flex-column py-2">
                    <div class="sidebar-heading text-white mb-1">Dashboard and Profile</div>
                    <a href="${CONFIG.BASE_URL}#/dashboard" class="text-decoration-none mb-1"><i class="bi bi-house-door-fill"></i> Dashboard</a>
                    <a href="${CONFIG.BASE_URL}#/profile" class="text-decoration-none mb-1"><i class="bi bi-person"></i> Profile</a>
                </div>

                <div class="d-flex flex-column py-2">
                    <div class="sidebar-heading text-white mb-1">Filter</div>
                    <form>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="34" name="filterProvince" id="inputRadioYogyakarta">
                            <label class="form-check-label text-white" for="inputRadioYogyakarta">
                                D.I Yogyakarta
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="51" name="filterProvince" id="inputRadioBali">
                            <label class="form-check-label text-white" for="inputRadioBali">
                                Bali
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="33" name="filterProvince" id="inputRadioJawaTengah">
                            <label class="form-check-label text-white" for="inputRadioJawaTengah">
                                Jawa Tengah
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="53" name="filterProvince" id="inputRadioNTT">
                            <label class="form-check-label text-white" for="inputRadioNTT">
                                NTT
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="62" name="filterProvince" id="inputRadioKalimantanTengah">
                            <label class="form-check-label text-white" for="inputRadioKalimantanTengah">
                                Kalimantan Tengah
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" value="73" name="filterProvince" id="inputRadioSulawesiSelatan">
                            <label class="form-check-label text-white" for="inputRadioSulawesiSelatan">
                                Sulawesi Selatan
                            </label>
                        </div>
                        <button type="reset" class="btn text-white">Reset Filter</button>
                    </form>
                </div>
            </div>

            <!-- Page Content -->
            <div id="content" class="flex-grow-1">
                <div class="welcome position-relative overflow-hidden d-flex flex-column justify-content-center" style="background-image: url('/images/beach.png'); background-size: cover; background-position: center; background-repeat: no-repeat; height: 50vh;">
                    
                <div class="content row mt-5">
                        <div class="col-12 col-md-8 col-lg-6 mx-auto py-5">
                            <div class="mb-5">
                                <h1 class="text-white text-center" style="font-size: 70px">Start Your Journey</h1>
                                <p class="text-white text-center fs-4">Your Journey, Your Expertise</p>
                            </div>
                            <form id="formSearchDestination" class="d-flex justify-content-center shadow px-3 py-2 bg-white mx-auto mb-5" style="border-radius: 500px; height: 44px;">
                                <input class="form-control border-0" type="search" id="inputKeywordDestination" placeholder="Find something....." aria-label="Search" style="border-radius: 500px">
                                <button type="submit" class="btn d-flex justify-content-center align-items-center">
                                    <i class="bi bi-search text-secondary"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- Content -->
                <div class="container py-5">
                    <h2 class="text-center mb-5">Your Search</h2>
                    <div class="row container container-search-result">

                    </div>
                </div>

            </div>
        </div>
        <foo-ter></foo-ter>
    `;
  },

  async afterRender() {
    const user = await AuthSource.checkAccessPage(['user', 'mitra', 'admin']);
    const sidebarUserLoginName = document.querySelector('.user-login-name');
    sidebarUserLoginName.textContent = `Hai, ${user.name}`;

    const formSearchDestination = document.querySelector('#formSearchDestination');
    formSearchDestination.addEventListener('submit', async (event) => {
      event.preventDefault();
      const keyword = document.querySelector('#inputKeywordDestination').value;

      const selectedRadio = document.querySelector('input[name="filterProvince"]:checked');
      const filterProvince = selectedRadio ? selectedRadio.value : null;

      await this.getDataAndRender({ name: keyword, provinceId: filterProvince });
    });

    window.addEventListener('PAGINATION_CLICK', async (e) => {
      await this.getDataAndRender({ page: e.detail.page, name: e.detail.params.name, provinceId: e.detail.params.provinceId });
    });
  },

  async getDataAndRender({ page = 1, name, provinceId }) {
    try {
      if (name === '' && provinceId === null) {
        return;
      }
      console.log(page);
      const data = await DestinationSource.list({ page, name, provinceId });
      console.log(data);
      const containerElement = document.querySelector('.container-search-result');

      const destinationList = document.createElement('destination-list');
      destinationList.destinations = {
        destinations: data.data.data, currentPage: data.data.current_page, lastPage: data.data.last_page, params: { name, provinceId },
      };

      containerElement.innerHTML = '';
      containerElement.append(destinationList);
    } catch (error) {
      console.error('Error after rendering:', error);

      if (error.response && error.response.status === 404) {
        const containerElement = document.querySelector('.container-search-result');
        containerElement.innerHTML = '<p class="text-center">Data not found. Please check your search criteria.</p>';
      } else {
        const containerElement = document.querySelector('.container-search-result');
        containerElement.innerHTML = '<p class="text-center">An error occurred. Please try again later.</p>';
      }
    }
  },
};

export default Serch;

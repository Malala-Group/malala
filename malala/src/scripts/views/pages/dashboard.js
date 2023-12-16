/* eslint-disable max-len */
import DestinationSource from '../../data/destination-source';
import AuthSource from '../../data/auth-source';
import '../../components/destination-list';
import '../../components/navbar';
import '../../components/footer';

const Dashboard = {
  async render() {
    return /* html */ `
        <style>
            .card-icon {
                position: absolute;
                top: 10px;
                right: 10px;
                z-index: 1;
            }
            
            .rating {
                font-size: 24px;
                color: #000;
                cursor: pointer;
            }
        
            .rating .star {
                transition: color 0.5s;
            }
        
            .rating .star:hover,
            .rating .star.active {
                color: #ffc107; 
            }
        </style>
        <nav-bar></nav-bar>
        <div class="container">
            <div class="mt-2 mb-5">
                <div class="position-relative">
                    <img src="/images/data1.jpg" class="img-fluid border border-dark rounded-3" alt="Deskripsi Gambar" style="filter: brightness(60%);">
                    <div class="position-absolute top-0 start-0 text-white text-center mt-5 p-3 w-100">
                        <h1>"Explore the Beauty of Indonesia, One Tourist <br> Destination at a Click."</h1>
                    </div>
                </div>
            </div>
                


            <div class="list-destination"></div>

        </div>
        <foo-ter></foo-ter>

    `;
  },

  // <!-- Kotak Pencarian -->
  //           <div class="d-flex justify-content-center mb-5 shadow py-2 px-5 mb-5 bg-white mx-auto" style="width: 50%; border-radius: 500px">
  //               <form class="d-flex w-100" id="formSearchDestination">
  //                   <input class="form-control border-0 me-2" type="search" placeholder="Find something....." aria-label="Search" style="border-radius: 500px">
  //                   <button type="submit" class="btn">
  //                       <i class="bi bi-search text-secondary" style="font-size: 25px;"></i>
  //                   </button>
  //               </form>
  //           </div>

  async afterRender() {
    const user = await AuthSource.checkAccessPage(['user', 'mitra']);
    const navbar = document.querySelector('nav-bar');
    navbar.user = user;

    await this.getDataAndRender();
    window.addEventListener('PAGINATION_CLICK', async (event) => {
      await this.getDataAndRender(event.detail.page);
    });

    // const formSearchDestination = document.querySelector('#formSearchDestination');
    // formSearchDestination.addEventListener('submit', (event) => {
    //   event.preventDefault();
    //   const keyword = formSearchDestination.querySelector('input').value;
    //   if (keyword === '') {
    //     return;
    //   }
    //   window.location.href = `http://localhost:9000/#/search?name=${keyword}`;
    // });
  },

  async getDataAndRender(page = 1) {
    try {
      console.log(page);
      const data = await DestinationSource.list({ page });
      console.log(data.data);
      const containerElement = document.querySelector('.list-destination');
      const destinationList = document.createElement('destination-list');
      // eslint-disable-next-line max-len
      destinationList.destinations = { destinations: data.data.data, currentPage: data.data.current_page, lastPage: data.data.last_page };

      containerElement.innerHTML = '';
      containerElement.append(destinationList);
    } catch (error) {
      console.error('Error after rendering:', error);
    }
  },
};

export default Dashboard;

import createSideBar from '../../templates/TmSideBar';
import AuthSource from '../../../data/auth-source';
import CONFIG from '../../../globals/config';

const DashboardMitra = {
  async render() {
    const sidebar = createSideBar();
    return /* html */ `
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #EAF2F6;
        }
      
        #navbar {
          background-color: #fff;
          color: white;
          display: flex;
          justify-content: space-between;
          box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
        }
      
        #account-menu {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
        }
      
        #account-menu li {
          margin-left: 10px;
          margin-right: 30px;
        }
      
        #account-menu li a {
          text-decoration: none;
          color: #476776;
          font-weight: 700;
        }
      
        .drawer {
          position: fixed;
          top: 60px;
          /* Sesuaikan dengan tinggi navbar */
          right: 0;
          width: 200px;
          background-color: #fff;
          box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1);
          display: none;
          /* Awalnya sembunyi */
        }
      
        .drawer.show {
          display: block;
        }
      
        .drawer ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
      
        .drawer li {
          margin-bottom: 10px;
        }
      
        .drawer a {
          text-decoration: none;
          color: #476776;
          font-weight: 500;
          display: block;
          padding: 10px;
        }
      
        #dashboard-container {
          display: flex;
        }
      
        #account-menu i {
          color: black;
        }
      
        #menu {
          list-style: none;
          text-align: left;
          margin-left: 15px;
        }
      
        #menu li {
          margin-bottom: 10px;
        }
      
        #menu li a {
          text-decoration: none;
          color: #476776;
          font-weight: 500;
        }
      
        #content {
          flex: 1;
          padding: 20px;
        }
      
        #cover-logo {
          background-color: #476776;
          width: 290px;
          height: 75px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      
        #cover-logo img {
          display: block;
          width: 140px;
          height: 56px;
        }
      
        .table {
          width: 100%;
          text-align: center;
        }
      </style>
      <div id="navbar">
        <div id="cover-logo">
          <img src="/images/logo.png" alt="Logo" />
        </div>
        <ul id="account-menu">
          <li><i class="bi bi-person-circle"></i></li>
          <li id="account-menu-trigger"><a href="${CONFIG.BASE_URL}#/profile"></a></li>
        </ul>
      </div>
      <div id="drawer" class="drawer">
        <ul>
          <li>
            <a href="#">Settings</a>
          </li>
          <li>
            <a href="#">Log Out</a>
          </li>
        </ul>
      </div>
      <div id="dashboard-container"> 
        ${sidebar} 
        <div id="content">
          <div class="col-md-4">
            <div class="card text-white bg-danger" style="max-width: 15rem;">
              <div class="row">
                <div class="col ms-2">
                  <h3 class="card-title">44</h3>
                  <p class="card-text">data Wisata </p>
                </div>
                <div class="col text-end me-4">
                  <i class="bi bi-people-fill" style="font-size: 3rem;"></i>
                </div>
              </div>
              <a href="#" class="card-footer small-box-footer text-white"> More info <i class="bi bi-arrow-right-circle-fill"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const user = await AuthSource.checkAccessPage(['mitra']);
    const userNavElement = document.querySelector('#account-menu-trigger a');
    userNavElement.textContent = user.name;
  },
};

export default DashboardMitra;

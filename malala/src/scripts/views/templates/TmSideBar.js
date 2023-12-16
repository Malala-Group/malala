import CONFIG from '../../globals/config';

const createSideBar = () => /* html */`
  <style>
    #sidebar {
      width: 290px;
      background-color: #fff;
      /* Warna sidebar */
      color: #476776;
      text-align: center;
      height: 100vh;
      box-shadow: 10px 0 10px rgba(0, 0, 0, 0.1);
    }

    #sidebar img {
      width: 100%;
      margin-bottom: 20px;
    }

    #sidebar p {
      margin-top: 15px;
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      letter-spacing: 1px;
    }
  </style>
  <div id="sidebar">
    <p>Navigation</p>
    <ul id="menu">
      <li>
        <i class="bi bi-house-door"></i>
        <a href="${CONFIG.BASE_URL}#/dashboard-mitra">Dashboard</a>
      </li>
      <li>
        <i class="bi bi-bar-chart-fill"></i>
        <a href="${CONFIG.BASE_URL}#/destination-list">List Data Wisata</a>
      </li>
      <li>
        <i class="bi bi-plus-square"></i>
        <a href="${CONFIG.BASE_URL}#/destination-add">Tambah Data Wisata</a>
      </li>
    </ul>
  </div>
`;

export default createSideBar;

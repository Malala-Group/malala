import $ from 'jquery';
import DestinationSource from '../../../data/destination-source';
import RegionSource from '../../../data/region-source';
import AuthSource from '../../../data/auth-source';
import createSideBar from '../../templates/TmSideBar';
import CONFIG from '../../../globals/config';

require('select2');

const AddDestination = {
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
        #account-menu li a{
          text-decoration: none;
          color: #476776;
          font-weight: 700;
        }
        .drawer {
          position: fixed;
          top: 60px; /* Sesuaikan dengan tinggi navbar */
          right: 0;
          width: 200px;
          background-color: #fff;
          box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1);
          display: none; /* Awalnya sembunyi */
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
        #menu li a{
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
        #cover-logo img{
          display: block;
          width: 140px;
          height:56px;
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
          <li><a href="#">Settings</a></li>
          <li><a href="#">Log Out</a></li>
        </ul>
      </div>

      <div id="dashboard-container">
        ${sidebar}
        <div id="content">
          <form id="formAddDestination" enctype="multipart/form-data">
            <div class="mb-3">
              <label for="inputName" class="form-label">Nama Tempat Wisata</label>
              <input type="text" class="form-control" id="inputName" aria-describedby="inputName">
            </div>
            <div class="mb-3">
              <label for="inputDescription" class="form-label">Deskripsi</label>
              <textarea class="form-control" id="inputDescription" aria-describedby="inputDescription"></textarea>
            </div>
            <div class="mb-3">
              <label for="inputPrice" class="form-label">Harga tiket</label>
              <input type="number" min="0" class="form-control" id="inputPrice" aria-describedby="inputPrice">
            </div>
            <div class="row">
              <div class="col">
                <label for="selectProvince" class="form-label">Provinsi</label>
                <select class="form-select" id="selectProvince" >
                  <option></option>
                </select>
              </div>
              <div class="col">
                <label for="selectRegency" class="form-label">Kota/kabupaten</label>
                <select class="form-select" id="selectRegency" >
                  <option></option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="selectDistric" class="form-label">Kecamatan</label>
                <select class="form-select" id="selectDistrict" >
                  <option></option>
                </select>
              </div>
              <div class="col">
                <label for="selectVillage" class="form-label">Kelurahan</label>
                <select class="form-select" id="selectVillage" >
                  <option></option>
                </select>
              </div>
            </div>
            <div class="mb-3">
              <label for="inputAddress" class="form-label">Alamat</label>
              <input type="text" class="form-control" id="inputAddress" aria-describedby="inputAddress">
            </div>
            <div class="mb-3">
              <label for="inputLinkGMap" class="form-label">Link Google Map</label>
              <input type="text" class="form-control" id="inputLinkGMap" aria-describedby="inputLinkGMap" placeholder="https://maps.app.goo.gl/">
            </div>
            <div class="mb-3">
              <label for="inputContact" class="form-label">Contact</label>
              <input type="text" class="form-control" id="inputContact" aria-describedby="inputContact" placeholder="+62">
            </div>
            <div class="mb-3">
              <label for="inputImage" class="form-label">Foto</label>
              <div class="input-group mb-3">
                <input type="file" class="form-control" id="inputImage" >
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <a href="${CONFIG.BASE_URL}#/destination-list" class="btn btn-danger">Cancel</a>
          </form>
        </div>
      </div>
  `;
  },

  async afterRender() {
    const user = await AuthSource.checkAccessPage(['mitra']);
    const userNavElement = document.querySelector('#account-menu-trigger a');
    userNavElement.textContent = user.name;

    const selectProvinceElement = document.querySelector('#selectProvince');
    const data = await RegionSource.provinces();
    const provinces = data.data;
    provinces.forEach((province) => {
      const optionElement = document.createElement('option');
      optionElement.setAttribute('value', province.id);
      optionElement.text = province.name;
      selectProvinceElement.appendChild(optionElement);
    });

    // eslint-disable-next-line no-undef
    $('#selectProvince').select2({
      theme: 'bootstrap-5',
      placeholder: 'Pilih Provinsi',
      allowClear: true,
    });

    $('#selectRegency').prop('disabled', true);
    $('#selectDistrict').prop('disabled', true);
    $('#selectVillage').prop('disabled', true);

    $('#selectProvince').on('change', async () => {
      const provinceId = $('#selectProvince').val();
      if (!provinceId) {
        $('#selectRegency').prop('disabled', true);
        $('#selectRegency').empty();
        $('#selectDistrict').prop('disabled', true);
        $('#selectDistrict').empty();
        $('#selectVillage').prop('disabled', true);
        $('#selectVillage').empty();
        return;
      }
      $('#selectRegency').prop('disabled', false);
      let regencies = await RegionSource.regencies(provinceId);
      regencies = regencies.data;
      regencies = regencies.map(({ id, name }) => ({
        id,
        text: name,
      }));
      $('#selectRegency').empty();
      $('#selectRegency').select2({
        theme: 'bootstrap-5',
        allowClear: true,
        placeholder: 'Pilih Kabupaten/Kota',
        data: regencies,
      });
    });

    $('#selectRegency').on('change', async () => {
      const regencyId = $('#selectRegency').val();
      if (!regencyId) {
        $('#selectDistrict').prop('disabled', true);
        $('#selectDistrict').empty();
        $('#selectVillage').prop('disabled', true);
        $('#selectVillage').empty();
        return;
      }
      $('#selectDistrict').prop('disabled', false);
      $('#selectVillage').prop('disabled', false);
      let districts = await RegionSource.districts(regencyId);
      districts = districts.data;
      districts = districts.map(({ id, name }) => ({
        id,
        text: name,
      }));
      $('#selectDistrict').empty();
      $('#selectDistrict').select2({
        theme: 'bootstrap-5',
        allowClear: true,
        placeholder: 'Pilih Kecamatan',
        data: districts,
      });
    });

    $('#selectDistrict').on('change', async () => {
      const districtId = $('#selectDistrict').val();
      if (!districtId) {
        $('#selectVillage').prop('disabled', true);
        $('#selectVillage').empty();
        return;
      }
      $('#selectVillage').prop('disabled', false);
      let villages = await RegionSource.villages(districtId);
      villages = villages.data;
      villages = villages.map(({ id, name }) => ({
        id,
        text: name,
      }));
      $('#selectVillage').empty();
      $('#selectVillage').select2({
        theme: 'bootstrap-5',
        allowClear: true,
        placeholder: 'Pilih Desa/Kelurahan',
        data: villages,
      });
    });

    $('#formAddDestination').on('submit', async (event) => {
      event.preventDefault();

      const destination = {
        name: $('#inputName').val(),
        description: $('#inputDescription').val(),
        price: $('#inputPrice').val(),
        province_id: $('#selectProvince').val(),
        regency_id: $('#selectRegency').val(),
        district_id: $('#selectDistrict').val(),
        village_id: $('#selectVillage').val(),
        address: $('#inputAddress').val(),
        contact: $('#inputContact').val(),
        link_map: $('#inputLinkGMap').val(),
      };

      const imageFile = $('#inputImage')[0].files[0];

      const formData = new FormData();
      formData.append('image', imageFile);
      Object.keys(destination).forEach((key) => {
        formData.append(key, destination[key]);
      });
      await DestinationSource.add(formData);
    });
  },

};

export default AddDestination;

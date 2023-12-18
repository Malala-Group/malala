import $ from 'jquery';
import AuthSource from '../../data/auth-source';
import CONFIG from '../../globals/config';

const SignUp = {
  async render() {
    return /* html */`
    <style>
      body {
        background-color: #EAF2F6;
        margin: 0;
      }

      .signup-container {
        display: flex;
        height: 100vh;
      }

      .left-section {
        flex: 1;
        background-color: #263238;
        border-top-right-radius:45%;
        border-bottom-right-radius: 45%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .right-section {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #EAF2F6;
      
      }
      .line-container {
        position: relative;
        text-align: center;
      }

      .line {
        width: 100%;
        height: 1px; 
        background-color: #000; 
        position: relative;
        margin: 20px 0; 
      }

      .text-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #EAF2F6;
        padding: 0 10px;
        z-index: 2;
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
      .judul{
      font-family: 'Poppins';
      color: #476777 ;
      }
      
    </style>

    <div class="signup-container">
      <div class="left-section">
        <img src="/images/bg login.png" alt="Logo" style="max-width: 100%;">
      </div>
      <div class="right-section">
        <div class="signup-form">
            <img src="/images/navbar.png" class="mx-auto d-block" style="height: 70px;" alt="Navbar Image">
          <h2 class="judul">Sign Up</h2>
          <p>Already Sign Up? <a href="${CONFIG.BASE_URL}#/sign-in">Sign In</a></p>

          <div class="line-container">
            <div class="line"></div>
            <div class="text-container">
              <div class="text">OR</div>
            </div>
          </div>

          <div id="alert-container">

          </div>

          <form id="formRegister">
            <div class="mb-3">
              <input type="text" class="form-control" id="inputName" name="inputName" placeholder="Fullname" required>
            </div>
            <div class="mb-3">
              <input type="email" class="form-control" id="inputEmail" name="inputEmail" placeholder="Email" required>
            </div>
            <div class="mb-3">
              <div class="input-group">
                <input type="password" class="form-control" id="inputPassword" name="inputPassword" placeholder="Password" required>
                <button class="btn btn-outline-secondary" type="button" id="togglePassword"><i class="bi bi-eye"></i></button>
              </div>
            </div>
            <div class="mb-3">
              <div class="input-group">
                <input type="password" class="form-control" id="passwordConfirmation" name="passwordConfirmation" placeholder="Re Type Password" required>
                <button class="btn btn-outline-secondary" type="button" id="toggleConfirmPassword"><i class="bi bi-eye"></i></button>
              </div>
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="agreeCheck" required>
              <label class="form-check-label" for="agreeCheck">I agree to the terms and conditions</label>
            </div>
            <button type="submit" class="btn custom-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
    `;
  },

  async afterRender() {
    const passwordInput = $('#inputPassword');
    const togglePasswordButton = $('#togglePassword');

    togglePasswordButton.on('click', () => {
      const passwordType = passwordInput.attr('type') === 'password' ? 'text' : 'password';
      passwordInput.attr('type', passwordType);

      togglePasswordButton.find('i').toggleClass('bi-eye bi-eye-slash');
    });

    const confirmPasswordInput = $('#passwordConfirmation');
    const toggleConfirmPasswordButton = $('#toggleConfirmPassword');

    toggleConfirmPasswordButton.on('click', () => {
      const passwordType = confirmPasswordInput.attr('type') === 'password' ? 'text' : 'password';
      confirmPasswordInput.attr('type', passwordType);

      toggleConfirmPasswordButton.find('i').toggleClass('bi-eye bi-eye-slash');
    });

    $('#formRegister').on('submit', async (event) => {
      event.preventDefault();

      const user = {
        name: $('#inputName').val(),
        email: $('#inputEmail').val(),
        password: $('#inputPassword').val(),
        password_confirmation: $('#passwordConfirmation').val(),
      };

      const alertContainer = $('#alert-container');
      alertContainer.empty();

      try {
        await AuthSource.register(user);
      } catch (error) {
        if (error.response.status === 422) {
          const data = error.response.data.errors;
          const ul = document.createElement('ul');
          ul.className = 'alert alert-danger';
          ul.setAttribute('role', 'alert');

          // eslint-disable-next-line no-unused-vars
          Object.entries(data).forEach(([key, [value]]) => {
            const li = document.createElement('li');
            li.textContent = value;
            ul.appendChild(li);
          });
          alertContainer.append(ul);

          if (data.name) {
            $('#inputName').addClass('is-invalid');
            $('#inputName').removeClass('is-valid');
          } else {
            $('#inputName').addClass('is-valid');
            $('#inputName').removeClass('is-invalid');
          }
          if (data.email) {
            $('#inputEmail').addClass('is-invalid');
            $('#inputEmail').removeClass('is-valid');
          } else {
            $('#inputEmail').addClass('is-valid');
            $('#inputEmail').removeClass('is-invalid');
          }
          if (data.password) {
            $('#inputPassword').addClass('is-invalid');
            $('#inputPassword').removeClass('is-valid');
            $('#passwordConfirmation').addClass('is-invalid');
            $('#passwordConfirmation').removeClass('is-valid');
          } else {
            $('#inputPassword').addClass('is-valid');
            $('#inputPassword').removeClass('is-invalid');
            $('#passwordConfirmation').addClass('is-valid');
            $('#passwordConfirmation').removeClass('is-invalid');
          }
        }
        throw error;
      }
    });
  },
};

export default SignUp;

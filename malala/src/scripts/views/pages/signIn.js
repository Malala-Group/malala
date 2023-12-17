import $ from 'jquery';
import AuthSource from '../../data/auth-source';
import CONFIG from '../../globals/config';

const SignIn = {
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
        .menu {
        animation: fadeInUp 1s ease-in-out;
        }
        @keyframes fadeInUp {
        from {
        opacity: 0;
        transform: translateY(20px);
        }
        to {
        opacity: 1;
        transform: translateY(0);
        }
        }
      </style>

      <div class="signup-container">
        <div class="left-section">
          <img src="/images/bg login.png" alt="Logo" style="max-width: 100%;">
        </div>

        <div class="right-section menu">
          <div class="col-md-7">
            <div class="text-center">
              <img src="/images/navbar.png" class="img-fluid mb-3" alt="Logo">
              <h3>Welcome to MALALA </h3>
              <h4>Your Journey, Our Expertise!</h4>
            </div>
            <form id="formLogin" class="mt-4">
              <div class="mb-3">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-person-fill"></i>
                  </span>
                <input type="text" class="form-control" id="email" name="email" placeholder="Email" required>
              </div>
              <div class="mb-3 mt-3">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-lock"></i>
                  </span>
                  <input type="password" class="form-control" id="password" name="password" placeholder="Password" required>
                  <button class="btn btn-outline-secondary" type="button" id="togglePassword"><i class="bi bi-eye"></i></button>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-text d-flex justify-content-end">
                  <a href="#" class="me-2">Forgot Password?</a>
                </div>
              </div>
              <div class="mb-3">
                <button type="submit" class="btn custom-btn">Sign In</button>
              </div>
            </form>
            <div class="d-flex justify-content-center">
              <p>Don't have an account? <a href="${CONFIG.BASE_URL}#/sign-up">Sign Up</a></p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const passwordInput = $('#password');
    const toggleButton = $('#togglePassword');

    toggleButton.on('click', () => {
      const passwordType = passwordInput.attr('type') === 'password' ? 'text' : 'password';
      passwordInput.attr('type', passwordType);

      toggleButton.find('i').toggleClass('bi-eye bi-eye-slash');
    });

    $('#formLogin').on('submit', async (event) => {
      event.preventDefault();

      const user = {
        email: $('#email').val(),
        password: $('#password').val(),
      };

      await AuthSource.login(user);
    });
  },
};

export default SignIn;

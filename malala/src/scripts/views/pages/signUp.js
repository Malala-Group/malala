import $ from 'jquery';
import AuthSource from '../../data/auth-source';

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
    </style>

    <div class="signup-container">
      <div class="left-section">
        <!-- Logo or any content for the left section -->
        <img src="/images/bg login.png" alt="Logo" style="max-width: 100%;">
      </div>
      <div class="right-section">
        <div class="signup-form">
            <img src="/images/navbar.png" class="mx-auto d-block" style="height: 70px;" alt="Navbar Image">
          <h2>Sign Up</h2>
          <p>Already Sign Up? <a href="#/sign-in">Sign In</a></p>
          <!-- Your sign-up form content goes here -->
          <div class="line-container">
            <div class="line"></div>
            <div class="text-container">
              <div class="text">OR</div>
            </div>
          </div>

          <form id="formRegister">
            <div class="mb-3">
              <input type="text" class="form-control" id="inputName" name="inputName" placeholder="Fullname">
            </div>
            <div class="mb-3">
              <input type="email" class="form-control" id="inputEmail" name="inputEmail" placeholder="Email">
            </div>
            <div class="mb-3">
              <div class="input-group">
                <input type="password" class="form-control" id="inputPassword" name="inputPassword" placeholder="Password">
                <button class="btn btn-outline-secondary" type="button" id="togglePassword">Show</button>
              </div>
            </div>
            <div class="mb-3">
              <div class="input-group">
                <input type="password" class="form-control" id="passwordConfirmation" name="passwordConfirmation" placeholder="Re Type Password">
                <button class="btn btn-outline-secondary" type="button" id="togglePassword">Show</button>
              </div>
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="agreeCheck">
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
    $('#formRegister').on('submit', async (event) => {
      event.preventDefault();

      const user = {
        name: $('#inputName').val(),
        email: $('#inputEmail').val(),
        password: $('#inputPassword').val(),
        password_confirmation: $('#passwordConfirmation').val(),
      };

      await AuthSource.register(user);
    });
  },
};

export default SignUp;

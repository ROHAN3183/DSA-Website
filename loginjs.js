document.addEventListener('DOMContentLoaded', function () {
    const loginModal = document.getElementById('loginModal');
    const closeLoginBtn = document.getElementById('closeLogin');
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginMessage = document.getElementById('loginMessage');
    const togglePasswordLogin = document.getElementById('togglePassword');
    const loginBtn = document.getElementById('loginBtn');
  
    const fakeEmail = "test@example.com";
    const fakePassword = "password123";
    let loggedIn = false;
  
    function openLoginModal() {
      loginModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
  
      loginMessage.textContent = '';
      emailInput.value = '';
      passwordInput.value = '';
      emailInput.classList.remove('error');
      passwordInput.classList.remove('error');
    }
  
    if (loginBtn) {
      loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
  
        if (loggedIn) {
          if (confirm('Are you sure you want to logout?')) {
            loggedIn = false;
            loginBtn.textContent = 'Login';
            alert('You have been logged out.');
          }
        } else {
          openLoginModal();
        }
      });
    }
  
    closeLoginBtn.addEventListener('click', () => {
      loginModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  
    window.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  
    togglePasswordLogin.addEventListener('click', () => {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      togglePasswordLogin.textContent = type === 'password' ? 'Show' : 'Hide';
    });
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      loginMessage.textContent = '';
      emailInput.classList.remove('error');
      passwordInput.classList.remove('error');
  
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      if (!email || !password) {
        loginMessage.style.color = 'red';
        loginMessage.textContent = 'Please fill in all fields.';
        if (!email) emailInput.classList.add('error');
        if (!password) passwordInput.classList.add('error');
        return;
      }
  
      if (email === fakeEmail && password === fakePassword) {
        loginMessage.style.color = 'green';
        loginMessage.textContent = 'Login successful!';
        setTimeout(() => {
          loginModal.style.display = 'none';
          document.body.style.overflow = 'auto';
          loggedIn = true;
          loginBtn.textContent = 'Logout';
          loginForm.reset();
        }, 1000);
      } else {
        loginMessage.style.color = 'red';
        loginMessage.textContent = 'Invalid email or password.';
        emailInput.classList.add('error');
        passwordInput.classList.add('error');
      }
    });
  
    // Allow external script to set login state
    window.loginUtils = {
      openLoginModal,
      setLoggedIn: function (state) {
        loggedIn = state;
        loginBtn.textContent = state ? 'Logout' : 'Login';
      }
    };
  });
  
document.addEventListener('DOMContentLoaded', function () {
    const registerModal = document.getElementById('registerModal');
    const closeRegisterBtn = document.getElementById('closeRegister');
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');
  
    const loginModal = document.getElementById('loginModal');
    const openRegisterLink = document.getElementById('openRegister');
    const openLoginLink = document.getElementById('openLogin');
  
    function openRegisterModal() {
      registerModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      registerMessage.textContent = '';
      registerForm.reset();
    }
  
    // Show password toggle
    registerModal.querySelectorAll('.toggle-password').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const input = toggle.previousElementSibling;
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        toggle.textContent = type === 'password' ? 'Show' : 'Hide';
      });
    });
  
    if (openRegisterLink) {
      openRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        openRegisterModal();
      });
    }
  
    if (openLoginLink) {
      openLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'none';
        window.loginUtils.openLoginModal();
      });
    }
  
    closeRegisterBtn.addEventListener('click', () => {
      registerModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      registerMessage.textContent = '';
    });
  
    window.addEventListener('click', (e) => {
      if (e.target === registerModal) {
        registerModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        registerMessage.textContent = '';
      }
    });
  
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('newEmail').value.trim();
      const password = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const agreeTerms = document.getElementById('agreeTerms').checked;
  
      registerMessage.textContent = '';
  
      if (!username || !email || !password || !confirmPassword) {
        registerMessage.style.color = 'red';
        registerMessage.textContent = 'Please fill in all fields.';
        return;
      }
  
      if (password !== confirmPassword) {
        registerMessage.style.color = 'red';
        registerMessage.textContent = 'Passwords do not match!';
        return;
      }
  
      if (!agreeTerms) {
        registerMessage.style.color = 'red';
        registerMessage.textContent = 'You must agree to the terms!';
        return;
      }
  
      registerMessage.style.color = 'green';
      registerMessage.textContent = 'Registration successful! Redirecting to login...';
  
      setTimeout(() => {
        registerModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        registerForm.reset();
        registerMessage.textContent = '';
        window.loginUtils.openLoginModal();
        window.loginUtils.setLoggedIn(false); // Ensure user is NOT logged in after registration
      }, 1500);
    });
  });
  
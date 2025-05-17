// Elements
const loginBtn = document.querySelector('a[href="#"]'); // Navbar login link
const loginModal = document.getElementById('loginModal');
const closeBtn = document.getElementById('closeLogin');
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Fake user for demo
const fakeEmail = "test@example.com";
const fakePassword = "password123";

// --- Open Modal ---
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  // If currently showing "Logout", treat it as logout request
  if (loginBtn.textContent.trim() === "Logout") {
    const confirmLogout = confirm("Sure you want to logout!!");
    if (confirmLogout) {
      loginBtn.textContent = "Login";
      alert("You have been logged out.");
    }
    return;
  }

  // Otherwise open the login modal
  loginModal.classList.add("show");
  
  // Clear fields every time it opens
  emailInput.value = "";
  passwordInput.value = "";

  // Remove error/success styling if any
  emailInput.classList.remove("error");
  passwordInput.classList.remove("error");
  document.querySelectorAll(".error-message").forEach(msg => msg.remove());
});

// --- Close Modal ---
closeBtn.addEventListener('click', () => {
  loginModal.classList.remove("show");
});

// --- Handle Login ---
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Remove previous error messages
  document.querySelectorAll(".error-message").forEach(msg => msg.remove());
  emailInput.classList.remove("error");
  passwordInput.classList.remove("error");

  // Basic validation
  if (!email || !password) {
    showError("Please fill in all fields.");
    return;
  }

  if (email === fakeEmail && password === fakePassword) {
    alert("Login successful!");
    loginModal.classList.remove("show");
    loginBtn.textContent = "Logout";

    // Clear fields after success
    emailInput.value = "";
    passwordInput.value = "";
  } else {
    showError("Invalid email or password.");
  }
});

// --- Helper Function ---
function showError(message) {
  const errorMsg = document.createElement("p");
  errorMsg.textContent = message;
  errorMsg.className = "error-message";
  errorMsg.style.color = "red";
  errorMsg.style.marginTop = "10px";
  loginForm.appendChild(errorMsg);
  emailInput.classList.add("error");
  passwordInput.classList.add("error");
}

// Show/Hide password toggle
const pwdInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
  const type = pwdInput.getAttribute("type") === "password" ? "text" : "password";
  pwdInput.setAttribute("type", type);
  togglePassword.textContent = type === "password" ? "Show" : "Hide";
});


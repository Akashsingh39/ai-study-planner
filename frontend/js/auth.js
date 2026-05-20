// Shared helper for showing messages on login/signup pages
const showMessage = (text, type = 'error') => {
  const message = document.getElementById('message');
  if (!message) return;
  message.textContent = text;
  message.className = `message ${type}`;
};

// Signup form handling
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');

      localStorage.setItem('token', data.token);
      showMessage('Signup successful! Redirecting...', 'success');
      window.location.href = 'dashboard.html';
    } catch (error) {
      showMessage(error.message);
    }
  });
}

// Login form handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      showMessage('Login successful! Redirecting...', 'success');
      window.location.href = 'dashboard.html';
    } catch (error) {
      showMessage(error.message);
    }
  });
}

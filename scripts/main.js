// scripts/main.js

// This function toggles the visibility of a blog post's content when "Read More" or "Hide" is clicked
function toggleContent(button) {
  const post = button.closest('.post');
  const content = post.querySelector('.post-content');
  const readMoreBtn = post.querySelector('.read-more-btn');
  const hideBtn = post.querySelector('.hide-btn');

  if (content.classList.contains('hidden')) {
    // First: remove "hidden" to make it visible but still transparent
    content.classList.remove('hidden');

    // Second: use a tiny delay so browser can register display change
    setTimeout(() => {
      content.classList.add('revealed'); // Triggers smooth animation
    }, 10);

    readMoreBtn.classList.add('hidden');
    hideBtn.classList.remove('hidden');
  } else {
    // First: remove reveal class to trigger fade-out animation
    content.classList.remove('revealed');

    // Second: wait for animation to finish, then hide completely
    setTimeout(() => {
      content.classList.add('hidden');
    }, 500);

    readMoreBtn.classList.remove('hidden');
    hideBtn.classList.add('hidden');
  }
}


// Login form validation: checks for empty username or password
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  // If login form exists on this page
  if (loginForm) {
    // Add event listener on form submission
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Stop default form submission

      // Get input values and error message element
      const username = document.getElementById('username');
      const password = document.getElementById('password');
      const errorMsg = document.getElementById('loginError');
      let isValid = true;

      // Clear any previous error styling/messages
      username.classList.remove('invalid');
      password.classList.remove('invalid');
      errorMsg.textContent = '';

      // Check if username is empty
      if (username.value.trim() === '') {
        isValid = false;
        username.classList.add('invalid');
      }

      // Check if password is empty
      if (password.value.trim() === '') {
        isValid = false;
        password.classList.add('invalid');
      }

      // If invalid, show error message. If valid, redirect to homepage
      if (!isValid) {
        errorMsg.textContent = 'Please enter both username and password.';
      } else {
        window.location.href = 'index.html'; // Redirect on successful login
      }
    });
  }
});


// Registration form validation: ensures fields are filled, email is valid, passwords match, and policy is met
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const username = document.getElementById('regUsername');
      const email = document.getElementById('regEmail');
      const password = document.getElementById('regPassword');
      const confirmPassword = document.getElementById('confirmPassword');
      const errorMsg = document.getElementById('registerError');

      let isValid = true;
      errorMsg.textContent = '';

      // Reset previous error styles
      [username, email, password, confirmPassword].forEach(field => field.classList.remove('invalid'));

      // Basic validation
      if (username.value.trim() === '') {
        username.classList.add('invalid');
        isValid = false;
      }

      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value.trim())) {
        email.classList.add('invalid');
        isValid = false;
      }

      // Password policy: min 8 characters, at least one uppercase, one lowercase, one number & one special characters
      const passwordPolicy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

      if (!passwordPolicy.test(password.value)) {
        password.classList.add('invalid');
        isValid = false;
      }

      if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('invalid');
        isValid = false;
      }

      // Show message or redirect
      if (!isValid) {
        errorMsg.innerHTML = `
        * Please fill out or fix red highlighted fields based on the conditions below.<br>
        * Enter a valid email address (e.g. user@example.com).<br>
        * Password must be at least 8 characters long.<br>
        * It must include uppercase, lowercase, a number, and a special character (e.g. A, a, 1, @).<br>
        * Confirm password must match the password.
      `;
      } else {
        window.location.href = 'index.html'; // Success: redirect
      }
    });
  }
});

// Toggle password visibility for Login & Registration form
function togglePassword(fieldId, button) {
  const field = document.getElementById(fieldId);
  if (field.type === 'password') {
    field.type = 'text';
    button.textContent = 'Hide';
  } else {
    field.type = 'password';
    button.textContent = 'Show';
  }
}


// Write Post form validation: checks for empty fields and title character limit
document.addEventListener('DOMContentLoaded', () => {
  const writeForm = document.getElementById('writeForm');

  // If the write form exists, attach submission handler
  if (writeForm) {
    writeForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default browser submission

      // Get form elements
      const title = document.getElementById('postTitle');
      const tags = document.getElementById('postTags');
      const content = document.getElementById('postContent');
      const errorMsg = document.getElementById('writeError');

      let isValid = true;
      errorMsg.textContent = '';

      // Clear any previous red borders
      [title, tags, content].forEach(field => field.classList.remove('invalid'));

      // Validate each field (empty check)
      if (title.value.trim() === '') {
        title.classList.add('invalid');
        isValid = false;
      }

      if (tags.value.trim() === '') {
        tags.classList.add('invalid');
        isValid = false;
      }

      if (content.value.trim() === '') {
        content.classList.add('invalid');
        isValid = false;
      }

      // Validate title character length (max 80)
      if (title.value.length > 80) {
        title.classList.add('invalid');
        isValid = false;
      }

      // Display error message or redirect
      if (!isValid) {
        errorMsg.innerHTML = `
          * Please fill out or fix red highlighted fields based on the conditions below.<br>
          * Post title must not exceed 80 characters.<br>
          * Tags/Keywords and content are required.
        `;
      } else {
        window.location.href = 'index.html'; // Redirect if all fields are valid
      }
    });
  }
});


// Show/hide "Scroll to Top" button & handle click
document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scrollTopBtn');

  if (scrollBtn) {
    // Show button after scrolling 200px
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        scrollBtn.style.display = 'block';
      } else {
        scrollBtn.style.display = 'none';
      }
    });

    // Scroll to top smoothly on click
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});


// Dark/Light Theme Toggle Handler
document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeToggleBtn');

  if (themeBtn) {
    // Load previously selected theme (if stored)
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      themeBtn.textContent = 'Light Mode 🌓'; // Set text for dark mode
    } else {
      themeBtn.textContent = 'Dark Mode 🌓'; // Default text
    }

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');

      // Toggle text content
      if (document.body.classList.contains('dark-mode')) {
        themeBtn.textContent = 'Light Mode 🌓';
        localStorage.setItem('theme', 'dark');
      } else {
        themeBtn.textContent = 'Dark Mode 🌓';
        localStorage.setItem('theme', 'light');
      }
    });
  }
});

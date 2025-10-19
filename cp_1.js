document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form');
  const fullName = document.getElementById('full-name');
  const email = document.getElementById('email');
  const comments = document.getElementById('comments');
  const charCount = document.getElementById('char-count');
  const feedbackDisplay = document.getElementById('feedback-display');

  // Character Counter
  comments.addEventListener('input', () => {
    charCount.textContent = `${comments.value.length} / 250`;
  });

  // Validation and submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearErrors();

    let valid = true;

    if (fullName.value.trim() === '') {
      showError(fullName, 'Full name is required');
      valid = false;
    }

    if (email.value.trim() === '') {
      showError(email, 'Email is required');
      valid = false;
    } else if (!validateEmail(email.value)) {
      // 👇 Updated message
      showError(email, 'Enter valid email address');
      valid = false;
    }

    if (comments.value.trim() === '') {
      showError(comments, 'Comments cannot be empty');
      valid = false;
    }

    if (!valid) return;

    // Append feedback
    const entry = document.createElement('div');
    entry.classList.add('feedback-entry');
    entry.innerHTML = `
      <strong>${capitalizeName(fullName.value)}</strong> (${email.value})<br>
      <p>${comments.value}</p>
    `;
    feedbackDisplay.appendChild(entry);

    // Reset form
    form.reset();
    charCount.textContent = '0 / 250';
  });

  // Helper functions
  function showError(input, message) {
    const formControl = input.parentElement;
    const errorDisplay = formControl.querySelector('.error');
    errorDisplay.textContent = message;
  }

  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function capitalizeName(name) {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
});

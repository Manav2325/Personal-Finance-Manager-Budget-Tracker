const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username && email && password) {
        const user = { username, email, password };

        // Store user data in localStorage (for simplicity)
        localStorage.setItem('user', JSON.stringify(user));

        alert('Signup successful! You can now log in.');

        // Redirect to login page
        window.location.href = 'login.html';
    } else {
        alert('Please fill in all fields.');
    }
});

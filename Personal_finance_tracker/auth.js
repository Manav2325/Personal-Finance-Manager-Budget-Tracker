s
const users = [];


document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert("Login successful!");
        
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid username or password.");
    }
});


document.getElementById("signupForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    if (users.find(user => user.username === username)) {
        alert("Username already exists. Please choose another.");
    } else {
        users.push({ username, password });
        alert("Signup successful! Redirecting to login...");
        
        window.location.href = "login.html";
    }
});

document.querySelector('.btn').addEventListener('click', (e) => {
    alert("Welcome to your Dashboard!");
    window.location.href = "dashboard.html";
});




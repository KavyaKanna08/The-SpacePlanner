// Handle registration form submission
document.getElementById('register-form')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
        alert('User already exists');
    } else {
        users.push({ firstName, lastName, email, phone, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful');
        window.location.href = 'login.html';
    }
});

// Handle login form submission
document.getElementById('login-form')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert('Login successful');
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid email or password');
    }
});

// Populate dashboard with registered users
window.onload = function () {
    if (document.getElementById('user-table')) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const tbody = document.querySelector('#user-table tbody');
        tbody.innerHTML = users.map(user =>
            `<tr>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
            </tr>`
        ).join('');
    }
};

// Popup functions
function showPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function redirectToLogin() {
    closePopup();
    window.location.href = 'login.html';
}

function redirectToRegister() {
    closePopup();
    window.location.href = 'register.html';
}

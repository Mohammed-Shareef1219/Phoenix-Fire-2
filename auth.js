document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const dashboardSidebar = document.getElementById('dashboardSidebar');

    // Show login modal
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'flex';
    });

    // Switch between login and register
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'flex';
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });

    // Handle login
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Here you would typically make an API call to your backend
            const user = await loginUser(email, password);
            if (user) {
                loginModal.style.display = 'none';
                updateUserProfile(user);
                dashboardSidebar.classList.add('logged-in');
                loginBtn.style.display = 'none';
            }
        } catch (error) {
            alert('Login failed. Please try again.');
        }
    });

    // Handle registration
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullName', document.getElementById('fullName').value);
        formData.append('email', document.getElementById('regEmail').value);
        formData.append('password', document.getElementById('regPassword').value);
        formData.append('profileImage', document.getElementById('profileImage').files[0]);

        try {
            // Here you would typically make an API call to your backend
            const user = await registerUser(formData);
            if (user) {
                registerModal.style.display = 'none';
                updateUserProfile(user);
                dashboardSidebar.classList.add('logged-in');
                loginBtn.style.display = 'none';
            }
        } catch (error) {
            alert('Registration failed. Please try again.');
        }
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === registerModal) registerModal.style.display = 'none';
    });

    function updateUserProfile(user) {
        const profileImage = document.querySelector('.profile-image img');
        const profileName = document.querySelector('.profile-info h3');
        
        if (user.profileImage) {
            profileImage.src = user.profileImage;
        }
        if (user.fullName) {
            profileName.textContent = user.fullName;
        }
    }

    // Placeholder functions for API calls
    async function loginUser(email, password) {
        // Implement your login API call here
        return { fullName: 'Mohamed Sherif', role: 'System Administrator' };
    }

    async function registerUser(formData) {
        // Implement your registration API call here
        return { fullName: formData.get('fullName'), role: 'User' };
    }
});
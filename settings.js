document.addEventListener('DOMContentLoaded', function() {
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsSidebar = document.getElementById('settingsSidebar');
    const closeSettings = document.getElementById('closeSettings');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Theme Management
    const theme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', theme === 'dark');
    if (darkModeToggle) {
        darkModeToggle.checked = theme === 'dark';
    }

    // Settings Navigation
    const settingsNavItems = document.querySelectorAll('.settings-nav-item');
    settingsNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            updateActiveSection(section);
        });
    });

    function updateActiveSection(sectionId) {
        document.querySelectorAll('.settings-section').forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });
        settingsNavItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-section') === sectionId);
        });
    }

    // Profile Image Upload
    const profileImageInput = document.getElementById('profileImageInput');
    const profileImage = document.querySelector('.profile-image img');

    if (profileImageInput && profileImage) {
        profileImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImage.src = e.target.result;
                    saveProfileImage(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Auto-save functionality
    const settingsInputs = document.querySelectorAll('.settings-input');
    settingsInputs.forEach(input => {
        input.addEventListener('change', function() {
            saveSettings(this.name, this.value);
            showSaveIndicator();
        });
    });

    function saveSettings(key, value) {
        const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
        settings[key] = value;
        localStorage.setItem('userSettings', JSON.stringify(settings));
    }

    function showSaveIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'save-indicator';
        indicator.textContent = 'Saved';
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            indicator.remove();
        }, 2000);
    }

    // Language Switch
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            changeLanguage(this.value);
        });
    }

    function changeLanguage(lang) {
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        loadTranslations(lang);
    }

    // Security Features
    const twoFAToggle = document.getElementById('2fa-toggle');
    if (twoFAToggle) {
        twoFAToggle.addEventListener('change', async function() {
            if (this.checked) {
                const confirmed = await showConfirmDialog('Enable Two-Factor Authentication?');
                if (confirmed) {
                    initiate2FASetup();
                } else {
                    this.checked = false;
                }
            }
        });
    }

    async function showConfirmDialog(message) {
        return new Promise(resolve => {
            const confirmed = confirm(message);
            resolve(confirmed);
        });
    }

    function initiate2FASetup() {
        // Implement 2FA setup logic
        console.log('Initiating 2FA setup');
    }

    // Session Management
    const logoutAllBtn = document.querySelector('.logout-all-btn');
    if (logoutAllBtn) {
        logoutAllBtn.addEventListener('click', async function() {
            const confirmed = await showConfirmDialog('Log out from all devices?');
            if (confirmed) {
                logoutAllDevices();
            }
        });
    }

    async function logoutAllDevices() {
        try {
            // Implement logout logic
            console.log('Logging out from all devices');
            showNotification('Successfully logged out from all devices');
        } catch (error) {
            showNotification('An error occurred', 'error');
        }
    }

    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Core elements
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsSidebar = document.getElementById('settingsSidebar');
    const closeSettings = document.getElementById('closeSettings');
    const searchInput = document.querySelector('.settings-search input');
    const themeToggle = document.getElementById('themeToggle');
    const menuItems = document.querySelectorAll('.menu-item');

    // Theme management
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.checked = currentTheme === 'dark';

    function toggleTheme(e) {
        const theme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Sidebar toggle with animation
    function toggleSidebar() {
        settingsSidebar.classList.toggle('active');
        settingsToggle.classList.toggle('active');
        
        if (settingsSidebar.classList.contains('active')) {
            animateSections();
            document.body.style.overflow = 'hidden';
        } else {
            resetSections();
            document.body.style.overflow = '';
        }
    }

    // Animate sections with vertical headers
    function animateSections() {
        const sections = document.querySelectorAll('.menu-section');
        sections.forEach((section, index) => {
            const header = section.querySelector('.menu-header span');
            const items = section.querySelector('.menu-items');
            
            header.style.opacity = '0';
            header.style.transform = 'translateY(-10px)';
            items.style.opacity = '0';
            items.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
                items.style.opacity = '1';
                items.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    // Reset sections for closing animation
    function resetSections() {
        const sections = document.querySelectorAll('.menu-section');
        sections.forEach(section => {
            const header = section.querySelector('.menu-header span');
            const items = section.querySelector('.menu-items');
            
            header.style.opacity = '';
            header.style.transform = '';
            items.style.opacity = '';
            items.style.transform = '';
        });
    }

    // Enhanced search functionality for vertical layout
    function filterMenuItems(event) {
        const searchTerm = event.target.value.toLowerCase().trim();
        const sections = document.querySelectorAll('.menu-section');
        
        sections.forEach(section => {
            const items = section.querySelectorAll('.menu-item');
            let hasVisibleItems = false;

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                const isVisible = text.includes(searchTerm);
                item.style.display = isVisible ? 'flex' : 'none';
                if (isVisible) hasVisibleItems = true;
            });

            section.style.display = hasVisibleItems ? 'flex' : 'none';
        });
    }

    // Handle outside clicks
    function handleClickOutside(event) {
        if (settingsSidebar.classList.contains('active') &&
            !settingsSidebar.contains(event.target) &&
            !settingsToggle.contains(event.target)) {
            toggleSidebar();
        }
    }

    // Navigation handling
    function handleNavigation(event) {
        event.preventDefault();
        menuItems.forEach(item => item.classList.remove('active'));
        event.currentTarget.classList.add('active');
        
        const section = event.currentTarget.getAttribute('href').substring(1);
        localStorage.setItem('currentSection', section);

        if (window.innerWidth <= 768) {
            toggleSidebar();
        }
    }

    // Event listeners
    settingsToggle.addEventListener('click', toggleSidebar);
    closeSettings.addEventListener('click', toggleSidebar);
    document.addEventListener('click', handleClickOutside);
    searchInput.addEventListener('input', filterMenuItems);
    themeToggle.addEventListener('change', toggleTheme);
    
    menuItems.forEach(item => {
        item.addEventListener('click', handleNavigation);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && settingsSidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });

    // Initialize active section
    const lastSection = localStorage.getItem('currentSection');
    if (lastSection) {
        const targetLink = document.querySelector(`[href="#${lastSection}"]`);
        if (targetLink) targetLink.classList.add('active');
    }
});
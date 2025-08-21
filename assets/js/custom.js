
// Scroll effect for navbar background
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu toggle scroll lock functionality
document.addEventListener('DOMContentLoaded', function () {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const body = document.body;
    let scrollPosition = 0;

    // Function to prevent body scroll
    function disableBodyScroll() {
        scrollPosition = window.pageYOffset;
        body.style.top = `-${scrollPosition}px`;
        body.classList.add('menu-open');
    }

    // Function to restore body scroll
    function enableBodyScroll() {
        body.classList.remove('menu-open');
        body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }

    // Listen for navbar collapse events
    navbarCollapse.addEventListener('show.bs.collapse', function () {
        disableBodyScroll();
    });

    navbarCollapse.addEventListener('hide.bs.collapse', function () {
        enableBodyScroll();
    });

    // Handle manual clicks outside menu to close it
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);

        if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
            // Close the menu
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                hide: true
            });
            enableBodyScroll();
        }
    });

    // Handle escape key to close menu
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                hide: true
            });
            enableBodyScroll();
        }
    });
});


// Custom dropdown hover functionality for all devices
document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.navbar-nav .dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');

        // Disable Bootstrap's default dropdown behavior completely
        dropdownToggle.setAttribute('data-bs-toggle', '');
        dropdownToggle.removeAttribute('data-bs-toggle');

        // Hover functionality for ALL devices (desktop + mobile)
        dropdown.addEventListener('mouseenter', function () {
            // Close other dropdowns first
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('show');
                    otherDropdown.querySelector('.dropdown-menu').classList.remove('show');
                    otherDropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
                }
            });

            // Show current dropdown
            dropdown.classList.add('show');
            dropdownMenu.classList.add('show');
            dropdownToggle.setAttribute('aria-expanded', 'true');
        });

        dropdown.addEventListener('mouseleave', function () {
            // Hide dropdown
            dropdown.classList.remove('show');
            dropdownMenu.classList.remove('show');
            dropdownToggle.setAttribute('aria-expanded', 'false');
        });

        // Also add touch/click support for mobile devices as backup
        dropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const isOpen = dropdown.classList.contains('show');

            // Close other dropdowns first
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('show');
                    otherDropdown.querySelector('.dropdown-menu').classList.remove('show');
                    otherDropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current dropdown
            if (isOpen) {
                dropdown.classList.remove('show');
                dropdownMenu.classList.remove('show');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            } else {
                dropdown.classList.add('show');
                dropdownMenu.classList.add('show');
                dropdownToggle.setAttribute('aria-expanded', 'true');
            }
        });

        // Prevent dropdown from closing when clicking inside menu
        dropdownMenu.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
                dropdownMenu.classList.remove('show');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
});


new Splide('#logo-carousel', {
    type: 'loop',
    drag: false,
    arrows: false,
    pagination: false,
    perPage: 7, 
    // gap: '2rem', 
    autoScroll: {
        speed: 1,
    },
    breakpoints: {
        1024: { perPage: 5 },
        768: { perPage: 4 },
        576: { perPage:  3},
        480: { perPage:  2},
    }
}).mount(window.splide.Extensions);
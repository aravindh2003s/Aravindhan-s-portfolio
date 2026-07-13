// ==================== Navigation ==================== 
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let scrolling = false;
window.addEventListener('scroll', () => {
    if (!scrolling) {
        window.requestAnimationFrame(() => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            scrolling = false;
        });
        scrolling = true;
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== Typewriter Cycling Effect ====================
const roles = [
    'Java Full Stack Developer.',
    'QA Automation Engineer.',
    'Spring Boot Developer.',
    'Problem Solver.'
];

document.addEventListener('DOMContentLoaded', () => {
    const typeEl = document.getElementById('typewriterText');
    if (!typeEl) return;

    // Add blinking cursor sibling
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    typeEl.parentNode.insertBefore(cursor, typeEl.nextSibling);

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const current = roles[roleIndex];

        if (isDeleting) {
            typeEl.textContent = current.substring(0, charIndex--);
        } else {
            typeEl.textContent = current.substring(0, charIndex++);
        }

        let speed = isDeleting ? 50 : 90;

        if (!isDeleting && charIndex > current.length) {
            speed = 1800; // pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            charIndex = 0;
            speed = 300;
        }

        setTimeout(typeLoop, speed);
    }

    // Delay start until after preloader
    setTimeout(typeLoop, 2200);
});


// ==================== Smooth Scrolling ====================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Intersection Observer for Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.progress-fill');
                if (progressBar) {
                    const progress = progressBar.getAttribute('data-progress');
                    setTimeout(() => {
                        progressBar.style.width = progress + '%';
                    }, 300);
                }
            }

            // Animate stat numbers
            if (entry.target.classList.contains('stats-panel') || entry.target.classList.contains('about-grid')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(statNumber => {
                    if (!statNumber.classList.contains('animated')) {
                        const target = parseInt(statNumber.getAttribute('data-target'));
                        animateCounter(statNumber, target);
                        statNumber.classList.add('animated');
                    }
                });
            }
        }
    });
}, observerOptions);

// Observe all fade-in elements
const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-slow');
fadeElements.forEach(element => observer.observe(element));

// ==================== Counter Animation ====================
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.getAttribute('data-target') > 10 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ==================== 3D Tilt Effect for Spatial UI ====================
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on cursor position (subtle effect)
        const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
        const rotateY = ((x - centerX) / centerX) * 5;  // Max 5deg

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        // Add dynamic highlight based on mouse position
        const highlightColor = 'rgba(255, 255, 255, 0.1)';
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, ${highlightColor}, rgba(255, 255, 255, 0.03) 60%)`;

        // CSS Variables for Border Glow Tracking 
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.background = 'rgba(255, 255, 255, 0.03)';
        card.style.setProperty('--mouse-x', `-1000px`); // Hide glow when mouse leaves
        card.style.setProperty('--mouse-y', `-1000px`);
    });
});

// Advanced Ripple Effect for Buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('click', function (e) {
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        let ripples = document.createElement('span');
        ripples.className = 'ripple-effect';
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        this.appendChild(ripples);

        setTimeout(() => {
            ripples.remove();
        }, 1000);
    });
});

// ==================== Contact Form Handling ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('formSubmitBtn');
    const clearBtn = document.getElementById('formClearBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const charCounter = document.getElementById('charCounter');
    const messageArea = document.getElementById('message');

    // --- Field hint helpers ---
    function setHint(id, text, type) {
        const hint = document.getElementById(id);
        if (!hint) return;
        hint.textContent = text;
        hint.className = 'field-hint visible ' + type; // 'error' or 'info'
    }

    function clearHint(id) {
        const hint = document.getElementById(id);
        if (!hint) return;
        hint.textContent = '';
        hint.className = 'field-hint';
    }

    function setFieldState(el, state) {
        el.classList.remove('field-error', 'field-valid');
        if (state) el.classList.add(state);
    }

    // --- Client-side validation ---
    function validateField(field) {
        const val = field.value.trim();
        const name = field.name;

        if (name === 'name') {
            if (!val) { setHint('nameHint', 'Name is required', 'error'); setFieldState(field, 'field-error'); return false; }
            if (val.length < 2) { setHint('nameHint', 'At least 2 characters', 'error'); setFieldState(field, 'field-error'); return false; }
            clearHint('nameHint'); setFieldState(field, 'field-valid'); return true;
        }

        if (name === 'email') {
            if (!val) { setHint('emailHint', 'Email is required', 'error'); setFieldState(field, 'field-error'); return false; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { setHint('emailHint', 'Enter a valid email address', 'error'); setFieldState(field, 'field-error'); return false; }
            clearHint('emailHint'); setFieldState(field, 'field-valid'); return true;
        }

        if (name === 'message') {
            if (!val) { setHint('messageHint', 'Message is required', 'error'); setFieldState(field, 'field-error'); return false; }
            if (val.length < 10) { setHint('messageHint', `${10 - val.length} more character${10 - val.length === 1 ? '' : 's'} needed`, 'error'); setFieldState(field, 'field-error'); return false; }
            clearHint('messageHint'); setFieldState(field, 'field-valid'); return true;
        }

        return true;
    }

    // Real-time validation on blur
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            // Clear error on typing
            if (field.classList.contains('field-error')) validateField(field);
        });
    });

    // --- Character counter ---
    if (messageArea && charCounter) {
        messageArea.addEventListener('input', () => {
            const len = messageArea.value.length;
            charCounter.textContent = `${len} / 1000`;
            charCounter.classList.remove('warning', 'danger');
            if (len >= 1000) charCounter.classList.add('danger');
            else if (len >= 900) charCounter.classList.add('warning');
        });
    }

    // --- Show / hide form message with animation ---
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type + ' show';
    }

    function hideFormMessage() {
        formMessage.classList.remove('show');
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 400); // match CSS transition duration
    }

    // --- Loading state helpers ---
    function setLoading(loading) {
        submitBtn.disabled = loading;
        btnText.hidden = loading;
        btnLoader.hidden = !loading;
    }

    // --- Clear / Reset button ---
    clearBtn.addEventListener('click', () => {
        contactForm.reset();
        // Reset all field states and hints
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            setFieldState(field, null);
        });
        clearHint('nameHint');
        clearHint('emailHint');
        clearHint('messageHint');
        charCounter.textContent = '0 / 1000';
        charCounter.classList.remove('warning', 'danger');
        hideFormMessage();
    });

    // --- Submit handler ---
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields first
        const fields = contactForm.querySelectorAll('input, textarea');
        let allValid = true;
        fields.forEach(field => {
            if (!validateField(field)) allValid = false;
        });
        if (!allValid) return;

        // Enter loading state
        setLoading(true);

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            const response = await fetch(CONFIG.API_BASE_URL + '/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                showFormMessage('✓ Message transmitted successfully!', 'success');
                contactForm.reset();
                // Reset field visuals
                fields.forEach(field => setFieldState(field, null));
                clearHint('nameHint');
                clearHint('emailHint');
                clearHint('messageHint');
                charCounter.textContent = '0 / 1000';
                charCounter.classList.remove('warning', 'danger');
            } else {
                showFormMessage(result.message || 'Transmission failed. Please try again.', 'error');
            }
        } catch (error) {
            showFormMessage('Connection error. Please try again.', 'error');
        }

        setLoading(false);

        // Auto-dismiss after 6s
        setTimeout(hideFormMessage, 6000);
    });
}

// ==================== Active Navigation Link ====================
let navScrolling = false;
window.addEventListener('scroll', () => {
    if (!navScrolling) {
        window.requestAnimationFrame(() => {
            let current = '';
            const sections = document.querySelectorAll('section');

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            navScrolling = false;
        });
        navScrolling = true;
    }
});

// ==================== Cinematic Preloader ====================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1800); // 1.8s delay for the cinematic progress bar effect
    }
});

// ==================== Magnetic Buttons Effect ====================
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const h = rect.width / 2;
        const v = rect.height / 2;

        // Calculate distance from center
        const x = e.clientX - rect.left - h;
        const y = e.clientY - rect.top - v;

        // Move button slightly towards cursor (magnetic pull)
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        // Reset transform on mouse leave with a springy effect
        btn.style.transform = `translate(0px, 0px)`;
    });
});


// ==================== Project Modals ====================
window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ==================== Dark / Light Mode Toggle ====================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(mode) {
    if (mode === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.className = 'fas fa-sun';
    } else {
        document.body.classList.remove('light-mode');
        themeIcon.className = 'fas fa-moon';
    }
}

// Restore saved preference
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-mode');
        const newTheme = isLight ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
}

// ==================== Scroll Progress Bar ====================
const scrollProgressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    if (scrollProgressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgressBar.style.width = progress + '%';
    }
}, { passive: true });

// ==================== Lazy-Load Image Fade-In ====================
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.addEventListener('load', () => img.classList.add('loaded'));
                // If already cached and loaded
                if (img.complete) img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '0px 0px 100px 0px' });

    lazyImages.forEach(img => imageObserver.observe(img));
}

console.log('%c Spatial UI Active ', 'background: #030305; color: #38bdf8; font-weight: bold; font-family: "Outfit", sans-serif; font-size: 16px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 4px;');


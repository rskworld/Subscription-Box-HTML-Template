// Subscription Box Template - JavaScript
// Owner: RSK World (rskworld.in)
// Founder: Molla Samser
// Designer & Tester: Rima Khatun
// Contact: help@rskworld.in | support@rskworld.in | +91 93305 39277
// Website: https://rskworld.in
// Address: Nutanhat, Mongolkote, Purba Burdwan, West Bengal, India, 713147
// This template is owned by RSK World. All rights reserved.

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#login' && href !== '#signup') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Initialize customization
    initCustomization();
    
    // Initialize dashboard
    initDashboard();
    
    // Set minimum date for gift delivery
    const deliveryDateInput = document.getElementById('delivery-date');
    if (deliveryDateInput) {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        deliveryDateInput.min = today.toISOString().split('T')[0];
    }
});

// Plan Selection
function selectPlan(planType) {
    alert(`You selected the ${planType.charAt(0).toUpperCase() + planType.slice(1)} plan! This would normally redirect to checkout.`);
    // In a real application, this would redirect to checkout or open a modal
}

// Customization Functions
let currentStep = 1;
const totalSteps = 4;

function initCustomization() {
    // Category selection
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            categoryCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            updateReview('category', this.querySelector('h4').textContent);
        });
    });

    // Preference checkboxes
    const preferences = document.querySelectorAll('input[name="preference"]');
    preferences.forEach(pref => {
        pref.addEventListener('change', function() {
            updatePreferences();
        });
    });

    // Frequency selection
    const frequencies = document.querySelectorAll('input[name="frequency"]');
    frequencies.forEach(freq => {
        freq.addEventListener('change', function() {
            const selected = document.querySelector('input[name="frequency"]:checked');
            if (selected) {
                updateReview('frequency', selected.value.charAt(0).toUpperCase() + selected.value.slice(1));
            }
        });
    });
}

function nextStep() {
    if (currentStep < totalSteps) {
        // Hide current panel
        document.getElementById(`panel-${currentStep}`).classList.remove('active');
        document.querySelector(`.customization-step[data-step="${currentStep}"]`).classList.remove('active');
        
        // Show next panel
        currentStep++;
        document.getElementById(`panel-${currentStep}`).classList.add('active');
        document.querySelector(`.customization-step[data-step="${currentStep}"]`).classList.add('active');
        
        // Update navigation buttons
        updateNavigationButtons();
    }
}

function previousStep() {
    if (currentStep > 1) {
        // Hide current panel
        document.getElementById(`panel-${currentStep}`).classList.remove('active');
        document.querySelector(`.customization-step[data-step="${currentStep}"]`).classList.remove('active');
        
        // Show previous panel
        currentStep--;
        document.getElementById(`panel-${currentStep}`).classList.add('active');
        document.querySelector(`.customization-step[data-step="${currentStep}"]`).classList.add('active');
        
        // Update navigation buttons
        updateNavigationButtons();
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn && nextBtn) {
        prevBtn.style.display = currentStep > 1 ? 'inline-block' : 'none';
        
        if (currentStep === totalSteps) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'inline-block';
        }
    }
}

function updateReview(type, value) {
    const reviewElement = document.getElementById(`review-${type}`);
    if (reviewElement) {
        reviewElement.textContent = value;
    }
}

function updatePreferences() {
    const selected = Array.from(document.querySelectorAll('input[name="preference"]:checked'))
        .map(cb => cb.nextElementSibling.nextElementSibling.textContent);
    
    if (selected.length > 0) {
        updateReview('preferences', selected.join(', '));
    } else {
        updateReview('preferences', 'None selected');
    }
}

function confirmCustomization() {
    alert('Customization confirmed! This would normally proceed to checkout.');
    // In a real application, this would submit the form and redirect to checkout
}

// Dashboard Functions
function initDashboard() {
    const dashboardMenuItems = document.querySelectorAll('.dashboard-menu li');
    const dashboardTabs = document.querySelectorAll('.dashboard-tab');
    
    dashboardMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all items and tabs
            dashboardMenuItems.forEach(i => i.classList.remove('active'));
            dashboardTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked item and corresponding tab
            this.classList.add('active');
            document.getElementById(`tab-${tabName}`).classList.add('active');
        });
    });
}

// Gift Subscription Functions
function handleGiftSubmit(event) {
    event.preventDefault();
    
    const formData = {
        recipientName: document.getElementById('recipient-name').value,
        recipientEmail: document.getElementById('recipient-email').value,
        plan: document.getElementById('gift-plan').value,
        duration: document.getElementById('gift-duration').value,
        message: document.getElementById('gift-message').value,
        deliveryDate: document.getElementById('delivery-date').value
    };
    
    alert(`Gift subscription created for ${formData.recipientName}! This would normally process payment and send confirmation.`);
    // In a real application, this would submit to a backend API
    
    // Reset form
    event.target.reset();
}

// Payment Method Functions
function addPaymentMethod() {
    alert('This would open a payment method form or modal. In a real application, this would integrate with a payment processor like Stripe.');
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with ${email}!`);
        this.reset();
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.plans-table, .category-card, .payment-card, .gallery-item, .gift-benefit, .overview-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '#e5e7eb';
        }
    });
    
    return isValid;
}

// Add form validation to all forms
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
});


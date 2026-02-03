// loans/static/js/script.js
// Complete JavaScript for Loan Finder Application

console.log('🚀 Loan Finder App Loaded!');

// ============================================
// 1. DOM Content Loaded - Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Content Loaded');
    
    initializeAlerts();
    initializeFormValidation();
    initializeSmoothScroll();
    initializeNumberFormatting();
    initializeTooltips();
    initializeAnimations();
    initializeBackToTop();
    initializeFilterForm();
});

// ============================================
// 2. Auto-hide Alerts
// ============================================
function initializeAlerts() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000); // Hide after 5 seconds
    });
}

// ============================================
// 3. Form Validation
// ============================================
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                
                // Show error message
                showNotification('Please fill all required fields correctly', 'error');
            }
            form.classList.add('was-validated');
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(function(input) {
            input.addEventListener('blur', function() {
                if (this.checkValidity()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                    this.classList.add('is-invalid');
                }
            });
        });
    });
}

// ============================================
// 4. Smooth Scroll for Anchor Links
// ============================================
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
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
}

// ============================================
// 5. Number Formatting for Amounts
// ============================================
function initializeNumberFormatting() {
    const amountInputs = document.querySelectorAll('input[type="number"]');
    amountInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            // Remove non-numeric characters except decimal
            this.value = this.value.replace(/[^0-9.]/g, '');
        });
        
        input.addEventListener('blur', function() {
            if (this.value) {
                const value = parseFloat(this.value);
                if (value >= 1000) {
                    const formatted = formatCurrency(value);
                    console.log(`💰 Formatted amount: ${formatted}`);
                }
            }
        });
    });
}

// ============================================
// 6. EMI Calculator - Main Function
// ============================================
window.calculateEMI = function() {
    console.log('🧮 Calculating EMI...');
    
    // Get input values
    const principalInput = document.getElementById('loanAmount');
    const tenureInput = document.getElementById('loanTenure');
    const rateInput = document.getElementById('interestRate');
    
    if (!principalInput || !tenureInput || !rateInput) {
        console.error('❌ EMI calculator inputs not found');
        return;
    }
    
    const principal = parseFloat(principalInput.value);
    const tenure = parseInt(tenureInput.value);
    const rate = parseFloat(rateInput.value);
    
    // Validation
    if (!principal || !tenure || !rate) {
        showNotification('Please fill all calculator fields', 'warning');
        return;
    }
    
    if (principal <= 0 || tenure <= 0 || rate < 0) {
        showNotification('Please enter valid positive numbers', 'error');
        return;
    }
    
    // Calculate monthly interest rate
    const monthlyRate = rate / (12 * 100);
    
    // EMI Formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    
    // Calculate totals
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - principal;
    
    // Display results
    const emiAmountElement = document.getElementById('emiAmount');
    if (emiAmountElement) {
        emiAmountElement.textContent = emi.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        });
    }
    
    // Show result section
    const emiResult = document.getElementById('emiResult');
    if (emiResult) {
        emiResult.style.display = 'block';
        
        // Smooth scroll to result
        emiResult.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
        
        // Add animation
        emiResult.classList.add('animate__animated', 'animate__fadeIn');
    }
    
    console.log('✅ EMI Calculated:', {
        principal: principal,
        tenure: tenure,
        rate: rate,
        emi: emi.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
    });
};

// ============================================
// 7. Enhanced EMI Calculator with Breakdown
// ============================================
window.calculateEMIDetailed = function() {
    const principal = parseFloat(document.getElementById('loanAmount')?.value || 0);
    const tenure = parseInt(document.getElementById('loanTenure')?.value || 0);
    const rate = parseFloat(document.getElementById('interestRate')?.value || 0);
    
    if (!principal || !tenure || !rate) return;
    
    const monthlyRate = rate / (12 * 100);
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - principal;
    
    // Create detailed breakdown
    const breakdown = {
        monthlyEMI: emi,
        totalPayment: totalPayment,
        totalInterest: totalInterest,
        principalAmount: principal
    };
    
    console.table(breakdown);
    return breakdown;
};

// ============================================
// 8. Tooltips Initialization
// ============================================
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// ============================================
// 9. Scroll Animations
// ============================================
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const animatedElements = document.querySelectorAll(
        '.loan-card, .loan-type-card, .card, section'
    );
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// 10. Back to Top Button
// ============================================
function initializeBackToTop() {
    // Create button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'btn btn-primary btn-back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// ============================================
// 11. Filter Form Auto-submit
// ============================================
function initializeFilterForm() {
    const filterSelects = document.querySelectorAll('#filterForm select');
    filterSelects.forEach(function(select) {
        select.addEventListener('change', function() {
            // Optional: Auto-submit filter form
            console.log('Filter changed:', this.name, this.value);
        });
    });
}

// ============================================
// 12. Utility Functions
// ============================================

// Format currency in Indian Rupee format
function formatCurrency(amount) {
    return '₹' + parseFloat(amount).toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });
}

// Validate phone number (Indian format)
function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// Validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
}

// ============================================
// 13. Print Loan Details
// ============================================
window.printLoanDetails = function() {
    window.print();
};

// ============================================
// 14. Share Loan (Web Share API)
// ============================================
window.shareLoan = function(loanName) {
    if (navigator.share) {
        navigator.share({
            title: 'Check out this loan',
            text: `I found this great loan: ${loanName}`,
            url: window.location.href
        })
        .then(() => console.log('✅ Shared successfully'))
        .catch(err => console.log('❌ Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                showNotification('Link copied to clipboard!', 'success');
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                showNotification('Failed to copy link', 'error');
            });
    }
};

// ============================================
// 15. Search Functionality Enhancement
// ============================================
const searchInput = document.querySelector('input[type="search"]');
if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const searchTerm = this.value.toLowerCase();
        
        searchTimeout = setTimeout(function() {
            console.log('🔍 Searching for:', searchTerm);
            // Add custom search logic here if needed
        }, 500);
    });
}

// ============================================
// 16. Loan Amount Slider (If you want to add)
// ============================================
window.updateAmountFromSlider = function(value) {
    const amountInput = document.getElementById('loanAmount');
    if (amountInput) {
        amountInput.value = value;
        
        // Update display
        const display = document.getElementById('amountDisplay');
        if (display) {
            display.textContent = formatCurrency(value);
        }
    }
};

// ============================================
// 17. Loading State for Forms
// ============================================
function showLoadingState(button) {
    button.disabled = true;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
}

function hideLoadingState(button, originalText) {
    button.disabled = false;
    button.innerHTML = originalText;
}

// ============================================
// 18. Copy Loan Details to Clipboard
// ============================================
window.copyLoanDetails = function(loanInfo) {
    const text = `
Loan: ${loanInfo.name}
Bank: ${loanInfo.bank}
Interest Rate: ${loanInfo.rate}%
Amount: ₹${loanInfo.minAmount} - ₹${loanInfo.maxAmount}
    `.trim();
    
    navigator.clipboard.writeText(text)
        .then(() => showNotification('Loan details copied!', 'success'))
        .catch(err => console.error('Copy failed:', err));
};

// ============================================
// 19. Compare Loans Feature (Advanced)
// ============================================
let compareList = [];

window.addToCompare = function(loanId) {
    if (compareList.length >= 3) {
        showNotification('You can compare maximum 3 loans', 'warning');
        return;
    }
    
    if (!compareList.includes(loanId)) {
        compareList.push(loanId);
        showNotification('Loan added to comparison', 'success');
        updateCompareButton();
    }
};

window.removeFromCompare = function(loanId) {
    compareList = compareList.filter(id => id !== loanId);
    updateCompareButton();
};

function updateCompareButton() {
    const compareBtn = document.getElementById('compareBtn');
    if (compareBtn) {
        compareBtn.textContent = `Compare (${compareList.length})`;
        compareBtn.disabled = compareList.length < 2;
    }
}

// ============================================
// 20. Credit Score Checker
// ============================================
window.checkCreditScoreEligibility = function(score) {
    if (score >= 750) {
        return 'Excellent - You qualify for the best rates!';
    } else if (score >= 700) {
        return 'Good - You qualify for most loans';
    } else if (score >= 650) {
        return 'Fair - Limited loan options available';
    } else {
        return 'Poor - Work on improving your credit score';
    }
};

// ============================================
// Console Welcome Message
// ============================================
console.log('%c🏦 Loan Finder App', 'font-size: 20px; font-weight: bold; color: #0d6efd;');
console.log('%cBuilt with Django + Bootstrap', 'color: #6c757d;');
console.log('%cAll systems ready! 🚀', 'color: #198754;');

// Export for use in other scripts if needed
window.LoanFinderApp = {
    calculateEMI,
    formatCurrency,
    validatePhone,
    validateEmail,
    showNotification,
    shareLoan,
    printLoanDetails
};
// Modern Course Website JavaScript

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuLines = mobileMenuBtn.querySelectorAll('.menu-line');

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Animate hamburger to X
        if (mobileMenu.classList.contains('hidden')) {
            // Reset to hamburger
            menuLines[0].style.transform = 'translateY(0) rotate(0deg)';
            menuLines[1].style.opacity = '1';
            menuLines[2].style.transform = 'translateY(0) rotate(0deg)';
        } else {
            // Transform to X
            menuLines[0].style.transform = 'translateY(6px) rotate(45deg)';
            menuLines[1].style.opacity = '0';
            menuLines[2].style.transform = 'translateY(-6px) rotate(-45deg)';
        }
    });

    // Close mobile menu when clicking on links
    const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            // Reset hamburger
            menuLines[0].style.transform = 'translateY(0) rotate(0deg)';
            menuLines[1].style.opacity = '1';
            menuLines[2].style.transform = 'translateY(0) rotate(0deg)';
        });
    });
});

// Enhanced accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetBody = document.getElementById(targetId);
            const accordionItem = this.closest('.accordion-item');
            const isActive = accordionItem.classList.contains('active');

            // Close all accordion items
            accordionHeaders.forEach(h => {
                const item = h.closest('.accordion-item');
                const body = document.getElementById(h.getAttribute('data-target'));
                
                item.classList.remove('active');
                if (body) {
                    body.style.maxHeight = '0px';
                }
            });

            // Open clicked item if it wasn't already active
            if (!isActive && targetBody) {
                accordionItem.classList.add('active');
                
                // Calculate and set max height for smooth animation
                targetBody.style.maxHeight = 'none';
                const height = targetBody.scrollHeight;
                targetBody.style.maxHeight = '0px';
                
                // Trigger animation
                requestAnimationFrame(() => {
                    targetBody.style.maxHeight = height + 'px';
                    
                    // After animation, set to auto for dynamic content
                    setTimeout(() => {
                        if (accordionItem.classList.contains('active')) {
                            targetBody.style.maxHeight = 'none';
                        }
                    }, 500);
                });
            }
        });
    });
});

// Real-time clock with enhanced formatting
function updateCurrentTime() {
    const now = new Date();
    
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    
    const formattedTime = now.toLocaleString('en-US', options);
    const timeElement = document.getElementById('currentTime');
    
    if (timeElement) {
        timeElement.textContent = formattedTime;
    }
}

// Initialize clock
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
});

// Smooth scrolling with offset for fixed navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.modern-nav').offsetHeight;
                const offsetTop = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Active navigation highlighting based on scroll position
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    function updateActiveNavigation() {
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section links
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
    updateActiveNavigation(); // Initial call
});

// Navigation scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.modern-nav');
    let lastScrollY = window.scrollY;
    
    function handleNavScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.backdropFilter = 'blur(25px)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', throttle(handleNavScroll, 50));
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for child elements
                const children = entry.target.querySelectorAll('.glass-card, .schedule-card, .lab-card, .staff-member');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe content sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
});

// Enhanced table interactions
document.addEventListener('DOMContentLoaded', function() {
    const tableRows = document.querySelectorAll('.table-row:not(.table-header)');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
            this.style.zIndex = '10';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
    });
});

// Material link hover effects
document.addEventListener('DOMContentLoaded', function() {
    const materialLinks = document.querySelectorAll('.material-link:not(.disabled)');
    
    materialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

// Copy to clipboard functionality for email links
document.addEventListener('DOMContentLoaded', function() {
    const emailLinks = document.querySelectorAll('.email-link, .contact-link');
    
    emailLinks.forEach(link => {
        link.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            
            const email = this.href.replace('mailto:', '');
            navigator.clipboard.writeText(email).then(() => {
                showToast('📧 Email copied to clipboard!');
            }).catch(() => {
                showToast('❌ Failed to copy email');
            });
        });
    });
});

// External link handling with loading indication
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            showToast('🔗 Opening external link...');
            
            setTimeout(() => {
                this.style.opacity = '1';
            }, 300);
        });
    });
});

// Keyboard navigation support
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll(
        'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && this.classList.contains('accordion-header')) {
                this.click();
            }
        });
    });
});

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        
        console.log(`🚀 Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Show performance in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            setTimeout(() => {
                showToast(`⚡ Page loaded in ${loadTime.toFixed(0)}ms`);
            }, 1000);
        }
    }
});

// Error handling for external resources
document.addEventListener('DOMContentLoaded', function() {
    const externalResources = document.querySelectorAll('link[href^="http"], script[src^="http"]');
    
    externalResources.forEach(resource => {
        resource.addEventListener('error', function() {
            console.warn('Failed to load external resource:', this.href || this.src);
            showToast('⚠️ Some external resources failed to load');
        });
    });
});

// Dark mode detection and handling
document.addEventListener('DOMContentLoaded', function() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-preference');
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.add('dark-preference');
        } else {
            document.body.classList.remove('dark-preference');
        }
    });
});

// Search functionality (basic implementation)
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search course content...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        padding: 0.5rem 1rem;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 1.5rem;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        font-size: 0.875rem;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        width: 200px;
    `;
    
    searchInput.addEventListener('focus', function() {
        this.style.width = '300px';
        this.style.background = 'rgba(255, 255, 255, 0.3)';
    });
    
    searchInput.addEventListener('blur', function() {
        if (!this.value) {
            this.style.width = '200px';
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        }
    });
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        performSearch(searchTerm);
    });
    
    // Add to desktop navigation
    const desktopNav = document.querySelector('.nav-links-desktop');
    if (desktopNav) {
        desktopNav.appendChild(searchInput);
    }
}

function performSearch(term) {
    if (!term) return;
    
    const searchableElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li');
    let matches = 0;
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(term)) {
            element.style.background = 'rgba(255, 255, 0, 0.3)';
            matches++;
        } else {
            element.style.background = '';
        }
    });
    
    if (matches > 0) {
        showToast(`🔍 Found ${matches} matches for "${term}"`);
    }
}

// Utility functions
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showToast(message, duration = 3000) {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
    });
    
    // Auto remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment to enable search
    // initializeSearch();
    
    // Add loading states for dynamic content
    const dynamicElements = document.querySelectorAll('[data-dynamic]');
    dynamicElements.forEach(element => {
        element.style.opacity = '0.7';
        element.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, Math.random() * 1000);
    });
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        showToast('🎉 Konami Code activated! You found the easter egg!', 5000);
        document.body.style.animation = 'rainbow 2s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Export functions for external use
window.CourseWebsite = {
    showToast,
    updateCurrentTime,
    performSearch,
    throttle,
    debounce
};

// Service worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js').then(function(registration) {
        //     console.log('SW registered: ', registration);
        // }).catch(function(registrationError) {
        //     console.log('SW registration failed: ', registrationError);
        // });
    });
}
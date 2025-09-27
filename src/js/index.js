import "../css/dpk.scss";

import gsap from "gsap";


// Simple Timer Configuration
const targetDate = new Date('2035-12-31T23:59:59.999');

// DOM Elements
let daysEl, hoursEl, minutesEl, secondsEl, totalHoursEl;

function updateCountdown() {
    if (!daysEl) return; // Elements not ready yet
    
    const currentTime = new Date();
    const timeDiff = targetDate - currentTime;
    
    if (timeDiff <= 0) {
        // Timer expired
        daysEl.textContent = '0';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        if (totalHoursEl) totalHoursEl.textContent = '0';
        return;
    }
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    // Calculate total hours remaining
    const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
    
    // Update display
    daysEl.textContent = days.toLocaleString();
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
    
    // Update total hours if element exists
    if (totalHoursEl) {
        totalHoursEl.textContent = totalHours.toLocaleString();
    }
}

// Initialize current date display
function initializeCurrentDate() {
    const currentDateEl = document.getElementById('currentDate');
    if (!currentDateEl) return;
    
    const today = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    const formattedDate = today.toLocaleDateString('en-US', options);
    currentDateEl.textContent = formattedDate;
}

// Initialize animations
function initializeAnimations() {
    if (typeof gsap === 'undefined') return;
    
    // Animate header
    gsap.to(".countdown-header", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    });
    
    // Animate glass card
    gsap.to(".glass-card", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3
    });
    
    // Animate countdown items
    gsap.to(".countdown-item", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.8
    });
    
    // Animate background orbs
    gsap.to(".orb-1", {
        x: 50,
        y: 30,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    gsap.to(".orb-2", {
        x: -30,
        y: -50,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    gsap.to(".orb-3", {
        x: 40,
        y: -20,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// Initialize everything
function initialize() {
    // Get DOM elements
    daysEl = document.getElementById('days');
    hoursEl = document.getElementById('hours');
    minutesEl = document.getElementById('minutes');
    secondsEl = document.getElementById('seconds');
    totalHoursEl = document.getElementById('totalHours');
    
    // Initialize current date display
    initializeCurrentDate();
    
    // Only proceed if countdown elements exist
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        return;
    }
    
    // Initialize animations
    initializeAnimations();
    
    // Start countdown
    updateCountdown();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', initialize);

// Fallback
window.addEventListener('load', () => {
    setTimeout(initialize, 100);
});

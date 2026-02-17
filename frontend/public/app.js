import { renderHome } from './components/home/Home.js';
import { renderCreateCV } from './components/create-cv/CreateCV.js';
import { renderApply } from './components/apply/Apply.js';

// Tab navigation
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            navLinks.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            link.classList.add('active');
            const tabId = link.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            tabContent.classList.add('active');
            
            // Render content based on tab
            if (tabId === 'home') renderHome();
            if (tabId === 'create') renderCreateCV();
            if (tabId === 'apply') renderApply();
        });
    });

    // Initial render
    renderHome();
});
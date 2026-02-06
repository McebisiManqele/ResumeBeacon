import { initWizard } from './wizard/CVWizard.js';

export function renderCreateCV() {
    const createSection = document.getElementById('create');
    createSection.innerHTML = `
        <div class="cv-builder-container">
            <div class="container">
                <div class="cv-builder-header">
                    <h1>Create Your CV</h1>
                    <p>Build a professional, ATS-optimised CV in 9 easy steps</p>
                </div>
                <div id="cv-wizard"></div>
            </div>
        </div>
    `;
    
    initWizard();
}
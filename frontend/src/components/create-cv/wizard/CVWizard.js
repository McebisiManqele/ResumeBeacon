import { renderStep1 } from '../steps/Step1Industry.js';
import { renderStep2 } from '../steps/Step2BasicInfo.js';
import { renderStep3 } from '../steps/Step3Experience.js';
import { renderStep4 } from '../steps/Step4ClinicalExposure.js';
import { renderStep5 } from '../steps/Step5Volunteering.js';
import { renderStep6 } from '../steps/Step6Education.js';
import { renderStep7 } from '../steps/Step7Projects.js';
import { renderStep8 } from '../steps/Step8Certifications.js';
import { renderStep9 } from '../steps/Step9Skills.js';

const cvData = {
    industry: '',
    basicInfo: {},
    experience: [],
    clinicalExposure: [],
    volunteering: [],
    education: [],
    projects: [],
    certifications: [],
    skills: []
};

let currentStep = 1;
const totalSteps = 9;

const steps = [
    { number: 1, title: 'Industry', render: renderStep1 },
    { number: 2, title: 'Basic Info', render: renderStep2 },
    { number: 3, title: 'Experience', render: renderStep3 },
    { number: 4, title: 'Clinical Exposure', render: renderStep4 },
    { number: 5, title: 'Volunteering', render: renderStep5 },
    { number: 6, title: 'Education', render: renderStep6 },
    { number: 7, title: 'Projects', render: renderStep7 },
    { number: 8, title: 'Certifications', render: renderStep8 },
    { number: 9, title: 'Skills', render: renderStep9 }
];

export function initWizard() {
    const wizardContainer = document.getElementById('cv-wizard');
    wizardContainer.innerHTML = `
        <div class="wizard-progress">
            ${steps.map(step => `
                <div class="progress-step ${step.number === 1 ? 'active' : ''}" data-step="${step.number}">
                    <div class="step-number">${step.number}</div>
                    <div class="step-title">${step.title}</div>
                </div>
            `).join('')}
        </div>
        <div class="wizard-content" id="wizard-content"></div>
        <div class="wizard-navigation">
            <button class="btn btn-secondary" id="back-btn" style="display: none;">Back</button>
            <button class="btn btn-primary" id="next-btn">Next</button>
        </div>
    `;
    
    renderCurrentStep();
    setupNavigation();
}

function renderCurrentStep() {
    const step = steps[currentStep - 1];
    step.render(cvData);
    updateProgress();
    updateNavigationButtons();
}

function updateProgress() {
    document.querySelectorAll('.progress-step').forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.remove('active', 'completed');
        if (stepNum === currentStep) step.classList.add('active');
        if (stepNum < currentStep) step.classList.add('completed');
    });
}

function updateNavigationButtons() {
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');
    
    backBtn.style.display = currentStep === 1 ? 'none' : 'block';
    nextBtn.textContent = currentStep === totalSteps ? 'Generate CV' : 'Next';
}

function setupNavigation() {
    document.getElementById('back-btn').addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            renderCurrentStep();
        }
    });
    
    document.getElementById('next-btn').addEventListener('click', () => {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                currentStep++;
                renderCurrentStep();
            } else {
                generateCV();
            }
        }
    });
}

function validateCurrentStep() {
    // Basic validation - can be enhanced per step
    return true;
}

function generateCV() {
    console.log('Generating CV with data:', cvData);
    alert('CV Generated! (Download functionality to be implemented)');
}

export function updateCVData(section, data) {
    cvData[section] = data;
}
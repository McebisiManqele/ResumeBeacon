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
    
    // Create CV HTML
    const cvHTML = createCVHTML(cvData);
    
    // Create download link
    const blob = new Blob([cvHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cvData.basicInfo.fullName || 'CV'}_Resume.html`;
    a.click();
    URL.revokeObjectURL(url);
    
    alert('CV Generated and Downloaded!');
}

function createCVHTML(data) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${data.basicInfo.fullName || 'Resume'}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #333; }
        h1 { color: #4A90E2; margin-bottom: 5px; }
        h2 { color: #4A90E2; border-bottom: 2px solid #4A90E2; padding-bottom: 5px; margin-top: 30px; }
        .contact { color: #666; margin-bottom: 20px; }
        .section-item { margin-bottom: 20px; }
        .item-header { font-weight: bold; color: #333; }
        .item-subheader { color: #666; font-style: italic; }
        .skills { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill-tag { background: #E3F2FD; color: #4A90E2; padding: 5px 15px; border-radius: 15px; }
    </style>
</head>
<body>
    <h1>${data.basicInfo.fullName || ''}</h1>
    <div class="contact">
        ${data.basicInfo.email || ''} | ${data.basicInfo.phone || ''} | ${data.basicInfo.location || ''}
        ${data.basicInfo.linkedin ? `<br>${data.basicInfo.linkedin}` : ''}
    </div>
    ${data.basicInfo.summary ? `<p>${data.basicInfo.summary}</p>` : ''}
    
    ${data.experience?.length ? `
    <h2>Work Experience</h2>
    ${data.experience.map(exp => `
    <div class="section-item">
        <div class="item-header">${exp.title} - ${exp.company}</div>
        <div class="item-subheader">${exp.startDate} - ${exp.endDate}</div>
        <p>${exp.description}</p>
    </div>
    `).join('')}
    ` : ''}
    
    ${data.clinicalExposure?.length ? `
    <h2>Clinical Exposure</h2>
    ${data.clinicalExposure.map(clin => `
    <div class="section-item">
        <div class="item-header">${clin.role} - ${clin.facility}</div>
        <div class="item-subheader">${clin.startDate} - ${clin.endDate}</div>
        <p>${clin.description}</p>
    </div>
    `).join('')}
    ` : ''}
    
    ${data.volunteering?.length ? `
    <h2>Volunteering</h2>
    ${data.volunteering.map(vol => `
    <div class="section-item">
        <div class="item-header">${vol.role} - ${vol.organization}</div>
        <div class="item-subheader">${vol.startDate} - ${vol.endDate}</div>
        <p>${vol.description}</p>
    </div>
    `).join('')}
    ` : ''}
    
    ${data.education?.length ? `
    <h2>Education</h2>
    ${data.education.map(edu => `
    <div class="section-item">
        <div class="item-header">${edu.degree}</div>
        <div class="item-subheader">${edu.institution} | ${edu.startDate} - ${edu.endDate}</div>
        ${edu.description ? `<p>${edu.description}</p>` : ''}
    </div>
    `).join('')}
    ` : ''}
    
    ${data.projects?.length ? `
    <h2>Projects</h2>
    ${data.projects.map(proj => `
    <div class="section-item">
        <div class="item-header">${proj.name}</div>
        <div class="item-subheader">${proj.technologies} | ${proj.date}</div>
        <p>${proj.description}</p>
        ${proj.link ? `<p><a href="${proj.link}">${proj.link}</a></p>` : ''}
    </div>
    `).join('')}
    ` : ''}
    
    ${data.certifications?.length ? `
    <h2>Certifications</h2>
    ${data.certifications.map(cert => `
    <div class="section-item">
        <div class="item-header">${cert.name}</div>
        <div class="item-subheader">${cert.issuer} | ${cert.date}</div>
        ${cert.credentialId ? `<p>Credential ID: ${cert.credentialId}</p>` : ''}
    </div>
    `).join('')}
    ` : ''}
    
    ${data.skills?.length ? `
    <h2>Skills</h2>
    <div class="skills">
        ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
    </div>
    ` : ''}
</body>
</html>
    `;
}

export function updateCVData(section, data) {
    cvData[section] = data;
}
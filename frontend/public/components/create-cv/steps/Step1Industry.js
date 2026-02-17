import { updateCVData } from '../wizard/CVWizard.js';

export function renderStep1(cvData) {
    const content = document.getElementById('wizard-content');
    content.innerHTML = `
        <div class="step-container">
            <h2>Select Industry</h2>
            <p>Choose your industry to tailor your CV according to specific requirements</p>
            
            <div class="form-group">
                <label for="industry">Industry Template</label>
                <select id="industry" class="form-control">
                    <option value="">Select an industry...</option>
                    <option value="general" ${cvData.industry === 'general' ? 'selected' : ''}>General</option>
                    <option value="tech" ${cvData.industry === 'tech' ? 'selected' : ''}>Tech Industry</option>
                    <option value="finance" ${cvData.industry === 'finance' ? 'selected' : ''}>Finance & Accounting</option>
                    <option value="healthcare" ${cvData.industry === 'healthcare' ? 'selected' : ''}>Healthcare</option>
                    <option value="arts" ${cvData.industry === 'arts' ? 'selected' : ''}>Arts & Design</option>
                    <option value="business" ${cvData.industry === 'business' ? 'selected' : ''}>Business & Management</option>
                </select>
            </div>
        </div>
    `;
    
    document.getElementById('industry').addEventListener('change', (e) => {
        updateCVData('industry', e.target.value);
    });
}
import { updateCVData } from '../wizard/CVWizard.js';

export function renderStep2(cvData) {
    const content = document.getElementById('wizard-content');
    const info = cvData.basicInfo || {};
    
    content.innerHTML = `
        <div class="step-container">
            <h2>Basic Information</h2>
            <p>Enter your personal and contact details</p>
            
            <div class="form-grid">
                <div class="form-group">
                    <label for="fullName">Full Name *</label>
                    <input type="text" id="fullName" class="form-control" value="${info.fullName || ''}" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" class="form-control" value="${info.email || ''}" required>
                </div>
                
                <div class="form-group">
                    <label for="phone">Phone Number *</label>
                    <input type="tel" id="phone" class="form-control" value="${info.phone || ''}" required>
                </div>
                
                <div class="form-group">
                    <label for="location">Location</label>
                    <input type="text" id="location" class="form-control" value="${info.location || ''}" placeholder="City, Country">
                </div>
                
                <div class="form-group full-width">
                    <label for="linkedin">LinkedIn Profile</label>
                    <input type="url" id="linkedin" class="form-control" value="${info.linkedin || ''}" placeholder="https://linkedin.com/in/yourprofile">
                </div>
                
                <div class="form-group full-width">
                    <label for="summary">Professional Summary</label>
                    <textarea id="summary" class="form-control" rows="4" placeholder="Brief overview of your professional background...">${info.summary || ''}</textarea>
                </div>
            </div>
        </div>
    `;
    
    const fields = ['fullName', 'email', 'phone', 'location', 'linkedin', 'summary'];
    fields.forEach(field => {
        document.getElementById(field).addEventListener('input', () => {
            const data = {};
            fields.forEach(f => data[f] = document.getElementById(f).value);
            updateCVData('basicInfo', data);
        });
    });
}
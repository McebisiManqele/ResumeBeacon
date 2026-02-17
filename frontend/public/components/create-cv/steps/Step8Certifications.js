import { updateCVData } from '../wizard/CVWizard.js';

export function renderStep8(cvData) {
    const content = document.getElementById('wizard-content');
    const certifications = cvData.certifications || [];
    
    content.innerHTML = `
        <div class="step-container">
            <h2>Certifications</h2>
            <p>Add your professional certifications and licenses</p>
            
            <div id="certifications-list"></div>
            <button type="button" class="btn btn-secondary" id="add-certification">+ Add Certification</button>
            <button type="button" class="btn btn-secondary" id="skip-certifications">Skip This Step</button>
        </div>
    `;
    
    renderCertificationsList(certifications);
    
    document.getElementById('add-certification').addEventListener('click', () => {
        certifications.push({ name: '', issuer: '', date: '', expiryDate: '', credentialId: '' });
        renderCertificationsList(certifications);
        updateCVData('certifications', certifications);
    });
    
    document.getElementById('skip-certifications').addEventListener('click', () => {
        updateCVData('certifications', []);
        document.getElementById('next-btn').click();
    });
}

function renderCertificationsList(certifications) {
    const list = document.getElementById('certifications-list');
    list.innerHTML = certifications.map((item, index) => `
        <div class="experience-item">
            <div class="form-grid">
                <div class="form-group">
                    <label>Certification Name</label>
                    <input type="text" class="form-control" data-index="${index}" data-field="name" value="${item.name || ''}">
                </div>
                <div class="form-group">
                    <label>Issuing Organization</label>
                    <input type="text" class="form-control" data-index="${index}" data-field="issuer" value="${item.issuer || ''}">
                </div>
                <div class="form-group">
                    <label>Issue Date</label>
                    <input type="month" class="form-control" data-index="${index}" data-field="date" value="${item.date || ''}">
                </div>
                <div class="form-group">
                    <label>Expiry Date (Optional)</label>
                    <input type="month" class="form-control" data-index="${index}" data-field="expiryDate" value="${item.expiryDate || ''}">
                </div>
                <div class="form-group full-width">
                    <label>Credential ID (Optional)</label>
                    <input type="text" class="form-control" data-index="${index}" data-field="credentialId" value="${item.credentialId || ''}" placeholder="Certificate number or ID">
                </div>
            </div>
            <button type="button" class="btn-remove" data-index="${index}">Remove</button>
        </div>
    `).join('');
    
    list.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.dataset.index);
            const field = e.target.dataset.field;
            certifications[index][field] = e.target.value;
            updateCVData('certifications', certifications);
        });
    });
    
    list.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            certifications.splice(index, 1);
            renderCertificationsList(certifications);
            updateCVData('certifications', certifications);
        });
    });
}
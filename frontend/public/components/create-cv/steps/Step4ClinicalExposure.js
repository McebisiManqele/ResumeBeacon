import { updateCVData } from '../wizard/CVWizard.js';

export function renderStep4(cvData) {
    const content = document.getElementById('wizard-content');
    const clinical = cvData.clinicalExposure || [];
    
    content.innerHTML = `
        <div class="step-container">
            <h2>Clinical Exposure</h2>
            <p>Add your clinical experience (Healthcare professionals)</p>
            
            <div id="clinical-list"></div>
            <button type="button" class="btn btn-secondary" id="add-clinical">+ Add Clinical Experience</button>
            <button type="button" class="btn btn-secondary" id="skip-clinical">Skip This Step</button>
        </div>
    `;
    
    renderClinicalList(clinical);
    
    document.getElementById('add-clinical').addEventListener('click', () => {
        clinical.push({ facility: '', role: '', startDate: '', endDate: '', description: '' });
        renderClinicalList(clinical);
        updateCVData('clinicalExposure', clinical);
    });
    
    document.getElementById('skip-clinical').addEventListener('click', () => {
        updateCVData('clinicalExposure', []);
        document.getElementById('next-btn').click();
    });
}

function renderClinicalList(clinical) {
    const list = document.getElementById('clinical-list');
    list.innerHTML = clinical.map((item, index) => `
        <div class="experience-item">
            <div class="form-grid">
                <div class="form-group">
                    <label>Facility/Hospital</label>
                    <input type="text" class="form-control" data-index="${index}" data-field="facility" value="${item.facility || ''}">
                </div>
                <div class="form-group">
                    <label>Role</label>
                    <input type="text" class="form-control" data-index="${index}" data-field="role" value="${item.role || ''}">
                </div>
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="month" class="form-control" data-index="${index}" data-field="startDate" value="${item.startDate || ''}">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="month" class="form-control" data-index="${index}" data-field="endDate" value="${item.endDate || ''}">
                </div>
                <div class="form-group full-width">
                    <label>Description</label>
                    <textarea class="form-control" rows="3" data-index="${index}" data-field="description">${item.description || ''}</textarea>
                </div>
            </div>
            <button type="button" class="btn-remove" data-index="${index}">Remove</button>
        </div>
    `).join('');
    
    list.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.dataset.index);
            const field = e.target.dataset.field;
            clinical[index][field] = e.target.value;
            updateCVData('clinicalExposure', clinical);
        });
    });
    
    list.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            clinical.splice(index, 1);
            renderClinicalList(clinical);
            updateCVData('clinicalExposure', clinical);
        });
    });
}
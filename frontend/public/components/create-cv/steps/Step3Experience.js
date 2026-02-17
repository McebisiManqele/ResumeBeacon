import { updateCVData } from '../wizard/CVWizard.js';

export function renderStep3(cvData) {
    const content = document.getElementById('wizard-content');
    const experiences = cvData.experience || [];
    
    content.innerHTML = `
        <div class="step-container">
            <h2>Work Experience</h2>
            <p>Add your professional work experience</p>
            
            <div id="experience-list"></div>
            <button type="button" class="btn btn-secondary" id="add-experience">+ Add Experience</button>
        </div>
    `;
    
    renderExperienceList(experiences);
    
    document.getElementById('add-experience').addEventListener('click', () => {
        experiences.push({ title: '', company: '', startDate: '', endDate: '', description: '' });
        renderExperienceList(experiences);
        updateCVData('experience', experiences);
    });
}

function renderExperienceList(experiences) {
    const list = document.getElementById('experience-list');
    list.innerHTML = experiences.map((exp, index) => `
        <div class="experience-item">
            <div class="form-grid">
                <div class="form-group">
                    <label>Job Title</label>
                    <input type="text" class="form-control" data-index="${index}" data-field="title" value="${exp.title || ''}">
                </div>
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" class="form-control" data-index="${index}" data-field="company" value="${exp.company || ''}">
                </div>
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="month" class="form-control" data-index="${index}" data-field="startDate" value="${exp.startDate || ''}">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="month" class="form-control" data-index="${index}" data-field="endDate" value="${exp.endDate || ''}">
                </div>
                <div class="form-group full-width">
                    <label>Description</label>
                    <textarea class="form-control" rows="3" data-index="${index}" data-field="description">${exp.description || ''}</textarea>
                </div>
            </div>
            <button type="button" class="btn-remove" data-index="${index}">Remove</button>
        </div>
    `).join('');
    
    list.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.dataset.index);
            const field = e.target.dataset.field;
            experiences[index][field] = e.target.value;
            updateCVData('experience', experiences);
        });
    });
    
    list.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            experiences.splice(index, 1);
            renderExperienceList(experiences);
            updateCVData('experience', experiences);
        });
    });
}
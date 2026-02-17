import { updateCVData } from '../wizard/CVWizard.js';

export function renderStep6(cvData) {
    const content = document.getElementById('wizard-content');
    const education = cvData.education || [];
    
    content.innerHTML = `
        <div class="step-container">
            <h2>Education</h2>
            <p>Add your educational background</p>
            
            <div id="education-list"></div>
            <button type="button" class="btn btn-secondary" id="add-education">+ Add Education</button>
        </div>
    `;
    
    renderEducationList(education);
    
    document.getElementById('add-education').addEventListener('click', () => {
        education.push({ degree: '', institution: '', startDate: '', endDate: '', description: '' });
        renderEducationList(education);
        updateCVData('education', education);
    });
}

function renderEducationList(education) {
    const list = document.getElementById('education-list');
    list.innerHTML = education.map((item, index) => `
        <div class="experience-item">
            <div class="form-grid">
                <div class="form-group">
                    <label>Degree/Qualification</label>
                    <input type="text" class="form-control" data-index="${index}" data-field="degree" value="${item.degree || ''}" placeholder="e.g., Bachelor of Science">
                </div>
                <div class="form-group">
                    <label>Institution</label>
                    <input type="text" class="form-control" data-index="${index}" data-field="institution" value="${item.institution || ''}">
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
                    <label>Additional Details</label>
                    <textarea class="form-control" rows="2" data-index="${index}" data-field="description" placeholder="GPA, honors, relevant coursework...">${item.description || ''}</textarea>
                </div>
            </div>
            <button type="button" class="btn-remove" data-index="${index}">Remove</button>
        </div>
    `).join('');
    
    list.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.dataset.index);
            const field = e.target.dataset.field;
            education[index][field] = e.target.value;
            updateCVData('education', education);
        });
    });
    
    list.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            education.splice(index, 1);
            renderEducationList(education);
            updateCVData('education', education);
        });
    });
}
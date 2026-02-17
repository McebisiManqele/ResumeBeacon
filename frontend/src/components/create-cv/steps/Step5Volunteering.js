import { updateCVData } from '../wizard/CVWizard.js';

export function renderStep5(cvData) {
    const content = document.getElementById('wizard-content');
    const volunteering = cvData.volunteering || [];
    
    content.innerHTML = `
        <div class="step-container">
            <h2>Volunteering</h2>
            <p>Add your volunteer work and community service</p>
            
            <div id="volunteer-list"></div>
            <button type="button" class="btn btn-secondary" id="add-volunteer">+ Add Volunteering</button>
            <button type="button" class="btn btn-secondary" id="skip-volunteer">Skip This Step</button>
        </div>
    `;
    
    renderVolunteerList(volunteering);
    
    document.getElementById('add-volunteer').addEventListener('click', () => {
        volunteering.push({ organization: '', role: '', startDate: '', endDate: '', description: '' });
        renderVolunteerList(volunteering);
        updateCVData('volunteering', volunteering);
    });
    
    document.getElementById('skip-volunteer').addEventListener('click', () => {
        updateCVData('volunteering', []);
    });
}

function renderVolunteerList(volunteering) {
    const list = document.getElementById('volunteer-list');
    list.innerHTML = volunteering.map((item, index) => `
        <div class="experience-item">
            <div class="form-grid">
                <div class="form-group">
                    <label>Organization</label>
                    <input type="text" class="form-control" data-index="${index}" data-field="organization" value="${item.organization || ''}">
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
            volunteering[index][field] = e.target.value;
            updateCVData('volunteering', volunteering);
        });
    });
    
    list.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            volunteering.splice(index, 1);
            renderVolunteerList(volunteering);
            updateCVData('volunteering', volunteering);
        });
    });
}
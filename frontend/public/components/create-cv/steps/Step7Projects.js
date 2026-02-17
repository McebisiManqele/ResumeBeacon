import { updateCVData } from '../wizard/CVWizard.js';

export function renderStep7(cvData) {
    const content = document.getElementById('wizard-content');
    const projects = cvData.projects || [];
    
    content.innerHTML = `
        <div class="step-container">
            <h2>Projects</h2>
            <p>Add your personal or professional projects</p>
            
            <div id="projects-list"></div>
            <button type="button" class="btn btn-secondary" id="add-project">+ Add Project</button>
            <button type="button" class="btn btn-secondary" id="skip-projects">Skip This Step</button>
        </div>
    `;
    
    renderProjectsList(projects);
    
    document.getElementById('add-project').addEventListener('click', () => {
        projects.push({ name: '', technologies: '', date: '', description: '', link: '' });
        renderProjectsList(projects);
        updateCVData('projects', projects);
    });
    
    document.getElementById('skip-projects').addEventListener('click', () => {
        updateCVData('projects', []);
        document.getElementById('next-btn').click();
    });
}

function renderProjectsList(projects) {
    const list = document.getElementById('projects-list');
    list.innerHTML = projects.map((item, index) => `
        <div class="experience-item">
            <div class="form-grid">
                <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" class="form-control" data-index="${index}" data-field="name" value="${item.name || ''}">
                </div>
                <div class="form-group">
                    <label>Technologies Used</label>
                    <input type="text" class="form-control" data-index="${index}" data-field="technologies" value="${item.technologies || ''}" placeholder="e.g., React, Node.js, MongoDB">
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="month" class="form-control" data-index="${index}" data-field="date" value="${item.date || ''}">
                </div>
                <div class="form-group">
                    <label>Project Link (Optional)</label>
                    <input type="url" class="form-control" data-index="${index}" data-field="link" value="${item.link || ''}" placeholder="https://github.com/...">
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
            projects[index][field] = e.target.value;
            updateCVData('projects', projects);
        });
    });
    
    list.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            projects.splice(index, 1);
            renderProjectsList(projects);
            updateCVData('projects', projects);
        });
    });
}
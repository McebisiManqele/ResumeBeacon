import { updateCVData } from '../wizard/CVWizard.js';

export function renderStep9(cvData) {
    const content = document.getElementById('wizard-content');
    const skills = cvData.skills || [];
    
    content.innerHTML = `
        <div class="step-container">
            <h2>Skills</h2>
            <p>Add your technical and soft skills</p>
            
            <div class="form-group">
                <label>Add Skills (Press Enter after each skill)</label>
                <input type="text" id="skill-input" class="form-control" placeholder="e.g., JavaScript, Leadership, Project Management">
            </div>
            
            <div id="skills-container" class="skills-tags"></div>
        </div>
    `;
    
    renderSkillsTags(skills);
    
    const skillInput = document.getElementById('skill-input');
    skillInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && skillInput.value.trim()) {
            e.preventDefault();
            skills.push(skillInput.value.trim());
            skillInput.value = '';
            renderSkillsTags(skills);
            updateCVData('skills', skills);
        }
    });
}

function renderSkillsTags(skills) {
    const container = document.getElementById('skills-container');
    container.innerHTML = skills.map((skill, index) => `
        <span class="skill-tag">
            ${skill}
            <button type="button" class="skill-remove" data-index="${index}">&times;</button>
        </span>
    `).join('');
    
    container.querySelectorAll('.skill-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            skills.splice(index, 1);
            renderSkillsTags(skills);
            updateCVData('skills', skills);
        });
    });
}
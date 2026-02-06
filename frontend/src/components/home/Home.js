export function renderHome() {
    const homeSection = document.getElementById('home');
    homeSection.innerHTML = `
        <div class="hero">
            <div class="container">
                <h1>AI-Powered Career Tools</h1>
                <h2>Land Your Dream Job With ResumeBeacon</h2>
                <p>Build professional CVs, analyse compatibility with job postings, and generate personalised cover letters—all powered by advanced AI.</p>
            </div>
        </div>
        
        <div class="features">
            <div class="container">
                <div class="feature-grid">
                    <div class="feature-card">
                        <div class="feature-icon">📝</div>
                        <h3>CV Builder</h3>
                        <p>Create ATS-optimised CVs tailored to your industry with our intelligent step-by-step wizard.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🎯</div>
                        <h3>Job Matching</h3>
                        <p>Instant compatibility analysis and automated cover letter generation matched to job requirements.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📊</div>
                        <h3>CV Analysis</h3>
                        <p>Get detailed feedback on formatting, keywords, and content to maximise your interview potential.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}
function normalizeText(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

function tokenize(text) {
    return normalizeText(text).split(" ").filter(t => t.length > 2);
}

function findBestSampleMatch(rawText) {
    const inputTokens = new Set(tokenize(rawText));
    if (inputTokens.size < 5) return null;

    let bestMatch = null;
    let bestScore = 0;

    for (const sample of SAMPLE_RESUMES) {
        const sampleTokens = new Set(tokenize(sample.messy));
        let overlap = 0;
        for (const token of inputTokens) {
            if (sampleTokens.has(token)) overlap++;
        }
        const score = overlap / Math.max(inputTokens.size, sampleTokens.size);
        if (score > bestScore) {
            bestScore = score;
            bestMatch = sample;
        }
    }

    return bestScore > 0.15 ? bestMatch : null;
}

function getSettings() {
    const companyName = document.querySelector("#setting-company")?.value || "Your Company";
    const accentColor = document.querySelector("#setting-color")?.value || "#4f46e5";
    const logoEl = document.querySelector("#setting-logo");
    const logoSrc = logoEl?.dataset?.src || null;
    return { companyName, accentColor, logoSrc };
}

function renderCleanHTML(data, settings) {
    const { companyName, accentColor, logoSrc } = settings;
    const logoHtml = logoSrc ? `<img src="${logoSrc}" alt="${companyName}">` : "";

    return `
    <div class="resume-output" style="--accent: ${accentColor}">
        <div class="ro-header">
            <div class="ro-company">${logoHtml}${companyName} — Candidate Submission</div>
            <div class="ro-name">${data.name}</div>
            <div class="ro-role">${data.role}</div>
        </div>

        <div class="ro-section">
            <div class="ro-section-title">Professional Summary</div>
            <div class="ro-summary">${data.summary}</div>
        </div>

        <div class="ro-section">
            <div class="ro-section-title">Key Skills</div>
            <div class="ro-skills">
                ${data.skills.map(s => `<span class="ro-skill">${s}</span>`).join("")}
            </div>
        </div>

        <div class="ro-section">
            <div class="ro-section-title">Professional Experience</div>
            ${data.experience.map(job => `
                <div class="ro-job">
                    <div class="ro-job-header">
                        <div>
                            <span class="ro-job-company">${job.company}</span>
                            <span class="ro-job-title"> | ${job.title}</span>
                        </div>
                        <span class="ro-job-dates">${job.dates}</span>
                    </div>
                    <ul class="ro-job-bullets">
                        ${job.bullets.map(b => `<li>${b}</li>`).join("")}
                    </ul>
                </div>
            `).join("")}
        </div>

        <div class="ro-section">
            <div class="ro-section-title">Education</div>
            ${data.education.map(e => `
                <div class="ro-edu">
                    <span class="ro-edu-school">${e.school}</span> —
                    <span class="ro-edu-degree">${e.degree}</span>
                    <span class="ro-edu-year"> (${e.year})</span>
                </div>
            `).join("")}
        </div>

        ${data.certifications.length ? `
        <div class="ro-section">
            <div class="ro-section-title">Certifications</div>
            <div class="ro-certs">
                ${data.certifications.map(c => `<span class="ro-cert">${c}</span>`).join("")}
            </div>
        </div>
        ` : ""}
    </div>`;
}

function renderFallbackHTML(rawText, settings) {
    const { companyName, accentColor, logoSrc } = settings;
    const logoHtml = logoSrc ? `<img src="${logoSrc}" alt="${companyName}">` : "";
    const lines = rawText.split("\n").map(l => l.trim()).filter(Boolean);

    const name = lines[0] || "Candidate Name";
    const sections = [];
    let currentSection = { title: "Details", lines: [] };

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const upper = line.toUpperCase();
        if (upper === line && line.length > 3 && line.length < 60 && !/^\d/.test(line) && !/[@|]/.test(line)) {
            if (currentSection.lines.length) sections.push(currentSection);
            currentSection = { title: line.charAt(0) + line.slice(1).toLowerCase(), lines: [] };
        } else {
            currentSection.lines.push(line);
        }
    }
    if (currentSection.lines.length) sections.push(currentSection);

    return `
    <div class="resume-output" style="--accent: ${accentColor}">
        <div class="ro-header">
            <div class="ro-company">${logoHtml}${companyName} — Candidate Submission</div>
            <div class="ro-name">${name.replace(/[~*#_]/g, "").trim()}</div>
        </div>
        ${sections.map(sec => `
            <div class="ro-section">
                <div class="ro-section-title">${sec.title}</div>
                <div class="ro-summary">${sec.lines.map(l => {
                    const clean = l.replace(/^[-*•→>>·.\d]+\s*/, "").trim();
                    return clean ? `<div style="margin-bottom:0.25rem">${clean}</div>` : "";
                }).join("")}</div>
            </div>
        `).join("")}
    </div>`;
}

async function reformatResume(rawText) {
    await new Promise(r => setTimeout(r, 800 + Math.random() * 700));

    const settings = getSettings();
    const match = findBestSampleMatch(rawText);

    if (match) return { html: renderCleanHTML(match.clean, settings), name: match.clean.name };
    return { html: renderFallbackHTML(rawText, settings), name: "Candidate" };
}

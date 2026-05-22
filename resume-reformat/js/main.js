const $ = (sel) => document.querySelector(sel);
const DARK_KEY = "rr_dark_mode";

let currentCandidateName = "Candidate";
let activeGalleryCard = null;

function initDarkMode() {
    const saved = localStorage.getItem(DARK_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "true" || (saved === null && prefersDark)) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem(DARK_KEY, isDark);
}

function renderGallery() {
    const grid = $("#gallery-grid");
    if (!grid) return;

    grid.innerHTML = SAMPLE_RESUMES.map(s => `
        <button class="gallery-card" data-sample-id="${s.id}" aria-label="View ${s.title} sample">
            <div class="gallery-card__icon">${s.icon}</div>
            <div class="text-sm font-semibold text-slate-700 dark:text-slate-200">${s.title}</div>
        </button>
    `).join("");

    grid.querySelectorAll(".gallery-card").forEach(card => {
        card.addEventListener("click", () => {
            const id = card.dataset.sampleId;
            const sample = SAMPLE_RESUMES.find(s => s.id === id);
            if (sample) loadSample(sample, card);
        });
    });
}

function loadSample(sample, cardEl) {
    const input = $("#resume-input");
    if (input) {
        input.value = sample.messy;
        updateCharCount();
    }

    if (activeGalleryCard) activeGalleryCard.classList.remove("active");
    if (cardEl) {
        cardEl.classList.add("active");
        activeGalleryCard = cardEl;
    }

    document.querySelector("#demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => triggerReformat(), 300);
}

function updateCharCount() {
    const input = $("#resume-input");
    const counter = $("#char-count");
    if (input && counter) {
        const len = input.value.length;
        counter.textContent = `${len.toLocaleString()} characters`;
    }
    const btn = $("#btn-reformat");
    if (btn) btn.disabled = !input?.value.trim();
}

function showOutputState(state) {
    const placeholder = $("#output-placeholder");
    const loading = $("#output-loading");
    const result = $("#output-result");

    if (placeholder) placeholder.classList.toggle("hidden", state !== "empty");
    if (loading) loading.classList.toggle("hidden", state !== "loading");
    if (result) result.classList.toggle("hidden", state !== "result");
}

async function triggerReformat() {
    const input = $("#resume-input");
    if (!input?.value.trim()) return;

    const btn = $("#btn-reformat");
    const btnLabel = btn?.querySelector(".btn-label");
    const btnLoading = btn?.querySelector(".btn-loading");

    if (btn) btn.disabled = true;
    if (btnLabel) btnLabel.classList.add("hidden");
    if (btnLoading) btnLoading.classList.remove("hidden");

    showOutputState("loading");

    try {
        const { html, name } = await reformatResume(input.value);
        currentCandidateName = name;

        const result = $("#output-result");
        if (result) {
            result.innerHTML = html;
            result.classList.add("fade-in");
            result.addEventListener("animationend", () => result.classList.remove("fade-in"), { once: true });
        }

        showOutputState("result");
        $("#btn-download-pdf")?.removeAttribute("disabled");
    } catch (e) {
        showOutputState("empty");
    }

    if (btn) btn.disabled = false;
    if (btnLabel) btnLabel.classList.remove("hidden");
    if (btnLoading) btnLoading.classList.add("hidden");
}

function initDropZone() {
    const zone = $("#input-drop-zone");
    if (!zone) return;

    zone.addEventListener("dragover", (e) => { e.preventDefault(); zone.classList.add("input-drop-zone--active"); });
    zone.addEventListener("dragenter", (e) => { e.preventDefault(); zone.classList.add("input-drop-zone--active"); });
    zone.addEventListener("dragleave", (e) => { if (!zone.contains(e.relatedTarget)) zone.classList.remove("input-drop-zone--active"); });
    zone.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.classList.remove("input-drop-zone--active");
        const file = e.dataTransfer.files[0];
        if (file) readFileAsText(file);
    });
}

function readFileAsText(file) {
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const input = $("#resume-input");
            if (input) {
                input.value = e.target.result;
                updateCharCount();
            }
        };
        reader.readAsText(file);
    } else {
        const input = $("#resume-input");
        if (input) {
            input.value = `[File uploaded: ${file.name}]\n\nNote: For the demo, please paste resume text directly. PDF/DOCX parsing will be available in the full version.`;
            updateCharCount();
        }
    }
}

function initSettings() {
    const colorInput = $("#setting-color");
    const colorLabel = $("#color-label");
    if (colorInput && colorLabel) {
        colorInput.addEventListener("input", () => {
            colorLabel.textContent = colorInput.value;
            reRenderOutput();
        });
    }

    const companyInput = $("#setting-company");
    if (companyInput) {
        companyInput.addEventListener("input", () => reRenderOutput());
    }

    const logoInput = $("#setting-logo");
    if (logoInput) {
        logoInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                logoInput.dataset.src = ev.target.result;
                const label = $("#logo-label");
                if (label) label.textContent = file.name;
                reRenderOutput();
            };
            reader.readAsDataURL(file);
        });
    }
}

function reRenderOutput() {
    const result = $("#output-result");
    if (!result || result.classList.contains("hidden")) return;

    const input = $("#resume-input");
    if (!input?.value.trim()) return;

    const match = findBestSampleMatch(input.value);
    const settings = getSettings();

    if (match) {
        result.innerHTML = renderCleanHTML(match.clean, settings);
    } else {
        result.innerHTML = renderFallbackHTML(input.value, settings);
    }
}

function init() {
    initDarkMode();
    renderGallery();
    initDropZone();
    initSettings();

    const input = $("#resume-input");
    if (input) input.addEventListener("input", updateCharCount);

    const btnDark = $("#btn-dark-mode");
    if (btnDark) btnDark.addEventListener("click", toggleDarkMode);

    const btnReformat = $("#btn-reformat");
    if (btnReformat) btnReformat.addEventListener("click", triggerReformat);

    const fileInput = $("#file-input");
    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            if (e.target.files[0]) readFileAsText(e.target.files[0]);
        });
    }

    const btnPdf = $("#btn-download-pdf");
    if (btnPdf) {
        btnPdf.addEventListener("click", () => {
            exportToPDF("output-result", currentCandidateName);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll("section").forEach(section => observer.observe(section));
}

init();

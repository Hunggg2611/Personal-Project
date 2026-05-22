function exportToPDF(elementId, candidateName) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const filename = `${candidateName.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_")}_Resume.pdf`;

    html2pdf().set({
        margin: [12, 12, 12, 12],
        filename: filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "letter", orientation: "portrait" }
    }).from(el).save();
}

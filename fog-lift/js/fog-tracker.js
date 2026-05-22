const FogTracker = (() => {
    let selectedFog = null;
    let selectedEnergy = null;

    function init() {
        const fogGroup = document.getElementById('fog-level-group');
        const energyGroup = document.getElementById('energy-level-group');
        const logBtn = document.getElementById('btn-log-fog');

        if (fogGroup) {
            fogGroup.addEventListener('click', (e) => {
                const btn = e.target.closest('.level-btn');
                if (!btn) return;
                selectedFog = parseInt(btn.dataset.level);
                fogGroup.querySelectorAll('.level-btn').forEach(b => {
                    b.classList.toggle('level-btn--selected', parseInt(b.dataset.level) === selectedFog);
                    b.setAttribute('aria-checked', parseInt(b.dataset.level) === selectedFog);
                });
                updateLogButton();
            });
        }

        if (energyGroup) {
            energyGroup.addEventListener('click', (e) => {
                const btn = e.target.closest('.level-btn');
                if (!btn) return;
                selectedEnergy = parseInt(btn.dataset.level);
                energyGroup.querySelectorAll('.level-btn').forEach(b => {
                    b.classList.toggle('level-btn--selected', parseInt(b.dataset.level) === selectedEnergy);
                    b.setAttribute('aria-checked', parseInt(b.dataset.level) === selectedEnergy);
                });
                updateLogButton();
            });
        }

        if (logBtn) {
            logBtn.addEventListener('click', () => {
                if (selectedFog === null || selectedEnergy === null) return;
                const note = document.getElementById('fog-note')?.value?.trim() || '';
                Store.addFogEntry(selectedFog, selectedEnergy, note);
                resetForm();
                renderTimeline();
                renderChart();
                renderInsights();
            });
        }
    }

    function updateLogButton() {
        const btn = document.getElementById('btn-log-fog');
        if (btn) btn.disabled = selectedFog === null || selectedEnergy === null;
    }

    function resetForm() {
        selectedFog = null;
        selectedEnergy = null;
        const fogGroup = document.getElementById('fog-level-group');
        const energyGroup = document.getElementById('energy-level-group');
        if (fogGroup) fogGroup.querySelectorAll('.level-btn').forEach(b => {
            b.classList.remove('level-btn--selected');
            b.setAttribute('aria-checked', 'false');
        });
        if (energyGroup) energyGroup.querySelectorAll('.level-btn').forEach(b => {
            b.classList.remove('level-btn--selected');
            b.setAttribute('aria-checked', 'false');
        });
        const note = document.getElementById('fog-note');
        if (note) note.value = '';
        updateLogButton();
    }

    function formatRelativeTime(ts) {
        const diff = Date.now() - ts;
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'just now';
        if (mins < 60) return `${mins} min ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs} hr ago`;
        return new Date(ts).toLocaleDateString('en', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    }

    function fogColor(level) {
        const colors = ['', '#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444'];
        return colors[level] || '#94a3b8';
    }

    function energyColor(level) {
        const colors = ['', '#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'];
        return colors[level] || '#94a3b8';
    }

    function renderTimeline() {
        const container = document.getElementById('fog-timeline');
        const empty = document.getElementById('fog-timeline-empty');
        if (!container) return;

        const entries = Store.getTodayFogEntries().slice().reverse();

        if (entries.length === 0) {
            container.innerHTML = '';
            if (empty) {
                container.appendChild(empty);
                empty.classList.remove('hidden');
            }
            return;
        }

        const fogLabels = ['', 'Clear', 'Light', 'Moderate', 'Thick', 'Dense'];
        const energyLabels = ['', 'Drained', 'Low', 'Okay', 'Good', 'Energized'];

        container.innerHTML = entries.map(e => `
            <div class="fog-entry">
                <span class="fog-entry__time">${formatRelativeTime(e.timestamp)}</span>
                <div class="fog-entry__levels">
                    <span class="fog-entry__badge" style="background: ${fogColor(e.fogLevel)}20; color: ${fogColor(e.fogLevel)}">
                        Fog ${e.fogLevel}
                    </span>
                    <span class="fog-entry__badge" style="background: ${energyColor(e.energyLevel)}20; color: ${energyColor(e.energyLevel)}">
                        Energy ${e.energyLevel}
                    </span>
                </div>
                ${e.note ? `<span class="fog-entry__note">${escapeHtml(e.note)}</span>` : ''}
            </div>
        `).join('');
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function renderChart() {
        const canvas = document.getElementById('fog-chart');
        const emptyMsg = document.getElementById('fog-chart-empty');
        if (!canvas) return;

        const weekEntries = Store.getWeekFogEntries();
        if (weekEntries.length === 0) {
            canvas.style.display = 'none';
            if (emptyMsg) emptyMsg.classList.remove('hidden');
            return;
        }

        canvas.style.display = 'block';
        if (emptyMsg) emptyMsg.classList.add('hidden');

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const W = rect.width;
        const H = rect.height;
        const PAD = { top: 24, right: 16, bottom: 32, left: 36 };
        const chartW = W - PAD.left - PAD.right;
        const chartH = H - PAD.top - PAD.bottom;

        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().slice(0, 10);
            const dayEntries = weekEntries.filter(e =>
                new Date(e.timestamp).toISOString().slice(0, 10) === dateStr
            );
            const avgFog = dayEntries.length
                ? dayEntries.reduce((s, e) => s + e.fogLevel, 0) / dayEntries.length
                : null;
            days.push({
                label: d.toLocaleDateString('en', { weekday: 'short' }),
                avg: avgFog,
                count: dayEntries.length,
                isToday: i === 0
            });
        }

        const isDark = document.documentElement.classList.contains('dark');
        const textColor = isDark ? '#d4ddd0' : '#3d4a3b';
        const gridColor = isDark ? 'rgba(212,221,208,0.08)' : 'rgba(61,74,59,0.06)';
        const barColor = isDark ? '#a3c098' : '#7c9a72';
        const todayColor = isDark ? '#a3c098' : '#5a7a52';

        ctx.clearRect(0, 0, W, H);

        ctx.font = '11px "Plus Jakarta Sans", system-ui';
        ctx.fillStyle = textColor;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';

        for (let i = 1; i <= 5; i++) {
            const y = PAD.top + chartH - ((i - 1) / 4) * chartH;
            ctx.fillStyle = textColor;
            ctx.globalAlpha = 0.5;
            ctx.fillText(i.toString(), PAD.left - 8, y);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(PAD.left, y);
            ctx.lineTo(W - PAD.right, y);
            ctx.stroke();
        }

        const gap = chartW / 7;
        const barW = gap * 0.5;

        days.forEach((day, i) => {
            const x = PAD.left + gap * i + gap / 2;

            ctx.fillStyle = day.isToday ? todayColor : textColor;
            ctx.globalAlpha = day.isToday ? 1 : 0.5;
            ctx.font = day.isToday
                ? 'bold 11px "Plus Jakarta Sans", system-ui'
                : '11px "Plus Jakarta Sans", system-ui';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(day.isToday ? 'Today' : day.label, x, PAD.top + chartH + 10);
            ctx.globalAlpha = 1;

            if (day.avg !== null) {
                const barH = Math.max(4, ((day.avg - 1) / 4) * chartH);
                const barY = PAD.top + chartH - barH;

                ctx.fillStyle = day.isToday ? todayColor : barColor;
                ctx.globalAlpha = day.isToday ? 0.9 : 0.5;
                roundedRect(ctx, x - barW / 2, barY, barW, barH, 4);
                ctx.fill();
                ctx.globalAlpha = 1;

                ctx.fillStyle = textColor;
                ctx.font = '10px "Plus Jakarta Sans", system-ui';
                ctx.textBaseline = 'bottom';
                ctx.globalAlpha = 0.7;
                ctx.fillText(day.avg.toFixed(1), x, barY - 4);
                ctx.globalAlpha = 1;
            }
        });
    }

    function roundedRect(ctx, x, y, w, h, r) {
        if (h < r * 2) r = h / 2;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x, y + h);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    function formatHour(h) {
        if (h === 0) return '12am';
        if (h === 12) return '12pm';
        return h > 12 ? `${h - 12}pm` : `${h}am`;
    }

    function generateInsights() {
        const entries = Store.getWeekFogEntries();
        if (entries.length < 3) return [];

        const insights = [];

        const byHour = {};
        entries.forEach(e => {
            const h = new Date(e.timestamp).getHours();
            if (!byHour[h]) byHour[h] = [];
            byHour[h].push(e.fogLevel);
        });

        let peakHour = null, peakAvg = 0;
        for (const [h, levels] of Object.entries(byHour)) {
            const avg = levels.reduce((a, b) => a + b) / levels.length;
            if (avg > peakAvg) { peakAvg = avg; peakHour = parseInt(h); }
        }
        if (peakHour !== null && peakAvg >= 2.5) {
            insights.push(`Your fog tends to peak around ${formatHour(peakHour)}.`);
        }

        let clearHour = null, clearAvg = 6;
        for (const [h, levels] of Object.entries(byHour)) {
            const avg = levels.reduce((a, b) => a + b) / levels.length;
            if (avg < clearAvg) { clearAvg = avg; clearHour = parseInt(h); }
        }
        if (clearHour !== null && clearAvg <= 2.5) {
            insights.push(`Your clearest hours seem to be around ${formatHour(clearHour)}.`);
        }

        const highEnergy = entries.filter(e => e.energyLevel >= 4);
        const lowEnergy = entries.filter(e => e.energyLevel <= 2);
        if (highEnergy.length >= 2 && lowEnergy.length >= 2) {
            const highFogAvg = highEnergy.reduce((s, e) => s + e.fogLevel, 0) / highEnergy.length;
            const lowFogAvg = lowEnergy.reduce((s, e) => s + e.fogLevel, 0) / lowEnergy.length;
            if (lowFogAvg - highFogAvg > 1) {
                insights.push('Lower energy days tend to come with more fog for you.');
            }
        }

        if (entries.length >= 5) {
            const sorted = [...entries].sort((a, b) => a.timestamp - b.timestamp);
            const recent = sorted.slice(-3);
            const earlier = sorted.slice(0, 3);
            const recentAvg = recent.reduce((s, e) => s + e.fogLevel, 0) / recent.length;
            const earlierAvg = earlier.reduce((s, e) => s + e.fogLevel, 0) / earlier.length;
            if (recentAvg < earlierAvg - 0.5) {
                insights.push('Your fog has been lighter recently. Something is working.');
            } else if (recentAvg > earlierAvg + 0.5) {
                insights.push("Fog has been a bit heavier recently. That happens — it's not a failing.");
            }
        }

        return insights;
    }

    function renderInsights() {
        const container = document.getElementById('fog-insights');
        if (!container) return;

        const insights = generateInsights();
        if (insights.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = insights.map(text => `
            <div class="insight-card">
                <svg class="w-4 h-4 text-sage-400 dark:text-sage-300 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
                <p class="text-sm">${text}</p>
            </div>
        `).join('');
    }

    function getTodaySummary() {
        const entries = Store.getTodayFogEntries();
        if (entries.length === 0) return { entryCount: 0, avgFog: 0, avgEnergy: 0 };
        return {
            entryCount: entries.length,
            avgFog: entries.reduce((s, e) => s + e.fogLevel, 0) / entries.length,
            avgEnergy: entries.reduce((s, e) => s + e.energyLevel, 0) / entries.length
        };
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (!document.getElementById('view-fog')?.classList.contains('hidden')) {
                renderChart();
            }
        }, 200);
    });

    return { init, renderTimeline, renderChart, renderInsights, getTodaySummary };
})();

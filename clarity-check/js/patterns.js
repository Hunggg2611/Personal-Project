const Patterns = (() => {
    const TIME_BLOCKS = [
        { label: '6–8a', start: 6, end: 8 },
        { label: '8–10a', start: 8, end: 10 },
        { label: '10–12p', start: 10, end: 12 },
        { label: '12–2p', start: 12, end: 14 },
        { label: '2–4p', start: 14, end: 16 },
        { label: '4–6p', start: 16, end: 18 },
        { label: '6–8p', start: 18, end: 20 },
        { label: '8–10p', start: 20, end: 22 },
        { label: '10–12a', start: 22, end: 24 }
    ];

    const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    function init() {
        render();
    }

    function render() {
        const entries = Store.getEntriesWithinDays(28);

        if (entries.length === 0) {
            showEmptyState();
            return;
        }

        hideEmptyState();

        if (entries.length < 5) {
            renderTeaser(entries);
        } else {
            renderFull(entries);
        }
    }

    function showEmptyState() {
        const el = document.getElementById('patterns-empty');
        const content = document.getElementById('patterns-content');
        if (el) el.classList.remove('hidden');
        if (content) content.classList.add('hidden');
    }

    function hideEmptyState() {
        const el = document.getElementById('patterns-empty');
        const content = document.getElementById('patterns-content');
        if (el) el.classList.add('hidden');
        if (content) content.classList.remove('hidden');
    }

    function renderTeaser(entries) {
        const heatmapSection = document.getElementById('heatmap-section');
        const corrSection = document.getElementById('correlation-section');
        if (heatmapSection) heatmapSection.classList.add('hidden');
        if (corrSection) corrSection.classList.add('hidden');

        renderWeeklyChart(entries);
        renderInsights(entries);
    }

    function renderFull(entries) {
        const heatmapSection = document.getElementById('heatmap-section');
        const corrSection = document.getElementById('correlation-section');
        if (heatmapSection) heatmapSection.classList.remove('hidden');
        if (corrSection) corrSection.classList.remove('hidden');

        renderHeatmap(entries);
        renderCorrelations(entries);
        renderWeeklyChart(entries);
        renderInsights(entries);
    }

    function renderHeatmap(entries) {
        const grid = document.getElementById('heatmap-grid');
        if (!grid) return;

        const buckets = {};
        entries.forEach(e => {
            const d = new Date(e.timestamp);
            const day = (d.getDay() + 6) % 7;
            const hour = d.getHours();
            const block = TIME_BLOCKS.findIndex(b => hour >= b.start && hour < b.end);
            if (block === -1) return;
            const key = `${day}-${block}`;
            if (!buckets[key]) buckets[key] = [];
            buckets[key].push(e.clarity);
        });

        let html = '<div class="heatmap-corner"></div>';
        TIME_BLOCKS.forEach(b => {
            html += `<div class="heatmap-col-label">${b.label}</div>`;
        });

        DAY_LABELS.forEach((day, di) => {
            html += `<div class="heatmap-row-label">${day}</div>`;
            TIME_BLOCKS.forEach((_, bi) => {
                const key = `${di}-${bi}`;
                const vals = buckets[key];
                if (!vals) {
                    html += '<div class="heatmap-cell heatmap-cell--empty"></div>';
                } else {
                    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
                    const cls = clarityClass(avg);
                    const opacity = Math.min(0.4 + vals.length * 0.15, 1);
                    html += `<div class="heatmap-cell ${cls}" style="opacity:${opacity}" title="${avg.toFixed(1)} avg (${vals.length} entries)"></div>`;
                }
            });
        });

        grid.innerHTML = html;
    }

    function clarityClass(avg) {
        if (avg < 2) return 'heatmap-cell--very-low';
        if (avg < 2.75) return 'heatmap-cell--low';
        if (avg < 3.25) return 'heatmap-cell--neutral';
        if (avg < 4) return 'heatmap-cell--high';
        return 'heatmap-cell--very-high';
    }

    function renderCorrelations(entries) {
        const container = document.getElementById('correlation-bars');
        if (!container) return;

        const byActivity = {};
        entries.forEach(e => {
            if (!byActivity[e.activity]) byActivity[e.activity] = [];
            byActivity[e.activity].push(e.clarity);
        });

        const overallAvg = entries.reduce((s, e) => s + e.clarity, 0) / entries.length;

        const activities = Object.entries(byActivity)
            .filter(([, vals]) => vals.length >= 2)
            .map(([id, vals]) => {
                const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
                const diff = avg - overallAvg;
                const info = CheckIn.ACTIVITIES.find(a => a.id === id);
                return { id, avg, diff, count: vals.length, emoji: info?.emoji || '✦', label: info?.label || id };
            })
            .sort((a, b) => b.diff - a.diff);

        if (activities.length === 0) {
            container.innerHTML = '<p class="text-sm text-sky-400 dark:text-sky-300/70">A few more check-ins per activity to show correlations.</p>';
            return;
        }

        const maxAbsDiff = Math.max(...activities.map(a => Math.abs(a.diff)), 0.5);

        container.innerHTML = activities.map(a => {
            const pct = Math.abs(a.diff) / maxAbsDiff * 100;
            const sign = a.diff >= 0 ? '+' : '';
            const barClass = a.diff >= 0 ? 'corr-bar--positive' : 'corr-bar--negative';
            return `
                <div class="corr-row">
                    <span class="corr-row__label">${a.emoji} ${a.label}</span>
                    <div class="corr-row__track">
                        <div class="corr-bar ${barClass}" style="width:${Math.max(pct, 8)}%"></div>
                    </div>
                    <span class="corr-row__value">${sign}${a.diff.toFixed(1)}</span>
                </div>
            `;
        }).join('');
    }

    function renderWeeklyChart(entries) {
        const canvas = document.getElementById('weekly-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const w = rect.width;
        const h = rect.height;
        const pad = { top: 20, right: 16, bottom: 28, left: 32 };
        const plotW = w - pad.left - pad.right;
        const plotH = h - pad.top - pad.bottom;

        ctx.clearRect(0, 0, w, h);

        const days = [];
        for (let i = 27; i >= 0; i--) {
            const d = new Date();
            d.setHours(0, 0, 0, 0);
            d.setDate(d.getDate() - i);
            const start = d.getTime();
            const end = start + 86400000;
            const dayEntries = entries.filter(e => e.timestamp >= start && e.timestamp < end);
            const avg = dayEntries.length > 0
                ? dayEntries.reduce((s, e) => s + e.clarity, 0) / dayEntries.length
                : null;
            days.push({ date: d, avg, count: dayEntries.length });
        }

        const isDark = document.documentElement.classList.contains('dark');
        const textColor = isDark ? '#8db8d9' : '#6b9cc3';
        const gridColor = isDark ? '#2d3a47' : '#e2ecf3';
        const barColor = isDark ? '#8db8d9' : '#6b9cc3';
        const lineColor = isDark ? '#a3cce6' : '#4a86b0';

        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        for (let i = 1; i <= 5; i++) {
            const y = pad.top + plotH - (i / 5) * plotH;
            ctx.beginPath();
            ctx.moveTo(pad.left, y);
            ctx.lineTo(w - pad.right, y);
            ctx.stroke();
        }

        ctx.fillStyle = textColor;
        ctx.font = '10px system-ui';
        ctx.textAlign = 'right';
        for (let i = 1; i <= 5; i++) {
            const y = pad.top + plotH - (i / 5) * plotH;
            ctx.fillText(String(i), pad.left - 6, y + 4);
        }

        const barW = Math.max((plotW / 28) - 2, 3);
        const points = [];

        days.forEach((day, i) => {
            const x = pad.left + (i + 0.5) * (plotW / 28);
            if (day.avg !== null) {
                const barH = (day.avg / 5) * plotH;
                const y = pad.top + plotH - barH;
                const r = Math.min(barW / 2, 4);

                ctx.fillStyle = barColor;
                ctx.globalAlpha = 0.6;
                ctx.beginPath();
                ctx.moveTo(x - barW / 2, pad.top + plotH);
                ctx.lineTo(x - barW / 2, y + r);
                ctx.quadraticCurveTo(x - barW / 2, y, x - barW / 2 + r, y);
                ctx.lineTo(x + barW / 2 - r, y);
                ctx.quadraticCurveTo(x + barW / 2, y, x + barW / 2, y + r);
                ctx.lineTo(x + barW / 2, pad.top + plotH);
                ctx.fill();
                ctx.globalAlpha = 1;

                points.push({ x, y });
            }

            if (i % 7 === 0) {
                ctx.fillStyle = textColor;
                ctx.font = '9px system-ui';
                ctx.textAlign = 'center';
                const label = `${day.date.getMonth() + 1}/${day.date.getDate()}`;
                ctx.fillText(label, x, h - pad.bottom + 16);
            }
        });

        if (points.length > 1) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.stroke();
        }
    }

    function renderInsights(entries) {
        const container = document.getElementById('insight-cards');
        if (!container) return;

        const insights = generateInsights(entries);
        container.innerHTML = insights.map(text =>
            `<div class="insight-card">${text}</div>`
        ).join('');
    }

    function generateInsights(entries) {
        const insights = [];
        const overallAvg = entries.reduce((s, e) => s + e.clarity, 0) / entries.length;

        const byActivity = {};
        entries.forEach(e => {
            if (!byActivity[e.activity]) byActivity[e.activity] = [];
            byActivity[e.activity].push(e.clarity);
        });

        const activityAvgs = Object.entries(byActivity)
            .filter(([, v]) => v.length >= 2)
            .map(([id, vals]) => ({
                id,
                avg: vals.reduce((a, b) => a + b, 0) / vals.length,
                label: CheckIn.ACTIVITIES.find(a => a.id === id)?.label || id,
                emoji: CheckIn.ACTIVITIES.find(a => a.id === id)?.emoji || '✦'
            }))
            .sort((a, b) => b.avg - a.avg);

        if (activityAvgs.length >= 2) {
            const best = activityAvgs[0];
            const worst = activityAvgs[activityAvgs.length - 1];
            insights.push(`Your clearest moments tend to happen while ${best.emoji} ${best.label} (avg ${best.avg.toFixed(1)}). Your foggiest while ${worst.emoji} ${worst.label} (avg ${worst.avg.toFixed(1)}).`);
        }

        const exerciseAvg = byActivity['exercising']?.length >= 2
            ? byActivity['exercising'].reduce((a, b) => a + b, 0) / byActivity['exercising'].length
            : null;
        const sedentary = ['screen_time', 'resting'];
        const sedEntries = entries.filter(e => sedentary.includes(e.activity));
        const sedAvg = sedEntries.length >= 2
            ? sedEntries.reduce((s, e) => s + e.clarity, 0) / sedEntries.length
            : null;

        if (exerciseAvg !== null && sedAvg !== null) {
            const diff = exerciseAvg - sedAvg;
            if (Math.abs(diff) > 0.3) {
                insights.push(`Exercise days average ${Math.abs(diff).toFixed(1)} points ${diff > 0 ? 'higher' : 'lower'} clarity than sedentary periods.`);
            }
        }

        const byHour = {};
        entries.forEach(e => {
            const h = new Date(e.timestamp).getHours();
            if (!byHour[h]) byHour[h] = [];
            byHour[h].push(e.clarity);
        });

        const hourAvgs = Object.entries(byHour)
            .filter(([, v]) => v.length >= 2)
            .map(([h, vals]) => ({ hour: parseInt(h), avg: vals.reduce((a, b) => a + b, 0) / vals.length }));

        if (hourAvgs.length >= 2) {
            hourAvgs.sort((a, b) => b.avg - a.avg);
            const peak = hourAvgs[0];
            const low = hourAvgs[hourAvgs.length - 1];
            insights.push(`Peak clarity tends to be around ${formatHour(peak.hour)} (avg ${peak.avg.toFixed(1)}). Foggiest around ${formatHour(low.hour)} (avg ${low.avg.toFixed(1)}).`);
        }

        const week1 = entries.filter(e => Date.now() - e.timestamp < 7 * 86400000);
        const week2 = entries.filter(e => {
            const age = Date.now() - e.timestamp;
            return age >= 7 * 86400000 && age < 14 * 86400000;
        });

        if (week1.length >= 3 && week2.length >= 3) {
            const avg1 = week1.reduce((s, e) => s + e.clarity, 0) / week1.length;
            const avg2 = week2.reduce((s, e) => s + e.clarity, 0) / week2.length;
            const diff = avg1 - avg2;
            if (Math.abs(diff) > 0.3) {
                insights.push(`Your clarity is trending ${diff > 0 ? 'up' : 'down'} compared to last week (${avg1.toFixed(1)} vs ${avg2.toFixed(1)}).`);
            } else {
                insights.push(`Your clarity has been steady this week (avg ${avg1.toFixed(1)}).`);
            }
        }

        const byDay = {};
        entries.forEach(e => {
            const day = (new Date(e.timestamp).getDay() + 6) % 7;
            if (!byDay[day]) byDay[day] = [];
            byDay[day].push(e.clarity);
        });

        const dayAvgs = Object.entries(byDay)
            .filter(([, v]) => v.length >= 2)
            .map(([d, vals]) => ({ day: parseInt(d), avg: vals.reduce((a, b) => a + b, 0) / vals.length }));

        if (dayAvgs.length >= 3) {
            dayAvgs.sort((a, b) => a.avg - b.avg);
            const worst = dayAvgs[0];
            if (worst.avg < overallAvg - 0.3) {
                insights.push(`${DAY_LABELS[worst.day]}s tend to be your foggiest day (avg ${worst.avg.toFixed(1)}).`);
            }
        }

        if (insights.length === 0) {
            insights.push(Rewards.getMiniInsight());
        }

        return insights;
    }

    function formatHour(h) {
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12} ${ampm}`;
    }

    return { init, render };
})();

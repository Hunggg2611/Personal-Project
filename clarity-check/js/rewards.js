const Rewards = (() => {
    const XP_BASE = 10;
    const XP_BONUS_CHANCE = 0.20;
    const XP_BONUS_MIN = 5;
    const XP_BONUS_MAX = 25;

    const BONUS_MESSAGES = [
        'Bonus brain points!',
        'Your brain thanks you!',
        'Surprise XP drop!',
        'Clarity jackpot!',
        'Neurons firing!',
        'Mind power-up!',
        'Brainwave bonus!',
        'Extra sparkle today!'
    ];

    const PRAISE_WORDS = [
        'Nice!', 'Brain logged!', 'Got it!', 'Tracked!', 'Noted!',
        'Locked in!', 'Sharp!', 'On it!', 'Logged!', 'Done!'
    ];

    const PARTICLE_COLORS = [
        '#6b9cc3', '#8db8d9', '#4a9ed4', '#f59e0b', '#6bbd8a',
        '#e879a8', '#a78bfa', '#f97316', '#38bdf8', '#34d399'
    ];

    function processCheckIn() {
        let bonus = 0;
        let bonusMessage = null;

        if (Math.random() < XP_BONUS_CHANCE) {
            bonus = Math.floor(Math.random() * (XP_BONUS_MAX - XP_BONUS_MIN + 1)) + XP_BONUS_MIN;
            bonusMessage = BONUS_MESSAGES[Math.floor(Math.random() * BONUS_MESSAGES.length)];
        }

        const totalEarned = XP_BASE + bonus;
        const xpResult = Store.addXP(totalEarned);
        const streakResult = Store.updateStreak();

        return {
            xp: {
                earned: totalEarned,
                base: XP_BASE,
                bonus,
                bonusMessage,
                total: xpResult.total,
                level: xpResult.level,
                leveledUp: xpResult.leveledUp,
                newLevel: xpResult.newLevel
            },
            streak: streakResult,
            praise: PRAISE_WORDS[Math.floor(Math.random() * PRAISE_WORDS.length)]
        };
    }

    function renderStreakBadge(el) {
        if (!el) return;
        const streak = Store.getStreak();
        if (streak.current === 0) {
            el.innerHTML = '';
            return;
        }
        el.innerHTML = `
            <span class="streak-badge">
                <span class="streak-badge__icon">\u{1F525}</span>
                <span class="streak-badge__count">${streak.current}</span>
                <span class="streak-badge__label">day${streak.current !== 1 ? 's' : ''}</span>
            </span>
        `;
    }

    function renderXPBar(el) {
        if (!el) return;
        const xp = Store.getXP();
        const xpInLevel = xp.total % 100;
        const pct = xpInLevel;

        el.innerHTML = `
            <div class="xp-display">
                <div class="xp-display__header">
                    <span class="xp-level-text">Lv. ${xp.level}</span>
                    <span class="xp-amount-text">${xpInLevel}/100 XP</span>
                </div>
                <div class="xp-bar-track">
                    <div class="xp-bar-fill" style="width:${pct}%"></div>
                </div>
            </div>
        `;
    }

    function showCelebration(result, container) {
        if (!container) return;

        createParticles(container);

        if (navigator.vibrate) navigator.vibrate(50);

        if (result.xp.leveledUp) {
            setTimeout(() => showLevelUp(result.xp.newLevel), 800);
        }

        if (result.streak.milestoneHit) {
            const delay = result.xp.leveledUp ? 3500 : 800;
            setTimeout(() => showMilestoneToast(result.streak.milestoneHit), delay);
        }
    }

    function createParticles(container) {
        const count = 15 + Math.floor(Math.random() * 10);
        const types = ['particle--confetti', 'particle--sparkle', 'particle--star'];
        const type = types[Math.floor(Math.random() * types.length)];

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = `particle ${type}`;
            const tx = (Math.random() - 0.5) * 180;
            const ty = -30 - Math.random() * 120;
            p.style.setProperty('--tx', `${tx}px`);
            p.style.setProperty('--ty', `${ty}px`);
            p.style.left = '50%';
            p.style.top = '50%';
            p.style.background = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
            p.style.animationDelay = `${Math.random() * 0.3}s`;
            container.appendChild(p);
            p.addEventListener('animationend', () => p.remove());
        }
    }

    function showLevelUp(level) {
        const modal = document.getElementById('level-up-modal');
        const badge = document.getElementById('level-badge');
        const text = document.getElementById('level-up-text');
        if (!modal || !badge || !text) return;

        badge.textContent = level;
        text.textContent = `Level ${level}!`;
        modal.classList.remove('hidden');

        setTimeout(() => modal.classList.add('hidden'), 3000);
    }

    function showMilestoneToast(days) {
        const existing = document.querySelector('.milestone-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'milestone-toast';
        toast.innerHTML = `\u{1F525} ${days} day streak!`;
        document.body.appendChild(toast);

        toast.addEventListener('animationend', () => toast.remove());
    }

    function getMiniInsight() {
        const entries = Store.getEntries();
        const count = entries.length;

        if (count === 0) return "Ready for your first check-in?";
        if (count === 1) return "\u{1F389} Your first check-in! Keep going — patterns appear fast.";

        const today = Store.getEntriesToday();
        if (count <= 3) {
            const activities = {};
            entries.forEach(e => { activities[e.activity] = (activities[e.activity] || 0) + 1; });
            const top = Object.entries(activities).sort((a, b) => b[1] - a[1])[0];
            const act = CheckIn.ACTIVITIES.find(a => a.id === top[0]);
            return `${count} check-ins so far. Most common: ${act ? act.emoji + ' ' + act.label : top[0]}`;
        }

        if (count <= 9) {
            const byHour = {};
            entries.forEach(e => {
                const h = new Date(e.timestamp).getHours();
                if (!byHour[h]) byHour[h] = [];
                byHour[h].push(e.clarity);
            });
            const hourAvgs = Object.entries(byHour)
                .filter(([, v]) => v.length >= 2)
                .map(([h, v]) => ({ hour: parseInt(h), avg: v.reduce((a, b) => a + b, 0) / v.length }));

            if (hourAvgs.length >= 2) {
                hourAvgs.sort((a, b) => b.avg - a.avg);
                const peak = hourAvgs[0];
                const h12 = peak.hour % 12 || 12;
                const ampm = peak.hour >= 12 ? 'PM' : 'AM';
                return `${count} check-ins! You tend to be clearest around ${h12} ${ampm}.`;
            }
            return `${count} check-ins! A few more and your clearest times will emerge.`;
        }

        const byActivity = {};
        entries.forEach(e => {
            if (!byActivity[e.activity]) byActivity[e.activity] = [];
            byActivity[e.activity].push(e.clarity);
        });
        const overallAvg = entries.reduce((s, e) => s + e.clarity, 0) / count;
        const actAvgs = Object.entries(byActivity)
            .filter(([, v]) => v.length >= 2)
            .map(([id, v]) => {
                const avg = v.reduce((a, b) => a + b, 0) / v.length;
                const act = CheckIn.ACTIVITIES.find(a => a.id === id);
                return { id, avg, diff: avg - overallAvg, label: act?.label || id, emoji: act?.emoji || '' };
            })
            .sort((a, b) => b.diff - a.diff);

        if (actAvgs.length >= 2) {
            const best = actAvgs[0];
            if (best.diff > 0.2) {
                return `${best.emoji} ${best.label} boosts your clarity by +${best.diff.toFixed(1)} points on average.`;
            }
        }

        if (today.length > 0) {
            const todayAvg = today.reduce((s, e) => s + e.clarity, 0) / today.length;
            return `Today's clarity: ${todayAvg.toFixed(1)} avg across ${today.length} check-in${today.length !== 1 ? 's' : ''}.`;
        }

        return `${count} check-ins logged. Check your patterns tab for insights!`;
    }

    return { processCheckIn, renderStreakBadge, renderXPBar, showCelebration, createParticles, getMiniInsight };
})();

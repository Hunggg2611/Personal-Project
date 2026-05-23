const CheckIn = (() => {
    const ACTIVITIES = [
        { id: 'working', emoji: '\u{1F4BB}', label: 'Working' },
        { id: 'studying', emoji: '\u{1F4DA}', label: 'Studying' },
        { id: 'meeting', emoji: '\u{1F465}', label: 'Meeting' },
        { id: 'socializing', emoji: '\u{1F4AC}', label: 'Socializing' },
        { id: 'eating', emoji: '\u{1F37D}️', label: 'Eating' },
        { id: 'resting', emoji: '\u{1F634}', label: 'Resting' },
        { id: 'exercising', emoji: '\u{1F3C3}', label: 'Exercising' },
        { id: 'commuting', emoji: '\u{1F68C}', label: 'Commuting' },
        { id: 'creative', emoji: '\u{1F3A8}', label: 'Creative' },
        { id: 'screen_time', emoji: '\u{1F4F1}', label: 'Screen time' },
        { id: 'outdoors', emoji: '\u{1F33F}', label: 'Outdoors' },
        { id: 'other', emoji: '✦', label: 'Other' }
    ];

    const CLARITY_LABELS = [
        { value: 1, emoji: '\u{1F636}‍\u{1F32B}️', label: 'Very Foggy' },
        { value: 2, emoji: '\u{1F32B}️', label: 'Hazy' },
        { value: 3, emoji: '\u{1F610}', label: 'Neutral' },
        { value: 4, emoji: '☀️', label: 'Clear' },
        { value: 5, emoji: '✨', label: 'Crystal Clear' }
    ];

    let selectedClarity = null;
    let selectedActivity = null;
    let gridExpanded = false;

    function init() {
        renderClarityButtons();
        renderActivityPicker();
        setupNoteToggle();

        const submitBtn = document.getElementById('btn-checkin-submit');
        if (submitBtn) submitBtn.addEventListener('click', handleSubmit);

        const noteInput = document.getElementById('checkin-note');
        if (noteInput) {
            noteInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey && !submitBtn?.disabled) {
                    e.preventDefault();
                    handleSubmit();
                }
            });
        }
    }

    function renderClarityButtons() {
        const container = document.getElementById('clarity-buttons');
        if (!container) return;

        container.innerHTML = CLARITY_LABELS.map(c => `
            <button class="clarity-btn" data-value="${c.value}" aria-label="Clarity ${c.value}: ${c.label}">
                <span class="clarity-btn__emoji">${c.emoji}</span>
                <span class="clarity-btn__label">${c.label}</span>
            </button>
        `).join('');

        container.addEventListener('click', (e) => {
            const btn = e.target.closest('.clarity-btn');
            if (!btn) return;
            selectedClarity = parseInt(btn.dataset.value);
            container.querySelectorAll('.clarity-btn').forEach(b => b.classList.remove('clarity-btn--selected'));
            btn.classList.add('clarity-btn--selected');
            updateSubmitState();
        });
    }

    function renderActivityPicker() {
        const quickPicksEl = document.getElementById('activity-quick-picks');
        const gridEl = document.getElementById('activity-grid');
        const moreBtn = document.getElementById('btn-more-activities');
        const hintEl = document.getElementById('activity-hint');
        if (!quickPicksEl || !gridEl) return;

        const recentIds = Store.getRecentActivities();
        const hasRecent = recentIds.length >= 3;

        if (hintEl) {
            const hour = new Date().getHours();
            let hint = '';
            if (hour >= 6 && hour < 9) hint = 'Morning — starting your day?';
            else if (hour >= 9 && hour < 12) hint = 'Mid-morning — deep in it?';
            else if (hour >= 12 && hour < 14) hint = 'Lunchtime — eating or resting?';
            else if (hour >= 14 && hour < 17) hint = 'Afternoon — how\'s the focus?';
            else if (hour >= 17 && hour < 20) hint = 'Evening — winding down?';
            else if (hour >= 20) hint = 'Night — almost done for today?';
            hintEl.textContent = hint;
        }

        if (hasRecent) {
            const quickIds = recentIds.slice(0, 4);
            const quickActivities = quickIds.map(id => ACTIVITIES.find(a => a.id === id)).filter(Boolean);

            quickPicksEl.innerHTML = quickActivities.map(a => `
                <button class="quick-pick-btn" data-id="${a.id}" aria-label="${a.label}">
                    <span class="quick-pick-btn__emoji">${a.emoji}</span>
                    <span class="quick-pick-btn__label">${a.label}</span>
                </button>
            `).join('');

            quickPicksEl.addEventListener('click', (e) => {
                const btn = e.target.closest('.quick-pick-btn');
                if (!btn) return;
                selectActivity(btn.dataset.id);
                highlightActivity(btn.dataset.id);
            });

            if (moreBtn) {
                moreBtn.classList.remove('hidden');
                moreBtn.addEventListener('click', () => {
                    gridExpanded = !gridExpanded;
                    gridEl.classList.toggle('hidden', !gridExpanded);
                    moreBtn.textContent = gridExpanded ? 'Less activities' : 'More activities...';
                });
            }

            gridEl.classList.add('hidden');
        } else {
            quickPicksEl.innerHTML = '';
            if (moreBtn) moreBtn.classList.add('hidden');
            gridEl.classList.remove('hidden');
        }

        gridEl.innerHTML = ACTIVITIES.map(a => `
            <button class="activity-btn" data-id="${a.id}" aria-label="${a.label}">
                <span class="activity-btn__emoji">${a.emoji}</span>
                <span class="activity-btn__label">${a.label}</span>
            </button>
        `).join('');

        gridEl.addEventListener('click', (e) => {
            const btn = e.target.closest('.activity-btn');
            if (!btn) return;
            selectActivity(btn.dataset.id);
            highlightActivity(btn.dataset.id);
        });
    }

    function selectActivity(id) {
        selectedActivity = id;
        updateSubmitState();
    }

    function highlightActivity(id) {
        document.querySelectorAll('.quick-pick-btn').forEach(b =>
            b.classList.toggle('quick-pick-btn--selected', b.dataset.id === id));
        document.querySelectorAll('.activity-btn').forEach(b =>
            b.classList.toggle('activity-btn--selected', b.dataset.id === id));
    }

    function setupNoteToggle() {
        const toggleBtn = document.getElementById('btn-show-note');
        const container = document.getElementById('note-container');
        if (!toggleBtn || !container) return;

        toggleBtn.addEventListener('click', () => {
            const isOpen = container.classList.contains('note-container--open');
            container.classList.toggle('note-container--open', !isOpen);
            toggleBtn.querySelector('span').textContent = isOpen ? '+' : '−';
            if (!isOpen) {
                document.getElementById('checkin-note')?.focus();
            }
        });
    }

    function updateSubmitState() {
        const btn = document.getElementById('btn-checkin-submit');
        if (btn) btn.disabled = !(selectedClarity && selectedActivity);
    }

    function handleSubmit() {
        if (!selectedClarity || !selectedActivity) return;

        const note = document.getElementById('checkin-note')?.value.trim() || '';
        const result = Rewards.processCheckIn();
        Store.addEntry(selectedClarity, selectedActivity, note, result.xp.earned);
        Notifications.onCheckInComplete();
        showConfirmation(result);
    }

    function showConfirmation(result) {
        const form = document.getElementById('checkin-form');
        const confirm = document.getElementById('checkin-confirmation');

        if (form) form.classList.add('hidden');
        if (confirm) confirm.classList.remove('hidden');

        const activity = ACTIVITIES.find(a => a.id === selectedActivity);
        const clarityLabel = CLARITY_LABELS.find(c => c.value === selectedClarity);

        const praiseEl = document.getElementById('confirm-praise');
        if (praiseEl) praiseEl.textContent = result.praise;

        const xpEl = document.getElementById('confirm-xp');
        if (xpEl) {
            xpEl.textContent = `+${result.xp.earned} XP`;
            xpEl.classList.add('xp-earned');
        }

        const bonusEl = document.getElementById('confirm-bonus');
        if (bonusEl) {
            if (result.xp.bonus > 0) {
                bonusEl.textContent = result.xp.bonusMessage;
                bonusEl.classList.remove('hidden');
                bonusEl.classList.add('bonus-badge');
            } else {
                bonusEl.classList.add('hidden');
            }
        }

        const streakEl = document.getElementById('confirm-streak');
        if (streakEl && result.streak.current > 0) {
            streakEl.innerHTML = `<span style="font-size:1.1rem">\u{1F525}</span> <span style="font-weight:600">${result.streak.current} day${result.streak.current !== 1 ? 's' : ''}</span>`;
        }

        document.getElementById('confirm-clarity').textContent = `${clarityLabel.emoji} ${clarityLabel.label}`;
        document.getElementById('confirm-activity').textContent = `${activity.emoji} ${activity.label}`;

        const insightEl = document.getElementById('confirm-insight');
        if (insightEl) insightEl.textContent = Rewards.getMiniInsight();

        const celebrationContainer = document.getElementById('celebration-container');
        Rewards.showCelebration(result, celebrationContainer);

        Rewards.renderStreakBadge(document.getElementById('streak-badge'));
        Rewards.renderXPBar(document.getElementById('xp-bar'));

        setTimeout(() => resetForm(), 4000);
    }

    function resetForm() {
        selectedClarity = null;
        selectedActivity = null;
        gridExpanded = false;

        document.querySelectorAll('.clarity-btn').forEach(b => b.classList.remove('clarity-btn--selected'));
        document.querySelectorAll('.quick-pick-btn').forEach(b => b.classList.remove('quick-pick-btn--selected'));
        document.querySelectorAll('.activity-btn').forEach(b => b.classList.remove('activity-btn--selected'));

        const noteInput = document.getElementById('checkin-note');
        if (noteInput) noteInput.value = '';

        const noteContainer = document.getElementById('note-container');
        if (noteContainer) noteContainer.classList.remove('note-container--open');
        const noteToggle = document.getElementById('btn-show-note');
        if (noteToggle) noteToggle.querySelector('span').textContent = '+';

        updateSubmitState();

        const form = document.getElementById('checkin-form');
        const confirm = document.getElementById('checkin-confirmation');
        if (form) form.classList.remove('hidden');
        if (confirm) confirm.classList.add('hidden');

        const bonusEl = document.getElementById('confirm-bonus');
        if (bonusEl) bonusEl.classList.remove('bonus-badge');
        const xpEl = document.getElementById('confirm-xp');
        if (xpEl) xpEl.classList.remove('xp-earned');

        renderActivityPicker();
    }

    return { init, resetForm, ACTIVITIES, CLARITY_LABELS };
})();

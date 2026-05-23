const App = (() => {
    const ROUTES = {
        checkin: {
            view: 'view-checkin',
            tab: 'tab-checkin',
            init: () => {
                CheckIn.resetForm();
                Rewards.renderStreakBadge(document.getElementById('streak-badge'));
                Rewards.renderXPBar(document.getElementById('xp-bar'));
                const insightEl = document.getElementById('home-insight');
                if (insightEl) {
                    const insight = Rewards.getMiniInsight();
                    insightEl.innerHTML = `<div class="home-insight">${insight}</div>`;
                }
            }
        },
        patterns: { view: 'view-patterns', tab: 'tab-patterns', init: () => Patterns.render() },
        history: { view: 'view-history', tab: 'tab-history', init: () => renderHistory() },
        settings: { view: 'view-settings', tab: 'tab-settings', init: () => initSettings() }
    };

    let historyLoaded = 0;
    const HISTORY_BATCH = 20;

    function init() {
        initDarkMode();
        CheckIn.init();
        Notifications.init();
        Patterns.init();

        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const route = tab.dataset.route;
                if (route) window.location.hash = '#' + route;
            });
        });

        window.addEventListener('hashchange', () => navigate(getRoute()));
        navigate(getRoute());

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (e) => {
                if (e.data?.type === 'NAVIGATE') {
                    window.location.hash = e.data.hash;
                }
            });
        }

        document.getElementById('btn-dismiss-reminder')?.addEventListener('click', () => {
            Notifications.dismissBanner();
        });

        document.getElementById('level-up-modal')?.addEventListener('click', () => {
            document.getElementById('level-up-modal').classList.add('hidden');
        });
    }

    function getRoute() {
        const hash = window.location.hash.slice(1);
        return ROUTES[hash] ? hash : 'checkin';
    }

    function navigate(route) {
        const config = ROUTES[route];
        if (!config) return;

        Object.values(ROUTES).forEach(r => {
            document.getElementById(r.view)?.classList.add('hidden');
            document.getElementById(r.tab)?.classList.remove('nav-tab--active');
        });

        document.getElementById(config.view)?.classList.remove('hidden');
        document.getElementById(config.tab)?.classList.add('nav-tab--active');

        if (config.init) config.init();
    }

    function initDarkMode() {
        const toggle = document.getElementById('dark-mode-toggle');
        if (!toggle) return;

        toggle.checked = Store.getDarkMode();

        toggle.addEventListener('change', () => {
            const on = toggle.checked;
            Store.setDarkMode(on);
            document.documentElement.classList.toggle('dark', on);
        });
    }

    function renderHistory(reset) {
        const list = document.getElementById('history-list');
        const loadMoreBtn = document.getElementById('btn-load-more');
        if (!list) return;

        if (reset !== false) {
            historyLoaded = 0;
            list.innerHTML = '';
        }

        const entries = Store.getEntries()
            .sort((a, b) => b.timestamp - a.timestamp);

        const batch = entries.slice(historyLoaded, historyLoaded + HISTORY_BATCH);
        historyLoaded += batch.length;

        if (batch.length === 0 && historyLoaded === 0) {
            list.innerHTML = '<p class="text-sm text-sky-400 dark:text-sky-300/60 text-center py-8">No check-ins yet. Take one when you\'re ready.</p>';
            if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
            return;
        }

        let currentDateStr = list.lastElementChild?.dataset.date || '';

        batch.forEach(entry => {
            const d = new Date(entry.timestamp);
            const dateStr = d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

            if (dateStr !== currentDateStr) {
                currentDateStr = dateStr;
                const header = document.createElement('div');
                header.className = 'history-date-header';
                header.textContent = dateStr;
                header.dataset.date = dateStr;
                list.appendChild(header);
            }

            const activity = CheckIn.ACTIVITIES.find(a => a.id === entry.activity);
            const timeStr = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

            const el = document.createElement('div');
            el.className = 'history-entry';
            el.dataset.date = dateStr;
            el.innerHTML = `
                <span class="history-entry__clarity clarity-badge clarity-badge--${entry.clarity}">${entry.clarity}</span>
                <span class="history-entry__activity">${activity?.emoji || '✦'} ${activity?.label || entry.activity}${entry.xpEarned ? ` <span class="history-entry__xp">+${entry.xpEarned} XP</span>` : ''}</span>
                <span class="history-entry__time">${timeStr}</span>
                ${entry.note ? `<span class="history-entry__note">${escapeHtml(entry.note)}</span>` : ''}
            `;
            list.appendChild(el);
        });

        if (loadMoreBtn) {
            loadMoreBtn.classList.toggle('hidden', historyLoaded >= entries.length);
        }
    }

    function initSettings() {
        const settings = Store.getSettings();

        document.querySelectorAll('input[name="reminder-freq"]').forEach(radio => {
            radio.checked = radio.value === settings.reminderFreq;
            radio.addEventListener('change', () => {
                Store.updateSettings({ reminderFreq: radio.value });
                Notifications.updateReminderInterval();
            });
        });

        const notifToggle = document.getElementById('notifications-toggle');
        if (notifToggle) {
            notifToggle.checked = settings.notifications;
            notifToggle.addEventListener('change', () => {
                if (notifToggle.checked) {
                    Notifications.requestPermission(granted => {
                        if (granted) {
                            Store.updateSettings({ notifications: true });
                        } else {
                            notifToggle.checked = false;
                            Store.updateSettings({ notifications: false });
                        }
                    });
                } else {
                    Store.updateSettings({ notifications: false });
                }
            });
        }

        const quietStart = document.getElementById('quiet-start');
        const quietEnd = document.getElementById('quiet-end');
        if (quietStart) {
            quietStart.value = String(settings.quietStart).padStart(2, '0') + ':00';
            quietStart.addEventListener('change', () => {
                Store.updateSettings({ quietStart: parseInt(quietStart.value) });
            });
        }
        if (quietEnd) {
            quietEnd.value = String(settings.quietEnd).padStart(2, '0') + ':00';
            quietEnd.addEventListener('change', () => {
                Store.updateSettings({ quietEnd: parseInt(quietEnd.value) });
            });
        }

        document.getElementById('btn-export-csv')?.addEventListener('click', exportCSV);

        const clearBtn = document.getElementById('btn-clear-data');
        const clearModal = document.getElementById('clear-data-modal');
        const confirmClear = document.getElementById('btn-confirm-clear');
        const cancelClear = document.getElementById('btn-cancel-clear');

        if (clearBtn && clearModal) {
            clearBtn.addEventListener('click', () => clearModal.classList.remove('hidden'));
            cancelClear?.addEventListener('click', () => clearModal.classList.add('hidden'));
            confirmClear?.addEventListener('click', () => {
                Store.clearAllData();
                clearModal.classList.add('hidden');
                window.location.hash = '#checkin';
            });
        }

        document.getElementById('btn-load-more')?.addEventListener('click', () => {
            renderHistory(false);
        });
    }

    function exportCSV() {
        const entries = Store.getEntries().sort((a, b) => a.timestamp - b.timestamp);
        if (entries.length === 0) return;

        const BOM = '﻿';
        const header = 'Date,Time,Clarity,Activity,Note,XP';
        const rows = entries.map(e => {
            const d = new Date(e.timestamp);
            const date = d.toLocaleDateString('en-US');
            const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const activity = CheckIn.ACTIVITIES.find(a => a.id === e.activity)?.label || e.activity;
            const note = `"${(e.note || '').replace(/"/g, '""')}"`;
            return `${date},${time},${e.clarity},${activity},${note},${e.xpEarned || ''}`;
        });

        const csv = BOM + header + '\n' + rows.join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const dateStr = new Date().toISOString().slice(0, 10);
        a.href = url;
        a.download = `clarity-checkins-${dateStr}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', () => App.init());

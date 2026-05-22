const Store = (() => {
    const KEY_FOG = 'fl_fog_entries';
    const KEY_TASK = 'fl_active_task';
    const KEY_COMPLETED = 'fl_completed_tasks';
    const KEY_DARK = 'fl_dark_mode';

    const _get = (key, fallback) => {
        try { return JSON.parse(localStorage.getItem(key)) || fallback; }
        catch { return fallback; }
    };
    const _set = (key, val) => localStorage.setItem(key, JSON.stringify(val));

    const _genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

    const _isToday = (ts) => {
        const d = new Date(ts);
        const now = new Date();
        return d.getFullYear() === now.getFullYear() &&
               d.getMonth() === now.getMonth() &&
               d.getDate() === now.getDate();
    };

    const _isWithinDays = (ts, days) => {
        const cutoff = Date.now() - days * 86400000;
        return ts >= cutoff;
    };

    return {
        getFogEntries: () => _get(KEY_FOG, []),

        addFogEntry: (fogLevel, energyLevel, note) => {
            const entries = _get(KEY_FOG, []);
            const entry = {
                id: _genId(),
                timestamp: Date.now(),
                fogLevel,
                energyLevel,
                note: note || ''
            };
            entries.push(entry);
            _set(KEY_FOG, entries);
            return entry;
        },

        getTodayFogEntries: () => _get(KEY_FOG, []).filter(e => _isToday(e.timestamp)),

        getWeekFogEntries: () => _get(KEY_FOG, []).filter(e => _isWithinDays(e.timestamp, 7)),

        getActiveTask: () => {
            const raw = localStorage.getItem(KEY_TASK);
            if (!raw || raw === 'null') return null;
            try { return JSON.parse(raw); }
            catch { return null; }
        },

        saveActiveTask: (task) => _set(KEY_TASK, task),

        clearActiveTask: () => localStorage.removeItem(KEY_TASK),

        getCompletedTasks: () => _get(KEY_COMPLETED, []),

        addCompletedTask: (task) => {
            const list = _get(KEY_COMPLETED, []);
            list.unshift({
                id: task.id,
                title: task.title,
                stepCount: task.steps.length,
                completedAt: Date.now(),
                category: task.category
            });
            if (list.length > 20) list.length = 20;
            _set(KEY_COMPLETED, list);
        },

        getDarkMode: () => localStorage.getItem(KEY_DARK),
        setDarkMode: (val) => localStorage.setItem(KEY_DARK, String(val))
    };
})();

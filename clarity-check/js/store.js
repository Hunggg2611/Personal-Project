const Store = (() => {
    const KEYS = {
        entries: 'cc_entries',
        settings: 'cc_settings',
        darkMode: 'cc_dark_mode',
        xp: 'cc_xp',
        streak: 'cc_streak',
        recentActivities: 'cc_recent_activities',
        milestones: 'cc_milestones'
    };

    const DEFAULT_SETTINGS = {
        reminderFreq: '2h',
        notifications: false,
        quietStart: 22,
        quietEnd: 7
    };

    const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100];

    function read(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch { return fallback; }
    }

    function write(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function getEntries() {
        return read(KEYS.entries, []);
    }

    function addEntry(clarity, activity, note, xpEarned) {
        const entries = getEntries();
        const entry = {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            timestamp: Date.now(),
            clarity,
            activity,
            note: note || ''
        };
        if (xpEarned) entry.xpEarned = xpEarned;
        entries.push(entry);
        write(KEYS.entries, entries);
        updateRecentActivities(activity);
        return entry;
    }

    function getEntriesToday() {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const startTs = start.getTime();
        return getEntries().filter(e => e.timestamp >= startTs);
    }

    function getEntriesWithinDays(n) {
        const cutoff = Date.now() - n * 86400000;
        return getEntries().filter(e => e.timestamp >= cutoff);
    }

    function getLastEntryTime() {
        const entries = getEntries();
        if (entries.length === 0) return null;
        return Math.max(...entries.map(e => e.timestamp));
    }

    function getSettings() {
        return { ...DEFAULT_SETTINGS, ...read(KEYS.settings, {}) };
    }

    function updateSettings(partial) {
        const current = getSettings();
        write(KEYS.settings, { ...current, ...partial });
    }

    function getXP() {
        return read(KEYS.xp, { total: 0, level: 1 });
    }

    function addXP(amount) {
        const xp = getXP();
        const oldLevel = xp.level;
        xp.total += amount;
        xp.level = Math.floor(xp.total / 100) + 1;
        write(KEYS.xp, xp);
        return {
            total: xp.total,
            level: xp.level,
            leveledUp: xp.level > oldLevel,
            newLevel: xp.level
        };
    }

    function getStreak() {
        return read(KEYS.streak, {
            current: 0,
            lastCheckInDate: null,
            freezeUsedThisWeek: false,
            freezeWeekStart: null,
            longestStreak: 0
        });
    }

    function toDateStr(date) {
        const d = date || new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    function getMondayStr() {
        const d = new Date();
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(d);
        monday.setDate(diff);
        return toDateStr(monday);
    }

    function daysBetween(dateStr1, dateStr2) {
        const d1 = new Date(dateStr1 + 'T00:00:00');
        const d2 = new Date(dateStr2 + 'T00:00:00');
        return Math.round((d2 - d1) / 86400000);
    }

    function updateStreak() {
        const streak = getStreak();
        const today = toDateStr();
        const monday = getMondayStr();

        if (streak.freezeWeekStart !== monday) {
            streak.freezeUsedThisWeek = false;
            streak.freezeWeekStart = monday;
        }

        if (streak.lastCheckInDate === today) {
            write(KEYS.streak, streak);
            return { current: streak.current, isNewDay: false, milestoneHit: null };
        }

        let isNewDay = true;

        if (!streak.lastCheckInDate) {
            streak.current = 1;
        } else {
            const gap = daysBetween(streak.lastCheckInDate, today);
            if (gap === 1) {
                streak.current += 1;
            } else if (gap === 2 && !streak.freezeUsedThisWeek) {
                streak.freezeUsedThisWeek = true;
            } else {
                streak.current = 1;
            }
        }

        streak.lastCheckInDate = today;
        if (streak.current > streak.longestStreak) {
            streak.longestStreak = streak.current;
        }

        let milestoneHit = null;
        const celebrated = getMilestones();
        const milestone = STREAK_MILESTONES.find(m => streak.current >= m && !celebrated.includes(m));
        if (milestone) {
            milestoneHit = milestone;
            addMilestone(milestone);
        }

        write(KEYS.streak, streak);
        return { current: streak.current, isNewDay, milestoneHit };
    }

    function getRecentActivities() {
        return read(KEYS.recentActivities, []);
    }

    function updateRecentActivities(activityId) {
        let recent = getRecentActivities();
        recent = [activityId, ...recent.filter(id => id !== activityId)].slice(0, 6);
        write(KEYS.recentActivities, recent);
    }

    function getMilestones() {
        return read(KEYS.milestones, []);
    }

    function addMilestone(value) {
        const milestones = getMilestones();
        if (!milestones.includes(value)) {
            milestones.push(value);
            write(KEYS.milestones, milestones);
        }
    }

    function clearAllData() {
        Object.values(KEYS).forEach(key => {
            if (key !== KEYS.darkMode) localStorage.removeItem(key);
        });
    }

    function getDarkMode() {
        const stored = localStorage.getItem(KEYS.darkMode);
        if (stored !== null) return stored === 'true';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function setDarkMode(on) {
        localStorage.setItem(KEYS.darkMode, String(on));
    }

    return {
        getEntries, addEntry, getEntriesToday, getEntriesWithinDays,
        getLastEntryTime, getSettings, updateSettings, clearAllData,
        getDarkMode, setDarkMode,
        getXP, addXP, getStreak, updateStreak,
        getRecentActivities, getMilestones, addMilestone
    };
})();

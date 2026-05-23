const Notifications = (() => {
    let intervalId = null;
    let dismissedUntil = 0;

    const GENTLE_REMINDERS = [
        "How's your brain feeling?",
        "Quick clarity check whenever you're ready.",
        "Ready for a quick check-in?",
        "How clear are things right now?",
        "Just a gentle nudge — check in if you'd like."
    ];

    function init() {
        startTicking();
    }

    function startTicking() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(tick, 60000);
        tick();
    }

    function tick() {
        const settings = Store.getSettings();
        const freqMs = parseFreq(settings.reminderFreq);
        if (!freqMs) {
            hideBanner();
            return;
        }

        if (Store.getEntries().length === 0) return;

        const lastTime = Store.getLastEntryTime();
        if (!lastTime) return;

        const elapsed = Date.now() - lastTime;
        if (elapsed < freqMs) {
            hideBanner();
            return;
        }

        if (isQuietHours(settings)) {
            hideBanner();
            return;
        }

        if (Date.now() < dismissedUntil) return;

        showBanner();

        if (settings.notifications) {
            sendBrowserNotification();
        }
    }

    function showBanner() {
        const banner = document.getElementById('reminder-banner');
        if (!banner) return;

        const message = GENTLE_REMINDERS[Math.floor(Math.random() * GENTLE_REMINDERS.length)];
        document.getElementById('reminder-time-text').textContent = message;
        banner.classList.remove('hidden');
    }

    function hideBanner() {
        const banner = document.getElementById('reminder-banner');
        if (banner) banner.classList.add('hidden');
    }

    function dismissBanner() {
        dismissedUntil = Date.now() + 900000;
        hideBanner();
    }

    function onCheckInComplete() {
        dismissedUntil = 0;
        hideBanner();
    }

    function isQuietHours(settings) {
        const hour = new Date().getHours();
        const start = settings.quietStart;
        const end = settings.quietEnd;
        if (start > end) {
            return hour >= start || hour < end;
        }
        return hour >= start && hour < end;
    }

    function sendBrowserNotification() {
        if (Notification.permission !== 'granted') return;

        const body = 'Quick clarity check whenever you\'re ready.';

        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'SHOW_NOTIFICATION',
                title: 'Clarity Check-in',
                body,
                icon: '/assets/icons/icon-192.png'
            });
        } else if ('Notification' in window) {
            new Notification('Clarity Check-in', {
                body,
                icon: '/assets/icons/icon-192.png',
                tag: 'clarity-reminder'
            });
        }
    }

    function requestPermission(callback) {
        if (!('Notification' in window)) {
            callback(false);
            return;
        }

        if (Notification.permission === 'granted') {
            callback(true);
            return;
        }

        if (Notification.permission === 'denied') {
            callback(false);
            return;
        }

        Notification.requestPermission().then(result => {
            callback(result === 'granted');
        });
    }

    function updateReminderInterval() {
        startTicking();
    }

    function parseFreq(freq) {
        const map = { '30m': 1800000, '1h': 3600000, '2h': 7200000, '3h': 10800000 };
        return map[freq] || null;
    }

    function cleanup() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    return { init, dismissBanner, onCheckInComplete, requestPermission, updateReminderInterval, cleanup };
})();

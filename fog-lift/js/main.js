const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

const ROUTES = ['dashboard', 'fog', 'tasks', 'grounding'];

const ENCOURAGEMENTS = [
    "You don't have to feel productive to matter.",
    "Slow is still moving.",
    "The fog lifts. It always does, eventually.",
    "Doing one thing today is enough.",
    "You're not behind. You're where you are.",
    "Rest isn't the opposite of progress.",
    "Your brain works differently, not wrongly.",
    "Small steps still cover ground.",
    "It's okay to need more time than other people.",
    "You showed up. That counts.",
    "Starting is the hardest part. You know that.",
    "Some days, surviving is the achievement.",
    "You don't owe anyone your best today.",
    "Foggy days don't erase clear ones."
];

function getGreeting() {
    const h = new Date().getHours();
    if (h < 5)  return { greeting: 'Still up?', sub: "No judgment. You're here." };
    if (h < 12) return { greeting: 'Good morning', sub: 'Take it one thing at a time.' };
    if (h < 17) return { greeting: 'Good afternoon', sub: 'How are you doing right now?' };
    if (h < 21) return { greeting: 'Good evening', sub: 'Winding down is okay too.' };
    return { greeting: 'Good night', sub: 'Be gentle with yourself tonight.' };
}

function getDailyEncouragement() {
    const dayIndex = Math.floor(Date.now() / 86400000) % ENCOURAGEMENTS.length;
    return ENCOURAGEMENTS[dayIndex];
}

function refreshDashboard() {
    const { greeting, sub } = getGreeting();
    $('#greeting-heading').textContent = greeting;
    $('#greeting-sub').textContent = sub;
    $('#encouragement-text').textContent = getDailyEncouragement();

    const summary = FogTracker.getTodaySummary();
    if (summary.entryCount > 0) {
        $('#fog-avg-display').textContent = summary.avgFog.toFixed(1);
        const fogLabels = ['', 'Clear', 'Light haze', 'Moderate', 'Thick fog', 'Dense fog'];
        $('#fog-avg-label').textContent = fogLabels[Math.round(summary.avgFog)] + ' · ' + summary.entryCount + (summary.entryCount === 1 ? ' entry' : ' entries');
        const energyLabels = ['', 'Drained', 'Low', 'Okay', 'Good', 'Energized'];
        $('#energy-trend').textContent = 'Energy: ' + energyLabels[Math.round(summary.avgEnergy)];
    } else {
        $('#fog-avg-display').textContent = '--';
        $('#fog-avg-label').textContent = 'No entries yet';
        $('#energy-trend').textContent = '';
    }

    const taskSummary = TaskInitiator.getActiveTaskSummary();
    const card = $('#active-task-card');
    if (taskSummary) {
        card.classList.remove('hidden');
        $('#active-task-name').textContent = taskSummary.title;
        $('#active-step-text').textContent = taskSummary.currentStepText;
    } else {
        card.classList.add('hidden');
    }
}

let currentCleanup = null;

function navigate(route) {
    if (!ROUTES.includes(route)) route = 'dashboard';

    if (currentCleanup) {
        currentCleanup();
        currentCleanup = null;
    }

    ROUTES.forEach(r => {
        const view = $(`#view-${r}`);
        if (view) {
            const isTarget = r === route;
            view.classList.toggle('hidden', !isTarget);
            if (isTarget) {
                view.classList.remove('view-enter');
                void view.offsetWidth;
                view.classList.add('view-enter');
            }
        }
    });

    $$('.nav-tab').forEach(tab => {
        const isActive = tab.dataset.route === route;
        tab.classList.toggle('nav-tab--active', isActive);
        tab.setAttribute('aria-current', isActive ? 'page' : 'false');
    });

    if (location.hash !== `#${route}`) {
        history.replaceState(null, '', `#${route}`);
    }

    if (route === 'dashboard') refreshDashboard();
    if (route === 'fog') { FogTracker.renderTimeline(); FogTracker.renderChart(); FogTracker.renderInsights(); }
    if (route === 'tasks') TaskInitiator.renderActiveTask();
    if (route === 'grounding') {
        currentCleanup = Grounding.getCleanup();
    }
}

function initDarkMode() {
    const toggle = (e) => {
        e.preventDefault();
        const isDark = document.documentElement.classList.toggle('dark');
        Store.setDarkMode(isDark);
    };
    $('#btn-dark-mode')?.addEventListener('click', toggle);
    $('#btn-dark-mode-mobile')?.addEventListener('click', toggle);
}

function initNav() {
    $$('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => navigate(tab.dataset.route));
    });
}

function initQuickActions() {
    $$('.quick-action').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            if (action === 'log-feeling') navigate('fog');
            if (action === 'start-task') navigate('tasks');
            if (action === 'grounding') navigate('grounding');
        });
    });

    $('#btn-continue-task')?.addEventListener('click', () => navigate('tasks'));
}

function init() {
    initDarkMode();
    initNav();
    initQuickActions();
    FogTracker.init();
    TaskInitiator.init();
    Grounding.init();

    const initialRoute = location.hash.replace('#', '') || 'dashboard';
    navigate(initialRoute);

    window.addEventListener('hashchange', () => {
        const route = location.hash.replace('#', '') || 'dashboard';
        navigate(route);
    });
}

document.addEventListener('DOMContentLoaded', init);

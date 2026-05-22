const TaskInitiator = (() => {

    const TEMPLATES = {
        email: {
            keywords: ['email', 'reply', 'respond', 'message', 'write back', 'send', 'inbox'],
            steps: () => [
                'Open the email or message you need to respond to',
                'Read it once, just to take it in — don\'t compose yet',
                'Write a rough draft — it doesn\'t need to be perfect',
                'Read it back once and hit send'
            ]
        },
        cleaning: {
            keywords: ['clean', 'tidy', 'dishes', 'laundry', 'vacuum', 'sweep', 'mop', 'organize', 'declutter', 'kitchen', 'bathroom', 'room'],
            steps: () => [
                'Go to the space and just stand there for a moment',
                'Pick one small area — just one surface or corner',
                'Handle 5 items: put away, toss, or leave',
                'If you want to keep going, pick another small area'
            ]
        },
        studying: {
            keywords: ['study', 'read', 'homework', 'assignment', 'learn', 'review', 'exam', 'test', 'chapter', 'notes', 'textbook', 'lecture'],
            steps: () => [
                'Get your materials in front of you — just that',
                'Open to the right page or document',
                'Read or review just the first section (5 minutes max)',
                'Write down one thing you understood',
                'Decide if you want to continue or take a break'
            ]
        },
        coding: {
            keywords: ['code', 'coding', 'program', 'debug', 'fix bug', 'implement', 'feature', 'pull request', 'commit', 'deploy', 'build'],
            steps: () => [
                'Open your editor and the relevant file',
                'Read through the area you need to change',
                'Make the smallest possible change that moves forward',
                'Test that one change',
                'Commit or save your progress'
            ]
        },
        errands: {
            keywords: ['errand', 'grocery', 'shopping', 'store', 'pick up', 'drop off', 'appointment', 'go to', 'buy', 'return'],
            steps: () => [
                'Write down exactly what you need to get or do',
                'Get your keys, wallet, and anything you need to bring',
                'Get to the car or front door — that\'s the hard part',
                'Do the one thing, then come back'
            ]
        },
        phone_call: {
            keywords: ['call', 'phone', 'ring', 'dial', 'schedule', 'appointment', 'cancel', 'reschedule'],
            steps: () => [
                'Find the phone number you need',
                'Write down what you want to say — just a few bullet points',
                'Dial the number (you can do this)',
                'Say what you need to say — your notes are right there'
            ]
        },
        cooking: {
            keywords: ['cook', 'meal', 'dinner', 'lunch', 'breakfast', 'recipe', 'food', 'prepare'],
            steps: () => [
                'Decide what you\'re making — keep it simple',
                'Get out just the ingredients you need',
                'Start the first step of prep (chop, measure, or preheat)',
                'Follow through one step at a time'
            ]
        },
        exercise: {
            keywords: ['exercise', 'workout', 'run', 'walk', 'gym', 'stretch', 'yoga', 'move'],
            steps: () => [
                'Put on clothes you can move in',
                'Stand up and stretch for 30 seconds',
                'Start with just 5 minutes of movement',
                'Check in — want to keep going or is that enough?'
            ]
        },
        writing: {
            keywords: ['write', 'essay', 'report', 'document', 'draft', 'paper', 'article', 'blog'],
            steps: () => [
                'Open a blank document',
                'Write one sentence about what this is about — ugly is fine',
                'Write 3 bullet points of what you want to cover',
                'Expand one bullet into a paragraph',
                'Keep going or save and come back later'
            ]
        }
    };

    const GENERIC_STEPS = () => [
        'Take a breath. You\'re going to figure this out',
        'What\'s the very first physical action? Do just that',
        'Now do the next small thing',
        'Check in: are you making progress? Good enough for now?'
    ];

    const STEP_FEEDBACK = [
        "Nice. Next one whenever you're ready.",
        "One down. Take your time with the next.",
        "Good. You're moving.",
        "Done. No rush on the next one.",
        "Check. Keep going at your pace."
    ];

    function breakDown(description) {
        const lower = description.toLowerCase().trim();
        let matched = null;

        for (const [category, template] of Object.entries(TEMPLATES)) {
            const score = template.keywords.filter(kw => lower.includes(kw)).length;
            if (score > 0 && (!matched || score > matched.score)) {
                matched = { category, template, score };
            }
        }

        const steps = matched ? matched.template.steps() : GENERIC_STEPS();

        return {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            title: description,
            steps: steps.map(text => ({ text, done: false })),
            currentStep: 0,
            category: matched ? matched.category : 'generic',
            createdAt: Date.now()
        };
    }

    function init() {
        const input = document.getElementById('task-input');
        const breakBtn = document.getElementById('btn-break-down');
        const setAsideBtn = document.getElementById('btn-set-aside');
        const newTaskBtn = document.getElementById('btn-new-task');

        if (input && breakBtn) {
            input.addEventListener('input', () => {
                breakBtn.disabled = !input.value.trim();
            });

            breakBtn.addEventListener('click', () => {
                const text = input.value.trim();
                if (!text) return;
                const task = breakDown(text);
                Store.saveActiveTask(task);
                input.value = '';
                breakBtn.disabled = true;
                sessionStorage.removeItem('fl_draft_task');
                renderActiveTask();
            });

            const draft = sessionStorage.getItem('fl_draft_task');
            if (draft) {
                input.value = draft;
                breakBtn.disabled = !draft.trim();
            }

            input.addEventListener('blur', () => {
                if (input.value.trim()) {
                    sessionStorage.setItem('fl_draft_task', input.value);
                } else {
                    sessionStorage.removeItem('fl_draft_task');
                }
            });
        }

        if (setAsideBtn) {
            setAsideBtn.addEventListener('click', () => {
                Store.clearActiveTask();
                renderActiveTask();
            });
        }

        if (newTaskBtn) {
            newTaskBtn.addEventListener('click', () => {
                renderActiveTask();
            });
        }
    }

    function renderActiveTask() {
        const inputCard = document.getElementById('task-input-card');
        const activeCard = document.getElementById('task-active-card');
        const completeMsg = document.getElementById('task-complete-msg');
        const currentStepEl = document.getElementById('task-current-step');
        const stepsList = document.getElementById('task-steps-list');
        const feedbackEl = document.getElementById('step-feedback');

        const task = Store.getActiveTask();

        renderCompletedTasks();

        if (!task) {
            if (inputCard) inputCard.classList.remove('hidden');
            if (activeCard) activeCard.classList.add('hidden');
            return;
        }

        if (inputCard) inputCard.classList.add('hidden');
        if (activeCard) activeCard.classList.remove('hidden');

        const allDone = task.steps.every(s => s.done);

        document.getElementById('task-active-title').textContent = task.title;
        const doneCount = task.steps.filter(s => s.done).length;
        document.getElementById('task-active-progress').textContent = `${doneCount} of ${task.steps.length} steps`;

        if (allDone) {
            if (currentStepEl) currentStepEl.classList.add('hidden');
            if (stepsList) stepsList.classList.add('hidden');
            if (completeMsg) completeMsg.classList.remove('hidden');
            if (feedbackEl) feedbackEl.classList.add('hidden');

            Store.addCompletedTask(task);
            Store.clearActiveTask();
            renderCompletedTasks();
            return;
        }

        if (completeMsg) completeMsg.classList.add('hidden');
        if (currentStepEl) currentStepEl.classList.remove('hidden');
        if (stepsList) stepsList.classList.remove('hidden');

        const nextUndone = task.steps.findIndex(s => !s.done);
        document.getElementById('task-current-step-text').textContent = task.steps[nextUndone].text;

        if (stepsList) {
            stepsList.innerHTML = task.steps.map((step, i) => `
                <div class="task-step ${step.done ? 'task-step--done' : ''}" data-index="${i}">
                    <button class="task-step__check" aria-label="${step.done ? 'Completed' : 'Mark complete'}">
                        ${step.done ? '<svg class="w-3 h-3 text-white dark:text-sage-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>' : ''}
                    </button>
                    <span class="task-step__text">${escapeHtml(step.text)}</span>
                </div>
            `).join('');

            stepsList.querySelectorAll('.task-step__check').forEach(btn => {
                btn.addEventListener('click', () => {
                    const stepEl = btn.closest('.task-step');
                    const idx = parseInt(stepEl.dataset.index);
                    if (task.steps[idx].done) return;

                    task.steps[idx].done = true;
                    task.currentStep = task.steps.findIndex(s => !s.done);
                    if (task.currentStep === -1) task.currentStep = task.steps.length;
                    Store.saveActiveTask(task);

                    if (feedbackEl) {
                        const msg = STEP_FEEDBACK[Math.floor(Math.random() * STEP_FEEDBACK.length)];
                        feedbackEl.textContent = msg;
                        feedbackEl.classList.remove('hidden', 'step-feedback');
                        void feedbackEl.offsetWidth;
                        feedbackEl.classList.add('step-feedback');
                        feedbackEl.classList.remove('hidden');
                    }

                    renderActiveTask();
                });
            });
        }
    }

    function renderCompletedTasks() {
        const section = document.getElementById('completed-tasks-section');
        const list = document.getElementById('completed-tasks-list');
        if (!section || !list) return;

        const completed = Store.getCompletedTasks();
        if (completed.length === 0) {
            section.classList.add('hidden');
            return;
        }

        section.classList.remove('hidden');
        list.innerHTML = completed.slice(0, 5).map(t => {
            const ago = formatTimeAgo(t.completedAt);
            return `
                <div class="flex items-center gap-3 py-2 px-3 rounded-lg bg-sage-50 dark:bg-sage-800/50">
                    <svg class="w-4 h-4 text-sage-400 dark:text-sage-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span class="text-sm flex-1">${escapeHtml(t.title)}</span>
                    <span class="text-xs text-sage-400 dark:text-sage-300">${ago}</span>
                </div>
            `;
        }).join('');
    }

    function formatTimeAgo(ts) {
        const diff = Date.now() - ts;
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        const days = Math.floor(hrs / 24);
        return `${days}d ago`;
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function getActiveTaskSummary() {
        const task = Store.getActiveTask();
        if (!task) return null;
        const nextUndone = task.steps.findIndex(s => !s.done);
        if (nextUndone === -1) return null;
        return {
            title: task.title,
            currentStepText: task.steps[nextUndone].text,
            progress: `${task.steps.filter(s => s.done).length}/${task.steps.length}`
        };
    }

    return { init, renderActiveTask, getActiveTaskSummary };
})();

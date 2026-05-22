const Grounding = (() => {
    const EXERCISES = [
        {
            id: '54321-sensory',
            title: '5-4-3-2-1 Sensory',
            icon: '\u{1F590}',
            description: 'Ground yourself through your senses, one at a time.',
            steps: [
                'Look around. Name 5 things you can see right now.',
                'Notice 4 things you can touch. Feel their texture.',
                'Listen. What are 3 sounds you can hear?',
                'What are 2 things you can smell? Lean in if you need to.',
                'What is 1 thing you can taste right now?',
                'Take a slow breath. You\'re here.'
            ],
            type: 'stepped'
        },
        {
            id: 'box-breathing',
            title: 'Box Breathing',
            icon: '\u{1FAC1}',
            description: 'A simple breathing pattern. Follow the visual guide.',
            steps: [
                'Get comfortable. Sit or stand — whatever works.',
                'We\'ll breathe in a box pattern: in, hold, out, hold. Each for 4 counts.',
                '__BREATHING__',
                'Nice. Stay with that feeling for a moment.'
            ],
            type: 'breathing'
        },
        {
            id: 'body-scan',
            title: 'Body Scan',
            icon: '\u{1F9D8}',
            description: 'Check in with your body, one area at a time.',
            steps: [
                'Close your eyes if that feels okay. Otherwise, soften your gaze.',
                'Notice your feet. Are they tense? Warm? Cold? Just notice.',
                'Move up to your legs. Any tightness or heaviness?',
                'Notice your stomach and chest. Are you holding any tension?',
                'Check your shoulders and neck. Let them soften if you can.',
                'Notice your face — jaw, forehead, eyes. Let them relax.',
                'Take a full breath. Feel your whole body at once.'
            ],
            type: 'stepped'
        },
        {
            id: 'notice-3',
            title: 'Notice 3 Things',
            icon: '\u{1F440}',
            description: 'The simplest grounding exercise. Just notice.',
            steps: [
                'Pause whatever you were doing.',
                'Look around and find 3 things that are a color you like.',
                'For each one, just look at it for a few seconds.',
                'That\'s it. You\'re here now.'
            ],
            type: 'stepped'
        },
        {
            id: 'gentle-movement',
            title: 'Gentle Movement',
            icon: '\u{1F30A}',
            description: 'Small movements to get back into your body.',
            steps: [
                'Stand up if you can, or sit upright.',
                'Roll your shoulders slowly — backward, 3 times.',
                'Turn your head gently side to side, like you\'re saying no.',
                'Stretch your arms overhead. Reach, then let them fall.',
                'Shake out your hands for 10 seconds. Let them be loose.',
                'Take one deep breath. You moved. That counts.'
            ],
            type: 'stepped'
        },
        {
            id: 'cold-water',
            title: 'Cold Water Reset',
            icon: '\u{1F4A7}',
            description: 'A physical reset when fog feels very thick.',
            steps: [
                'Go to a sink or grab a glass of cold water.',
                'Run cold water over your wrists for 15-20 seconds.',
                'Or: hold a cold glass against your cheeks or forehead.',
                'Notice the sensation. Let the cold be the only thing you focus on.',
                'Dry off. Take a breath. How do you feel now?'
            ],
            type: 'stepped'
        }
    ];

    let currentExercise = null;
    let currentStep = 0;
    let breathingInterval = null;

    const BREATH_PHASES = [
        { text: 'Breathe in...', duration: 4000 },
        { text: 'Hold...', duration: 4000 },
        { text: 'Breathe out...', duration: 4000 },
        { text: 'Hold...', duration: 4000 }
    ];

    function init() {
        renderLibrary();

        document.getElementById('btn-exit-exercise')?.addEventListener('click', exitExercise);
        document.getElementById('btn-exercise-next')?.addEventListener('click', nextStep);
        document.getElementById('btn-exercise-done')?.addEventListener('click', exitExercise);
    }

    function renderLibrary() {
        const container = document.getElementById('exercise-library');
        if (!container) return;

        container.innerHTML = EXERCISES.map(ex => `
            <button class="exercise-card" data-exercise="${ex.id}" aria-label="${ex.title}">
                <span class="exercise-card__icon">${ex.icon}</span>
                <div class="exercise-card__info">
                    <p class="exercise-card__title">${ex.title}</p>
                    <p class="exercise-card__desc">${ex.description}</p>
                </div>
            </button>
        `).join('');

        container.addEventListener('click', (e) => {
            const card = e.target.closest('.exercise-card');
            if (!card) return;
            const ex = EXERCISES.find(x => x.id === card.dataset.exercise);
            if (ex) startExercise(ex);
        });
    }

    function startExercise(exercise) {
        currentExercise = exercise;
        currentStep = 0;

        document.getElementById('exercise-library')?.classList.add('hidden');
        document.getElementById('exercise-active')?.classList.remove('hidden');

        document.getElementById('exercise-title').textContent = exercise.title;
        document.getElementById('exercise-description').textContent = exercise.description;

        showStep();
    }

    function showStep() {
        const stepText = currentExercise.steps[currentStep];
        const stepDisplay = document.getElementById('exercise-step-display');
        const breathingAnim = document.getElementById('breathing-animation');
        const nextBtn = document.getElementById('btn-exercise-next');
        const completeDiv = document.getElementById('exercise-complete');
        const counter = document.getElementById('exercise-step-counter');

        stopBreathing();

        if (stepText === '__BREATHING__') {
            stepDisplay.classList.add('hidden');
            breathingAnim.classList.remove('hidden');
            nextBtn.textContent = "I'm done breathing";
            startBreathing();
        } else {
            stepDisplay.classList.remove('hidden');
            breathingAnim.classList.add('hidden');
            document.getElementById('exercise-step-text').textContent = stepText;
            nextBtn.textContent = 'Next';
        }

        const isLast = currentStep === currentExercise.steps.length - 1;
        if (isLast) {
            nextBtn.classList.add('hidden');
            completeDiv.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            completeDiv.classList.add('hidden');
        }

        const totalSteps = currentExercise.steps.filter(s => s !== '__BREATHING__').length;
        const currentDisplay = currentExercise.steps.slice(0, currentStep + 1).filter(s => s !== '__BREATHING__').length;
        counter.textContent = `Step ${currentDisplay} of ${totalSteps}`;
    }

    function nextStep() {
        if (!currentExercise) return;
        if (currentStep < currentExercise.steps.length - 1) {
            currentStep++;
            showStep();
        }
    }

    function startBreathing() {
        let phase = 0;
        const instruction = document.getElementById('breathing-instruction');
        if (instruction) instruction.textContent = BREATH_PHASES[0].text;

        breathingInterval = setInterval(() => {
            phase = (phase + 1) % BREATH_PHASES.length;
            if (instruction) instruction.textContent = BREATH_PHASES[phase].text;
        }, 4000);
    }

    function stopBreathing() {
        if (breathingInterval) {
            clearInterval(breathingInterval);
            breathingInterval = null;
        }
    }

    function exitExercise() {
        stopBreathing();
        currentExercise = null;
        currentStep = 0;

        document.getElementById('exercise-active')?.classList.add('hidden');
        document.getElementById('exercise-library')?.classList.remove('hidden');

        document.getElementById('exercise-step-display')?.classList.remove('hidden');
        document.getElementById('breathing-animation')?.classList.add('hidden');
        document.getElementById('exercise-complete')?.classList.add('hidden');
        document.getElementById('btn-exercise-next')?.classList.remove('hidden');
    }

    function getCleanup() {
        return () => stopBreathing();
    }

    return { init, getCleanup, EXERCISES };
})();

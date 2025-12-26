$(function () {
    // Update copyright year
    $('#current-year').html(new Date().getFullYear());
});

// Quiz Data
const questions = [
    {
        id: 'intakeMethod',
        question: "How does new work typically enter your team’s workflow?",
        options: [
            { text: "Requests come from everywhere (Slack, Email, Hallway) - it's chaos.", value: "CHAOS", score: 0 },
            { text: "We have a form, but people often ignore it.", value: "IGNORED_FORM", score: 5 },
            { text: "Strict policy: No ticket, no work.", value: "STRICT_POLICY", score: 10 }
        ]
    },
    {
        id: 'visibilityStatus',
        question: "If you needed to know the status of a critical project right now, how would you find it?",
        options: [
            { text: "I'd have to ask someone.", value: "ASK_SOMEONE", score: 0 },
            { text: "I'd check a spreadsheet (that might be outdated).", value: "SPREADSHEET", score: 5 },
            { text: "I'd check a real-time dashboard.", value: "DASHBOARD", score: 10 }
        ]
    },
    {
        id: 'decisionRecording',
        question: "When a major decision is made, where is it recorded?",
        options: [
            { text: "Memory or Chat threads.", value: "MEMORY", score: 0 },
            { text: "Meeting Minutes.", value: "MINUTES", score: 5 },
            { text: "A System of Record (linked to the work).", value: "SYSTEM", score: 10 }
        ]
    },
    {
        id: 'searchTimePerWeek',
        question: "How much time does your team spend looking for info vs. doing work?",
        options: [
            { text: "10+ hours/week", value: "HIGH", score: 0 },
            { text: "2-5 hours/week", value: "MEDIUM", score: 5 },
            { text: "Very little (info is contextual).", value: "LOW", score: 10 }
        ]
    },
    {
        id: 'contextSwitchFreq',
        question: "How often do you manually copy-paste data between tools?",
        options: [
            { text: "Constantly", value: "HIGH", score: 0 },
            { text: "Monthly/Weekly reporting", value: "MEDIUM", score: 5 },
            { text: "Never (It's automated)", value: "NONE", score: 10 }
        ]
    },
    {
        id: 'zombieProjectStatus',
        question: "Do you have projects that consume resources but never finish?",
        options: [
            { text: "Yes, too many.", value: "YES", score: 0 },
            { text: "Sometimes.", value: "SOMETIMES", score: 5 },
            { text: "No, we kill bad projects fast.", value: "NO", score: 10 }
        ]
    },
    {
        id: 'onboardingSpeed',
        question: "How easy is it for a new hire to understand project history?",
        options: [
            { text: "Impossible (Oral history only).", value: "IMPOSSIBLE", score: 0 },
            { text: "Difficult (They need to read tons of docs).", value: "DIFFICULT", score: 5 },
            { text: "Easy (History lives with the work).", value: "EASY", score: 10 }
        ]
    },
    {
        id: 'toolUnification',
        question: "Does every department use a different tool to track work?",
        options: [
            { text: "Yes, we are siloed.", value: "SILOED", score: 0 },
            { text: "Mixed usage.", value: "MIXED", score: 5 },
            { text: "No, we have a Unified System.", value: "UNIFIED", score: 10 }
        ]
    }
];

// State
let currentQuestionIndex = 0;
let quizAnswers = {};
let totalScore = 0;

$(document).ready(function() {
    // Check if the quiz container exists
    if ($('#friction-score-quiz').length) {
        startQuiz();
    }
});

function startQuiz() {
    currentQuestionIndex = 0;
    quizAnswers = {};
    totalScore = 0;
    renderQuestion();
}

function renderQuestion() {
    const question = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    let html = `
        <div class="quiz-container bg-white p-4 p-md-5 rounded shadow-sm text-center">
            <div class="progress mb-4" style="height: 10px;">
                <div class="progress-bar bg-primary" role="progressbar" style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <h3 class="mb-4 fw-bold">${question.question}</h3>
            <div class="d-grid gap-3 col-lg-8 mx-auto">
    `;

    question.options.forEach((option, index) => {
        html += `
            <button class="btn btn-outline-primary btn-lg quiz-option text-start" data-value="${option.value}" data-score="${option.score}">
                ${String.fromCharCode(65 + index)}. ${option.text}
            </button>
        `;
    });

    html += `</div></div>`;

    $('#friction-score-quiz').html(html);

    // Bind click events
    $('.quiz-option').click(function() {
        const value = $(this).data('value');
        const score = $(this).data('score');
        handleAnswer(question.id, value, score);
    });
}

function handleAnswer(questionId, value, score) {
    quizAnswers[questionId] = value;
    totalScore += score;

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        renderLeadForm();
    }
}

function renderLeadForm() {
    const progress = 100;
    let html = `
        <div class="quiz-container bg-white p-4 p-md-5 rounded shadow-sm">
            <div class="progress mb-4" style="height: 10px;">
                <div class="progress-bar bg-primary" role="progressbar" style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <h3 class="mb-4 fw-bold text-center">Your Friction Score is ready.</h3>
            <p class="text-center mb-4">Enter your details to reveal your score and get your customized report.</p>

            <form id="quiz-lead-form" class="row g-3 needs-validation" novalidate>
                <div class="col-12" id="quiz-email-catch-div" style="display:none;">
                    <label for="quiz-email-catch" class="form-label">Email Catch</label>
                    <input type="email" class="form-control" name="quiz-email-catch" id="quiz-email-catch" />
                </div>
                <div class="col-md-6">
                    <label for="leadFirstName" class="form-label">First Name <span class="text-required">*</span></label>
                    <input type="text" class="form-control" id="leadFirstName" required>
                    <div class="invalid-feedback">Please provide your first name.</div>
                </div>
                <div class="col-md-6">
                    <label for="leadEmail" class="form-label">Work Email <span class="text-required">*</span></label>
                    <input type="email" class="form-control" id="leadEmail" required>
                    <div class="invalid-feedback">Please provide a valid work email.</div>
                    <div class="form-text text-muted small mt-1">
                        We do not sell your information to third parties, and you are not signing up for spam.
                    </div>
                </div>
                <div class="col-12">
                    <label for="leadJobTitle" class="form-label">Job Title <span class="text-required">*</span></label>
                    <input type="text" class="form-control" id="leadJobTitle" required>
                    <div class="invalid-feedback">Please provide your job title.</div>
                </div>
                <div class="col-12 mt-4 text-center">
                    <button type="submit" class="btn btn-primary btn-xl rounded-pill" id="btn-reveal-results">
                        Reveal My Score
                    </button>
                </div>
            </form>
        </div>
    `;

    $('#friction-score-quiz').html(html);

    // Validation and Submission
    $('#quiz-lead-form').submit(function(event) {
        event.preventDefault();
        event.stopPropagation();

        const form = this;
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        // Honeypot check
        if ($('#quiz-email-catch').val()) {
            return;
        }

        const btn = $('#btn-reveal-results');
        btn.prop('disabled', true).text('Calculating...');

        const leadData = {
            leadFirstName: $('#leadFirstName').val(),
            leadEmail: $('#leadEmail').val(),
            leadJobTitle: $('#leadJobTitle').val()
        };

        processSubmission(leadData);
    });
}

function processSubmission(leadData) {
    // Normalize Score to 0-100 scale
    const normalizedScore = Math.round((totalScore / 80) * 100);

    let frictionTier = "";
    if (normalizedScore <= 40) {
        frictionTier = "HIGH_FRICTION";
    } else if (normalizedScore <= 70) {
        frictionTier = "DISCONNECTED";
    } else {
        frictionTier = "OPTIMIZED";
    }

    // Construct Payload
    const payload = {
        ...quizAnswers,
        ...leadData,
        calculatedFrictionScore: normalizedScore,
        frictionTier: frictionTier,

        // Map to existing n8n standard fields for backward compatibility/ease of use
        firstname: leadData.leadFirstName,
        emailAddress: leadData.leadEmail,
        jobTitle: leadData.leadJobTitle,
        summary: `Friction Score Assessment: ${normalizedScore}/100 (${frictionTier})`
    };

    // AJAX Submission
    $.ajax({
        url: "https://hnet.sylentt.com/webhook/submit-ticket",
        type: "POST",
        contentType: 'application/json',
        headers: {
            'website-api-key': '3pPUzAwTUdGaUxXSTROVE10TjJWaE5U'
        },
        data: JSON.stringify(payload),
        success: function(response) {
            showResults(frictionTier, normalizedScore);
        },
        error: function(xhr, status, error) {
            console.error("Submission failed:", error);
            // Show results anyway so user isn't blocked, but maybe log internally
            showResults(frictionTier, normalizedScore);
        }
    });
}

function showResults(tier, score) {
    let headline = "";
    let subheadline = "";
    let colorClass = "";

    if (tier === "HIGH_FRICTION") {
        headline = "Your Organization is Running on Heroics.";
        subheadline = "You are relying on individual effort to overcome systemic chaos. This is not scalable.";
        colorClass = "text-danger";
    } else if (tier === "DISCONNECTED") {
        headline = "You Have Tools, But Not Flow.";
        subheadline = "Your teams are working hard, but friction in handoffs and visibility is slowing you down.";
        colorClass = "text-warning";
    } else {
        headline = "You Are Architected for Speed.";
        subheadline = "Your operations are mature. You are ready for advanced automation and scale.";
        colorClass = "text-success";
    }

    const html = `
        <div class="quiz-container bg-white p-4 p-md-5 rounded shadow-sm text-center">
            <h2 class="display-1 fw-bold ${colorClass}">${score}/100</h2>
            <h3 class="mb-3 fw-bold">${headline}</h3>
            <p class="lead mb-5">${subheadline}</p>

            <hr class="my-4">

            <h4 class="mb-3">Stop losing time to friction.</h4>
            <p class="mb-4">Let's discuss a roadmap to fix this.</p>

            <p class="text-muted small mb-4">We've emailed you the full report. Please check your spam folder if you don't see it.</p>

            <a href="https://calendly.com/nic-sylentt/30min" target="_blank" class="btn btn-primary btn-xl rounded-pill">
                Book your free discovery call
            </a>
        </div>
    `;

    $('#friction-score-quiz').html(html);

    // Scroll to results
    document.getElementById('friction-score-quiz').scrollIntoView({ behavior: 'smooth' });
}

// Navbar Behavior: Auto-collapse on link click and click outside
document.addEventListener('DOMContentLoaded', function() {
    const navbarCollapse = document.getElementById('navbarResponsive');
    const menuToggle = document.querySelector('.navbar-toggler');

    if (navbarCollapse && menuToggle) {
        // Collapse on link click
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    menuToggle.click();
                }
            });
        });

        // Collapse on click outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navbarCollapse.contains(event.target);
            const isClickOnToggler = menuToggle.contains(event.target);

            if (navbarCollapse.classList.contains('show') && !isClickInsideMenu && !isClickOnToggler) {
                menuToggle.click();
            }
        });
    }
});

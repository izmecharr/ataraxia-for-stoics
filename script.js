// Global variables for breathing exercise
let breathingInterval;
let breathingActive = false;
let breathingPhase = 'inhale';
let breathingCycle = 0;

// Motivational quotes for breathing exercise
const motivationalQuotes = [
    "When you arise in the morning, think of what a precious privilege it is to be alive - to breathe, to think, to enjoy, to love. — Marcus Aurelius",
    "You have power over your mind - not outside events. Realize this, and you will find strength. — Marcus Aurelius",
    "It's not what happens to you, but how you react to it that matters. — Epictetus",
    "Every new beginning comes from some other beginning's end. — Seneca",
    "The best revenge is not to be like your enemy. — Marcus Aurelius",
    "No one can hurt you without your permission. — Epictetus",
    "Waste no more time arguing what a good person should be. Be one. — Marcus Aurelius",
    "Don't explain your philosophy. Embody it. — Epictetus"
];

// Scenario data for Sage Simulator
const scenarios = {
    workplace: {
        title: "Workplace Conflict",
        description: "Your colleague takes credit for your idea in a meeting with senior management. You feel angry and want to confront them publicly. Several people witnessed the incident, but no one spoke up. This could affect your upcoming promotion review.",
        response: {
            immediate: "The sage would pause before reacting, recognizing that anger is a judgment about the situation, not the situation itself. They would focus on what they can control—their own response—rather than what they cannot control—their colleague's behavior or others' reactions.",
            action: "The sage would approach the colleague privately, speaking calmly and factually: 'I noticed my idea was presented without attribution in the meeting. I'd like to discuss how we can properly acknowledge contributions going forward.' This addresses the issue without public confrontation or emotional reaction.",
            principle: "Dichotomy of Control - Focus energy only on what you can influence: your response, your future actions, and clear communication.",
            perspective: "The sage would view this as an opportunity to practice virtue (justice and self-discipline) and to clarify professional boundaries. They understand that their character matters more than external recognition, while still taking appropriate action to address the situation."
        }
    },
    relationship: {
        title: "Painful Breakup",
        description: "Your partner of three years has ended the relationship unexpectedly. You feel devastated, angry, and want to either win them back or make them feel the pain you're experiencing. Friends are taking sides, and you're tempted to share private details about the relationship.",
        response: {
            immediate: "The sage would acknowledge the pain without being overwhelmed by it, understanding that suffering comes from attachment to outcomes beyond our control. They would resist the urge to lash out or cling to what has ended.",
            action: "The sage would focus on their own healing and growth, perhaps writing in a journal, seeking support from trusted friends, and gradually accepting the new reality. They would treat their ex-partner with dignity, keeping private matters private.",
            principle: "Acceptance and Virtue Ethics - Accept what cannot be changed while maintaining your moral character regardless of how others behave.",
            perspective: "The sage would see this as an opportunity to practice resilience and self-reliance. They understand that their happiness doesn't depend on any other person, and that this painful experience can lead to personal growth and wisdom."
        }
    },
    career: {
        title: "Unexpected Job Loss",
        description: "You've been laid off from a job you loved due to company downsizing. You have bills to pay, a family to support, and feel like your career has been derailed. You're bitter about the unfairness and worried about your future.",
        response: {
            immediate: "The sage would acknowledge the challenge without catastrophizing, recognizing that while this is difficult, it's not a reflection of their worth or a permanent disaster. They would separate the facts from their emotional interpretations.",
            action: "The sage would immediately begin practical steps: updating their resume, networking, applying for positions, and considering this an opportunity to reassess their career path. They would maintain a routine and stay productive.",
            principle: "Present Moment Focus - Instead of dwelling on the past decision or fearing the future, focus on what actions can be taken today.",
            perspective: "The sage would view this setback as a natural part of life's changes, potentially leading to better opportunities. They understand that external circumstances don't define them, and that their skills and character remain intact."
        }
    },
    health: {
        title: "Chronic Illness Diagnosis",
        description: "You've been diagnosed with a chronic condition that will require ongoing treatment and lifestyle changes. You feel scared about the future, angry about the unfairness, and worried about being a burden on your family.",
        response: {
            immediate: "The sage would process the diagnosis calmly, focusing on understanding the facts rather than being overwhelmed by fear or self-pity. They would recognize that illness is part of the human condition, not a personal failing.",
            action: "The sage would learn everything they can about their condition, follow medical advice diligently, and adapt their lifestyle accordingly. They would communicate openly with family about their needs and concerns.",
            principle: "Acceptance of Nature - Illness and aging are natural parts of life. Our task is to respond with wisdom and dignity.",
            perspective: "The sage would see this as an opportunity to practice courage and to focus on what truly matters in life. They might find deeper meaning and stronger relationships through this challenge, while maintaining their essential identity beyond their physical condition."
        }
    },
    family: {
        title: "Difficult Family Gathering",
        description: "At a family reunion, your relatives make comments about your life choices, political views, and personal decisions. You feel judged and misunderstood. The conversation becomes heated, and you want to either argue back or leave entirely.",
        response: {
            immediate: "The sage would remain calm, recognizing that other people's opinions are outside their control and don't define their worth. They would listen without taking offense, understanding that family members may be projecting their own insecurities.",
            action: "The sage would respond with kindness and patience, perhaps redirecting conversations to more positive topics or simply acknowledging different viewpoints without arguing. If necessary, they would politely excuse themselves from toxic conversations.",
            principle: "Others' Opinions Are Not Under Your Control - You cannot change how family members think or behave, but you can control your response and maintain your inner peace.",
            perspective: "The sage would view this as practice in patience and compassion. They understand that family relationships are complex and that maintaining their own virtue is more important than winning arguments or gaining approval."
        }
    }
};

// Scroll animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Re-observe scroll animations for new page
        setTimeout(() => {
            observeElements();
        }, 100);
    }
    
    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Find and activate the clicked nav item
    const clickedItem = event?.target?.closest('.nav-item');
    if (clickedItem) {
        clickedItem.classList.add('active');
    }

    // Close mobile menu
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('open');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile menu toggle
function toggleMobile() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Breathing exercise functionality
function startBreathing() {
    const circle = document.getElementById('breathingCircle');
    const text = document.getElementById('breathingText');
    const instruction = document.getElementById('breathingInstruction');
    const btn = document.getElementById('breathingBtn');
    const quote = document.getElementById('motivationalQuote');
    const progressBar = document.getElementById('breathingProgressBar');
    
    if (!breathingActive) {
        breathingActive = true;
        breathingCycle = 0;
        btn.innerHTML = '<i class="fas fa-stop"></i> Stop Practice';
        
        // Show random motivational quote
        const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        quote.textContent = randomQuote;
        
        function runBreathingCycle() {
            if (!breathingActive) return;
            
            breathingCycle++;
            
            // Inhale phase (4 seconds)
            circle.classList.remove('exhale');
            circle.classList.add('inhale');
            text.textContent = 'Breathe In';
            instruction.textContent = `Inhale slowly and deeply... Cycle ${breathingCycle}`;
            
            // Progress bar animation for inhale
            progressBar.style.transition = 'width 4s linear';
            progressBar.style.width = '33%';
            
            setTimeout(() => {
                if (!breathingActive) return;
                
                // Hold phase (2 seconds)
                text.textContent = 'Hold';
                instruction.textContent = 'Hold your breath...';
                progressBar.style.transition = 'width 2s linear';
                progressBar.style.width = '66%';
                
                setTimeout(() => {
                    if (!breathingActive) return;
                    
                    // Exhale phase (6 seconds)
                    circle.classList.remove('inhale');
                    circle.classList.add('exhale');
                    text.textContent = 'Breathe Out';
                    instruction.textContent = 'Exhale slowly and completely...';
                    progressBar.style.transition = 'width 6s linear';
                    progressBar.style.width = '100%';
                    
                    setTimeout(() => {
                        if (!breathingActive) return;
                        
                        // Rest phase (2 seconds)
                        text.textContent = 'Rest';
                        instruction.textContent = 'Rest and prepare for the next breath...';
                        progressBar.style.transition = 'width 2s linear';
                        progressBar.style.width = '0%';
                        
                        setTimeout(() => {
                            if (breathingActive) {
                                runBreathingCycle(); // Start next cycle
                            }
                        }, 2000);
                    }, 6000);
                }, 2000);
            }, 4000);
        }
        
        runBreathingCycle();
        
    } else {
        breathingActive = false;
        circle.classList.remove('inhale', 'exhale');
        text.textContent = 'Ready';
        instruction.textContent = 'Click "Begin Practice" to start your mindful breathing session';
        btn.innerHTML = '<i class="fas fa-play"></i> Begin Practice';
        progressBar.style.width = '0%';
        progressBar.style.transition = 'width 0.3s ease';
    }
}

// Sage Simulator functions
function generateScenario() {
    const scenarioKeys = Object.keys(scenarios);
    const randomKey = scenarioKeys[Math.floor(Math.random() * scenarioKeys.length)];
    loadScenarioByKey(randomKey);
    
    // Add loading animation
    const btn = event.target;
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<div class="loading"></div> Generating...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.disabled = false;
    }, 1000);
}

function loadScenario(type) {
    loadScenarioByKey(type);
}

function loadScenarioByKey(key) {
    const scenario = scenarios[key];
    if (scenario) {
        const scenarioBox = document.getElementById('currentScenario');
        scenarioBox.innerHTML = `
            <h4>${scenario.title}</h4>
            <p>${scenario.description}</p>
        `;
        
        // Update the sage response with enhanced styling
        const responseBox = document.querySelector('.sage-response');
        responseBox.innerHTML = `
            <h4><i class="fas fa-user-graduate"></i> How a Stoic Sage Would Respond:</h4>
            <div class="response-section">
                <p><strong><i class="fas fa-clock"></i> Immediate Response:</strong> ${scenario.response.immediate}</p>
            </div>
            <div class="response-section">
                <p><strong><i class="fas fa-cogs"></i> Practical Action:</strong> ${scenario.response.action}</p>
            </div>
            <div class="response-section">
                <p><strong><i class="fas fa-balance-scale"></i> Stoic Principle Applied:</strong> <em>${scenario.response.principle}</em></p>
            </div>
            <div class="response-section">
                <p><strong><i class="fas fa-telescope"></i> Long-term Perspective:</strong> ${scenario.response.perspective}</p>
            </div>
        `;
    }
}

// Enhanced page transitions and initialization
function initializeApp() {
    // Initialize scroll animations
    observeElements();
    
    // Initialize with workplace scenario
    loadScenarioByKey('workplace');
    
    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('open');
        }
    });

    // Add touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        const sidebar = document.getElementById('sidebar');
        
        if (swipeDistance > 100 && touchStartX < 50) {
            // Swipe right from left edge - open sidebar
            sidebar.classList.add('open');
        } else if (swipeDistance < -100 && sidebar.classList.contains('open')) {
            // Swipe left when sidebar is open - close sidebar
            sidebar.classList.remove('open');
        }
    }
}

// Enhanced loading and initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    
    // Check if FontAwesome loaded and add fallback
    setTimeout(() => {
        const icons = document.querySelectorAll('.fas');
        icons.forEach(icon => {
            const computedStyle = window.getComputedStyle(icon, '::before');
            if (computedStyle.content && computedStyle.content !== 'none' && computedStyle.content !== '""') {
                icon.classList.add('fa-loaded');
            }
        });
    }, 1000);
    
    // Add subtle parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Preload critical resources
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Add performance monitoring
window.addEventListener('load', function() {
    // Log performance metrics (optional)
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`Page loaded in ${perfData.loadEventEnd - perfData.fetchStart}ms`);
    }
});

// Add error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    // Could implement user-friendly error reporting here
});
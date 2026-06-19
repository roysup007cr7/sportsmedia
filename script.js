/**
 * Premium Live Sports Engine Layout Controller
 * File: script.js
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialization Configurations
    initTimezoneEngine();
    initLiveChatSimulation();
    initAutoNewsEngine();
    initBackToTopButton();
    initUtilityEventListeners();
});

/* ==========================================================================
   1. REAL-TIME LOCAL TIME & TIMEZONE CALCULATOR
   ========================================================================== */
function initTimezoneEngine() {
    const timeDisplay = document.querySelector('.timings h2');
    const localTimeSubtext = document.querySelector('.local-time-text');
    const timezoneSubtext = document.querySelector('.timezone-subtext');

    if (!timeDisplay) return;

    // Target kickoff time: Hardcoded example or dynamic. 
    // Let's assume the match is scheduled for today or tomorrow.
    const targetMatchDate = new Date();
    targetMatchDate.setHours(20, 0, 0, 0); // Sets target kickoff to 20:00 (8:00 PM)

    // Detect User Timezone Name (e.g., "America/New_York", "Europe/London")
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Format Kickoff Time to User Locale
    const localTimeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedLocalTime = targetMatchDate.toLocaleTimeString(undefined, localTimeOptions);

    // Update Layout Text nodes
    if (localTimeSubtext) {
        localTimeSubtext.textContent = `Your Time: ${formattedLocalTime}`;
    }
    if (timezoneSubtext) {
        timezoneSubtext.textContent = `Timezone detected: ${userTimezone.replace('_', ' ')}`;
    }
}

/* ==========================================================================
   2. SIMULATED LIVE CHAT ENGINE MODULE
   ========================================================================== */
function initLiveChatSimulation() {
    const messagesContainer = document.querySelector('.chat-messages-container');
    const userInput = document.getElementById('chat-user-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const viewerCountElement = document.querySelector('.chat-viewer-count');

    if (!messagesContainer) return;

    // Simulation Assets
    const userPool = ['Striker99', 'GamerFC', 'UltraFan_X', 'NeymarG.O.A.T', 'PitchKing', 'LiveStreamGuy', 'FootyLady', 'GoalRush', 'Tactics_Geek', 'RedDevil_42'];
    const messagePool = [
        'Stream is super clear, thanks!',
        'LETS GOOOOOO! 🚀',
        'Is Server 2 working better for anyone else?',
        'What a strike! Incredible save though.',
        'Ref has completely lost control of this game smh 🤦‍♂️',
        'Server 1 is crystal clear for me right now.',
        'Who do you guys think will score next?',
        'Wow, what a fast-paced match!',
        'This is a massive tactical masterclass right here.'
    ];
    const userColors = ['#00ffcc', '#3b82f6', '#ff9900', '#ff453a', '#a855f7', '#ec4899', '#10b981'];

    // Helper to generate dynamic viewer counts
    function updateViewerCount() {
        if (viewerCountElement) {
            const simulatedViewers = Math.floor(Math.random() * (14500 - 12000 + 1)) + 12000;
            viewerCountElement.textContent = `${simulatedViewers.toLocaleString()} watching live`;
        }
    }
    updateViewerCount();
    setInterval(updateViewerCount, 10000); // Shift count slightly every 10 seconds

    // Function to append a message node to layout safely
    function appendChatMessage(username, text, isUser = false) {
        const msgNode = document.createElement('div');
        msgNode.classList.add('chat-msg');

        const userSpan = document.createElement('span');
        userSpan.classList.add('chat-user-node');
        userSpan.textContent = `${username}: `;
        userSpan.style.color = isUser ? '#1a73e8' : userColors[Math.floor(Math.random() * userColors.length)];

        const textSpan = document.createElement('span');
        textSpan.classList.add('chat-text-node');
        textSpan.textContent = text;

        msgNode.appendChild(userSpan);
        msgNode.appendChild(textSpan);
        messagesContainer.appendChild(msgNode);

        // Keep container scrolled to bottom layout row
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Limit layout elements to prevent DOM bloat performance lags
        if (messagesContainer.children.length > 40) {
            messagesContainer.removeChild(messagesContainer.firstChild);
        }
    }

    // Automated Interval Message Injection
    function triggerSimulatedMessage() {
        const randomUser = userPool[Math.floor(Math.random() * userPool.length)];
        const randomText = messagePool[Math.floor(Math.random() * messagePool.length)];
        appendChatMessage(randomUser, randomText);
        
        // Randomize next message interval delay between 2 to 5 seconds
        setTimeout(triggerSimulatedMessage, Math.floor(Math.random() * 3000) + 2000);
    }
    setTimeout(triggerSimulatedMessage, 2000); // Kickoff first message load

    // User Message Sender Logic
    function handleUserSend() {
        const textMessage = userInput.value.trim();
        if (textMessage === '') return;

        appendChatMessage('You', textMessage, true);
        userInput.value = '';
    }

    if (sendBtn && userInput) {
        sendBtn.addEventListener('click', handleUserSend);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserSend();
        });
    }
}

/* ==========================================================================
   3. AUTO-FETCH LIVE NEWS ENGINE LAYOUT CONTROLLER
   ========================================================================== */
function initAutoNewsEngine() {
    const newsLoader = document.getElementById('news-feed-loader');
    const refreshBtn = document.getElementById('refresh-btn');

    // Sample dynamic engine asset grid
    const dynamicNewsDatabase = [
        { title: 'Tactical Realignment Announced', desc: 'Managers shake up formations ahead of the massive match tonight.', link: '#' },
        { title: 'Pitch Conditions Declared Optimal', desc: 'Groundstaff confirm turf measurements and irrigation meet match standards.', link: '#' },
        { title: 'Top Scorer Cleared for Action', desc: 'Medical staff greenlight the star forward following late fitness test evaluations.', link: '#' },
        { title: 'Fan Villages Reaching Capacity', desc: 'Local enforcement reports major stadium arrivals hours ahead of official gates open.', link: '#' }
    ];

    function fetchLatestNewsFeed() {
        const newsGrid = document.querySelector('.news-grid');
        if (!newsGrid) return;

        // Display Loading Spinner state layout
        if (newsLoader) newsLoader.style.display = 'flex';
        newsGrid.style.opacity = '0.3';

        // Simulate async layout API retrieval refresh delay
        setTimeout(() => {
            if (newsLoader) newsLoader.style.display = 'none';
            newsGrid.style.opacity = '1';
            newsGrid.innerHTML = ''; // Clean old rows

            // Select 2 random stories to inject into the active interface grid
            const shuffledNews = [...dynamicNewsDatabase].sort(() => 0.5 - Math.random()).slice(0, 2);

            shuffledNews.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('news-card');

                card.innerHTML = `
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                    <a href="${item.link}" class="news-link">Read Update →</a>
                `;
                newsGrid.appendChild(card);
            });
        }, 1200);
    }

    // Connect trigger arrays to sync controller row action
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            fetchLatestNewsFeed();
            // Highlight live server glow on click update verification
            const serverOne = document.querySelector('.btn-1');
            if (serverOne) {
                serverOne.classList.add('live-server-glow');
                setTimeout(() => serverOne.classList.remove('live-server-glow'), 4000);
            }
        });
    }

    // Initial default layout population engine trigger
    fetchLatestNewsFeed();
}

/* ==========================================================================
   4. FLOATING BACK TO TOP INTERACTIVE LAYOUT 
   ========================================================================== */
function initBackToTopButton() {
    const topButton = document.getElementById('backToTop');
    if (!topButton) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topButton.classList.add('visible');
        } else {
            topButton.classList.remove('visible');
        }
    });

    topButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   5. COMPACT SOCIAL SHARE MULTI-UTILITY ENGINE
   ========================================================================== */
function initUtilityEventListeners() {
    const shareBtn = document.querySelector('.share-match-btn');
    if (!shareBtn) return;

    shareBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'Watch Dynamic Live Streams',
                text: 'Check out the active match card streaming schedule live right now!',
                url: window.location.href
            }).catch(console.error);
        } else {
            // Fallback strategy copies layout link to keyboard clipboard buffers
            navigator.clipboard.writeText(window.location.href);
            const originalText = shareBtn.textContent;
            shareBtn.textContent = 'Link Copied!';
            shareBtn.style.background = '#1a73e8';
            setTimeout(() => {
                shareBtn.textContent = originalText;
                shareBtn.style.background = 'rgba(255, 255, 255, 0.12)';
            }, 2500);
        }
    });
}
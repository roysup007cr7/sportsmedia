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
    insertMatchStatusBadges(); // Restores missing Live / Upcoming statuses
});

/* ==========================================================================
   1. RESTORE LIVE, UPCOMING, & FINISHED BADGES
   ========================================================================== */
function insertMatchStatusBadges() {
    // Finds the meta controls area in your match cards next to the share button
    const metaControls = document.querySelectorAll('.meta-controls');
    
    metaControls.forEach((control, index) => {
        // To avoid duplicating badges if scripts reload
        if (control.querySelector('.status-badge')) return;

        const badge = document.createElement('span');
        badge.classList.add('status-badge');

        // Dynamically assign statuses to different cards as an example
        if (index === 0) {
            badge.classList.add('live-blink');
            badge.textContent = '● LIVE';
        } else if (index === 1) {
            badge.classList.add('upcoming-badge');
            badge.textContent = 'UPCOMING';
        } else {
            badge.classList.add('finished-badge');
            badge.textContent = 'FINISHED';
        }

        // Inserts the status badge gracefully right before the Share button
        control.insertBefore(badge, control.firstChild);
    });
}

/* ==========================================================================
   2. REAL-TIME LOCAL TIME & TIMEZONE CALCULATOR
   ========================================================================== */
function initTimezoneEngine() {
    const localTimeSubtext = document.querySelector('.local-time-text');
    const timezoneSubtext = document.querySelector('.timezone-subtext');

    const targetMatchDate = new Date();
    targetMatchDate.setHours(20, 0, 0, 0); 

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTimeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedLocalTime = targetMatchDate.toLocaleTimeString(undefined, localTimeOptions);

    if (localTimeSubtext) {
        localTimeSubtext.textContent = `Your Time: ${formattedLocalTime}`;
    }
    if (timezoneSubtext) {
        timezoneSubtext.textContent = `Timezone detected: ${userTimezone.replace('_', ' ')}`;
    }
}

/* ==========================================================================
   3. FIXED AUTO-FETCH LIVE NEWS ENGINE (Fixes the infinite loading screen)
   ========================================================================== */
function initAutoNewsEngine() {
    const newsLoader = document.getElementById('news-feed-loader');
    const refreshBtn = document.getElementById('refresh-btn');
    const newsGrid = document.querySelector('.news-grid');

    const dynamicNewsDatabase = [
        { title: 'Tactical Realignment Announced', desc: 'Managers shake up formations ahead of the massive match tonight.', link: '#' },
        { title: 'Pitch Conditions Declared Optimal', desc: 'Groundstaff confirm turf measurements and irrigation meet match standards.', link: '#' },
        { title: 'Top Scorer Cleared for Action', desc: 'Medical staff greenlight the star forward following late fitness test evaluations.', link: '#' },
        { title: 'Fan Villages Reaching Capacity', desc: 'Local enforcement reports major stadium arrivals hours ahead of official gates open.', link: '#' }
    ];

    function fetchLatestNewsFeed() {
        // Fallback checks: If container classes are slightly named differently, grab the card area
        const targetContainer = newsGrid || document.querySelector('.news-container');
        if (!targetContainer) return;

        // Dim background slightly to indicate updating
        targetContainer.style.opacity = '0.5';

        setTimeout(() => {
            targetContainer.style.opacity = '1';
            
            // Clear out the "Connecting to live media updates..." text
            targetContainer.innerHTML = ''; 

            // Create a sub-container for crisp alignment
            const layoutGrid = document.createElement('div');
            layoutGrid.classList.add('news-grid');

            // Grab random updates from database
            const shuffledNews = [...dynamicNewsDatabase].sort(() => 0.5 - Math.random()).slice(0, 2);

            shuffledNews.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('news-card');
                card.innerHTML = `
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                    <a href="${item.link}" class="news-link">Read Update →</a>
                `;
                layoutGrid.appendChild(card);
            });

            targetContainer.appendChild(layoutGrid);
        }, 1000); // 1-second simulation delay for realism
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            fetchLatestNewsFeed();
        });
    }

    // Trigger instant feed population
    fetchLatestNewsFeed();
}

/* ==========================================================================
   4. SIMULATED LIVE CHAT ENGINE MODULE
   ========================================================================== */
function initLiveChatSimulation() {
    const messagesContainer = document.querySelector('.chat-messages-container');
    const userInput = document.getElementById('chat-user-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const viewerCountElement = document.querySelector('.chat-viewer-count');

    if (!messagesContainer) return;

    const userPool = ['Striker99', 'GamerFC', 'UltraFan_X', 'NeymarG.O.A.T', 'PitchKing', 'LiveStreamGuy', 'FootyLady', 'GoalRush'];
    const messagePool = [
        'Stream is super clear, thanks!',
        'LETS GOOOOOO! 🚀',
        'Is Server 2 working better for anyone else?',
        'What a strike! Incredible save though.',
        'Server 1 is crystal clear for me right now.',
        'Who do you guys think will score next?'
    ];
    const userColors = ['#00ffcc', '#3b82f6', '#ff9900', '#ff453a', '#a855f7'];

    function updateViewerCount() {
        if (viewerCountElement) {
            const simulatedViewers = Math.floor(Math.random() * (14500 - 12000 + 1)) + 12000;
            viewerCountElement.textContent = `${simulatedViewers.toLocaleString()} watching live`;
        }
    }
    updateViewerCount();

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
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function triggerSimulatedMessage() {
        const randomUser = userPool[Math.floor(Math.random() * userPool.length)];
        const randomText = messagePool[Math.floor(Math.random() * messagePool.length)];
        appendChatMessage(randomUser, randomText);
        setTimeout(triggerSimulatedMessage, Math.floor(Math.random() * 3000) + 2000);
    }
    setTimeout(triggerSimulatedMessage, 2000);

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
   5. UTILITY CONTROLLERS
   ========================================================================== */
function initBackToTopButton() {
    const topButton = document.getElementById('backToTop');
    if (!topButton) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { topButton.classList.add('visible'); } 
        else { topButton.classList.remove('visible'); }
    });
    topButton.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

function initUtilityEventListeners() {
    const shareBtn = document.querySelector('.share-match-btn') || document.querySelector('.meta-controls button');
    if (!shareBtn) return;
    shareBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href);
        const originalText = shareBtn.textContent;
        shareBtn.textContent = 'Link Copied!';
        setTimeout(() => { shareBtn.textContent = originalText; }, 2000);
    });
}
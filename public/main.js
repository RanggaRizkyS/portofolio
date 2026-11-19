'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const $ = (id) => document.getElementById(id);

    // ---------------------------------------------------------------------
    // AOS - tetap memakai library lokal yang sudah ada di /vendor/.
    // ---------------------------------------------------------------------
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 600, once: true, offset: 100 });
    }

    // ---------------------------------------------------------------------
    // DATA WEBSITE
    // ---------------------------------------------------------------------
    const SITE_CONFIG = {
        profile: {
            name: 'Rangga Rizky Saputra',
            subtitle: 'Full-Stack Developer & Homelab Hobbiest',
            roleBadge: 'PLAYER 1 • CREATOR',
            levelBadge: 'LVL 99',
            avatarUrl: '/img/profile.jpeg',
            aboutMeParagraphs: [
                'Hallo! Saya Rangga Rizky, Saya adalah seorang Full-Stack Developer dan cukup paham tentang Server. Journey saya bermula pada kelas 6 SD, Saat maraknya pandemi di masa itu, Saya memutuskan untuk mencoba membuat server minecraft bernama Frost Network. Pada awalnya saya hanya membuat server itu dan membuat community yang dulu cukup dikenal di komunitas minecraft pe, Tetapi saat menginjak kelas 1 SMP, Saya mulai tertarik dengan Plugin dan Website, Awalnya saya memulai Journey saya dengan membuat Project sederhana seperti Plugin UI Customize, GUI Customize, Front-End Website Hosting Store, Website Server Minecraft saya, dan project lainnya. Sekarang saya adalah Full-Stack Web Developer, Creator Plugin Minecraft, khusus untuk Software Paper, NodeJS Specialist. Kedepannya harapan saya terhadap diri saya yaitu lebih berkembang di bidang Programming dan memelajari lebih banyak Framework dan Coding Languages lainnya.'
            ],
            typingPhrases: [
                'Homelab Hobbiest',
                'Full-Stack Web Developer',
                'NodeJS Specialist',
                'I Love NPM',
                'Aspiring To Build a Data Center'
            ]
        },
        sidebarNav: [
            { id: 'about', label: '01. ABOUT ME', icon: 'fa-user', color: 'text-arcade-yellow' },
            { id: 'skills', label: '02. SKILLS', icon: 'fa-bolt', color: 'text-arcade-green' },
            { id: 'experience', label: '03. ERROR LOG', icon: 'fa-scroll', color: 'text-arcade-cyan' },
            { id: 'minigame', label: '04. MINI GAME', icon: 'fa-gamepad', color: 'text-arcade-yellow' }
        ],
        skillsSection: {
            subtitle: 'Tingkat penguasaan teknologi & keahlian sistem',
            categories: [
                {
                    categoryTitle: 'CODING LANGUAGES I LOVE THE MOST',
                    icon: 'fa-code',
                    titleColor: 'text-arcade-yellow',
                    skills: [
                        { name: 'NODE.JS', level: 100, color: 'bg-arcade-green', textColor: 'text-arcade-green' },
                        { name: 'JAVASCRIPT', level: 85, color: 'bg-arcade-cyan', textColor: 'text-arcade-cyan' },
                        { name: 'BASH', level: 35, color: 'bg-arcade-yellow', textColor: 'text-arcade-yellow' },
                        { name: 'JAVA', level: 20, color: 'bg-arcade-amber', textColor: 'text-arcade-amber' },
                        { name: 'PYTHON', level: 1, color: 'bg-red-600', textColor: 'text-red-500' }
                    ]
                },
                {
                    categoryTitle: 'SERVERS SOFTWARE',
                    icon: 'fa-server',
                    titleColor: 'text-arcade-cyan',
                    skills: [
                        { name: 'LINUX UBUNTU', level: 99, color: 'bg-arcade-green', textColor: 'text-arcade-green' },
                        { name: 'PTERODACTYL', level: 95, color: 'bg-arcade-green', textColor: 'text-arcade-green' },
                        { name: 'MONGODB', level: 75, color: 'bg-arcade-cyan', textColor: 'text-arcade-cyan' },
                        { name: 'MARIADB', level: 65, color: 'bg-arcade-cyan', textColor: 'text-arcade-cyan' },
                        { name: 'DOCKER', level: 40, color: 'bg-arcade-yellow', textColor: 'text-arcade-yellow' }
                    ]
                }
            ]
        },
        questLog: {
            subtitle: 'Riwayat error, eksperimen, dan milestone',
            items: [
                {
                    num: 1,
                    tag: 'ERR_LOG_1 • PRESENT',
                    tagColor: 'text-arcade-cyan border-arcade-cyan',
                    title: 'Full-Stack Web Developer',
                    subtitle: 'Independent',
                    description: 'Pengembangan website berbasis Express JS.'
                },
                {
                    num: 2,
                    tag: 'ERR_LOG_2 • HOMELAB',
                    tagColor: 'text-arcade-yellow border-arcade-yellow',
                    title: 'Home Lab System Architect',
                    subtitle: 'Personal Server',
                    description: 'Mengelola server rumahan dengan basis Proxmox.'
                },
                {
                    num: 3,
                    tag: 'ERR_LOG_3 • CLI',
                    tagColor: 'text-arcade-amber border-arcade-amber',
                    title: 'CLI Script',
                    subtitle: 'CLI Script Developer',
                    description: 'Mengembangkan aplikasi berbasis CLI.'
                },
                {
                    num: 4,
                    tag: 'ERR_LOG_4 • OWNER SERVER',
                    tagColor: 'text-arcade-green border-arcade-green',
                    title: 'Owner Server Minecraft',
                    subtitle: 'Owner Server Minecraft',
                    description: 'Merancang server dan menghandle komunitas.'
                },
                {
                    num: 5,
                    tag: 'ERR_LOG_5 • DATABASE',
                    tagColor: 'text-arcade-cyan border-arcade-cyan',
                    title: 'Database Engineer',
                    subtitle: 'Database Engineer For Local Network',
                    description: 'Menyusun database dan mengelola database berskala menengah.'
                }
            ]
        },
        contactSection: {
            subtitle: 'Kirimkan pesan atau tawaran proyek langsung ke sistem saya'
        }
    };

    // Render data dari satu konfigurasi agar konten mudah dirawat.
    function renderSiteFromConfig() {
        const profileImg = $('profileImg');
        if (profileImg) profileImg.src = SITE_CONFIG.profile.avatarUrl;

        const profileFields = {
            playerName: SITE_CONFIG.profile.name,
            playerSubtitle: SITE_CONFIG.profile.subtitle,
            playerRoleBadge: SITE_CONFIG.profile.roleBadge,
            playerLevelBadge: SITE_CONFIG.profile.levelBadge,
            skillsDesc: SITE_CONFIG.skillsSection.subtitle,
            questLogSubtitle: SITE_CONFIG.questLog.subtitle,
            contactDesc: SITE_CONFIG.contactSection.subtitle
        };

        Object.entries(profileFields).forEach(([id, value]) => {
            const element = $(id);
            if (element) element.textContent = value;
        });

        const aboutContainer = $('aboutMeText');
        if (aboutContainer) {
            const wrapper = document.createElement('div');
            wrapper.id = 'aboutTextWrapper';
            wrapper.className = 'about-desc-wrapper';

            SITE_CONFIG.profile.aboutMeParagraphs.forEach((paragraph) => {
                const p = document.createElement('p');
                p.textContent = paragraph;
                wrapper.appendChild(p);
            });

            aboutContainer.replaceChildren(wrapper);
        }

        const sidebarNav = $('sidebarNav');
        if (sidebarNav) {
            sidebarNav.innerHTML = SITE_CONFIG.sidebarNav.map((item) => `
                <a href="#${item.id}" class="nav-link block p-3 rounded-lg bg-white/5 border border-white/10 hover:border-arcade-yellow text-white transition flex items-center justify-between group cursor-pointer">
                    <span class="group-hover:text-arcade-yellow flex items-center gap-3">
                        <i class="fa-solid ${item.icon} ${item.color}" aria-hidden="true"></i>
                        ${item.label}
                    </span>
                    <i class="fa-solid fa-chevron-right text-gray-500 group-hover:text-arcade-yellow" aria-hidden="true"></i>
                </a>
            `).join('');
        }

        const skillsContainer = $('skillsContainer');
        if (skillsContainer) {
            skillsContainer.innerHTML = SITE_CONFIG.skillsSection.categories.map((category, categoryIndex) => {
                const aosEffect = categoryIndex % 2 === 0 ? 'fade-right' : 'fade-left';
                const skillMarkup = category.skills.map((skill) => `
                    <div class="space-y-1.5">
                        <div class="flex justify-between font-pixel text-[10px] text-gray-300">
                            <span>${skill.name}</span>
                            <span class="${skill.textColor}">LVL ${skill.level}%</span>
                        </div>
                        <div class="w-full bg-black/60 rounded-full h-3 border border-white/10 overflow-hidden p-0.5" role="progressbar" aria-label="${skill.name}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${skill.level}">
                            <div class="${skill.color} h-full rounded-full shadow-lg" style="width:${skill.level}%"></div>
                        </div>
                    </div>
                `).join('');

                return `
                    <article class="glass-card-grey p-6 rounded-2xl space-y-4" data-aos="${aosEffect}">
                        <h3 class="font-pixel text-xs ${category.titleColor} flex items-center gap-2">
                            <i class="fa-solid ${category.icon}" aria-hidden="true"></i>
                            ${category.categoryTitle}
                        </h3>
                        ${skillMarkup}
                    </article>
                `;
            }).join('');
        }

        const questContainer = $('questLogContainer');
        if (questContainer) {
            questContainer.innerHTML = SITE_CONFIG.questLog.items.map((quest, index) => {
                const isReverse = index % 2 !== 0;
                const aosDirection = isReverse ? 'fade-left' : 'fade-right';
                return `
                    <article class="relative flex flex-col ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between group" data-aos="${aosDirection}">
                        <div class="w-full md:w-[45%] glass-card-grey p-5 rounded-2xl quest_div">
                            <span class="font-pixel text-[9px] ${quest.tagColor} bg-black/60 px-2 py-1 rounded border">
                                ${quest.tag}
                            </span>
                            <h3 class="font-pixel text-sm text-white mt-2">${quest.title}</h3>
                            <p class="text-xs text-arcade-yellow font-terminal text-base">${quest.subtitle}</p>
                            <p class="text-xs text-gray-300 mt-2">${quest.description}</p>
                        </div>
                        <div class="timeline-number absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full glass-card-yellow border border-arcade-yellow flex items-center justify-center font-pixel text-xs text-arcade-yellow my-4 md:my-0" aria-hidden="true">
                            ${quest.num}
                        </div>
                        <div class="hidden md:block w-[45%]" aria-hidden="true"></div>
                    </article>
                `;
            }).join('');
        }
    }

    renderSiteFromConfig();

    // Refresh AOS after dynamic content has been inserted.
    if (typeof AOS !== 'undefined') {
        AOS.refreshHard ? AOS.refreshHard() : AOS.refresh();
    }

    // ---------------------------------------------------------------------
    // ABOUT: expandable description (mouse + keyboard).
    // ---------------------------------------------------------------------
    const aboutContainer = $('aboutMeText');
    const aboutToggleHint = $('aboutToggleHint');

    function toggleAboutDescription() {
        if (!aboutContainer) return;
        const isCollapsed = aboutContainer.classList.contains('about-desc-collapsed');
        aboutContainer.classList.toggle('about-desc-collapsed', !isCollapsed);
        aboutContainer.classList.toggle('about-desc-expanded', isCollapsed);
        aboutContainer.setAttribute('aria-expanded', String(isCollapsed));

        if (aboutToggleHint) {
            aboutToggleHint.textContent = isCollapsed
                ? '▲ KLIK TEKS UNTUK MENUTUP KEMBALI'
                : '▼ KLIK TEKS UNTUK BACA SELENGKAPNYA';
        }
    }

    if (aboutContainer) {
        aboutContainer.addEventListener('click', toggleAboutDescription);
        aboutContainer.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleAboutDescription();
            }
        });
    }

    // ---------------------------------------------------------------------
    // SIDEBAR MENU.
    // ---------------------------------------------------------------------
    const sidebar = $('arcadeSidebar');
    const sidebarPanel = $('sidebarPanel');
    const sidebarToggleBtn = $('sidebarToggleBtn');
    const sidebarCloseBtn = $('sidebarCloseBtn');
    const sidebarBackdrop = $('sidebarBackdrop');
    let sidebarIsOpen = false;

    function openSidebar() {
        if (!sidebar || !sidebarPanel || !sidebarBackdrop) return;
        sidebarIsOpen = true;
        sidebar.inert = false;
        sidebar.classList.remove('sidebar-closed', 'pointer-events-none');
        sidebarPanel.classList.remove('pointer-events-none');
        sidebarBackdrop.classList.remove('pointer-events-none', 'opacity-0');
        sidebarBackdrop.classList.add('opacity-100');
        sidebar.setAttribute('aria-hidden', 'false');
        sidebarToggleBtn?.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
        sidebarCloseBtn?.focus();
        playRetroBeep(440, 0.1);
    }

    function closeSidebar(restoreFocus = true) {
        if (!sidebar || !sidebarPanel || !sidebarBackdrop || !sidebarIsOpen) return;
        sidebarIsOpen = false;
        sidebar.inert = true;
        sidebar.classList.add('sidebar-closed');
        sidebarBackdrop.classList.remove('opacity-100');
        sidebarBackdrop.classList.add('opacity-0');
        sidebar.setAttribute('aria-hidden', 'true');
        sidebarToggleBtn?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');

        window.setTimeout(() => {
            if (!sidebarIsOpen) sidebar.classList.add('pointer-events-none');
        }, 420);

        if (restoreFocus) sidebarToggleBtn?.focus();
        playRetroBeep(330, 0.1);
    }

    sidebarToggleBtn?.addEventListener('click', (event) => {
        event.stopPropagation();
        sidebarIsOpen ? closeSidebar(false) : openSidebar();
    });

    sidebarCloseBtn?.addEventListener('click', () => closeSidebar());
    sidebarBackdrop?.addEventListener('click', () => closeSidebar());
    $('sidebarNav')?.addEventListener('click', (event) => {
        if (event.target.closest('.nav-link')) closeSidebar(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && sidebarIsOpen) closeSidebar();
    });

    // ---------------------------------------------------------------------
    // TYPING EFFECT. Respects reduced-motion and pauses while the tab is hidden.
    // ---------------------------------------------------------------------
    const typingElement = $('typingText');
    const phrases = SITE_CONFIG.profile.typingPhrases;
    let phraseIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    let typingTimer = null;
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    function typeLoop() {
        if (!typingElement || document.hidden) return;
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            characterIndex -= 1;
            typingElement.textContent = currentPhrase.substring(0, characterIndex);
        } else {
            characterIndex += 1;
            typingElement.textContent = currentPhrase.substring(0, characterIndex);
        }

        let delay = isDeleting ? 30 : 60;
        if (!isDeleting && characterIndex === currentPhrase.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 500;
        }

        typingTimer = window.setTimeout(typeLoop, delay);
    }

    if (typingElement) {
        if (prefersReducedMotion) {
            typingElement.textContent = phrases[0];
        } else {
            typeLoop();
        }
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            window.clearTimeout(typingTimer);
        } else if (!prefersReducedMotion && typingElement) {
            typeLoop();
        }
    });

    // ---------------------------------------------------------------------
    // RETRO AUDIO (Web Audio API; starts muted until the visitor opts in).
    // ---------------------------------------------------------------------
    let audioContext = null;
    let audioMuted = true;
    const toggleAudioBtn = $('toggleAudioBtn');
    const audioStatus = $('audioStatus');
    const audioIcon = $('audioIcon');

    function initAudio() {
        if (audioContext) return audioContext;
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return null;
        audioContext = new AudioContextClass();
        if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
        return audioContext;
    }

    function playRetroBeep(frequency, duration) {
        if (audioMuted) return;
        try {
            const context = initAudio();
            if (!context) return;

            const oscillator = context.createOscillator();
            const gain = context.createGain();
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(frequency, context.currentTime);
            gain.gain.setValueAtTime(0.05, context.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
            oscillator.connect(gain);
            gain.connect(context.destination);
            oscillator.start();
            oscillator.stop(context.currentTime + duration);
        } catch (error) {
            // Audio is decorative; unsupported devices should not break the page.
        }
    }

    toggleAudioBtn?.addEventListener('click', () => {
        audioMuted = !audioMuted;
        if (!audioMuted) {
            initAudio();
            if (audioStatus) {
                audioStatus.textContent = 'ENABLED';
                audioStatus.className = 'text-arcade-green';
            }
            if (audioIcon) audioIcon.className = 'fa-solid fa-volume-high';
            playRetroBeep(600, 0.1);
        } else {
            if (audioStatus) {
                audioStatus.textContent = 'MUTED';
                audioStatus.className = 'text-arcade-yellow';
            }
            if (audioIcon) audioIcon.className = 'fa-solid fa-volume-xmark';
        }
    });

    // ---------------------------------------------------------------------
    // GAME: Alien Shooter. Keeps auto-fire, keyboard, touch joystick, score,
    // high score, alien difficulty, hit effects, and retro sounds.
    // ---------------------------------------------------------------------
    const canvas = $('spaceGameCanvas');
    const context = canvas?.getContext('2d', { alpha: false });
    const startOverlay = $('gameStartOverlay');
    const startGameBtn = $('startGameBtn');
    const gameHighScoreEl = $('gameHighScore');
    const overlayTitle = $('overlayTitle');
    const overlaySubtitle = $('overlaySubtitle');

    let highScore = 0;
    try {
        highScore = Number.parseInt(localStorage.getItem('highScore') || '0', 10) || 0;
        if (gameHighScoreEl) gameHighScoreEl.textContent = String(highScore);
    } catch (error) {
        highScore = 0;
    }

    let gameWidth = 0;
    let gameHeight = 0;
    let gameDpr = 1;
    let animationFrameId = 0;
    let gameRunning = false;
    let score = 0;
    let lastShotTime = 0;
    let playerBullets = [];
    let alienEnemies = [];
    let explosions = [];

    const playerShip = {
        x: 0,
        y: 0,
        width: 32,
        height: 32,
        speed: 8,
        vx: 0,
        vy: 0
    };

    function resizeCanvas() {
        if (!canvas || !context) return;
        const rect = canvas.parentElement.getBoundingClientRect();
        gameWidth = Math.max(1, Math.floor(rect.width));
        gameHeight = Math.max(1, Math.floor(rect.height));
        gameDpr = Math.min(window.devicePixelRatio || 1, 2);

        const pixelWidth = Math.round(gameWidth * gameDpr);
        const pixelHeight = Math.round(gameHeight * gameDpr);
        if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
            canvas.width = pixelWidth;
            canvas.height = pixelHeight;
        }
        context.setTransform(gameDpr, 0, 0, gameDpr, 0, 0);

        playerShip.x = Math.max(0, Math.min(playerShip.x || gameWidth / 2 - 16, gameWidth - playerShip.width));
        playerShip.y = Math.max(0, Math.min(playerShip.y || gameHeight - 50, gameHeight - playerShip.height));
        if (!gameRunning) drawGame();
    }

    function spawnAlien() {
        if (alienEnemies.length >= 7 || gameWidth <= 0) return;
        const size = Math.random() * 12 + 24;
        const speedFactor = 1 + Math.min(score / 4000, 1.5);
        alienEnemies.push({
            x: Math.random() * Math.max(1, gameWidth - size),
            y: -size,
            width: size,
            height: size,
            speed: (Math.random() * 1 + 1) * speedFactor,
            hp: score > 3000 && Math.random() > 0.7 ? 2 : 1,
            color: score > 3000 ? '#ff9900' : '#ffe600'
        });
    }

    function resetGame() {
        score = 0;
        playerBullets = [];
        alienEnemies = [];
        explosions = [];
        playerShip.x = gameWidth / 2 - playerShip.width / 2;
        playerShip.y = gameHeight - 50;
        playerShip.vx = 0;
        playerShip.vy = 0;
        lastShotTime = performance.now();
        keysHeld.clear();
        resetJoystick();
    }

    function handleAutoShoot() {
        const now = performance.now();
        if (now - lastShotTime >= 100) {
            lastShotTime = now;
            playerBullets.push(
                { x: playerShip.x + 4, y: playerShip.y, width: 4, height: 12, speed: 8 },
                { x: playerShip.x + playerShip.width - 8, y: playerShip.y, width: 4, height: 12, speed: 8 }
            );
            playRetroBeep(750, 0.04);
        }
    }

    function drawGame() {
        if (!context || gameWidth <= 0 || gameHeight <= 0) return;
        context.clearRect(0, 0, gameWidth, gameHeight);
        context.fillStyle = '#05070b';
        context.fillRect(0, 0, gameWidth, gameHeight);

        // Background stars are deterministic to avoid allocating random data per frame.
        context.fillStyle = '#ffffff';
        const starOffset = (performance.now() * 0.08) % gameHeight;
        for (let index = 0; index < 20; index += 1) {
            const starX = (index * 43) % gameWidth;
            const starY = (index * 71 + starOffset) % gameHeight;
            context.fillRect(starX, starY, 2, 2);
        }

        // Player ship.
        context.fillStyle = '#ffe600';
        context.beginPath();
        context.moveTo(playerShip.x + playerShip.width / 2, playerShip.y);
        context.lineTo(playerShip.x + playerShip.width, playerShip.y + playerShip.height);
        context.lineTo(playerShip.x + playerShip.width / 2, playerShip.y + playerShip.height - 6);
        context.lineTo(playerShip.x, playerShip.y + playerShip.height);
        context.closePath();
        context.fill();

        context.fillStyle = '#00f3ff';
        context.fillRect(
            playerShip.x + playerShip.width / 2 - 3,
            playerShip.y + playerShip.height - 4,
            6,
            8 + (gameRunning ? Math.random() * 4 : 2)
        );

        context.fillStyle = '#39ff14';
        playerBullets.forEach((bullet) => {
            context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });

        alienEnemies.forEach((alien) => {
            context.fillStyle = alien.color;
            context.beginPath();
            context.arc(alien.x + alien.width / 2, alien.y + alien.height / 3, alien.width / 2, 0, Math.PI * 2);
            context.fill();
            context.fillStyle = '#000000';
            context.fillRect(alien.x + 6, alien.y + 6, 4, 4);
            context.fillRect(alien.x + alien.width - 10, alien.y + 6, 4, 4);
        });

        explosions.forEach((explosion) => {
            context.strokeStyle = '#ff9900';
            context.lineWidth = 2;
            context.beginPath();
            context.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
            context.stroke();
        });

        context.font = '10px "Press Start 2P", monospace';
        context.fillStyle = '#39ff14';
        context.fillText(`ALIENS DESTROYED: ${Math.floor(score / 150)}`, 10, 25);
        context.fillText(`SCORE: ${score}`, 10, 42);
    }

    function gameOver() {
        if (!gameRunning) return;
        gameRunning = false;
        window.cancelAnimationFrame(animationFrameId);

        if (score > highScore) {
            highScore = score;
            if (gameHighScoreEl) gameHighScoreEl.textContent = String(highScore);
            try {
                localStorage.setItem('highScore', String(highScore));
            } catch (error) {
                // The current session still keeps the score if storage is unavailable.
            }
        }

        if (startOverlay) startOverlay.classList.remove('hidden');
        if (overlayTitle) overlayTitle.textContent = 'GAME OVER';
        if (overlaySubtitle) {
            overlaySubtitle.textContent = `FINAL SCORE: ${score} (${Math.floor(score / 150)} Aliens Kills)`;
        }
        drawGame();
        playRetroBeep(150, 0.4);
    }

    function updateGame() {
        if (!gameRunning) return;
        handleAutoShoot();

        playerShip.x += playerShip.vx;
        playerShip.y += playerShip.vy;
        playerShip.x = Math.max(0, Math.min(playerShip.x, gameWidth - playerShip.width));
        playerShip.y = Math.max(0, Math.min(playerShip.y, gameHeight - playerShip.height));

        // Reverse iteration prevents skipped objects when removing from arrays.
        for (let bulletIndex = playerBullets.length - 1; bulletIndex >= 0; bulletIndex -= 1) {
            const bullet = playerBullets[bulletIndex];
            bullet.y -= bullet.speed;
            if (bullet.y < -20) playerBullets.splice(bulletIndex, 1);
        }

        if (Math.random() < 0.012 + Math.min(score / 40000, 0.02)) spawnAlien();

        for (let alienIndex = alienEnemies.length - 1; alienIndex >= 0; alienIndex -= 1) {
            const alien = alienEnemies[alienIndex];
            alien.y += alien.speed;
            let destroyed = false;

            for (let bulletIndex = playerBullets.length - 1; bulletIndex >= 0; bulletIndex -= 1) {
                const bullet = playerBullets[bulletIndex];
                const hit = bullet.x < alien.x + alien.width &&
                    bullet.x + bullet.width > alien.x &&
                    bullet.y < alien.y + alien.height &&
                    bullet.y + bullet.height > alien.y;

                if (!hit) continue;
                alien.hp -= 1;
                playerBullets.splice(bulletIndex, 1);

                if (alien.hp <= 0) {
                    explosions.push({
                        x: alien.x + alien.width / 2,
                        y: alien.y + alien.height / 2,
                        radius: 1,
                        maxRadius: 16
                    });
                    alienEnemies.splice(alienIndex, 1);
                    score += 150;
                    destroyed = true;
                    playRetroBeep(900, 0.06);
                    break;
                }
            }

            if (destroyed) continue;

            const playerHit = playerShip.x < alien.x + alien.width &&
                playerShip.x + playerShip.width > alien.x &&
                playerShip.y < alien.y + alien.height &&
                playerShip.y + playerShip.height > alien.y;

            if (alien.y + alien.height > gameHeight || playerHit) {
                gameOver();
                break;
            }
        }

        for (let index = explosions.length - 1; index >= 0; index -= 1) {
            explosions[index].radius += 2;
            if (explosions[index].radius > explosions[index].maxRadius) {
                explosions.splice(index, 1);
            }
        }

        drawGame();
        if (gameRunning) animationFrameId = window.requestAnimationFrame(updateGame);
    }

    const keysHeld = new Set();
    const joystickBase = $('joystickBase');
    const joystickStick = $('joystickStick');
    let isJoystickDragging = false;
    let activePointerId = null;
    const maxStickDistance = 30;

    function updateKeyboardVelocity() {
        if (isJoystickDragging) return;
        playerShip.vx = 0;
        playerShip.vy = 0;
        if (keysHeld.has('arrowleft') || keysHeld.has('a')) playerShip.vx -= playerShip.speed;
        if (keysHeld.has('arrowright') || keysHeld.has('d')) playerShip.vx += playerShip.speed;
        if (keysHeld.has('arrowup') || keysHeld.has('w')) playerShip.vy -= playerShip.speed;
        if (keysHeld.has('arrowdown') || keysHeld.has('s')) playerShip.vy += playerShip.speed;

        // Keep diagonal movement consistent with horizontal/vertical movement.
        if (playerShip.vx !== 0 && playerShip.vy !== 0) {
            playerShip.vx *= Math.SQRT1_2;
            playerShip.vy *= Math.SQRT1_2;
        }
    }

    function handleJoystickMove(clientX, clientY) {
        if (!joystickBase) return;
        const rect = joystickBase.getBoundingClientRect();
        let deltaX = clientX - (rect.left + rect.width / 2);
        let deltaY = clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(deltaX, deltaY);

        if (distance > maxStickDistance) {
            deltaX = (deltaX / distance) * maxStickDistance;
            deltaY = (deltaY / distance) * maxStickDistance;
        }

        if (joystickStick) joystickStick.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        playerShip.vx = (deltaX / maxStickDistance) * playerShip.speed;
        playerShip.vy = (deltaY / maxStickDistance) * playerShip.speed;
    }

    function resetJoystick() {
        if (!isJoystickDragging) return;
        isJoystickDragging = false;
        activePointerId = null;
        if (joystickStick) joystickStick.style.transform = 'translate(0px, 0px)';
        playerShip.vx = 0;
        playerShip.vy = 0;
    }

    function startGame() {
        if (!canvas || !context) return;
        resizeCanvas();
        resetGame();
        gameRunning = true;
        if (startOverlay) startOverlay.classList.add('hidden');
        updateGame();
    }

    startGameBtn?.addEventListener('click', startGame);

    joystickBase?.addEventListener('pointerdown', (event) => {
        if (!gameRunning) return;
        event.preventDefault();
        isJoystickDragging = true;
        activePointerId = event.pointerId;
        try {
            joystickBase.setPointerCapture(event.pointerId);
        } catch (error) {
            // Pointer capture is optional on older browsers.
        }
        handleJoystickMove(event.clientX, event.clientY);
    });

    window.addEventListener('pointermove', (event) => {
        if (isJoystickDragging && event.pointerId === activePointerId) {
            handleJoystickMove(event.clientX, event.clientY);
        }
    });

    window.addEventListener('pointerup', resetJoystick);
    window.addEventListener('pointercancel', resetJoystick);
    window.addEventListener('blur', () => {
        keysHeld.clear();
        resetJoystick();
        updateKeyboardVelocity();
    });

    window.addEventListener('keydown', (event) => {
        if (!gameRunning || event.target.closest('input, textarea, select, button, [contenteditable="true"]')) return;
        const key = event.key.toLowerCase();
        if (['arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'a', 'd', 'w', 's'].includes(key)) {
            event.preventDefault();
            keysHeld.add(key);
            updateKeyboardVelocity();
        }
    });

    window.addEventListener('keyup', (event) => {
        const key = event.key.toLowerCase();
        if (keysHeld.delete(key)) updateKeyboardVelocity();
    });

    if (canvas && context) {
        resizeCanvas();
        if ('ResizeObserver' in window) {
            const canvasResizeObserver = new ResizeObserver(resizeCanvas);
            canvasResizeObserver.observe(canvas.parentElement);
        } else {
            window.addEventListener('resize', resizeCanvas, { passive: true });
        }
    }

    // ---------------------------------------------------------------------
    // CONTACT FORM. Keeps the original /send endpoint and SweetAlert2 toast.
    // ---------------------------------------------------------------------
    const contactForm = $('contactForm');
    const submitButton = $('btnSubmitContact');
    const formResponse = $('formResponse');
    const originalSubmitMarkup = submitButton?.innerHTML || '';

    function showContactToast(icon, title) {
        if (typeof Swal === 'undefined') {
            if (formResponse) {
                formResponse.textContent = title;
                formResponse.classList.remove('hidden');
            }
            return;
        }

        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            theme: 'dark',
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire({ icon, title });
    }

    contactForm?.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!contactForm.reportValidity()) return;

        const username = $('username')?.value.trim() || '';
        const email = $('email')?.value.trim() || '';
        const message = $('message')?.value.trim() || '';

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.setAttribute('aria-busy', 'true');
            submitButton.textContent = 'TRANSMITTING...';
        }

        try {
            const response = await fetch('/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, message })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            showContactToast('success', 'Pesan telah terkirim, Terimakasih!');
            if (formResponse) {
                formResponse.textContent = 'Pesan berhasil dikirim.';
                formResponse.classList.remove('hidden');
            }
            contactForm.reset();
            console.info('Pesan berhasil dikirim.', data);
            playRetroBeep(880, 0.15);
        } catch (error) {
            showContactToast('error', 'Pesan gagal dikirim. Silakan coba lagi.');
            if (formResponse) {
                formResponse.textContent = 'Pesan gagal dikirim. Silakan coba lagi.';
                formResponse.classList.remove('hidden');
            }
            console.error('Gagal mengirim pesan:', error);
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.removeAttribute('aria-busy');
                submitButton.innerHTML = originalSubmitMarkup;
            }
        }
    });

    // Preserve the original short transition before opening social destinations.
    document.addEventListener('click', (event) => {
        const targetLink = event.target.closest('.link-delayed');
        if (!targetLink || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const destination = targetLink.href;
        const delay = prefersReducedMotion ? 0 : 300;
        window.setTimeout(() => {
            window.location.assign(destination);
        }, delay);
    });

    // Final first-frame canvas paint and AOS refresh after the page is ready.
    window.addEventListener('load', () => {
        drawGame();
        if (typeof AOS !== 'undefined') AOS.refresh();
    }, { once: true });
});

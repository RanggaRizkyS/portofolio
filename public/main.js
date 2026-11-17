document.addEventListener('DOMContentLoaded', () => {
    // Init AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 600, once: true, offset: 100 });
    }

    // Load High Score from LocalStorage
    const gameHighScoreEl = document.getElementById('gameHighScore');
    let highScore = 0;

    if (!localStorage.getItem("highScore")) {
        localStorage.setItem("highScore", 0);
    } else {
        highScore = parseInt(localStorage.getItem("highScore")) || 0;
        if (gameHighScoreEl) {
            gameHighScoreEl.textContent = highScore;
        }
    }

    // Site Configuration
    const SITE_CONFIG = {
        profile: {
            name: "Rangga Rizky Saputra",
            subtitle: "Full-Stack Developer & Homelab Hobbiest",
            roleBadge: "PLAYER 1 • CREATOR",
            levelBadge: "LVL 99",
            avatarUrl: "/img/profile.jpeg",

            aboutMeParagraphs: [
                "Hallo! Saya Rangga Rizky, Saya adalah seorang Full-Stack Developer dan cukup paham tentang Server. Journey saya bermula pada kelas 6 SD, Saat maraknya pandemi di masa itu, Saya memutuskan untuk mencoba membuat server minecraft bernama Frost Network. Pada awalnya saya hanya membuat server itu dan membuat community yang dulu cukup dikenal di komunitas minecraft pe, Tetapi saat menginjak kelas 1 SMP, Saya mulai tertarik dengan Plugin dan Website, Awalnya saya memulai Journey saya dengan membuat Project sederhana seperti Plugin UI Customize, GUI Customize, Front-End Website Hosting Store, Website Server Minecraft saya, dan project lainnya. Sekarang saya adalah Full-Stack Web Developer, Creator Plugin Minecraft, khusus untuk Software Paper, NodeJS Specialist. Kedepannya harapan saya terhadap diri saya yaitu lebih berkembang di bidang Programming dan memelajari lebih banyak Framework dan Coding Languages lainnya."
            ],

            typingPhrases: [
                "Homelab Hobbiest",
                "Full-Stack Web Developer",
                "NodeJS Specialist",
                "I Love NPM",
                "Aspiring To Build a Data Center"
            ]
        },

        sidebarNav: [
            { id: "about", label: "01. ABOUT ME", icon: "fa-user", color: "text-arcade-yellow" },
            { id: "skills", label: "02. SKILLS", icon: "fa-bolt", color: "text-arcade-green" },
            { id: "experience", label: "03. ERROR LOG", icon: "fa-scroll", color: "text-arcade-cyan" },
            { id: "minigame", label: "04. MINI GAME", icon: "fa-gamepad", color: "text-arcade-yellow" }
        ],

        skillsSection: {
            title: "POWER-UPS & STATS (SKILLS)",
            subtitle: "Tingkat penguasaan teknologi & keahlian sistem",

            categories: [
                {
                    categoryTitle: "CODING LANGUAGES I LOVE THE MOST",
                    icon: "fa-code",
                    titleColor: "text-arcade-yellow",

                    skills: [
                        { name: "NODE.JS", level: "100%", color: "bg-arcade-green", textColor: "text-arcade-green" },
                        { name: "JAVASCRIPT", level: "85%", color: "bg-arcade-cyan", textColor: "text-arcade-cyan" },
                        { name: "BASH", level: "35%", color: "bg-arcade-yellow", textColor: "text-arcade-yellow" },
                        { name: "JAVA", level: "20%", color: "bg-arcade-amber", textColor: "text-arcade-amber" },
                        { name: "PYTHON", level: "1%", color: "bg-red-600", textColor: "text-red-500" }
                    ]
                },

                {
                    categoryTitle: "SERVERS SOFTWARE",
                    icon: "fa-server",
                    titleColor: "text-arcade-cyan",

                    skills: [
                        { name: "LINUX UBUNTU", level: "99%", color: "bg-arcade-green", textColor: "text-arcade-green" },
                        { name: "PTERODACTYL", level: "95%", color: "bg-arcade-green", textColor: "text-arcade-green" },
                        { name: "MONGODB", level: "75%", color: "bg-arcade-cyan", textColor: "text-arcade-cyan" },
                        { name: "MARIADB", level: "65%", color: "bg-arcade-cyan", textColor: "text-arcade-cyan" },
                        { name: "DOCKER", level: "40%", color: "bg-arcade-yellow", textColor: "text-arcade-yellow" }
                    ]
                }
            ]
        },

        questLog: {
            subtitle: "Riwayat error, eksperimen, dan milestone",
            items: [
                {
                    num: 1,
                    tag: "ERR_LOG_1 • PRESENT",
                    tagColor: "text-arcade-cyan border-arcade-cyan",
                    borderColor: "hover:border-arcade-cyan",
                    title: "Full-Stack Web Developer",
                    subtitle: "Independent",
                    description: "Pengembangan website berbasis Express JS."
                },
                {
                    num: 2,
                    tag: "ERR_LOG_2 • HOMELAB",
                    tagColor: "text-arcade-yellow border-arcade-yellow",
                    borderColor: "hover:border-arcade-yellow",
                    title: "Home Lab System Architect",
                    subtitle: "Personal Server",
                    description: "Mengelola server rumahan dengan basis Proxmox."
                },
                {
                    num: 3,
                    tag: "ERR_LOG_3 • CLI",
                    tagColor: "text-arcade-amber border-arcade-amber",
                    borderColor: "hover:border-arcade-amber",
                    title: "CLI Script",
                    subtitle: "CLI Script Developer",
                    description: "Mengembangkan aplikasi berbasis CLI."
                },
                {
                    num: 4,
                    tag: "ERR_LOG_4 • OWNER SERVER",
                    tagColor: "text-arcade-green border-arcade-green",
                    borderColor: "hover:border-arcade-green",
                    title: "Owner Server Minecraft",
                    subtitle: "Owner Server Minecraft",
                    description: "Merancang server dan menghandle komunitas."
                },
                {
                    num: 5,
                    tag: "ERR_LOG_5 • DATABASE",
                    tagColor: "text-arcade-cyan border-arcade-cyan",
                    borderColor: "hover:border-arcade-cyan",
                    title: "Database Engineer",
                    subtitle: "Database Engineer For Local Network",
                    description: "Menyusun database dan mengelola database berskala menengah."
                }
            ]
        },

        contactSection: {
            title: "INSERT COIN (CONTACT TERMINAL)",
            subtitle: "Kirimkan pesan atau tawaran proyek langsung ke sistem saya",
            btnText: "TRANSMIT MESSAGE (INSERT COIN)"
        },

        footer: {
            copyright: "© 2026 RANGGA RIZKY SAPUTRA • ALL RIGHTS RESERVED"
        }
    };

    function renderSiteFromConfig() {
        document.getElementById('profileImg').src = SITE_CONFIG.profile.avatarUrl;
        document.getElementById('playerName').textContent = SITE_CONFIG.profile.name;
        document.getElementById('playerSubtitle').textContent = SITE_CONFIG.profile.subtitle;
        document.getElementById('playerRoleBadge').textContent = SITE_CONFIG.profile.roleBadge;
        document.getElementById('playerLevelBadge').textContent = SITE_CONFIG.profile.levelBadge;

        const aboutContainer = document.getElementById('aboutMeText');
        
        aboutContainer.innerHTML = `
            <div id="aboutTextWrapper" class="about-desc-wrapper">
                ${SITE_CONFIG.profile.aboutMeParagraphs.map(p => `<p>${p}</p>`).join('')}
            </div>
        `;

        const hintText = document.getElementById('aboutToggleHint');
        function toggleAboutDescription() {
            const isCollapsed = aboutContainer.classList.contains('about-desc-collapsed');
            if (isCollapsed) {
                aboutContainer.classList.remove('about-desc-collapsed');
                aboutContainer.classList.add('about-desc-expanded');
                aboutContainer.setAttribute('aria-expanded', 'true');
                hintText.textContent = "▲ KLIK TEKS UNTUK MENUTUP KEMBALI";
            } else {
                aboutContainer.classList.remove('about-desc-expanded');
                aboutContainer.classList.add('about-desc-collapsed');
                aboutContainer.setAttribute('aria-expanded', 'false');
                hintText.textContent = "▼ KLIK TEKS UNTUK BACA SELENGKAPNYA";
            }
        }

        aboutContainer.style.cursor = 'pointer';
        aboutContainer.addEventListener('click', toggleAboutDescription);

        const sidebarNav = document.getElementById('sidebarNav');
        sidebarNav.innerHTML = SITE_CONFIG.sidebarNav.map(item => `
            <a href="#${item.id}" class="nav-link block p-3 rounded-lg bg-white/5 border border-white/10 hover:border-arcade-yellow text-white transition flex items-center justify-between group cursor-pointer">
                <span class="group-hover:text-arcade-yellow flex items-center gap-3">
                    <i class="fa-solid ${item.icon} ${item.color}"></i>
                    ${item.label}
                </span>
                <i class="fa-solid fa-chevron-right text-gray-500 group-hover:text-arcade-yellow"></i>
            </a>
        `).join('');

        document.getElementById('skillsDesc').textContent = SITE_CONFIG.skillsSection.subtitle;
        const skillsContainer = document.getElementById('skillsContainer');
        
        skillsContainer.innerHTML = SITE_CONFIG.skillsSection.categories.map((cat, catIdx) => {
            const aosEffect = catIdx % 2 === 0 ? 'fade-right' : 'fade-left';
            return `
            <div class="glass-card-grey p-6 rounded-2xl space-y-4" data-aos="${aosEffect}">
                <h3 class="font-pixel text-xs ${cat.titleColor} flex items-center gap-2">
                    <i class="fa-solid ${cat.icon}"></i>
                    ${cat.categoryTitle}
                </h3>
                ${cat.skills.map(sk => `
                    <div class="space-y-1.5">
                        <div class="flex justify-between font-pixel text-[10px] text-gray-300">
                            <span>${sk.name}</span>
                            <span class="${sk.textColor}">LVL ${sk.level}</span>
                        </div>
                        <div class="w-full bg-black/60 rounded-full h-3 border border-white/10 overflow-hidden p-0.5">
                            <div class="${sk.color} h-full rounded-full shadow-lg" style="width: ${sk.level}"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        }).join('');

        document.getElementById('questLogSubtitle').textContent = SITE_CONFIG.questLog.subtitle;
        const questContainer = document.getElementById('questLogContainer');
        
        questContainer.innerHTML = SITE_CONFIG.questLog.items.map((q, idx) => {
            const isReverse = idx % 2 !== 0;
            const aosDirection = isReverse ? 'fade-left' : 'fade-right';

            return `
            <div class="relative flex flex-col ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between group" data-aos="${aosDirection}">
                <div class="w-full md:w-[45%] glass-card-grey p-5 rounded-2xl quest_div">
                    <span class="font-pixel text-[9px] ${q.tagColor} bg-black/60 px-2 py-1 rounded border">
                        ${q.tag}
                    </span>
                    <h3 class="font-pixel text-sm text-white mt-2">${q.title}</h3>
                    <p class="text-xs text-arcade-yellow font-terminal text-base">${q.subtitle}</p>
                    <p class="text-xs text-gray-300 mt-2">${q.description}</p>
                </div>
                <div class="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full glass-card-yellow border border-arcade-yellow flex items-center justify-center font-pixel text-xs text-arcade-yellow my-4 md:my-0">
                    ${q.num}
                </div>
                <div class="hidden md:block w-[45%]"></div>
            </div>
            `;
        }).join('');

        document.getElementById('contactDesc').textContent = SITE_CONFIG.contactSection.subtitle;
    }

    renderSiteFromConfig();

    const sidebar = document.getElementById('arcadeSidebar');
    const sidebarPanel = document.getElementById('sidebarPanel');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');

    function openSidebar() {
        sidebar.classList.remove('sidebar-closed', 'pointer-events-none');
        sidebarPanel.classList.remove('pointer-events-none');
        sidebarBackdrop.classList.remove('pointer-events-none', 'opacity-0');
        sidebarBackdrop.classList.add('opacity-100');
        playRetroBeep(440, 0.1);
    }

    function closeSidebar() {
        sidebar.classList.add('sidebar-closed');
        sidebarBackdrop.classList.remove('opacity-100');
        sidebarBackdrop.classList.add('opacity-0');
        setTimeout(() => {
            sidebar.classList.add('pointer-events-none');
        }, 400);
        playRetroBeep(330, 0.1);
    }

    sidebarToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (sidebar.classList.contains('sidebar-closed')) openSidebar();
        else closeSidebar();
    });

    sidebarCloseBtn.addEventListener('click', closeSidebar);
    sidebarBackdrop.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !sidebar.classList.contains('sidebar-closed')) {
            closeSidebar();
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

    const typingElement = document.getElementById('typingText');
    const phrases = SITE_CONFIG.profile.typingPhrases;
    let phraseIdx = 0, charIdx = 0, isDeleting = false;

    function typeLoop() {
        const currentPhrase = phrases[phraseIdx];
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
        }
        let typeSpeed = isDeleting ? 30 : 60;
        if (!isDeleting && charIdx === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typeSpeed = 500;
        }
        setTimeout(typeLoop, typeSpeed);
    }
    typeLoop();

    let audioCtx = null, audioMuted = true;
    const toggleAudioBtn = document.getElementById('toggleAudioBtn');
    const audioStatus = document.getElementById('audioStatus');
    const audioIcon = document.getElementById('audioIcon');

    function initAudio() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    function playRetroBeep(freq, duration) {
        if (audioMuted) return;
        try {
            initAudio();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {}
    }

    toggleAudioBtn.addEventListener('click', () => {
        audioMuted = !audioMuted;
        if (!audioMuted) {
            initAudio();
            audioStatus.textContent = "ENABLED";
            audioStatus.className = "text-arcade-green";
            audioIcon.className = "fa-solid fa-volume-high";
            playRetroBeep(600, 0.1);
        } else {
            audioStatus.textContent = "MUTED";
            audioStatus.className = "text-arcade-yellow";
            audioIcon.className = "fa-solid fa-volume-xmark";
        }
    });

    const canvas = document.getElementById('spaceGameCanvas');
    const ctx = canvas.getContext('2d');
    const startOverlay = document.getElementById('gameStartOverlay');
    const startGameBtn = document.getElementById('startGameBtn');

    let animationFrameId, gameRunning = false, score = 0, lastShotTime = 0;

    function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const playerShip = { x: canvas.width / 2, y: canvas.height - 40, width: 32, height: 32, speed: 8, vx: 0, vy: 0 };
    let playerBullets = [], alienEnemies = [], explosions = [];

    function spawnAlien() {
        if (alienEnemies.length >= 7) return;
        const size = Math.random() * 12 + 24;
        const speedFactor = 1 + Math.min(score / 4000, 1.5);
        alienEnemies.push({
            x: Math.random() * (canvas.width - size),
            y: -size, width: size, height: size,
            speed: (Math.random() * 1.0 + 1.0) * speedFactor,
            hp: score > 3000 && Math.random() > 0.7 ? 2 : 1,
            color: score > 3000 ? '#ff9900' : '#ffe600'
        });
    }

    function resetGame() {
        score = 0; playerBullets = []; alienEnemies = []; explosions = [];
        playerShip.x = canvas.width / 2 - 16; playerShip.y = canvas.height - 50;
        playerShip.vx = 0; playerShip.vy = 0; lastShotTime = Date.now();
    }

    function handleAutoShoot() {
        const now = Date.now();
        if (now - lastShotTime >= 100) {
            lastShotTime = now;
            playerBullets.push({ x: playerShip.x + 4, y: playerShip.y, width: 4, height: 12, speed: 8 });
            playerBullets.push({ x: playerShip.x + playerShip.width - 8, y: playerShip.y, width: 4, height: 12, speed: 8 });
            playRetroBeep(750, 0.04);
        }
    }

    function updateGame() {
        if (!gameRunning) return;
        handleAutoShoot();
        playerShip.x += playerShip.vx; playerShip.y += playerShip.vy;

        if (playerShip.x < 0) playerShip.x = 0;
        if (playerShip.x + playerShip.width > canvas.width) playerShip.x = canvas.width - playerShip.width;
        if (playerShip.y < 0) playerShip.y = 0;
        if (playerShip.y + playerShip.height > canvas.height) playerShip.y = canvas.height - playerShip.height;

        playerBullets.forEach((b, i) => {
            b.y -= b.speed;
            if (b.y < -20) playerBullets.splice(i, 1);
        });

        if (Math.random() < 0.012 + Math.min(score / 40000, 0.02)) spawnAlien();

        alienEnemies.forEach((alien, aIdx) => {
            alien.y += alien.speed;
            playerBullets.forEach((bullet, bIdx) => {
                if (bullet.x < alien.x + alien.width && bullet.x + bullet.width > alien.x &&
                    bullet.y < alien.y + alien.height && bullet.y + bullet.height > alien.y) {
                    alien.hp -= 1;
                    playerBullets.splice(bIdx, 1);
                    if (alien.hp <= 0) {
                        explosions.push({ x: alien.x + alien.width / 2, y: alien.y + alien.height / 2, radius: 1, maxRadius: 16 });
                        alienEnemies.splice(aIdx, 1);
                        score += 150;
                        playRetroBeep(900, 0.06);
                    }
                }
            });

            if (alien.y + alien.height > canvas.height ||
                (playerShip.x < alien.x + alien.width && playerShip.x + playerShip.width > alien.x &&
                 playerShip.y < alien.y + alien.height && playerShip.y + playerShip.height > alien.y)) {
                gameOver();
            }
        });

        explosions.forEach((exp, i) => {
            exp.radius += 2;
            if (exp.radius > exp.maxRadius) explosions.splice(i, 1);
        });

        drawGame();
        animationFrameId = requestAnimationFrame(updateGame);
    }

    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 20; i++) {
            ctx.fillRect((i * 43) % canvas.width, (i * 71 + Date.now() * 0.08) % canvas.height, 2, 2);
        }

        ctx.fillStyle = '#ffe600';
        ctx.beginPath();
        ctx.moveTo(playerShip.x + playerShip.width / 2, playerShip.y);
        ctx.lineTo(playerShip.x + playerShip.width, playerShip.y + playerShip.height);
        ctx.lineTo(playerShip.x + playerShip.width / 2, playerShip.y + playerShip.height - 6);
        ctx.lineTo(playerShip.x, playerShip.y + playerShip.height);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#00f3ff';
        ctx.fillRect(playerShip.x + playerShip.width / 2 - 3, playerShip.y + playerShip.height - 4, 6, 8 + Math.random() * 4);

        ctx.fillStyle = '#39ff14';
        playerBullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));

        alienEnemies.forEach(alien => {
            ctx.fillStyle = alien.color;
            ctx.beginPath();
            ctx.arc(alien.x + alien.width / 2, alien.y + alien.height / 3, alien.width / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#000000';
            ctx.fillRect(alien.x + 6, alien.y + 6, 4, 4);
            ctx.fillRect(alien.x + alien.width - 10, alien.y + 6, 4, 4);
        });

        explosions.forEach(exp => {
            ctx.strokeStyle = '#ff9900';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(exp.x, exp.y, exp.radius, 0, Math.PI * 2);
            ctx.stroke();
        });

        ctx.font = '10px "Press Start 2P"';
        ctx.fillStyle = '#39ff14';
        ctx.fillText(`ALIENS DESTROYED: ${Math.floor(score / 150)}`, 10, 25);
        ctx.fillText(`SCORE: ${score}`, 10, 42);
    }

    function gameOver() {
        gameRunning = false;
        cancelAnimationFrame(animationFrameId);
        if (score > highScore) { 
            highScore = score; 
            gameHighScoreEl.textContent = highScore; 
            localStorage.setItem("highScore", highScore);
        }
        startOverlay.classList.remove('hidden');
        document.getElementById('overlayTitle').textContent = "GAME OVER";
        document.getElementById('overlaySubtitle').textContent = `FINAL SCORE: ${score} (${Math.floor(score / 150)} Aliens Kills)`;
        playRetroBeep(150, 0.4);
    }

    function startGame() {
        resizeCanvas(); resetGame(); gameRunning = true;
        startOverlay.classList.add('hidden'); updateGame();
    }
    startGameBtn.addEventListener('click', startGame);

    const joystickBase = document.getElementById('joystickBase');
    const joystickStick = document.getElementById('joystickStick');
    let isJoystickDragging = false, activePointerId = null, maxStickDistance = 30;

    function handleJoystickMove(clientX, clientY) {
        const rect = joystickBase.getBoundingClientRect();
        let deltaX = clientX - (rect.left + rect.width / 2);
        let deltaY = clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(deltaX, deltaY);

        if (distance > maxStickDistance) {
            deltaX = (deltaX / distance) * maxStickDistance;
            deltaY = (deltaY / distance) * maxStickDistance;
        }
        joystickStick.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        playerShip.vx = (deltaX / maxStickDistance) * playerShip.speed;
        playerShip.vy = (deltaY / maxStickDistance) * playerShip.speed;
    }

    function resetJoystick() {
        if (!isJoystickDragging) return;
        isJoystickDragging = false; activePointerId = null;
        joystickStick.style.transform = `translate(0px, 0px)`;
        playerShip.vx = 0; playerShip.vy = 0;
    }

    joystickBase.addEventListener('pointerdown', (e) => {
        isJoystickDragging = true; activePointerId = e.pointerId;
        try { joystickBase.setPointerCapture(e.pointerId); } catch (err) {}
        handleJoystickMove(e.clientX, e.clientY);
    });

    window.addEventListener('pointermove', (e) => {
        if (isJoystickDragging && (activePointerId === null || e.pointerId === activePointerId)) {
            handleJoystickMove(e.clientX, e.clientY);
        }
    });

    window.addEventListener('pointerup', resetJoystick);
    window.addEventListener('pointercancel', resetJoystick);

    const keysHeld = {};
    window.addEventListener('keydown', (e) => { keysHeld[e.key] = true; updateKeyboardVelocity(); });
    window.addEventListener('keyup', (e) => { keysHeld[e.key] = false; updateKeyboardVelocity(); });

    function updateKeyboardVelocity() {
        if (isJoystickDragging) return;
        playerShip.vx = 0; playerShip.vy = 0;
        if (keysHeld['ArrowLeft'] || keysHeld['a'] || keysHeld['A']) playerShip.vx = -playerShip.speed;
        if (keysHeld['ArrowRight'] || keysHeld['d'] || keysHeld['D']) playerShip.vx = playerShip.speed;
        if (keysHeld['ArrowUp'] || keysHeld['w'] || keysHeld['W']) playerShip.vy = -playerShip.speed;
        if (keysHeld['ArrowDown'] || keysHeld['s'] || keysHeld['S']) playerShip.vy = playerShip.speed;
    }

    document.getElementById('contactForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;
        let json = {
            "username": username,
            "email": email,
            "message": message
        };

        await fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
        .then(response => {
            if (!response.ok) {
                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    theme: "dark",
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                }).fire({
                    icon: "error",
                    title: "Pesan gagal dikirim."
                });
                throw new Error(response);
            }
            return response.json();
        })
        .then(data => {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                theme: "dark",
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire({
                icon: "success",
                title: "Pesan telah terkirim, Terimakasih!"
            });
            console.log('Berhasil:', data);
        })
        .catch(error => {
            console.log('Gagal:', error);
        });

        playRetroBeep(880, 0.15);
    });

    document.addEventListener('click', function(e) {
        const targetLink = e.target.closest('.link-delayed');
        
        if (targetLink) {
            e.preventDefault();
            const destination = targetLink.href;

            setTimeout(() => {
                window.location.href = destination;
            }, 300);
        }
    });

    window.addEventListener('load', () => { 
        drawGame(); 
        if (typeof AOS !== 'undefined') {
            AOS.refresh(); 
        }
    });
});

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const $ = (id) => document.getElementById(id);
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    const SITE_CONFIG = {
        profile: {
            name: 'Rangga Rizky Saputra',
            avatarUrl: '/img/profile.jpeg',
            typingPhrases: [
                'Homelab Enthusiast',
                'Full-Stack Web Developer',
                'Node.js Specialist',
                'I Love NPM',
                'Aspiring to Build a Data Center'
            ]
        },

        techStack: {
            frontend: [
                { id: 'html5', name: 'HTML5', icon: 'fa-brands fa-html5' },
                { id: 'css3', name: 'CSS3', icon: 'fa-brands fa-css3-alt' },
                { id: 'javascript', name: 'JavaScript', icon: 'fa-brands fa-js' },
                { id: 'tailwind', name: 'Tailwind CSS', icon: 'fa-solid fa-wind' },
                { id: 'bootstrap', name: 'Bootstrap', icon: 'fa-brands fa-bootstrap' },
                { id: 'aos', name: 'AOS', icon: 'fa-solid fa-wand-magic-sparkles' }
            ],

            backend: [
                { id: 'nodejs', name: 'Node.js', icon: 'fa-brands fa-node-js' },
                { id: 'express', name: 'Express.js', icon: 'fa-solid fa-server' },
                { id: 'mariadb', name: 'MariaDB', icon: 'fa-solid fa-database' },
                { id: 'mongodb', name: 'MongoDB', icon: 'fa-solid fa-leaf' },
                { id: 'java', name: 'Java', icon: 'fa-brands fa-java' },
                { id: 'python', name: 'Python', icon: 'fa-brands fa-python' },
                { id: 'docker', name: 'Docker', icon: 'fa-brands fa-docker' },
                { id: 'linux', name: 'Linux', icon: 'fa-brands fa-linux' },
                { id: 'proxmox', name: 'Proxmox', icon: 'fa-solid fa-cubes-stacked' },
                { id: 'pterodactyl', name: 'Pterodactyl', icon: 'fa-solid fa-gamepad' }
            ]
        },

        experience: [
            {
                date: '01 / PRESENT',
                type: 'DEVELOPMENT',
                title: 'Full-Stack Web Developer',
                subtitle: 'Independent',
                description: 'Pengembangan website dan aplikasi berbasis Express.js.'
            },
            {
                date: '02 / HOMELAB',
                type: 'INFRASTRUCTURE',
                title: 'Home Lab System Architect',
                subtitle: 'Personal Server',
                description: 'Mengelola server rumahan dengan basis Proxmox dan layanan self-hosted.'
            },
            {
                date: '03 / CLI',
                type: 'SOFTWARE',
                title: 'CLI Script Developer',
                subtitle: 'Command Line Tools',
                description: 'Mengembangkan aplikasi dan utility berbasis command line.'
            },
            {
                date: '04 / GAME SERVER',
                type: 'COMMUNITY',
                title: 'Owner Server Minecraft',
                subtitle: 'Minecraft Server',
                description: 'Merancang server Minecraft serta mengelola kebutuhan komunitas.'
            },
            {
                date: '05 / DATABASE',
                type: 'DATA',
                title: 'Database Engineer',
                subtitle: 'Local Network',
                description: 'Menyusun struktur database dan mengelola database berskala menengah.'
            }
        ],

        projects: {
            countryFlagGuesser: {
                title: 'Country Flag Guesser',
                category: 'Web Application',
                url: 'https://country-flag-guesser.vercel.app',
                description: 'Menebak negara berdasarkan bendera yang ditampilkan.'
            }
        }
    };

    // ---------------------------------------------------------------
    // AOS
    // ---------------------------------------------------------------

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 850,
            easing: 'ease-out-cubic',
            once: true,
            offset: 90,
            mirror: false,
            disable: prefersReducedMotion
        });
    }

    // ---------------------------------------------------------------
    // RENDER TECH STACK
    // ---------------------------------------------------------------

    function renderTechItems(containerId, items) {
        const container = $(containerId);
        if (!container) return;

        container.innerHTML = items.map((item, index) => `
            <button
                class="tech-item"
                type="button"
                data-tech-item
                data-tech-id="${item.id}"
                aria-label="${item.name}. Geser untuk mengatur urutan. Gunakan tombol panah untuk memindahkan dengan keyboard."
                title="Drag untuk mengatur posisi"
                data-aos="fade-up"
                data-aos-delay="${index * 35}"
            >
                <span class="tech-item__icon">
                    <i class="${item.icon}" aria-hidden="true"></i>
                </span>

                <span class="tech-item__name">${item.name}</span>

                <span class="tech-item__grip" aria-hidden="true">
                    <i class="fa-solid fa-grip-vertical"></i>
                </span>
            </button>
        `).join('');
    }

    function renderTechStack() {
        renderTechItems(
            'frontendTechList',
            SITE_CONFIG.techStack.frontend
        );

        renderTechItems(
            'backendTechList',
            SITE_CONFIG.techStack.backend
        );
    }

    // ---------------------------------------------------------------
    // RENDER EXPERIENCE
    // ---------------------------------------------------------------

    function renderExperience() {
        const container = $('questLogContainer');
        if (!container) return;

        container.innerHTML = SITE_CONFIG.experience.map((item, index) => `
            <article
                class="timeline-item"
                data-aos="fade-up"
                data-aos-delay="${index * 70}"
            >
                <span class="timeline-marker" aria-hidden="true">
                    ${String(index + 1).padStart(2, '0')}
                </span>

                <div class="timeline-card">
                    <div class="timeline-card__meta">
                        <span>${item.date}</span>
                        <span>${item.type}</span>
                    </div>

                    <h3>${item.title}</h3>

                    <div class="timeline-card__subtitle">
                        ${item.subtitle}
                    </div>

                    <p>${item.description}</p>
                </div>
            </article>
        `).join('');
    }

    renderTechStack();
    renderExperience();

    if (typeof AOS !== 'undefined') {
        AOS.refreshHard ? AOS.refreshHard() : AOS.refresh();
    }

    // ---------------------------------------------------------------
    // GITHUB CONTRIBUTION CALENDAR
    // ---------------------------------------------------------------

    const calendar = document.querySelector('.calendar');

    if (calendar && typeof window.GitHubCalendar === 'function') {
        try {
            GitHubCalendar('.calendar', 'RanggaRizkyS', {
                tooltips: true,
                global_stats: true,
                cache: 86400,
                cellSize: 12,
                cellGap: 3,

                summary_html: `
                    <div class="gc-stats">
                        <article class="gc-stat gc-stat-total">
                            <strong>{{last_year}}</strong>
                            <span>Total Contributions</span>
                        </article>

                        <article class="gc-stat">
                            <strong>{{longest_streak}} days</strong>
                            <span>Longest Streak</span>
                            <small>{{longest_streak_range}}</small>
                        </article>

                        <article class="gc-stat">
                            <strong>{{current_streak}} days</strong>
                            <span>Current Streak</span>
                            <small>{{current_streak_range}}</small>
                        </article>
                    </div>

                    <p class="gc-range">
                        Activity from {{date_range}}
                    </p>
                `
            });
        } catch (error) {
            console.error('GitHub Calendar gagal dimuat:', error);
            calendar.textContent =
                'GitHub activity belum dapat dimuat. Silakan kunjungi profil GitHub.';
        }
    } else if (calendar) {
        calendar.textContent =
            'GitHub activity belum dapat dimuat. Periksa file /github.js.';
    }

    // ---------------------------------------------------------------
    // ABOUT TEXT EXPAND / COLLAPSE
    // ---------------------------------------------------------------

    const aboutText = $('aboutMeText');
    const aboutMoreButton = $('aboutMore');

    aboutMoreButton?.addEventListener('click', () => {
        const expanded =
            aboutMoreButton.getAttribute('aria-expanded') === 'true';

        aboutMoreButton.setAttribute(
            'aria-expanded',
            String(!expanded)
        );

        aboutText?.classList.toggle('is-expanded', !expanded);

        aboutMoreButton.innerHTML = expanded
            ? 'Read more <i class="fa-solid fa-arrow-down" aria-hidden="true"></i>'
            : 'Show less <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';
    });

    // ---------------------------------------------------------------
    // TYPING EFFECT
    // ---------------------------------------------------------------

    const typingElement = $('typingText');
    const phrases = SITE_CONFIG.profile.typingPhrases;

    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let typingTimer = null;

    function typeNext() {
        if (!typingElement || document.hidden) return;

        const phrase = phrases[phraseIndex];

        characterIndex += deleting ? -1 : 1;

        typingElement.textContent = phrase.slice(0, characterIndex);

        let delay = deleting ? 27 : 55;

        if (!deleting && characterIndex === phrase.length) {
            deleting = true;
            delay = 1900;
        } else if (deleting && characterIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 400;
        }

        typingTimer = window.setTimeout(typeNext, delay);
    }

    if (typingElement) {
        if (prefersReducedMotion) {
            typingElement.textContent = phrases[0];
        } else {
            typeNext();
        }
    }

    document.addEventListener('visibilitychange', () => {
        window.clearTimeout(typingTimer);

        if (!document.hidden && !prefersReducedMotion && typingElement) {
            typeNext();
        }
    });

    // ---------------------------------------------------------------
    // SCROLL UI + NAVIGATION ACTIVE STATE
    // ---------------------------------------------------------------

    const siteHeader = $('siteHeader');
    const heroSection = $('about');
    const techStackSection = $('tech-stack');
    const progressBar = $('readingProgress');

    const navLinks = [
        ...document.querySelectorAll('[data-nav-link]')
    ];

    const mobileNavLinks = [
        ...document.querySelectorAll('[data-menu-link]')
    ];

    const observedSections = [
        ...document.querySelectorAll('.page-section[id]')
    ];

    let scrollTicking = false;

    function updateActiveNavigation() {
        if (!observedSections.length) return;

        // Selalu hitung ulang dari posisi aktual section.
        // Ini bekerja ketika scrolling ke bawah maupun ke atas.
        const activationLine = Math.min(
            window.innerHeight * 0.42,
            260
        );

        let activeSection = observedSections[0];

        for (const section of observedSections) {
            if (section.getBoundingClientRect().top <= activationLine) {
                activeSection = section;
            } else {
                break;
            }
        }

        const activeHash = `#${activeSection.id}`;

        [...navLinks, ...mobileNavLinks].forEach((link) => {
            const active = link.getAttribute('href') === activeHash;

            link.classList.toggle('is-active', active);

            if (active) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function updateScrollUI() {
        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollableHeight > 0
            ? (window.scrollY / scrollableHeight) * 100
            : 0;

        if (progressBar) {
            progressBar.style.width =
                `${Math.min(100, Math.max(0, progress))}%`;
        }

        // Navbar berubah menjadi pill setelah Tech Stack menutupi
        // sekitar 30% bagian Hero.
        if (siteHeader && techStackSection && heroSection) {
            const techTop =
                techStackSection.getBoundingClientRect().top;

            const shouldFloat =
                techTop <= window.innerHeight * 0.7;

            siteHeader.classList.toggle('is-floating', shouldFloat);
        }

        updateActiveNavigation();

        scrollTicking = false;
    }

    function requestScrollUpdate() {
        if (scrollTicking) return;

        scrollTicking = true;

        window.requestAnimationFrame(updateScrollUI);
    }

    window.addEventListener(
        'scroll',
        requestScrollUpdate,
        { passive: true }
    );

    window.addEventListener(
        'resize',
        requestScrollUpdate,
        { passive: true }
    );

    window.addEventListener(
        'hashchange',
        requestScrollUpdate
    );

    updateScrollUI();

    // ---------------------------------------------------------------
    // MOBILE NAVIGATION
    // ---------------------------------------------------------------

    const mobileMenu = $('mobileMenu');
    const mobileMenuToggle = $('mobileMenuToggle');
    const mobileMenuClose = $('mobileMenuClose');

    let menuIsOpen = false;

    function openMobileMenu() {
        if (!mobileMenu || menuIsOpen) return;

        menuIsOpen = true;

        mobileMenu.inert = false;
        mobileMenu.setAttribute('aria-hidden', 'false');
        mobileMenu.classList.add('is-open');

        mobileMenuToggle?.setAttribute(
            'aria-expanded',
            'true'
        );

        document.body.classList.add('menu-open');

        mobileMenuClose?.focus();
    }

    function closeMobileMenu(restoreFocus = true) {
        if (!mobileMenu || !menuIsOpen) return;

        menuIsOpen = false;

        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenu.inert = true;

        mobileMenuToggle?.setAttribute(
            'aria-expanded',
            'false'
        );

        document.body.classList.remove('menu-open');

        if (restoreFocus) {
            mobileMenuToggle?.focus();
        }
    }

    mobileMenuToggle?.addEventListener('click', () => {
        menuIsOpen
            ? closeMobileMenu(false)
            : openMobileMenu();
    });

    mobileMenuClose?.addEventListener(
        'click',
        () => closeMobileMenu()
    );

    mobileMenu?.addEventListener('click', (event) => {
        if (event.target === mobileMenu) {
            closeMobileMenu();
        }
    });

    mobileMenu?.querySelectorAll('[data-menu-link]').forEach((link) => {
        link.addEventListener('click', () => {
            closeMobileMenu(false);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuIsOpen) {
            closeMobileMenu();
        }
    });

    // ---------------------------------------------------------------
    // TECH STACK DRAG AND DROP
    // Mouse, pen, touch and keyboard support.
    // Reorder within a lane or move across lanes.
    // ---------------------------------------------------------------

    const techStackBoard = $('techStackBoard');
    const techStackStatus = $('techStackStatus');

    if (techStackBoard) {
        let pendingDrag = null;

        const DRAG_THRESHOLD = 7;

        function announceTechMove(item, list) {
            const lane = list.closest('[data-tech-lane]');

            const laneName =
                lane?.dataset.techLane === 'frontend'
                    ? 'Frontend'
                    : 'Backend';

            const position = [
                ...list.querySelectorAll('[data-tech-item]')
            ].indexOf(item) + 1;

            if (techStackStatus) {
                techStackStatus.textContent =
                    `${item.querySelector('.tech-item__name')?.textContent || 'Item'} dipindahkan ke ${laneName}, posisi ${position}.`;
            }
        }

        function beginPointerDrag(event, state) {
            const item = state.item;
            const rect = item.getBoundingClientRect();

            const placeholder = document.createElement('div');

            placeholder.className = 'tech-item-placeholder';
            placeholder.setAttribute('aria-hidden', 'true');

            placeholder.style.width = `${rect.width}px`;
            placeholder.style.height = `${rect.height}px`;

            item.parentElement.insertBefore(placeholder, item);

            item.classList.add('is-dragging');

            item.style.position = 'fixed';
            item.style.left = `${rect.left}px`;
            item.style.top = `${rect.top}px`;
            item.style.width = `${rect.width}px`;
            item.style.height = `${rect.height}px`;
            item.style.margin = '0';
            item.style.pointerEvents = 'none';
            item.style.transition = 'none';

            state.placeholder = placeholder;
            state.offsetX = event.clientX - rect.left;
            state.offsetY = event.clientY - rect.top;
            state.active = true;

            document.body.classList.add('tech-dragging');
        }

        techStackBoard.addEventListener('pointerdown', (event) => {
            const item = event.target.closest('[data-tech-item]');

            if (
                !item ||
                !techStackBoard.contains(item) ||
                (event.pointerType === 'mouse' && event.button !== 0)
            ) {
                return;
            }

            // Di touch/pen, drag dimulai dari grip.
            // Area lain tetap dapat dipakai untuk scroll halaman.
            if (
                event.pointerType !== 'mouse' &&
                !event.target.closest('.tech-item__grip')
            ) {
                return;
            }

            pendingDrag = {
                item,
                pointerId: event.pointerId,
                startX: event.clientX,
                startY: event.clientY,
                active: false,
                originList: item.parentElement,
                originNext: item.nextElementSibling
            };
        });

        document.addEventListener('pointermove', (event) => {
            if (
                !pendingDrag ||
                event.pointerId !== pendingDrag.pointerId
            ) {
                return;
            }

            const state = pendingDrag;

            const distance = Math.hypot(
                event.clientX - state.startX,
                event.clientY - state.startY
            );

            if (!state.active) {
                if (distance < DRAG_THRESHOLD) return;

                beginPointerDrag(event, state);
            }

            event.preventDefault();

            state.item.style.left =
                `${event.clientX - state.offsetX}px`;

            state.item.style.top =
                `${event.clientY - state.offsetY}px`;

            const element = document.elementFromPoint(
                event.clientX,
                event.clientY
            );

            const targetLane =
                element?.closest('[data-tech-lane]');

            const targetList =
                targetLane?.querySelector('[data-tech-list]');

            techStackBoard
                .querySelectorAll('.tech-lane.is-drop-target')
                .forEach((lane) => {
                    lane.classList.remove('is-drop-target');
                });

            if (
                !targetList ||
                !techStackBoard.contains(targetList)
            ) {
                return;
            }

            targetLane.classList.add('is-drop-target');

            const targetItem =
                element.closest('[data-tech-item]');

            if (
                targetItem &&
                targetItem !== state.item &&
                targetItem.parentElement === targetList
            ) {
                const rect = targetItem.getBoundingClientRect();

                const after =
                    event.clientY > rect.top + rect.height / 2 ||
                    (
                        Math.abs(
                            event.clientY - (rect.top + rect.height / 2)
                        ) < 8 &&
                        event.clientX > rect.left + rect.width / 2
                    );

                targetList.insertBefore(
                    state.placeholder,
                    after ? targetItem.nextSibling : targetItem
                );
            } else if (
                element.closest('[data-tech-list]') ||
                targetLane
            ) {
                // Drop di area kosong akan menambahkan item ke akhir list.
                if (
                    state.placeholder.parentElement !== targetList ||
                    !targetList.lastElementChild ||
                    state.placeholder !== targetList.lastElementChild
                ) {
                    targetList.appendChild(state.placeholder);
                }
            }
        }, { passive: false });

        function finishPointerDrag(event, cancelled = false) {
            if (
                !pendingDrag ||
                event.pointerId !== pendingDrag.pointerId
            ) {
                return;
            }

            const state = pendingDrag;
            pendingDrag = null;

            techStackBoard
                .querySelectorAll('.tech-lane.is-drop-target')
                .forEach((lane) => {
                    lane.classList.remove('is-drop-target');
                });

            if (
                state.active &&
                state.placeholder?.isConnected
            ) {
                if (cancelled) {
                    state.placeholder.remove();

                    state.originList.insertBefore(
                        state.item,
                        state.originNext?.parentElement === state.originList
                            ? state.originNext
                            : null
                    );
                } else {
                    state.placeholder.replaceWith(state.item);

                    announceTechMove(
                        state.item,
                        state.item.parentElement
                    );
                }
            }

            state.item.classList.remove('is-dragging');

            [
                'position',
                'left',
                'top',
                'width',
                'height',
                'margin',
                'pointerEvents',
                'transition'
            ].forEach((property) => {
                state.item.style[property] = '';
            });

            document.body.classList.remove('tech-dragging');
        }

        document.addEventListener('pointerup', (event) => {
            finishPointerDrag(event, false);
        });

        document.addEventListener('pointercancel', (event) => {
            finishPointerDrag(event, true);
        });

        // Keyboard support:
        // Arrow keys = reorder.
        // Alt + Left/Right = move to another category.
        techStackBoard.addEventListener('keydown', (event) => {
            const item = event.target.closest('[data-tech-item]');
            if (!item) return;

            const list = item.parentElement;

            const otherList = techStackBoard.querySelector(
                `[data-tech-list]:not(#${list.id})`
            );

            if (
                event.altKey &&
                (
                    event.key === 'ArrowLeft' ||
                    event.key === 'ArrowRight'
                )
            ) {
                event.preventDefault();

                if (otherList) {
                    otherList.appendChild(item);
                    item.focus();

                    announceTechMove(item, otherList);
                }

                return;
            }

            if (
                ![
                    'ArrowUp',
                    'ArrowDown',
                    'ArrowLeft',
                    'ArrowRight'
                ].includes(event.key)
            ) {
                return;
            }

            event.preventDefault();

            const siblings = [
                ...list.querySelectorAll('[data-tech-item]')
            ];

            const index = siblings.indexOf(item);

            const backwards =
                event.key === 'ArrowUp' ||
                event.key === 'ArrowLeft';

            const neighbour =
                siblings[index + (backwards ? -1 : 1)];

            if (!neighbour) return;

            if (backwards) {
                list.insertBefore(item, neighbour);
            } else {
                list.insertBefore(item, neighbour.nextSibling);
            }

            item.focus();
            announceTechMove(item, list);
        });
    }

    // ---------------------------------------------------------------
    // PROJECT DETAIL POPUP
    // ---------------------------------------------------------------

    function openProjectDetails(projectKey) {
        const project = SITE_CONFIG.projects[projectKey];
        if (!project) return;

        if (typeof Swal === 'undefined') {
            console.warn(
                'SweetAlert2 belum tersedia; periksa /vendor/sweetalert2.all.min.js.'
            );
            return;
        }

        Swal.fire({
            title: project.title,
            text: project.description,
            imageUrl: project.image,
            imageAlt: `Preview ${project.title}`,
            imageWidth: '100%',
            imageHeight: 'auto',
            confirmButtonText: 'Close preview',
            showCloseButton: true,
            customClass: {
                popup: 'portfolio-swal-popup'
            }
        });
    }

    document.querySelectorAll('[data-project]').forEach((button) => {
        button.addEventListener('click', () => {
            const projectKey = button.dataset.project;
            const project = SITE_CONFIG.projects[projectKey];

            if (!project?.url) return;

            window.location.href = project.url;
        });
    });

    // ---------------------------------------------------------------
    // CONTACT FORM
    // Existing POST /send endpoint is preserved.
    // ---------------------------------------------------------------

    const contactForm = $('contactForm');
    const submitButton = $('btnSubmitContact');
    const formResponse = $('formResponse');

    const originalSubmitMarkup =
        submitButton?.innerHTML || '';

    function showContactToast(icon, title) {
        if (typeof Swal === 'undefined') {
            if (formResponse) {
                formResponse.textContent = title;
                formResponse.hidden = false;
            }

            return;
        }

        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3200,
            timerProgressBar: true,
            theme: 'dark'
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

            submitButton.setAttribute(
                'aria-busy',
                'true'
            );

            submitButton.innerHTML = `
                <span>Sending...</span>
                <i class="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i>
            `;
        }

        try {
            const response = await fetch('/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    message
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            showContactToast(
                'success',
                'Pesan berhasil dikirim. Terima kasih!'
            );

            if (formResponse) {
                formResponse.textContent =
                    'Pesan berhasil dikirim. Terima kasih sudah menghubungi saya.';

                formResponse.hidden = false;
            }

            contactForm.reset();

            console.info('Pesan berhasil dikirim.', data);

        } catch (error) {
            console.error('Gagal mengirim pesan:', error);

            showContactToast(
                'error',
                'Pesan gagal dikirim. Silakan coba lagi.'
            );

            if (formResponse) {
                formResponse.textContent =
                    'Pesan gagal dikirim. Silakan coba lagi.';

                formResponse.hidden = false;
            }

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.removeAttribute('aria-busy');
                submitButton.innerHTML = originalSubmitMarkup;
            }
        }
    });

    // ---------------------------------------------------------------
    // FOOTER YEAR
    // ---------------------------------------------------------------

    const currentYear = $('currentYear');

    if (currentYear) {
        currentYear.textContent = String(new Date().getFullYear());
    }

    // ---------------------------------------------------------------
    // FINAL REFRESH
    // ---------------------------------------------------------------

    window.addEventListener('load', () => {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        updateScrollUI();
    }, { once: true });
});

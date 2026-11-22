'use strict';

(function (global) {
    const DEFAULTS = {
        proxy: 'https://api.bloggify.net/gh-calendar/?username=',
        cache: 86400,
        tooltips: true,
        global_stats: true,
        summary_html: '',
        cellSize: 12,
        cellGap: 3,
        accent: '#39d353'
    };

    const esc = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));

    const midnight = date => new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const addDays = (date, n) => {
        const d = new Date(date);
        d.setDate(d.getDate() + n);
        return d;
    };

    const dateKey = date =>
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    const fmt = (date, options) => date.toLocaleDateString('en-US', options);

    // =========================================================
    // PARSE CONTRIBUTIONS
    // =========================================================

    function parseDays(calendar) {
        const cells = [...calendar.querySelectorAll('td.ContributionCalendar-day[data-date]')];

        return cells.map(cell => {
            const date = new Date(`${cell.dataset.date}T00:00:00`);

            const label =
                calendar.querySelector(`[for="${CSS.escape(cell.id)}"]`) ||
                document.querySelector(`[for="${CSS.escape(cell.id)}"]`);

            const text =
                label?.textContent ||
                cell.getAttribute('aria-label') ||
                cell.getAttribute('title') ||
                '';

            const match = text.match(/(\d[\d,]*|no)\s+contributions?/i);

            const count = match
                ? (match[1].toLowerCase() === 'no'
                    ? 0
                    : Number(match[1].replace(/,/g, '')))
                : Number(cell.dataset.count || 0);

            return {
                date,
                count: Number.isFinite(count) ? count : 0,
                level: Number(cell.dataset.level || 0)
            };
        })
        .filter(d => !Number.isNaN(d.date.getTime()))
        .sort((a, b) => a.date - b.date);
    }

    // =========================================================
    // CALCULATE STATS
    // =========================================================

    function stats(days) {
        const total = days.reduce((sum, d) => sum + d.count, 0);

        let longest = 0;
        let longestStart = null;
        let longestEnd = null;
        let run = 0;
        let runStart = null;

        days.forEach(d => {
            if (d.count > 0) {
                if (!run) runStart = d.date;

                run++;

                if (run > longest) {
                    longest = run;
                    longestStart = runStart;
                    longestEnd = d.date;
                }
            } else {
                run = 0;
                runStart = null;
            }
        });

        const today = midnight(new Date());

        let i = days.length - 1;

        while (i >= 0 && midnight(days[i].date) > today) {
            i--;
        }

        let current = 0;
        let currentStart = null;
        let currentEnd = null;

        if (
            i >= 0 &&
            days[i].count > 0 &&
            (today - midnight(days[i].date)) <= 86400000
        ) {
            currentEnd = days[i].date;

            while (i >= 0 && days[i].count > 0) {
                currentStart = days[i].date;
                current++;
                i--;
            }
        }

        const rangeStart = addDays(new Date(), -364);

        return {
            last_year: total,

            longest_streak: longest,

            longest_streak_range: longestStart
                ? `${fmt(longestStart, { month: 'short', day: 'numeric' })} – ${fmt(longestEnd, { month: 'short', day: 'numeric' })}`
                : 'No streak',

            current_streak: current,

            current_streak_range: currentStart
                ? `${fmt(currentStart, { month: 'short', day: 'numeric' })} – ${fmt(currentEnd, { month: 'short', day: 'numeric' })}`
                : 'No streak',

            last_contributed:
                days.filter(d => d.count > 0).at(-1)?.date || null,

            date_range: `${fmt(rangeStart, { month: 'short', day: 'numeric', year: 'numeric' })} – ${fmt(new Date(), { month: 'short', day: 'numeric', year: 'numeric' })}`
        };
    }

    // =========================================================
    // SUMMARY TEMPLATE
    // =========================================================

    function templateHTML(template, values) {
        return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
            values[key] == null ? '' : esc(values[key])
        );
    }

    // =========================================================
    // SVG GRAPH
    // =========================================================

    function buildGraph(days, settings) {
        const size = settings.cellSize;
        const gap = settings.cellGap;
        const step = size + gap;

        if (!days.length) {
            return '<p class="gc-empty">No contribution data found.</p>';
        }

        const first = midnight(days[0].date);
        const last = midnight(days[days.length - 1].date);

        const start = new Date(first);
        start.setDate(start.getDate() - start.getDay());

        const end = new Date(last);
        end.setDate(end.getDate() + (6 - end.getDay()));

        const weekCount = Math.ceil(
            (end - start + 86400000) / (7 * 86400000)
        );

        const left = 30;
        const top = 28;
        const monthHeight = 19;

        const width = left + weekCount * step + 5;
        const height = top + 7 * step + monthHeight + 10;

        const byDate = new Map(
            days.map(d => [dateKey(d.date), d])
        );

        // Month labels
        let monthLabels = '';
        let prevMonth = -1;

        for (let w = 0; w < weekCount; w++) {
            const date = addDays(start, w * 7);
            const month = date.getMonth();

            if (month !== prevMonth) {
                monthLabels += `
                    <text
                        class="gc-month"
                        x="${left + w * step}"
                        y="15"
                    >${fmt(date, { month: 'short' })}</text>
                `;

                prevMonth = month;
            }
        }

        // Weekday labels
        const weekdayLabels = [
            { day: 1, label: 'Mon' },
            { day: 3, label: 'Wed' },
            { day: 5, label: 'Fri' }
        ]
        .map(({ day, label }) => `
            <text
                class="gc-weekday"
                x="0"
                y="${top + day * step + size - 2}"
            >${label}</text>
        `)
        .join('');

        // Contribution cells
        let cells = '';

        for (let w = 0; w < weekCount; w++) {
            for (let dow = 0; dow < 7; dow++) {
                const date = addDays(start, w * 7 + dow);
                const item = byDate.get(dateKey(date));

                if (!item || date < first || date > last) continue;

                const level = Math.max(0, Math.min(4, item.level));

                const title =
                    `${item.count} contribution${item.count === 1 ? '' : 's'} on ` +
                    `${fmt(date, {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}`;

                cells += `
                    <rect
                        class="gc-day level-${level}"
                        data-date="${dateKey(date)}"
                        data-count="${item.count}"
                        aria-label="${esc(title)}"
                        x="${left + w * step}"
                        y="${top + dow * step}"
                        width="${size}"
                        height="${size}"
                        rx="3"
                    />
                `;
            }
        }

        return `
            <svg
                class="gc-heatmap"
                viewBox="0 0 ${width} ${height}"
                role="img"
                aria-label="GitHub contribution calendar"
                preserveAspectRatio="xMinYMin meet"
            >
                ${monthLabels}
                ${weekdayLabels}
                ${cells}
            </svg>
        `;
    }

    // =========================================================
    // TOOLTIP
    // =========================================================

    function addTooltip(container, enabled) {
        if (!enabled) return;

        let tip = document.querySelector('.gc-tooltip');

        if (!tip) {
            tip = document.createElement('div');
            tip.className = 'gc-tooltip';
            document.body.appendChild(tip);
        }

        container.querySelectorAll('.gc-day').forEach(cell => {
            cell.addEventListener('pointerenter', () => {
                const d = new Date(`${cell.dataset.date}T00:00:00`);
                const n = Number(cell.dataset.count || 0);

                tip.innerHTML = `
                    <strong>
                        ${n} contribution${n === 1 ? '' : 's'}
                    </strong>
                    <span>
                        ${esc(fmt(d, {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        }))}
                    </span>
                `;

                tip.style.visibility = 'visible';
                tip.style.opacity = '1';

                const r = cell.getBoundingClientRect();
                const tr = tip.getBoundingClientRect();

                let x = r.left + r.width / 2 - tr.width / 2;
                let y = r.top - tr.height - 9;

                x = Math.max(
                    8,
                    Math.min(x, window.innerWidth - tr.width - 8)
                );

                if (y < 8) {
                    y = r.bottom + 9;
                }

                tip.style.left = `${x}px`;
                tip.style.top = `${y}px`;
            });

            cell.addEventListener('pointerleave', () => {
                tip.style.opacity = '0';
                tip.style.visibility = 'hidden';
            });
        });
    }

    // =========================================================
    // MAIN FUNCTION
    // =========================================================

    function GitHubCalendar(selector, username, options = {}) {
        const container =
            typeof selector === 'string'
                ? document.querySelector(selector)
                : selector;

        if (!container) {
            console.error('[GitHubCalendar] Target not found:', selector);
            return null;
        }

        const settings = { ...DEFAULTS, ...options };

        const cacheKey = `gh_calendar_content.${username}`;
        const expiryKey = `gh_calendar_expire.${username}`;

        container.innerHTML = `
            <div class="gc-loading">
                Loading GitHub activity…
            </div>
        `;

        // -----------------------------------------------------
        // FETCH HTML
        // -----------------------------------------------------

        async function fetchHTML(force = false) {
            if (!force && settings.cache > 0) {
                try {
                    const expiry = Number(
                        localStorage.getItem(expiryKey) || 0
                    );

                    const cached = localStorage.getItem(cacheKey);

                    if (cached && Date.now() < expiry) {
                        return cached;
                    }
                } catch (_) {}
            }

            const response = await fetch(
                settings.proxy + encodeURIComponent(username),
                { cache: 'no-store' }
            );

            if (!response.ok) {
                throw new Error(
                    `Calendar request failed (${response.status})`
                );
            }

            const html = await response.text();

            if (!html.trim()) {
                throw new Error('Calendar API returned empty HTML');
            }

            if (settings.cache > 0) {
                try {
                    localStorage.setItem(cacheKey, html);

                    localStorage.setItem(
                        expiryKey,
                        String(Date.now() + settings.cache * 1000)
                    );
                } catch (_) {}
            }

            return html;
        }

        // -----------------------------------------------------
        // RENDER
        // -----------------------------------------------------

        async function render(force = false) {
            try {
                const source = await fetchHTML(force);

                const parsed = new DOMParser().parseFromString(
                    source,
                    'text/html'
                );

                const calendar = parsed.querySelector(
                    '.js-yearly-contributions'
                );

                if (!calendar) {
                    throw new Error(
                        'Contribution graph element not found in response'
                    );
                }

                const days = parseDays(calendar);

                if (!days.length) {
                    throw new Error(
                        'No dated contribution cells found'
                    );
                }

                const s = stats(days);

                const summary = settings.summary_html || `
                    <div class="gc-stats">
                        <article class="gc-stat">
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
                `;

                container.innerHTML = `
                    <section class="gc-card">
                        <header class="gc-heading">
                            <span class="gc-total">
                                ${s.last_year.toLocaleString('en-US')}
                            </span>
                            <span>contributions in the last year</span>
                        </header>

                        <div class="gc-graph-wrap">
                            ${buildGraph(days, settings)}

                            <div class="gc-legend">
                                <span>Less</span>
                                <i class="level-0"></i>
                                <i class="level-1"></i>
                                <i class="level-2"></i>
                                <i class="level-3"></i>
                                <i class="level-4"></i>
                                <span>More</span>
                            </div>
                        </div>

                        ${settings.global_stats
                            ? templateHTML(summary, s)
                            : ''}
                    </section>
                `;

                addTooltip(container, settings.tooltips);

                return { days, stats: s };

            } catch (err) {
                console.error(
                    '[GitHubCalendar] Failed to render:',
                    err
                );

                container.innerHTML = `
                    <div class="gc-error">
                        <strong>Unable to load GitHub activity</strong>
                        <span>${esc(err.message)}</span>
                        <button type="button" class="gc-retry">
                            Retry
                        </button>
                    </div>
                `;

                container
                    .querySelector('.gc-retry')
                    ?.addEventListener('click', () => render(true));

                return null;
            }
        }

        render();

        return {
            refresh: () => render(true),

            clearCache: () => {
                try {
                    localStorage.removeItem(cacheKey);
                    localStorage.removeItem(expiryKey);
                } catch (_) {}
            }
        };
    }

    global.GitHubCalendar = GitHubCalendar;

})(window);
        document.addEventListener('DOMContentLoaded', function () {
            const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
            const navLinksContainer = document.getElementById('nav-links-container');
            mobileNavToggle.addEventListener('click', () => {
                const isOpened = mobileNavToggle.getAttribute('aria-expanded') === 'true';
                mobileNavToggle.setAttribute('aria-expanded', !isOpened);
                document.body.classList.toggle('mobile-nav-open');
            });
            navLinksContainer.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (document.body.classList.contains('mobile-nav-open')) {
                         mobileNavToggle.setAttribute('aria-expanded', 'false');
                         document.body.classList.remove('mobile-nav-open');
                    }
                });
            });

            // Platform dropdown functionality
            const platformDropdown = document.getElementById('platform-dropdown');
            if (platformDropdown) {
                const dropdownBtn = platformDropdown.querySelector('.btn-nav-cta');
                dropdownBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    platformDropdown.classList.toggle('open');
                });
                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    if (!platformDropdown.contains(e.target)) {
                        platformDropdown.classList.remove('open');
                    }
                });
                // Close dropdown when clicking a link inside
                platformDropdown.querySelectorAll('.dropdown-content a').forEach(link => {
                    link.addEventListener('click', () => {
                        platformDropdown.classList.remove('open');
                    });
                });
            }

            const tabs = document.querySelectorAll('.feature-tab');
            const contents = document.querySelectorAll('.feature-content');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    contents.forEach(c => c.classList.remove('active'));
                    tab.classList.add('active');
                    const contentId = tab.dataset.tab;
                    document.getElementById(contentId).classList.add('active');
                });
            });

            // Feature cluster filter pills (Unmatched Capability) — show one cluster at a time
            document.querySelectorAll('.feature-cluster-tabs').forEach(bar => {
                const content = bar.closest('.feature-content');
                const pills = bar.querySelectorAll('.cluster-tab');
                const items = content.querySelectorAll('.feature-list li[data-cluster]');
                const apply = filter => items.forEach(li => {
                    li.classList.toggle('cluster-hidden', li.dataset.cluster !== filter);
                });
                pills.forEach(pill => {
                    pill.addEventListener('click', () => {
                        pills.forEach(p => p.classList.remove('active'));
                        pill.classList.add('active');
                        apply(pill.dataset.clusterFilter);
                    });
                });
                const initial = bar.querySelector('.cluster-tab.active') || pills[0];
                if (initial) apply(initial.dataset.clusterFilter);
            });

            // Section tabs functionality
            const sectionTabs = document.querySelectorAll('.section-tab');
            const sectionContents = document.querySelectorAll('.section-tab-content');
            sectionTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Get the parent section's tabs and contents
                    const parentContainer = tab.closest('.container');
                    const localTabs = parentContainer.querySelectorAll('.section-tab');
                    const localContents = parentContainer.querySelectorAll('.section-tab-content');
                    
                    // Toggle active states within this section only
                    localTabs.forEach(t => t.classList.remove('active'));
                    localContents.forEach(c => c.classList.remove('active'));
                    tab.classList.add('active');
                    const contentId = tab.dataset.sectionTab;
                    document.getElementById(contentId).classList.add('active');
                });
            });

            // DOM elements
            const demoView = document.getElementById('demo-view');
            const headerContent = document.getElementById('header-content');
            const queryLine = document.getElementById('query-line');
            const queryContent = document.getElementById('query-content');
            const demoResult = document.getElementById('demo-result');
            const resultLabel = document.getElementById('result-label');
            const demoTable = document.getElementById('demo-table');
            const eventLog = document.getElementById('event-log');
            const industryProgress = document.getElementById('industry-progress');
            const pauseBtn = document.getElementById('pause-btn');
            const resumeBtn = document.getElementById('resume-btn');
            const sweepLine = document.querySelector('.sweep-line');

            // Industry scenarios data - using style guide colors
            const questions = [
                { industry: "Finance", query: "Identify high-risk loan applications from the last 30 days.", answer: { headers: ["Applicant ID", "Risk Score", "Reason"], rows: [["APP-72391", "9.2", "High DTI Ratio"],["APP-72156", "8.5", "Short Credit History"],["APP-72884", "8.1", "Multiple Recent Inquiries"]] }, color: "#F15F22" },
                { industry: "Retail", query: "Which products have the highest return rates this quarter?", answer: { headers: ["Product", "Return Rate"], rows: [["Smartwatch X", "12.5%"],["Wireless Earbuds", "9.2%"],["Yoga Mat", "4.1%"]] }, color: "#38bdf8" },
                { industry: "Manufacturing", query: "What's our production line efficiency by shift and location?", answer: { headers: ["Location", "Shift", "Efficiency"], rows: [["Factory A", "Morning", "92.1%"],["Factory B", "Morning", "90.5%"],["Factory A", "Night", "88.7%"]] }, color: "#9CA3AF" },
                { industry: "Telecommunications", query: "Show me customer churn rates in our top 5 urban markets.", answer: { headers: ["Market", "Churn Rate", "Trend"], rows: [["New York", "4.2%", "▲ 0.3%"],["Los Angeles", "3.8%", "▼ 0.1%"],["Chicago", "5.1%", "▲ 0.5%"]] }, color: "#D9501A" },
                { industry: "Energy", query: "Forecast energy consumption for the next 7 days.", answer: { headers: ["Day", "Forecast (MWh)", "Confidence"], rows: [["Monday", "2,150", "95%"],["Tuesday", "2,210", "94%"],["Wednesday", "2,180", "92%"]] }, color: "#facc15" },
                { industry: "Entertainment", query: "Correlate marketing spend with new subscriber growth.", answer: { headers: ["Campaign", "Spend", "New Subs"], rows: [["Social Media Q3", "$250k", "12,500"],["Streaming Ads Q3", "$400k", "19,800"],["Influencer Q3", "$150k", "9,200"]] }, color: "#f87171" },
                { industry: "Transportation", query: "What's the average delivery time for shipments by carrier?", answer: { headers: ["Carrier", "Avg. Time (Days)", "On-Time %"], rows: [["Carrier A", "2.1", "98.5%"],["Carrier B", "3.5", "92.1%"],["Carrier C", "2.3", "97.9%"]] }, color: "#38bdf8" },
                { industry: "Hospitality", query: "Analyze booking patterns for the upcoming holiday season.", answer: { headers: ["Room Type", "Booking %", "Avg. Lead Time"], rows: [["King Suite", "85%", "45 days"],["Double Queen", "92%", "32 days"],["Standard King", "78%", "28 days"]] }, color: "#4ade80" },
                { industry: "Agriculture", query: "Which crop fields have the lowest yield projections?", answer: { headers: ["Field ID", "Crop", "Projected Yield"], rows: [["F-09B", "Corn", "142 bu/acre"],["F-12A", "Soybeans", "45 bu/acre"],["F-07C", "Corn", "148 bu/acre"]] }, color: "#4ade80" }
            ];

            // State management
            let questionIndex = 0;
            let currentState = 'conversational';
            let orchestrationEnabled = true;
            let orchestrationTimeout = null;
            let elapsedInterval = null;
            let animationTimeouts = []; // Track all animation timeouts for cleanup
            let animationIntervals = []; // Track all animation intervals for cleanup

            // Helper to create tracked timeouts
            function setAnimationTimeout(callback, delay) {
                const id = setTimeout(callback, delay);
                animationTimeouts.push(id);
                return id;
            }

            // Helper to create tracked intervals
            function setAnimationInterval(callback, delay) {
                const id = setInterval(callback, delay);
                animationIntervals.push(id);
                return id;
            }

            // Clear all animation timeouts and intervals
            function clearAllAnimationTimeouts() {
                animationTimeouts.forEach(id => clearTimeout(id));
                animationTimeouts = [];
                animationIntervals.forEach(id => clearInterval(id));
                animationIntervals = [];
            }

            // Animation timing configuration
            const TIMING = {
                queryTyping: 2000,
                answerReveal: 800,
                answerHold: 1500,        // Let user see conversational answer
                transformStart: 500,
                transformComplete: 10200, // transition(800) + POST(2940) + gap(400) + body(~4000) + gap(400) + LABEL_WAIT(700) + label(300) + buffer(160)
                apiExecution: 4000,
                resultHold: 2000,        // Let user see final result
                nextTransition: 500
            };

            // Utility: Render structured data into table
            function updateTable(answer) {
                if (!demoTable) return;
                demoTable.innerHTML = '';
                const thead = document.createElement('thead');
                const headerRow = document.createElement('tr');
                answer.headers.forEach(headerText => {
                    const th = document.createElement('th');
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
                const tbody = document.createElement('tbody');
                answer.rows.forEach((rowData, index) => {
                    const row = document.createElement('tr');
                    row.style.animationDelay = `${index * 50}ms`;
                    rowData.forEach(cellData => {
                        const td = document.createElement('td');
                        td.textContent = cellData;
                        row.appendChild(td);
                    });
                    tbody.appendChild(row);
                });
                demoTable.appendChild(thead);
                demoTable.appendChild(tbody);
            }

            // State transition manager
            function transitionToState(newState) {
                currentState = newState;
                demoView.className = `demo-view state-${newState}`;
            }

            // Core orchestration engine
            function orchestrateDemo() {
                if (!orchestrationEnabled) return;

                const current = questions[questionIndex];
                window.currentDemo = current;

                // Update progress indicator
                industryProgress.textContent = `${current.industry} ${questionIndex + 1}/9`;

                // ACT 1: Conversational Discovery
                transitionToState('conversational');
                showConversationalView(current);

                // ACT 2-5: Scheduled transitions
                scheduleTransformations(current);
            }

            // Show conversational view with typing animation
            function showConversationalView(demo) {
                const jsonOutput = document.getElementById('json-output');
                const demoTable = document.getElementById('demo-table');

                // Reset header to badge style
                headerContent.textContent = demo.industry;
                headerContent.style.cssText = '';
                headerContent.className = '';

                // Reset query with typing animation - force retrigger
                queryContent.textContent = demo.query;
                queryContent.style.cssText = '';
                queryContent.className = ''; // Remove class first

                // Force reflow to restart animation
                void queryContent.offsetWidth;

                // Re-apply typing animation
                queryContent.className = 'typing-effect';
                queryContent.style.setProperty('--typing-steps', demo.query.length);
                queryContent.style.setProperty('--typing-duration', `${demo.query.length * 0.08}s`);

                // Show query prompt
                const prompt = queryLine.querySelector('.query-prompt');
                if (prompt) prompt.style.cssText = '';

                // Initially hide result area
                resultLabel.textContent = 'Agent Response:';
                resultLabel.style.cssText = '';
                demoResult.style.opacity = '0';

                // Hide table initially
                if (demoTable) {
                    demoTable.style.opacity = '0';
                    demoTable.style.visibility = 'hidden';
                }

                // Show table after typing completes
                const typingDuration = demo.query.length * 0.08 * 1000; // Convert to ms
                setTimeout(() => {
                    demoResult.style.opacity = '1';
                    updateTable(demo.answer);
                    if (demoTable) {
                        demoTable.style.opacity = '1';
                        demoTable.style.visibility = 'visible';
                    }
                }, typingDuration + 800); // Wait 800ms after typing finishes before showing response

                // Hide JSON
                if (jsonOutput) {
                    jsonOutput.innerHTML = '';
                    jsonOutput.style.opacity = '0';
                }

                // Hide event log
                eventLog.innerHTML = '';
                eventLog.style.display = 'none';
            }

            // Schedule all transformation acts
            function scheduleTransformations(demo) {
                const typingDuration = demo.query.length * 0.08;
                const baseTime = typingDuration * 1000 + TIMING.answerReveal + TIMING.answerHold;

                // ACT 2: Transformation
                orchestrationTimeout = setTimeout(() => {
                    if (!orchestrationEnabled) return;
                    transformToApiView(demo);
                }, baseTime);

                // ACT 3: API Execution (next industry is triggered from within executeApiDemo after completion)
                orchestrationTimeout = setTimeout(() => {
                    if (!orchestrationEnabled) return;
                    executeApiDemo(demo);
                }, baseTime + TIMING.transformComplete);
            }

            // Particle system for transformation shimmer effect
            // Professional cinematic particle shimmer effect
            function createParticleEffect(demo) {
                const canvas = document.getElementById('particle-canvas');
                if (!canvas) return;

                const ctx = canvas.getContext('2d');
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;

                const particles = [];
                const particleCount = 80; // More particles for fuller effect
                const color = demo.color || '#f15f22';

                // Create shimmer particles that sweep horizontally
                for (let i = 0; i < particleCount; i++) {
                    const delay = (i / particleCount) * 0.5; // Stagger particle creation
                    particles.push({
                        x: -50, // Start off-screen left
                        y: Math.random() * canvas.height,
                        baseSpeed: 8 + Math.random() * 4, // Horizontal speed
                        verticalDrift: (Math.random() - 0.5) * 0.5, // Subtle vertical movement
                        size: 1 + Math.random() * 2, // Varying sizes
                        life: 0,
                        maxLife: 1,
                        delay: delay,
                        opacity: 0.4 + Math.random() * 0.6,
                        color: color,
                        trail: [] // For trailing effect
                    });
                }

                const startTime = Date.now();
                const duration = 1000; // 1 second animation

                // Animate particles with cinematic easing
                function animateParticles() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Fade canvas instead of clearing for trail effect
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    let alive = false;

                    particles.forEach(p => {
                        // Handle particle lifecycle with delay
                        if (progress < p.delay) return;

                        const particleProgress = Math.min((progress - p.delay) / (1 - p.delay), 1);
                        p.life = particleProgress;

                        if (p.life > 0 && p.life <= 1) {
                            alive = true;

                            // Cinematic easing for movement
                            const easeProgress = 1 - Math.pow(1 - particleProgress, 3);

                            // Update position
                            p.x = -50 + (canvas.width + 100) * easeProgress;
                            p.y += p.verticalDrift;

                            // Fade in then fade out
                            let alpha;
                            if (p.life < 0.2) {
                                alpha = p.life / 0.2; // Fade in
                            } else if (p.life > 0.8) {
                                alpha = (1 - p.life) / 0.2; // Fade out
                            } else {
                                alpha = 1; // Full opacity
                            }
                            alpha *= p.opacity;

                            // Draw particle with glow
                            ctx.shadowBlur = 15;
                            ctx.shadowColor = p.color;
                            ctx.fillStyle = `${p.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;

                            ctx.beginPath();
                            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                            ctx.fill();

                            // Add extra glow for larger particles
                            if (p.size > 2) {
                                ctx.shadowBlur = 25;
                                ctx.beginPath();
                                ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
                                ctx.fill();
                            }
                        }
                    });

                    if (alive) {
                        requestAnimationFrame(animateParticles);
                    } else {
                        // Final cleanup
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }
                }

                animateParticles();
            }

            // Helper: Type text character by character
            function typeText(element, text, speed = 30) {
                element.textContent = '';
                let index = 0;
                const interval = setInterval(() => {
                    if (index < text.length) {
                        element.textContent += text[index];
                        index++;
                    } else {
                        clearInterval(interval);
                    }
                }, speed);
                return interval;
            }

            // ACT 2: Transform to API view (Simplified)
            function transformToApiView(demo) {
                transitionToState('transforming');

                const demoTable = document.getElementById('demo-table');

                // Fade out conversational content
                queryContent.style.opacity = '0';
                const prompt = queryLine.querySelector('.query-prompt');
                if (prompt) prompt.style.opacity = '0';
                resultLabel.style.opacity = '0';
                if (demoTable) demoTable.style.opacity = '0';

                // Clear text after fade
                setAnimationTimeout(() => {
                    headerContent.textContent = '';
                    queryContent.textContent = '';
                }, 300);

                // Run transition effects (subtle sweep)
                runTransitionEffects(demo);

                // Start typing after transition completes
                setAnimationTimeout(() => {
                    typeApiContent(demo);
                }, 800); // After 0.8s transition
            }

            // Helper: Run transition effects (subtle sweep only)
            function runTransitionEffects(demo) {
                const sweepLine = document.querySelector('.sweep-line');

                // Run subtle sweep animation (no particles)
                if (sweepLine) {
                    sweepLine.classList.remove('active', 'returning');
                    sweepLine.style.display = 'none';

                    setAnimationTimeout(() => {
                        sweepLine.style.display = 'block';
                        void sweepLine.offsetWidth;
                        sweepLine.classList.add('active');
                    }, 100);

                    setAnimationTimeout(() => {
                        sweepLine.style.display = 'none';
                        sweepLine.classList.remove('active');
                    }, 700);
                }
            }

            // Helper: Simple typing animation (for API transformation)
            function typeTextSimple(element, text, speed) {
                element.textContent = '';
                let index = 0;
                const interval = setAnimationInterval(() => {
                    if (index < text.length) {
                        element.textContent += text[index];
                        index++;
                    } else {
                        clearInterval(interval);
                    }
                }, speed);
            }

            // Helper: Type API content (POST, request body with question, label)
            function typeApiContent(demo) {
                const POST_SPEED = 70;
                const BODY_SPEED = 60;
                const GAP = 400;
                const LABEL_WAIT = 700; // Wait before showing "API Response:" label

                // Proper REST endpoint format
                const postEndpoint = 'POST /api/v1/sessions/{session_id}/query';

                // Truncate question to fit screen (max 45 chars)
                const truncatedQuery = demo.query.length > 45
                    ? demo.query.substring(0, 45) + '...'
                    : demo.query;

                // Request body with actual question
                const requestBody = `{"prompt": "${truncatedQuery}"}`;

                // Calculate timing
                const postTime = postEndpoint.length * POST_SPEED;
                const bodyTime = requestBody.length * BODY_SPEED;

                // Type POST endpoint (uses headerContent element)
                headerContent.style.cssText = 'color: ' + demo.color + '; font-family: Monaco, monospace; font-size: 0.85rem;';
                typeTextSimple(headerContent, postEndpoint, POST_SPEED);

                // Type request body (uses queryContent element - replaces UUID)
                setAnimationTimeout(() => {
                    const prompt = queryLine.querySelector('.query-prompt');
                    if (prompt) prompt.style.display = 'none';
                    queryContent.style.cssText = 'opacity: 0.8; font-family: Monaco, monospace; color: #9ca3af; font-size: 0.75rem;';
                    typeTextSimple(queryContent, requestBody, BODY_SPEED);
                }, postTime + GAP);

                // Show "API Response:" label - wait after body finishes typing
                setAnimationTimeout(() => {
                    resultLabel.textContent = 'API Response:';
                    resultLabel.style.opacity = '1';
                }, postTime + GAP + bodyTime + GAP + LABEL_WAIT);

                // Store total time for orchestration
                window.lastTransformationTime = postTime + GAP + bodyTime + GAP + LABEL_WAIT + 300;
            }

            // ACT 3: Execute API Demo with proper task-based response
            function executeApiDemo(demo) {
                transitionToState('executing');

                const jsonOutput = document.getElementById('json-output');
                const demoTable = document.getElementById('demo-table');

                // Hide table during JSON streaming
                if (demoTable) {
                    demoTable.style.opacity = '0';
                    demoTable.style.visibility = 'hidden';
                }

                // Prepare JSON container
                if (jsonOutput) {
                    jsonOutput.innerHTML = '';
                }

                // Generate realistic task ID
                const taskId = 'task-' + Math.random().toString(36).substr(2, 12);

                // PHASE 1: Initial task submission response (4 lines)
                const initialResponse = {
                    task_id: taskId,
                    status_url: `/api/v1/tasks/${taskId}`
                };

                let jsonLines = JSON.stringify(initialResponse, null, 2).split('\n');

                // Add first line BEFORE fading in container (prevents empty box flash)
                const firstLine = document.createElement('div');
                firstLine.className = 'json-line';
                firstLine.textContent = jsonLines[0];
                jsonOutput.appendChild(firstLine);

                // Now fade in container WITH content already inside
                if (jsonOutput) {
                    jsonOutput.style.opacity = '1';
                }

                // Stream remaining lines (starting from index 1)
                for (let i = 1; i < jsonLines.length; i++) {
                    setAnimationTimeout(() => {
                        const lineDiv = document.createElement('div');
                        lineDiv.className = 'json-line';
                        lineDiv.textContent = jsonLines[i];
                        jsonOutput.appendChild(lineDiv);
                        jsonOutput.scrollTop = jsonOutput.scrollHeight;
                    }, i * 120);
                }

                // PHASE 2: Transform to complete task object after 800ms
                setAnimationTimeout(() => {
                    // Build complete task response with proper API structure
                    const completeResponse = {
                        task_id: taskId,
                        status: "complete",
                        last_updated: new Date().toISOString(),
                        events: [
                            {
                                event_type: "plan_generated",
                                timestamp: new Date(Date.now() - 2000).toISOString()
                            },
                            {
                                event_type: "tool_result",
                                timestamp: new Date(Date.now() - 500).toISOString()
                            }
                        ],
                        intermediate_data: [
                            {
                                tool_name: "database_query",
                                data: demo.answer.rows.map((row, i) => {
                                    const obj = {};
                                    demo.answer.headers.forEach((header, j) => {
                                        obj[header] = row[j];
                                    });
                                    return obj;
                                })
                            }
                        ],
                        result: {
                            direct_answer: `Found ${demo.answer.rows.length} ${demo.answer.headers[0].toLowerCase()} records`,
                            key_observations: [
                                {text: `${demo.answer.headers[0]}: ${demo.answer.rows[0][0]} - ${demo.answer.headers[1]}: ${demo.answer.rows[0][1]}`}
                            ]
                        }
                    };

                    // Fade out, then replace with complete response
                    jsonOutput.style.opacity = '0';

                    setAnimationTimeout(() => {
                        // Clear and prepare new content
                        jsonOutput.innerHTML = '';
                        jsonLines = JSON.stringify(completeResponse, null, 2).split('\n');

                        // Add first line BEFORE fading back in
                        const firstLine = document.createElement('div');
                        firstLine.className = 'json-line';
                        firstLine.textContent = jsonLines[0];
                        jsonOutput.appendChild(firstLine);

                        // Fade back in with content
                        jsonOutput.style.opacity = '1';

                        // Stream remaining lines
                        const LINE_DELAY = 80;
                        const HOLD_TIME = 1500; // Time to display complete JSON before transitioning

                        for (let i = 1; i < jsonLines.length; i++) {
                            setAnimationTimeout(() => {
                                const lineDiv = document.createElement('div');
                                lineDiv.className = 'json-line';
                                lineDiv.textContent = jsonLines[i];
                                jsonOutput.appendChild(lineDiv);
                                jsonOutput.scrollTop = jsonOutput.scrollHeight;
                            }, i * LINE_DELAY);
                        }

                        // Calculate when JSON streaming completes, then wait before showing table
                        const streamingDuration = jsonLines.length * LINE_DELAY;
                        setAnimationTimeout(() => {
                            transitionToState('complete');
                            jsonOutput.style.opacity = '0';
                            setAnimationTimeout(() => {
                                jsonOutput.innerHTML = '';
                                if (demoTable) {
                                    demoTable.style.opacity = '1';
                                    demoTable.style.visibility = 'visible';
                                }
                                resultLabel.textContent = 'API Response Data:';
                                demoResult.style.opacity = '1';

                                // After showing the result, advance to next industry
                                setAnimationTimeout(() => {
                                    if (!orchestrationEnabled) return;
                                    questionIndex = (questionIndex + 1) % questions.length;
                                    orchestrateDemo();
                                }, TIMING.resultHold);
                            }, 500);
                        }, streamingDuration + HOLD_TIME);
                    }, 300); // Wait for fade-out transition
                }, 800); // End PHASE 2

                // Event log timing - aligned with JSON animation phases
                // Phase 1: 0-800ms (initial response)
                // Phase 2: 1100ms+ (complete response streaming ~35 lines × 80ms = 2800ms)
                // JSON done: ~3900ms
                const events = [
                    { icon: '⚡', text: 'Plan Generated', time: 300 },
                    { icon: '🔧', text: 'Tool Execution', time: 1300 },
                    { icon: '✓', text: 'Complete', time: 3800 }
                ];

                eventLog.innerHTML = '';
                eventLog.style.display = 'flex';

                events.forEach(event => {
                    setAnimationTimeout(() => {
                        const item = document.createElement('div');
                        item.className = 'event-item';
                        item.innerHTML = `<span>${event.icon}</span> <span>${event.text}</span> <span class="elapsed">${(event.time/1000).toFixed(1)}s</span>`;
                        eventLog.appendChild(item);
                    }, event.time);
                });
            }

            // Reset demo to initial state
            function resetDemo() {
                // Stop ALL running timers
                clearAllAnimationTimeouts();
                if (orchestrationTimeout) {
                    clearTimeout(orchestrationTimeout);
                    orchestrationTimeout = null;
                }
                if (elapsedInterval) {
                    clearInterval(elapsedInterval);
                    elapsedInterval = null;
                }

                // Reset state
                questionIndex = 0;
                orchestrationEnabled = false;
                transitionToState('conversational');

                // Clear content and reset styles
                headerContent.textContent = '';
                headerContent.style.cssText = ''; // Reset inline styles from API view
                queryContent.textContent = '';
                queryContent.style.cssText = ''; // Reset inline styles from API view
                queryContent.style.opacity = '1';

                // Reset query prompt visibility
                const prompt = queryLine.querySelector('.query-prompt');
                if (prompt) {
                    prompt.style.display = '';
                    prompt.style.opacity = '1';
                }

                // Clear JSON output
                const jsonOutput = document.getElementById('json-output');
                if (jsonOutput) {
                    jsonOutput.innerHTML = '';
                    jsonOutput.style.opacity = '0';
                }

                // Reset sweep line
                const sweepLineEl = document.querySelector('.sweep-line');
                if (sweepLineEl) {
                    sweepLineEl.classList.remove('active', 'returning');
                    sweepLineEl.style.display = 'none';
                }

                // Clear event log and table
                if (eventLog) eventLog.innerHTML = '';
                if (demoTable) {
                    demoTable.style.opacity = '0';
                    demoTable.style.visibility = 'hidden';
                }
                resultLabel.textContent = '';
                resultLabel.style.opacity = '0';
                demoResult.style.opacity = '0';

                // Reset UI controls
                pauseBtn.style.display = 'inline-block';
                resumeBtn.style.display = 'none';

                // Update progress indicator
                const current = questions[questionIndex];
                industryProgress.textContent = `${current.industry} ${questionIndex + 1}/9`;
            }

            // Pause/Resume controls
            pauseBtn.addEventListener('click', () => {
                orchestrationEnabled = false;
                if (orchestrationTimeout) {
                    clearTimeout(orchestrationTimeout);
                }
                if (elapsedInterval) {
                    clearInterval(elapsedInterval);
                }
                pauseBtn.style.display = 'none';
                resumeBtn.style.display = 'inline-block';
            });

            resumeBtn.addEventListener('click', () => {
                orchestrationEnabled = true;
                resumeBtn.style.display = 'none';
                pauseBtn.style.display = 'inline-block';
                orchestrateDemo();
            });

            // Auto start/reset on viewport visibility
            let demoStartTimeout = null;
            const demoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Element entering viewport - start animation after delay
                        if (!orchestrationEnabled) {
                            if (demoStartTimeout) clearTimeout(demoStartTimeout);
                            demoStartTimeout = setTimeout(() => {
                                if (!orchestrationEnabled) {
                                    orchestrationEnabled = true;
                                    orchestrateDemo();
                                }
                            }, 500);
                        }
                    } else {
                        // Element leaving viewport - stop and reset
                        if (demoStartTimeout) {
                            clearTimeout(demoStartTimeout);
                            demoStartTimeout = null;
                        }
                        resetDemo();
                    }
                });
            }, {
                threshold: 0.3 // Trigger when 30% of element is visible
            });

            if (demoView) {
                demoObserver.observe(demoView);
            }

            // Scroll spy for navigation highlighting
            const navLinks = document.querySelectorAll('header nav a[href^="#"]');
            const supersections = document.querySelectorAll('.supersection');
            
            function updateActiveNav() {
                const scrollPos = window.scrollY + 150; // offset for header height
                
                let currentSection = null;
                supersections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                        currentSection = section.id;
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            }
            
            // Update on scroll and page load
            window.addEventListener('scroll', updateActiveNav);
            updateActiveNav();

            // API info modal behavior (optional - only if modal exists)
            const apiInfoBtn = document.getElementById('api-info-btn');
            const apiInfoOverlay = document.getElementById('api-info-modal-overlay');
            const apiInfoClose = document.getElementById('api-info-close');

            if (apiInfoBtn && apiInfoOverlay && apiInfoClose) {
                apiInfoBtn.addEventListener('click', () => {
                    apiInfoOverlay.style.display = 'flex';
                    apiInfoOverlay.setAttribute('aria-hidden','false');
                    apiInfoClose.focus();
                });
                apiInfoClose.addEventListener('click', () => {
                    apiInfoOverlay.style.display = 'none';
                    apiInfoOverlay.setAttribute('aria-hidden','true');
                    apiInfoBtn.focus();
                });
                apiInfoOverlay.addEventListener('click', (e) => {
                    if (e.target === apiInfoOverlay) {
                        apiInfoOverlay.style.display = 'none';
                        apiInfoOverlay.setAttribute('aria-hidden','true');
                        apiInfoBtn.focus();
                    }
                });
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && apiInfoOverlay.getAttribute('aria-hidden') === 'false') {
                        apiInfoOverlay.style.display = 'none';
                        apiInfoOverlay.setAttribute('aria-hidden','true');
                        apiInfoBtn.focus();
                    }
                });
            }

        });

        // === GENIE MODE ANIMATION ===
        (function() {
            const playBtn = document.getElementById('genie-play-btn');
            const timelineFill = document.getElementById('genie-timeline-fill');
            const timelinePercent = document.getElementById('genie-timeline-percent');
            const stageLabel = document.getElementById('stage-label');
            const statusText = document.getElementById('status-text');
            const canvas = document.getElementById('genie-canvas');

            let animationInterval = null;
            let animationProgress = 0;
            const ANIMATION_DURATION = 60000; // 60 seconds
            const UPDATE_INTERVAL = 50; // 50ms updates for smooth animation

            // Scenario management
            let currentScenarioIndex = 0;
            let autoLoop = true; // Flag to control auto-looping
            const intentLabel = document.getElementById('intent-label');

            const scenarios = [
                {
                    intent: "EXECUTIVE Improve Product Margin for Q4.",
                    nodes: {
                        executive: { label: "EXECUTIVE", role: "COORDINATOR", id: "NODE-000" },
                        cfo: { label: "CFO", role: "FINANCIAL", id: "NODE-001" },
                        cmo: { label: "CMO", role: "MARKETING", id: "NODE-002" },
                        legal: { label: "LEGAL", role: "POLICY", id: "NODE-003" },
                        acct: { label: "ACCT", role: "DB OPS", id: "NODE-004" },
                        audit: { label: "AUDIT", role: "CHECKS", id: "NODE-005" },
                        brand: { label: "BRAND", role: "STRATEGY", id: "NODE-006" },
                        sales: { label: "SALES", role: "CHANNELS", id: "NODE-007" }
                    }
                },
                {
                    intent: "CFO Forecast Q1 cash flow across all entities.",
                    nodes: {
                        executive: { label: "CFO", role: "COORDINATOR", id: "NODE-000" },
                        cfo: { label: "TREASURY", role: "CASH MGMT", id: "NODE-001" },
                        cmo: { label: "FP&A", role: "PLANNING", id: "NODE-002" },
                        legal: { label: "CONTROLLER", role: "REPORTING", id: "NODE-003" },
                        acct: { label: "PAYMENTS", role: "OUTFLOWS", id: "NODE-004" },
                        audit: { label: "AR", role: "INFLOWS", id: "NODE-005" },
                        brand: { label: "FORECAST", role: "MODELS", id: "NODE-006" },
                        sales: { label: "CONSOL", role: "CONSOLIDATE", id: "NODE-007" }
                    }
                },
                {
                    intent: "LEGAL Assess regulatory risk for EU expansion.",
                    nodes: {
                        executive: { label: "LEGAL", role: "COORDINATOR", id: "NODE-000" },
                        cfo: { label: "REGULATORY", role: "COMPLIANCE", id: "NODE-001" },
                        cmo: { label: "PRIVACY", role: "DATA PROT", id: "NODE-002" },
                        legal: { label: "CORPORATE", role: "STRUCTURE", id: "NODE-003" },
                        acct: { label: "GDPR", role: "EU DATA", id: "NODE-004" },
                        audit: { label: "CONTRACTS", role: "AGREEMENTS", id: "NODE-005" },
                        brand: { label: "LICENSES", role: "PERMITS", id: "NODE-006" },
                        sales: { label: "DISCLOSURE", role: "REPORTING", id: "NODE-007" }
                    }
                },
                {
                    intent: "CMO Optimize Q2 marketing spend by channel.",
                    nodes: {
                        executive: { label: "CMO", role: "COORDINATOR", id: "NODE-000" },
                        cfo: { label: "DIGITAL", role: "ONLINE", id: "NODE-001" },
                        cmo: { label: "BRAND", role: "AWARENESS", id: "NODE-002" },
                        legal: { label: "ANALYTICS", role: "INSIGHTS", id: "NODE-003" },
                        acct: { label: "SOCIAL", role: "PLATFORMS", id: "NODE-004" },
                        audit: { label: "SEM", role: "SEARCH", id: "NODE-005" },
                        brand: { label: "CONTENT", role: "CREATION", id: "NODE-006" },
                        sales: { label: "ATTRIBUTION", role: "TRACKING", id: "NODE-007" }
                    }
                }
            ];

            // Function to load a scenario and update all node labels
            function loadScenario(index) {
                const scenario = scenarios[index];

                // Update intent label with fade effect
                if (intentLabel) {
                    intentLabel.style.transition = 'opacity 0.3s ease';
                    intentLabel.style.opacity = '0';
                    setTimeout(() => {
                        intentLabel.textContent = scenario.intent;
                        intentLabel.style.opacity = '1';
                    }, 300);
                }

                // Update all node labels, roles, and IDs
                Object.keys(scenario.nodes).forEach(nodeKey => {
                    const node = nodes[nodeKey];
                    if (node) {
                        const nodeData = scenario.nodes[nodeKey];
                        const labelEl = node.querySelector('.node-label');
                        const roleEl = node.querySelector('.node-role');
                        const idEl = node.querySelector('.node-id');

                        if (labelEl) labelEl.textContent = nodeData.label;
                        if (roleEl) roleEl.textContent = nodeData.role;
                        if (idEl) idEl.textContent = nodeData.id;
                    }
                });
            }

            // Node references
            const nodes = {
                executive: document.getElementById('node-executive'),
                cfo: document.getElementById('node-cfo'),
                cmo: document.getElementById('node-cmo'),
                legal: document.getElementById('node-legal'),
                acct: document.getElementById('node-acct'),
                audit: document.getElementById('node-audit'),
                brand: document.getElementById('node-brand'),
                sales: document.getElementById('node-sales')
            };

            // LED references
            const leds = {
                executive: document.getElementById('led-executive'),
                cfo: document.getElementById('led-cfo'),
                cmo: document.getElementById('led-cmo'),
                legal: document.getElementById('led-legal'),
                acct: document.getElementById('led-acct'),
                audit: document.getElementById('led-audit'),
                brand: document.getElementById('led-brand'),
                sales: document.getElementById('led-sales'),
                system: document.getElementById('led-system')
            };

            // Progress bar references
            const progressBars = {
                executive: document.getElementById('progress-executive'),
                cfo: document.getElementById('progress-cfo'),
                cmo: document.getElementById('progress-cmo'),
                legal: document.getElementById('progress-legal')
            };

            // Metric references
            const metrics = {
                agents: document.getElementById('metric-agents'),
                time: document.getElementById('metric-time'),
                messages: document.getElementById('metric-messages'),
                efficiency: document.getElementById('metric-efficiency')
            };

            // Connection line references
            const lines = {
                execCfo: document.getElementById('line-exec-cfo'),
                execCmo: document.getElementById('line-exec-cmo'),
                execLegal: document.getElementById('line-exec-legal'),
                cfoAcct: document.getElementById('line-cfo-acct'),
                cfoAudit: document.getElementById('line-cfo-audit'),
                cmoBrand: document.getElementById('line-cmo-brand'),
                cmoSales: document.getElementById('line-cmo-sales')
            };

            // Pulse dot references
            const pulses = {
                execCfo: document.getElementById('pulse-exec-cfo'),
                execCmo: document.getElementById('pulse-exec-cmo'),
                execLegal: document.getElementById('pulse-exec-legal'),
                cfoAcct: document.getElementById('pulse-cfo-acct'),
                cfoAudit: document.getElementById('pulse-cfo-audit'),
                cmoBrand: document.getElementById('pulse-cmo-brand'),
                cmoSales: document.getElementById('pulse-cmo-sales')
            };

            // Helper: Update connection lines (orthogonal paths)
            function updateConnectionLines() {
                const execRect = nodes.executive.getBoundingClientRect();
                const cfoRect = nodes.cfo.getBoundingClientRect();
                const cmoRect = nodes.cmo.getBoundingClientRect();
                const legalRect = nodes.legal.getBoundingClientRect();
                const canvasRect = canvas.getBoundingClientRect();

                const execCenter = {
                    x: execRect.left + execRect.width/2 - canvasRect.left,
                    y: execRect.bottom - canvasRect.top
                };
                const cfoCenter = {
                    x: cfoRect.left + cfoRect.width/2 - canvasRect.left,
                    y: cfoRect.top - canvasRect.top
                };
                const cmoCenter = {
                    x: cmoRect.left + cmoRect.width/2 - canvasRect.left,
                    y: cmoRect.top - canvasRect.top
                };
                const legalCenter = {
                    x: legalRect.left + legalRect.width/2 - canvasRect.left,
                    y: legalRect.top - canvasRect.top
                };

                // Master to Level 1 (orthogonal paths)
                const midY = (execCenter.y + cfoCenter.y) / 2;
                lines.execCfo.setAttribute('d', `M ${execCenter.x},${execCenter.y} L ${execCenter.x},${midY} L ${cfoCenter.x},${midY} L ${cfoCenter.x},${cfoCenter.y}`);
                lines.execCmo.setAttribute('d', `M ${execCenter.x},${execCenter.y} L ${cmoCenter.x},${cmoCenter.y}`);
                lines.execLegal.setAttribute('d', `M ${execCenter.x},${execCenter.y} L ${execCenter.x},${midY} L ${legalCenter.x},${midY} L ${legalCenter.x},${legalCenter.y}`);

                // Level 1 to Level 2 - All orthogonal (90-degree) paths
                const level2MidY = (cfoCenter.y + 440) / 2;

                // CFO to children (ACCT, AUDIT)
                if (nodes.acct.classList.contains('visible')) {
                    const acctRect = nodes.acct.getBoundingClientRect();
                    const acctCenter = { x: acctRect.left + acctRect.width/2 - canvasRect.left, y: acctRect.top - canvasRect.top };
                    lines.cfoAcct.setAttribute('d', `M ${cfoCenter.x},${cfoRect.bottom - canvasRect.top} L ${cfoCenter.x},${level2MidY} L ${acctCenter.x},${level2MidY} L ${acctCenter.x},${acctCenter.y}`);
                }

                if (nodes.audit.classList.contains('visible')) {
                    const auditRect = nodes.audit.getBoundingClientRect();
                    const auditCenter = { x: auditRect.left + auditRect.width/2 - canvasRect.left, y: auditRect.top - canvasRect.top };
                    lines.cfoAudit.setAttribute('d', `M ${cfoCenter.x},${cfoRect.bottom - canvasRect.top} L ${cfoCenter.x},${level2MidY} L ${auditCenter.x},${level2MidY} L ${auditCenter.x},${auditCenter.y}`);
                }

                // CMO to children (BRAND, SALES) - Now also orthogonal
                if (nodes.brand.classList.contains('visible')) {
                    const brandRect = nodes.brand.getBoundingClientRect();
                    const brandCenter = { x: brandRect.left + brandRect.width/2 - canvasRect.left, y: brandRect.top - canvasRect.top };
                    lines.cmoBrand.setAttribute('d', `M ${cmoCenter.x},${cmoRect.bottom - canvasRect.top} L ${cmoCenter.x},${level2MidY} L ${brandCenter.x},${level2MidY} L ${brandCenter.x},${brandCenter.y}`);
                }

                if (nodes.sales.classList.contains('visible')) {
                    const salesRect = nodes.sales.getBoundingClientRect();
                    const salesCenter = { x: salesRect.left + salesRect.width/2 - canvasRect.left, y: salesRect.top - canvasRect.top };
                    lines.cmoSales.setAttribute('d', `M ${cmoCenter.x},${cmoRect.bottom - canvasRect.top} L ${cmoCenter.x},${level2MidY} L ${salesCenter.x},${level2MidY} L ${salesCenter.x},${salesCenter.y}`);
                }
            }

            // Helper: Format time as MM:SS
            function formatTime(seconds) {
                const mins = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `00:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            }

            // Helper: Set LED state
            function setLED(led, state) {
                led.className = 'status-led ' + state;
            }

            // Helper: Set node state
            function setNodeState(node, visible, active, completed = false) {
                if (visible) node.classList.add('visible');
                else node.classList.remove('visible');

                if (completed) {
                    node.classList.add('completed');
                    node.classList.remove('active');
                } else if (active) {
                    node.classList.add('active');
                    node.classList.remove('completed');
                } else {
                    node.classList.remove('active', 'completed');
                }
            }

            // Helper: Animate pulse along path
            function animatePulse(pulse, path) {
                if (!path || !pulse) return;

                const pathLength = path.getTotalLength();
                let distance = 0;
                const speed = 3; // pixels per frame

                function movePulse() {
                    if (distance >= pathLength) {
                        pulse.style.opacity = '0';
                        pulse.classList.remove('active');
                        return;
                    }

                    const point = path.getPointAtLength(distance);
                    pulse.setAttribute('cx', point.x);
                    pulse.setAttribute('cy', point.y);
                    pulse.style.opacity = '1';
                    pulse.classList.add('active');

                    distance += speed;
                    requestAnimationFrame(movePulse);
                }

                movePulse();
            }

            // Helper: Trigger communication burst
            function triggerCommunication(pulseName, delay = 0) {
                setTimeout(() => {
                    const pulse = pulses[pulseName];
                    const line = lines[pulseName];
                    if (pulse && line) {
                        animatePulse(pulse, line);
                    }
                }, delay);
            }

            // Helper: Set line active
            function setLineActive(line, active) {
                if (active) line.classList.add('active');
                else line.classList.remove('active');
            }

            // Helper: Update stage label
            function setStage(text) {
                stageLabel.textContent = text;
                stageLabel.classList.add('visible');
                setTimeout(() => stageLabel.classList.remove('visible'), 2000);
            }

            // Track triggered events to avoid repetition
            let triggeredEvents = new Set();

            // Animation sequence based on progress (0-100)
            function animateFrame(progress) {
                // Calculate elapsed time (60 second animation)
                const elapsedSeconds = (progress / 100) * 60;

                // Stage 1: Initialize (0-5%)
                if (progress < 5) {
                    setNodeState(nodes.executive, true, true);
                    setLED(leds.executive, 'active');
                    setLED(leds.system, 'active');
                    statusText.textContent = 'INITIALIZING';
                    if (progress === 0) setStage('SYSTEM STARTUP');
                    // Executive: 0% -> 10%
                    progressBars.executive.style.width = (progress * 2) + '%';

                    // Update metrics
                    metrics.agents.textContent = '1';
                    metrics.time.textContent = formatTime(elapsedSeconds);
                    metrics.messages.textContent = '0';
                    metrics.efficiency.textContent = '1.0x';
                }

                // Stage 2: Initial Delegation - Start with 2 agents (5-15%)
                else if (progress < 15) {
                    const localProgress = (progress - 5) / 10;

                    if (!triggeredEvents.has('delegation-start')) {
                        setStage('INITIAL DELEGATION');
                        triggeredEvents.add('delegation-start');
                    }

                    // Start with only CFO and CMO
                    setNodeState(nodes.cfo, true, true);
                    setNodeState(nodes.cmo, true, true);
                    setLED(leds.cfo, 'working');
                    setLED(leds.cmo, 'working');

                    // Activate connection lines for initial 2 agents
                    setLineActive(lines.execCfo, true);
                    setLineActive(lines.execCmo, true);

                    // Trigger initial communication pulses (master -> agents)
                    if (!triggeredEvents.has('pulse-initial')) {
                        triggerCommunication('execCfo', 0);
                        triggerCommunication('execCmo', 300);
                        triggeredEvents.add('pulse-initial');
                    }

                    // At 10%: Feedback received, master decides to spawn LEGAL
                    if (progress >= 10) {
                        if (!triggeredEvents.has('spawn-legal')) {
                            setStage('FEEDBACK - SPAWNING LEGAL');
                            // Spawn LEGAL based on feedback
                            setNodeState(nodes.legal, true, true);
                            setLED(leds.legal, 'working');
                            setLineActive(lines.execLegal, true);
                            triggerCommunication('execLegal', 200);
                            triggeredEvents.add('spawn-legal');
                        }
                        statusText.textContent = '4 AGENTS ACTIVE';

                        // LEGAL progress: 0% -> 40% (from 10% to 15% = 5% range)
                        const legalProgress = (progress - 10) / 5;
                        progressBars.legal.style.width = (legalProgress * 40) + '%';
                    } else {
                        statusText.textContent = '3 AGENTS ACTIVE';
                    }

                    // Executive: 10% -> 20%
                    progressBars.executive.style.width = (10 + localProgress * 10) + '%';
                    // CFO & CMO: 0% -> 40%
                    progressBars.cfo.style.width = (localProgress * 40) + '%';
                    progressBars.cmo.style.width = (localProgress * 40) + '%';

                    updateConnectionLines();

                    // Update metrics
                    metrics.agents.textContent = progress >= 10 ? '4' : '3';
                    metrics.time.textContent = formatTime(elapsedSeconds);
                    metrics.messages.textContent = Math.floor(1 + localProgress * 3);
                    metrics.efficiency.textContent = '1.5x';
                }

                // Stage 3: FAST Level 2 Spawning (15-25%)
                else if (progress < 25) {
                    const localProgress = (progress - 15) / 10;

                    if (!triggeredEvents.has('spawn-start')) {
                        setStage('DYNAMIC SPAWNING');
                        triggeredEvents.add('spawn-start');
                    }

                    // Count active agents
                    let activeAgents = 4; // Executive + CFO + CMO + Legal

                    // Spawn financial agents early (at 16%)
                    if (progress >= 16) {
                        if (!triggeredEvents.has('spawn-acct-audit')) {
                            setNodeState(nodes.acct, true, true);
                            setNodeState(nodes.audit, true, true);
                            setLED(leds.acct, 'working');
                            setLED(leds.audit, 'working');
                            setLineActive(lines.cfoAcct, true);
                            setLineActive(lines.cfoAudit, true);
                            triggerCommunication('cfoAcct', 100);
                            triggerCommunication('cfoAudit', 300);
                            triggeredEvents.add('spawn-acct-audit');
                        }
                        activeAgents += 2;
                    }

                    // Spawn marketing agents (at 18%)
                    if (progress >= 18) {
                        if (!triggeredEvents.has('spawn-brand')) {
                            setNodeState(nodes.brand, true, true);
                            setLED(leds.brand, 'working');
                            setLineActive(lines.cmoBrand, true);
                            triggerCommunication('cmoBrand', 100);
                            triggeredEvents.add('spawn-brand');
                        }
                        activeAgents += 1;
                    }

                    // Spawn sales agent (at 20%)
                    if (progress >= 20) {
                        if (!triggeredEvents.has('spawn-sales')) {
                            setNodeState(nodes.sales, true, true);
                            setLED(leds.sales, 'working');
                            setLineActive(lines.cmoSales, true);
                            triggerCommunication('cmoSales', 100);
                            triggeredEvents.add('spawn-sales');
                        }
                        activeAgents += 1;
                    }

                    statusText.textContent = activeAgents + ' AGENTS ACTIVE';

                    // Executive: 20% -> 30%
                    progressBars.executive.style.width = (20 + localProgress * 10) + '%';
                    // Level 1: 40% -> 70%
                    progressBars.cfo.style.width = (40 + localProgress * 30) + '%';
                    progressBars.cmo.style.width = (40 + localProgress * 30) + '%';
                    progressBars.legal.style.width = (40 + localProgress * 30) + '%'; // Continues from 40%

                    updateConnectionLines();

                    // Update metrics
                    metrics.agents.textContent = String(activeAgents);
                    metrics.time.textContent = formatTime(elapsedSeconds);
                    metrics.messages.textContent = Math.floor(3 + localProgress * 5);
                    metrics.efficiency.textContent = '2.0x';
                }

                // Stage 4: Parallel Execution & Staggered Completion (25-57%)
                else if (progress < 57) {
                    if (!triggeredEvents.has('execution-stage')) {
                        setStage('PARALLEL EXECUTION');
                        triggeredEvents.add('execution-stage');
                    }

                    const stageProgress = (progress - 25) / 32;
                    let activeCount = 8;

                    // Executive: 30% -> 70%
                    progressBars.executive.style.width = (30 + stageProgress * 40) + '%';

                    // ACCT completes at 30%
                    if (progress >= 30) {
                        if (!triggeredEvents.has('complete-acct')) {
                            setLED(leds.acct, 'complete');
                            setNodeState(nodes.acct, true, false, true); // Fade out
                            triggeredEvents.add('complete-acct');
                        }
                        activeCount--;
                    }

                    // AUDIT completes at 35%
                    if (progress >= 35) {
                        if (!triggeredEvents.has('complete-audit')) {
                            setLED(leds.audit, 'complete');
                            setNodeState(nodes.audit, true, false, true); // Fade out
                            triggeredEvents.add('complete-audit');
                        }
                        activeCount--;
                    }

                    // BRAND completes at 38%
                    if (progress >= 38) {
                        if (!triggeredEvents.has('complete-brand')) {
                            setLED(leds.brand, 'complete');
                            setNodeState(nodes.brand, true, false, true); // Fade out
                            triggeredEvents.add('complete-brand');
                        }
                        activeCount--;
                    }

                    // SALES completes at 42%
                    if (progress >= 42) {
                        if (!triggeredEvents.has('complete-sales')) {
                            setLED(leds.sales, 'complete');
                            setNodeState(nodes.sales, true, false, true); // Fade out
                            triggeredEvents.add('complete-sales');
                        }
                        activeCount--;
                    }

                    // Update Level 1 progress bars (70% -> 100%) - STAGGERED completion
                    if (progress < 45) {
                        // CFO: 70% -> 100% (from 25% to 45% = 20% range)
                        progressBars.cfo.style.width = (70 + ((progress - 25) / 20) * 30) + '%';
                    } else {
                        progressBars.cfo.style.width = '100%';
                    }

                    if (progress < 55) {
                        // CMO: 70% -> 100% (from 25% to 55% = 30% range)
                        progressBars.cmo.style.width = (70 + ((progress - 25) / 30) * 30) + '%';
                    } else {
                        progressBars.cmo.style.width = '100%';
                    }

                    if (progress < 50) {
                        // LEGAL: 70% -> 100% (from 25% to 50% = 25% range)
                        progressBars.legal.style.width = (70 + ((progress - 25) / 25) * 30) + '%';
                    } else {
                        progressBars.legal.style.width = '100%';
                    }

                    // CFO completes at 45% (FIRST)
                    if (progress >= 45) {
                        if (!triggeredEvents.has('complete-cfo')) {
                            setLED(leds.cfo, 'complete');
                            setNodeState(nodes.cfo, true, false, true); // Fade out
                            triggeredEvents.add('complete-cfo');
                        }
                        activeCount--;
                    }

                    // LEGAL completes at 50% (SECOND - 5% after CFO)
                    if (progress >= 50) {
                        if (!triggeredEvents.has('complete-legal')) {
                            setLED(leds.legal, 'complete');
                            setNodeState(nodes.legal, true, false, true); // Fade out
                            triggeredEvents.add('complete-legal');
                        }
                        activeCount--;
                    }

                    // CMO completes at 55% (LAST - 5% after LEGAL)
                    if (progress >= 55) {
                        if (!triggeredEvents.has('complete-cmo')) {
                            setLED(leds.cmo, 'complete');
                            setNodeState(nodes.cmo, true, false, true); // Fade out
                            triggeredEvents.add('complete-cmo');
                        }
                        activeCount--;
                    }

                    statusText.textContent = activeCount + ' AGENTS ACTIVE';

                    // Update metrics
                    metrics.agents.textContent = String(activeCount);
                    metrics.time.textContent = formatTime(elapsedSeconds);
                    metrics.messages.textContent = Math.floor(8 + (progress - 25) / 32 * 8);
                    metrics.efficiency.textContent = (2.5 + ((progress - 25) / 32) * 2.5).toFixed(1) + 'x';
                }

                // Stage 5: Executive Synthesis (57-64%) - FAST synthesis after children finish
                else if (progress < 64) {
                    if (!triggeredEvents.has('synthesis-stage')) {
                        setStage('EXECUTIVE SYNTHESIS');
                        triggeredEvents.add('synthesis-stage');
                    }

                    statusText.textContent = 'SYNTHESIZING RESULTS';
                    setNodeState(nodes.executive, true, true);
                    setLED(leds.executive, 'working');

                    // Executive: 70% -> 100% (7% range = ~4 seconds)
                    const synthProgress = (progress - 57) / 7;
                    progressBars.executive.style.width = (70 + synthProgress * 30) + '%';

                    // Update metrics
                    metrics.agents.textContent = '1';
                    metrics.time.textContent = formatTime(elapsedSeconds);
                    metrics.messages.textContent = Math.floor(16 + synthProgress * 2);
                    metrics.efficiency.textContent = '5.0x';
                }

                // Stage 6: Complete (64% - all work complete, displays as 100%)
                else {
                    if (!triggeredEvents.has('complete-stage')) {
                        setStage('OPERATION COMPLETE');
                        setLED(leds.executive, 'complete');
                        setLED(leds.system, 'complete');
                        setNodeState(nodes.executive, true, false, true);
                        triggeredEvents.add('complete-stage');
                    }

                    // Ensure executive reaches 100%
                    progressBars.executive.style.width = '100%';

                    statusText.textContent = 'SYSTEM READY';

                    // Update metrics (final values)
                    metrics.agents.textContent = '0';
                    metrics.time.textContent = formatTime(elapsedSeconds);
                    metrics.messages.textContent = '18';
                    metrics.efficiency.textContent = '5.0x';
                }
            }

            // Main animation loop
            function runAnimation() {
                const startTime = Date.now();

                animationInterval = setInterval(() => {
                    const elapsed = Date.now() - startTime;
                    animationProgress = Math.min((elapsed / ANIMATION_DURATION) * 100, 100);

                    // Map progress: work completes at 64%, which should show as 100%
                    const displayedProgress = Math.min((animationProgress / 64) * 100, 100);

                    // Update timeline with remapped progress
                    timelineFill.style.width = displayedProgress + '%';
                    timelinePercent.textContent = Math.floor(displayedProgress) + '%';

                    // Animate frame using internal progress
                    animateFrame(animationProgress);

                    // Stop at 64% (when all work is complete, displays as 100%)
                    if (animationProgress >= 64) {
                        clearInterval(animationInterval);
                        animationInterval = null;
                        animationProgress = 64;
                        timelineFill.style.width = '100%';
                        timelinePercent.textContent = '100%';

                        // Auto-loop: wait 3 seconds, then start next scenario (only if autoLoop is enabled)
                        if (autoLoop) {
                            setTimeout(() => {
                                // Move to next scenario
                                currentScenarioIndex = (currentScenarioIndex + 1) % scenarios.length;
                                loadScenario(currentScenarioIndex);

                                // Wait a bit more for label fade, then restart
                                setTimeout(() => {
                                    resetAnimation();
                                    setTimeout(runAnimation, 100);
                                }, 600);
                            }, 3000);
                        } else {
                            playBtn.textContent = '▶ REPLAY';
                            playBtn.classList.remove('active');
                        }
                    }
                }, UPDATE_INTERVAL);
            }

            // Reset animation
            function resetAnimation() {
                if (animationInterval) {
                    clearInterval(animationInterval);
                }

                animationProgress = 0;
                timelineFill.style.width = '0%';
                timelinePercent.textContent = '0%';

                // Clear triggered events
                triggeredEvents.clear();

                // Reset all nodes
                Object.values(nodes).forEach(node => {
                    node.classList.remove('visible', 'active', 'completed');
                });

                // Reset all LEDs
                Object.values(leds).forEach(led => {
                    setLED(led, 'idle');
                });

                // Reset progress bars
                Object.values(progressBars).forEach(bar => {
                    bar.style.width = '0%';
                });

                // Reset lines
                Object.values(lines).forEach(line => {
                    line.classList.remove('active');
                });

                // Reset pulses
                Object.values(pulses).forEach(pulse => {
                    pulse.style.opacity = '0';
                    pulse.classList.remove('active');
                });

                stageLabel.classList.remove('visible');
                statusText.textContent = 'SYSTEM IDLE';

                // Reset metrics to initial values
                metrics.agents.textContent = '0';
                metrics.time.textContent = '00:00:00';
                metrics.messages.textContent = '0';
                metrics.efficiency.textContent = '1.0x';

                // Show only executive initially
                setNodeState(nodes.executive, true, false);
                setLED(leds.executive, 'idle');
            }

            // Play button handler
            if (playBtn) {
                playBtn.addEventListener('click', function() {
                    if (animationInterval) {
                        // Stop animation and disable auto-loop
                        clearInterval(animationInterval);
                        animationInterval = null;
                        autoLoop = false;
                        playBtn.textContent = '▶ ANIMATE';
                        playBtn.classList.remove('active');
                    } else {
                        // Start/restart animation and enable auto-loop
                        autoLoop = true;
                        resetAnimation();
                        playBtn.textContent = '⏸ PAUSE';
                        playBtn.classList.add('active');
                        setTimeout(runAnimation, 100);
                    }
                });
            }

            // Initialize
            loadScenario(currentScenarioIndex); // Load first scenario
            resetAnimation();
            updateConnectionLines();

            // Update lines on resize
            window.addEventListener('resize', updateConnectionLines);

            // Auto-start animation only when element is in viewport
            const genieCanvas = document.getElementById('genie-canvas');

            if (genieCanvas && playBtn) {
                let startTimeout = null;

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Element is entering viewport - start animation if not running
                            if (!animationInterval) {
                                if (startTimeout) clearTimeout(startTimeout);
                                startTimeout = setTimeout(() => {
                                    if (!animationInterval && playBtn) {
                                        playBtn.click();
                                    }
                                }, 500);
                            }
                        } else {
                            // Element is leaving viewport - stop and reset animation
                            if (startTimeout) {
                                clearTimeout(startTimeout);
                                startTimeout = null;
                            }

                            if (animationInterval) {
                                autoLoop = false;
                                clearInterval(animationInterval);
                                animationInterval = null;

                                // Reset to first scenario and reset animation
                                currentScenarioIndex = 0;
                                loadScenario(currentScenarioIndex);
                                resetAnimation();

                                playBtn.textContent = '▶ ANIMATE';
                                playBtn.classList.remove('active');
                            }
                        }
                    });
                }, {
                    threshold: 0.3 // Trigger when 30% of element is visible
                });

                observer.observe(genieCanvas);
            }
        })();

        // === AUDIT CARD ANIMATIONS ===
        (function() {
            // Event Stream Animation (Total Recall card)
            const eventStream = document.getElementById('event-stream');
            const eventCountEl = document.getElementById('event-count');
            const metricValues = document.querySelectorAll('.export-metric-value');

            if (eventStream) {
                const events = [
                    { time: '14:32:07', action: 'LOGIN_SUCCESS', user: 'admin', type: 'success' },
                    { time: '14:32:15', action: 'PROMPT_EXEC', user: 'user_42', type: 'success' },
                    { time: '14:32:18', action: 'RATE_LIMIT', user: 'user_99', type: 'warning' },
                    { time: '14:32:22', action: 'CONFIG_VIEW', user: 'admin', type: 'success' },
                    { time: '14:32:25', action: 'LOGIN_FAIL', user: 'unknown', type: 'error' },
                    { time: '14:32:28', action: 'SESSION_CREATE', user: 'user_12', type: 'success' },
                    { time: '14:32:31', action: 'API_CALL', user: 'service', type: 'success' },
                    { time: '14:32:35', action: 'CREDENTIAL_USE', user: 'admin', type: 'success' }
                ];

                let eventIndex = 0;
                let totalCount = 847;
                let eventStreamInterval = null;

                // Live counter state — tracks running values after initial count-up
                let currentEvents = 0;
                let currentCost = 0;
                let currentSessions = 0;
                let countersReady = false;
                let eventTick = 0;

                // Metric element references
                const eventsEl = metricValues[0];
                const costEl = metricValues[1];
                const sessionsEl = metricValues[2];

                function bumpCounter(el, value, prefix, decimals) {
                    el.textContent = prefix + (decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString());
                    el.classList.remove('bump');
                    // Force reflow to restart the animation
                    void el.offsetWidth;
                    el.classList.add('bump');
                }

                function addEvent() {
                    const event = events[eventIndex % events.length];
                    const item = document.createElement('div');
                    item.className = `event-stream-item ${event.type}`;
                    item.innerHTML = `
                        <span class="dot"></span>
                        <span class="time">${event.time}</span>
                        <span class="action">${event.action}</span>
                        <span class="user">${event.user}</span>
                    `;

                    // Keep only last 6 events
                    if (eventStream.children.length >= 6) {
                        eventStream.removeChild(eventStream.firstChild);
                    }
                    eventStream.appendChild(item);

                    totalCount++;
                    eventCountEl.textContent = totalCount.toLocaleString();
                    eventIndex++;

                    // Bump summary counters in sync with each event
                    if (countersReady) {
                        eventTick++;
                        currentEvents++;
                        bumpCounter(eventsEl, currentEvents, '', 0);

                        currentCost += +(Math.random() * 0.07 + 0.01).toFixed(2);
                        bumpCounter(costEl, currentCost, '$', 2);

                        // Sessions increment every ~3rd event
                        if (eventTick % 3 === 0) {
                            currentSessions++;
                            bumpCounter(sessionsEl, currentSessions, '', 0);
                        }
                    }
                }

                function animateCounter(el, target, prefix, duration) {
                    const startTime = performance.now();
                    function update(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const current = target * easeOut;

                        if (target % 1 === 0) {
                            el.textContent = prefix + Math.floor(current).toLocaleString();
                        } else {
                            el.textContent = prefix + current.toFixed(2);
                        }

                        if (progress < 1) {
                            requestAnimationFrame(update);
                        }
                    }
                    requestAnimationFrame(update);
                }

                function resetEventStream() {
                    eventStream.innerHTML = '';
                    eventIndex = 0;
                    totalCount = 847;
                    eventCountEl.textContent = totalCount.toLocaleString();
                    countersReady = false;
                    eventTick = 0;
                    // Reset counters to 0
                    metricValues.forEach(el => {
                        const prefix = el.dataset.prefix || '';
                        el.textContent = prefix + '0';
                        el.classList.remove('bump');
                    });
                }

                function startEventStream() {
                    if (eventStreamInterval) {
                        clearInterval(eventStreamInterval);
                    }

                    // Kick off initial count-up for the three summary counters
                    metricValues.forEach(el => {
                        const target = parseFloat(el.dataset.target);
                        const prefix = el.dataset.prefix || '';
                        animateCounter(el, target, prefix, 2000);
                    });

                    // After initial count-up completes, enable per-event bumping
                    setTimeout(() => {
                        currentEvents = 12847;
                        currentCost = 47.23;
                        currentSessions = 142;
                        countersReady = true;
                    }, 2050);

                    // Initial events
                    for (let i = 0; i < 6; i++) {
                        setTimeout(() => addEvent(), i * 200);
                    }

                    // Continue adding events
                    eventStreamInterval = setInterval(addEvent, 3000);
                }

                function stopEventStream() {
                    if (eventStreamInterval) {
                        clearInterval(eventStreamInterval);
                        eventStreamInterval = null;
                    }
                }

                // Auto-start/stop based on viewport visibility
                var auditSection = document.getElementById('audit-compliance');
                if (auditSection) {
                    const eventStreamObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                startEventStream();
                            } else {
                                stopEventStream();
                                resetEventStream();
                            }
                        });
                    }, { threshold: 0.3 });
                    eventStreamObserver.observe(auditSection);
                }
            }

            // Diff Viewer Animation - Now uses continuous CSS animation loop
        })();

        // ===========================================
        // GROUNDING SECTION ANIMATIONS
        // ===========================================
        (function() {
            // Shared utilities
            var ragAnimationRunning = false;
            var ragAnimationTimeouts = [];
            var kgAnimationRunning = false;
            var kgAnimationTimeouts = [];

            function ragTimeout(callback, delay) {
                var id = setTimeout(callback, delay);
                ragAnimationTimeouts.push(id);
                return id;
            }

            function clearRagTimeouts() {
                ragAnimationTimeouts.forEach(function(id) { clearTimeout(id); });
                ragAnimationTimeouts = [];
            }

            function clearKgTimeouts() {
                kgAnimationTimeouts.forEach(function(id) { clearTimeout(id); });
                kgAnimationTimeouts = [];
            }

            var ragSleep = function(ms) {
                return new Promise(function(resolve) {
                    var id = setTimeout(resolve, ms);
                    ragAnimationTimeouts.push(id);
                });
            };

            var kgSleep = function(ms) {
                return new Promise(function(resolve) {
                    var id = setTimeout(resolve, ms);
                    kgAnimationTimeouts.push(id);
                });
            };

            // Counter animation (reuses pattern from existing animateCounter)
            function animateGroundingCounter(el, target, prefix, duration) {
                if (!el) return;
                var startTime = performance.now();
                function update(currentTime) {
                    var elapsed = currentTime - startTime;
                    var progress = Math.min(elapsed / duration, 1);
                    var easeOut = 1 - Math.pow(1 - progress, 3);
                    var current = target * easeOut;
                    if (target % 1 === 0) {
                        el.textContent = prefix + Math.floor(current).toLocaleString();
                    } else {
                        el.textContent = prefix + current.toFixed(1);
                    }
                    if (progress < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
            }

            // -----------------------------------------------
            // TAB 1: Knowledge Graph Animation
            // -----------------------------------------------
            var kgDemoContainer = document.getElementById('kg-demo-container');

            // Edge definitions: [fromNodeId, toNodeId, lineClass]
            var kgEdges = [
                ['kg-node-db', 'kg-node-orders', 'table-line'],
                ['kg-node-db', 'kg-node-products', 'table-line'],
                ['kg-node-db', 'kg-node-customers', 'table-line'],
                ['kg-node-orders', 'kg-node-prodid', 'fk-line'],
                ['kg-node-orders', 'kg-node-custid', 'fk-line'],
                ['kg-node-prodid', 'kg-node-products', 'fk-line'],
                ['kg-node-custid', 'kg-node-customers', 'fk-line'],
                ['kg-node-orders', 'kg-node-revenue', 'concept-line'],
                ['kg-node-products', 'kg-node-quarterly', 'concept-line']
            ];

            // Question definitions for the cycling animation
            var kgQuestions = [
                {
                    question: 'What was Q4 revenue by product?',
                    nodes: ['kg-node-orders', 'kg-node-products', 'kg-node-prodid', 'kg-node-revenue', 'kg-node-quarterly'],
                    edges: [3, 5, 7, 8],
                    context: '3 tables \u00b7 2 FKs \u00b7 1 metric \u00b7 1 concept',
                    latency: '+12ms'
                },
                {
                    question: 'Show top customers by order volume',
                    nodes: ['kg-node-orders', 'kg-node-customers', 'kg-node-custid'],
                    edges: [4, 6],
                    context: '2 tables \u00b7 1 FK chain',
                    latency: '+8ms'
                },
                {
                    question: 'How do products relate to customer orders?',
                    nodes: ['kg-node-db', 'kg-node-orders', 'kg-node-products', 'kg-node-customers', 'kg-node-prodid', 'kg-node-custid'],
                    edges: [0, 1, 2, 3, 4, 5, 6],
                    context: '1 database \u00b7 3 tables \u00b7 4 FKs \u2014 full join graph',
                    latency: '+18ms'
                }
            ];

            // All KG node IDs for bulk operations
            var kgAllNodeIds = [
                'kg-node-db', 'kg-node-orders', 'kg-node-products', 'kg-node-customers',
                'kg-node-prodid', 'kg-node-custid', 'kg-node-revenue', 'kg-node-quarterly'
            ];

            function getNodeCenter(nodeId) {
                var node = document.getElementById(nodeId);
                var graph = document.getElementById('kg-graph');
                if (!node || !graph) return { x: 0, y: 0 };
                var nodeRect = node.getBoundingClientRect();
                var graphRect = graph.getBoundingClientRect();
                return {
                    x: (nodeRect.left - graphRect.left) + (nodeRect.width / 2),
                    y: (nodeRect.top - graphRect.top) + (nodeRect.height / 2)
                };
            }

            function drawKgEdges() {
                var svg = document.getElementById('kg-connections');
                var graph = document.getElementById('kg-graph');
                if (!svg || !graph) return;

                svg.innerHTML = '';
                var graphRect = graph.getBoundingClientRect();
                svg.setAttribute('viewBox', '0 0 ' + graphRect.width + ' ' + graphRect.height);
                svg.setAttribute('width', graphRect.width);
                svg.setAttribute('height', graphRect.height);

                kgEdges.forEach(function(edge, index) {
                    var from = getNodeCenter(edge[0]);
                    var to = getNodeCenter(edge[1]);
                    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', from.x);
                    line.setAttribute('y1', from.y);
                    line.setAttribute('x2', to.x);
                    line.setAttribute('y2', to.y);
                    line.classList.add(edge[2]);
                    line.dataset.edgeIndex = index;
                    svg.appendChild(line);
                });
            }

            function showKgEdge(index) {
                var svg = document.getElementById('kg-connections');
                if (!svg) return;
                var line = svg.querySelector('[data-edge-index="' + index + '"]');
                if (line) line.classList.add('visible');
            }

            function resetKgAnimation() {
                clearKgTimeouts();

                // Hide all nodes and remove all states
                document.querySelectorAll('#kg-demo-container .kg-node').forEach(function(n) {
                    n.classList.remove('visible', 'pulse', 'dimmed', 'highlighted');
                });

                // Hide all edges and remove all states
                var svg = document.getElementById('kg-connections');
                if (svg) {
                    svg.querySelectorAll('line').forEach(function(l) {
                        l.classList.remove('visible', 'dimmed', 'highlighted');
                    });
                }

                // Clear question bar
                var questionBar = document.getElementById('kg-question-bar');
                if (questionBar) questionBar.classList.remove('visible');
                var questionText = document.getElementById('kg-question-text');
                if (questionText) questionText.textContent = '';
                var questionCursor = document.getElementById('kg-question-cursor');
                if (questionCursor) questionCursor.style.display = 'inline';

                // Clear context bar
                var contextBar = document.getElementById('kg-context-bar');
                if (contextBar) contextBar.classList.remove('visible');
                var contextText = document.getElementById('kg-context-text');
                if (contextText) contextText.textContent = '';

                // Reset latency badge
                var latencyBadge = document.getElementById('kg-latency-badge');
                if (latencyBadge) latencyBadge.textContent = '+0ms';

                // Hide result
                var kgResult = document.getElementById('kg-result');
                if (kgResult) kgResult.classList.remove('visible');

                // Reset container opacity
                if (kgDemoContainer) kgDemoContainer.style.opacity = '1';
            }

            // Type question text character by character into the question bar
            async function kgTypeQuestion(text) {
                var textEl = document.getElementById('kg-question-text');
                var cursorEl = document.getElementById('kg-question-cursor');
                if (!textEl) return;

                textEl.textContent = '';
                if (cursorEl) cursorEl.style.display = 'inline';

                for (var i = 0; i < text.length; i++) {
                    if (!kgAnimationRunning) return;
                    textEl.textContent += text[i];
                    await kgSleep(30);
                }

                // Hide cursor after typing completes
                await kgSleep(300);
                if (cursorEl) cursorEl.style.display = 'none';
            }

            // Dim all nodes and edges
            function dimKgGraph() {
                kgAllNodeIds.forEach(function(id) {
                    var node = document.getElementById(id);
                    if (node) {
                        node.classList.remove('highlighted', 'pulse');
                        node.classList.add('dimmed');
                    }
                });

                var svg = document.getElementById('kg-connections');
                if (svg) {
                    svg.querySelectorAll('line').forEach(function(l) {
                        l.classList.remove('highlighted');
                        l.classList.add('dimmed');
                    });
                }
            }

            // Remove dim from all nodes and edges (restore to normal visible state)
            function undimKgGraph() {
                kgAllNodeIds.forEach(function(id) {
                    var node = document.getElementById(id);
                    if (node) {
                        node.classList.remove('dimmed', 'highlighted', 'pulse');
                    }
                });

                var svg = document.getElementById('kg-connections');
                if (svg) {
                    svg.querySelectorAll('line').forEach(function(l) {
                        l.classList.remove('dimmed', 'highlighted');
                    });
                }
            }

            // Highlight specific nodes and edges for a question
            async function highlightKgSubgraph(questionDef) {
                if (!kgAnimationRunning) return;

                // Dim everything first
                dimKgGraph();
                await kgSleep(400);

                // Highlight relevant nodes with staggered reveal
                for (var i = 0; i < questionDef.nodes.length; i++) {
                    if (!kgAnimationRunning) return;
                    var node = document.getElementById(questionDef.nodes[i]);
                    if (node) {
                        node.classList.remove('dimmed');
                        node.classList.add('highlighted');
                    }
                    await kgSleep(120);
                }

                // Highlight relevant edges
                var svg = document.getElementById('kg-connections');
                if (svg) {
                    questionDef.edges.forEach(function(edgeIdx) {
                        var line = svg.querySelector('[data-edge-index="' + edgeIdx + '"]');
                        if (line) {
                            line.classList.remove('dimmed');
                            line.classList.add('highlighted');
                        }
                    });
                }
            }

            async function runKgAnimation() {
                if (!kgAnimationRunning) return;
                resetKgAnimation();
                drawKgEdges();
                await kgSleep(200);

                // ============================================
                // Phase 1: Instant Graph Build (no animation)
                // ============================================

                // Show all nodes and edges immediately
                kgAllNodeIds.forEach(function(id) {
                    var node = document.getElementById(id);
                    if (node) node.classList.add('visible');
                });
                kgEdges.forEach(function(edge, index) { showKgEdge(index); });
                await kgSleep(400);

                // ============================================
                // Phase 2: Question Cycling
                // ============================================

                // Show question bar
                var questionBar = document.getElementById('kg-question-bar');
                if (questionBar) questionBar.classList.add('visible');

                for (var q = 0; q < kgQuestions.length; q++) {
                    if (!kgAnimationRunning) return;
                    var questionDef = kgQuestions[q];

                    // Type the question
                    await kgTypeQuestion(questionDef.question);
                    if (!kgAnimationRunning) return;

                    // Highlight the relevant subgraph
                    await highlightKgSubgraph(questionDef);
                    if (!kgAnimationRunning) return;

                    // Show context bar with extracted context
                    var contextBar = document.getElementById('kg-context-bar');
                    var contextText = document.getElementById('kg-context-text');
                    if (contextText) contextText.textContent = '\u2192 ' + questionDef.context;
                    if (contextBar) contextBar.classList.add('visible');

                    // Update latency badge
                    var latencyBadge = document.getElementById('kg-latency-badge');
                    if (latencyBadge) latencyBadge.textContent = questionDef.latency;

                    // Pulse highlighted nodes
                    kgAllNodeIds.forEach(function(id) {
                        var node = document.getElementById(id);
                        if (node && node.classList.contains('highlighted')) {
                            node.classList.add('pulse');
                        }
                    });

                    // Hold for viewing
                    await kgSleep(2800);
                    if (!kgAnimationRunning) return;

                    // Transition out: un-dim briefly before next question
                    undimKgGraph();

                    // Remove pulse
                    document.querySelectorAll('#kg-demo-container .kg-node.pulse').forEach(function(n) {
                        n.classList.remove('pulse');
                    });

                    // Hide context bar
                    if (contextBar) contextBar.classList.remove('visible');

                    // Clear question text for next question
                    var questionTextEl = document.getElementById('kg-question-text');
                    if (questionTextEl) questionTextEl.textContent = '';
                    var cursorEl = document.getElementById('kg-question-cursor');
                    if (cursorEl) cursorEl.style.display = 'inline';

                    // Brief pause between questions
                    await kgSleep(600);
                }

                // ============================================
                // Phase 3: Final Result
                // ============================================
                if (!kgAnimationRunning) return;

                // Hide question bar
                if (questionBar) questionBar.classList.remove('visible');

                // All nodes full opacity, pulse all
                document.querySelectorAll('#kg-demo-container .kg-node.visible').forEach(function(n) {
                    n.classList.add('pulse');
                });

                await kgSleep(800);

                // Show result
                if (!kgAnimationRunning) return;
                var kgResult = document.getElementById('kg-result');
                if (kgResult) kgResult.classList.add('visible');

                // Hold
                await kgSleep(3000);

                // Fade out and loop
                if (!kgAnimationRunning) return;
                kgDemoContainer.style.opacity = '0';
                await kgSleep(500);
                kgDemoContainer.style.opacity = '1';

                if (kgAnimationRunning) {
                    runKgAnimation();
                }
            }

            // -----------------------------------------------
            // TAB 2: RAG Animation
            // -----------------------------------------------
            var ragDemoContainer = document.getElementById('rag-demo-container');

            async function ragTypeText(element, text, speed) {
                if (!element) return;
                for (var i = 0; i < text.length; i++) {
                    if (!ragAnimationRunning) return;
                    element.textContent += text[i];
                    await ragSleep(speed);
                }
            }

            function resetRagAnimation() {
                clearRagTimeouts();

                // Reset stages
                document.querySelectorAll('#rag-demo-container .rag-stage').forEach(function(el) {
                    el.classList.remove('visible');
                });

                // Reset arrows
                document.querySelectorAll('#rag-demo-container .rag-flow-arrow').forEach(function(el) {
                    el.classList.remove('visible');
                });

                // Reset collection badges
                document.querySelectorAll('#rag-demo-container .rag-collection-badge').forEach(function(el) {
                    el.classList.remove('visible');
                });

                // Reset score rows and bars
                document.querySelectorAll('#rag-demo-container .rag-score-row').forEach(function(el) {
                    el.classList.remove('visible');
                });
                document.querySelectorAll('#rag-demo-container .rag-score-fill').forEach(function(el) {
                    el.style.width = '0%';
                    el.classList.remove('high', 'medium', 'low');
                });

                // Reset citations
                document.querySelectorAll('#rag-demo-container .rag-citation').forEach(function(el) {
                    el.classList.remove('visible');
                });

                // Reset guardrail
                var guardrail = document.getElementById('rag-guardrail');
                if (guardrail) guardrail.classList.remove('visible');

                // Reset metrics
                var metrics = document.getElementById('rag-metrics');
                if (metrics) metrics.classList.remove('visible');

                // Clear text content
                var questionText = document.getElementById('rag-question-text');
                var answerText = document.getElementById('rag-answer-text');
                if (questionText) questionText.textContent = '';
                if (answerText) answerText.textContent = '';

                // Reset counter values
                var latencyEl = document.getElementById('rag-latency');
                var tokensEl = document.getElementById('rag-tokens');
                var sourcesEl = document.getElementById('rag-sources');
                if (latencyEl) latencyEl.textContent = '0';
                if (tokensEl) tokensEl.textContent = '0';
                if (sourcesEl) sourcesEl.textContent = '0';

                // Reset container opacity
                if (ragDemoContainer) ragDemoContainer.style.opacity = '1';
            }

            async function runRagAnimation() {
                if (!ragAnimationRunning) return;
                resetRagAnimation();
                await ragSleep(200);

                // Stage 1: Question appears
                if (!ragAnimationRunning) return;
                document.getElementById('rag-stage-question').classList.add('visible');
                await ragTypeText(
                    document.getElementById('rag-question-text'),
                    'What is the return policy for electronics purchased online?',
                    30
                );
                await ragSleep(400);

                // Arrow 1
                if (!ragAnimationRunning) return;
                document.getElementById('rag-arrow-1').classList.add('visible');
                await ragSleep(400);

                // Stage 2: Retrieval
                if (!ragAnimationRunning) return;
                document.getElementById('rag-stage-retrieval').classList.add('visible');
                await ragSleep(200);

                // Collection badges staggered
                if (!ragAnimationRunning) return;
                document.getElementById('rag-collection-1').classList.add('visible');
                await ragSleep(200);
                if (!ragAnimationRunning) return;
                document.getElementById('rag-collection-2').classList.add('visible');
                await ragSleep(400);

                // Score rows staggered with bar animation
                var scores = [
                    { id: 'rag-score-1', score: 94, colorClass: 'high' },
                    { id: 'rag-score-2', score: 87, colorClass: 'medium' },
                    { id: 'rag-score-3', score: 71, colorClass: 'low' }
                ];

                for (var s = 0; s < scores.length; s++) {
                    if (!ragAnimationRunning) return;
                    var row = document.getElementById(scores[s].id);
                    if (!row) continue;
                    row.classList.add('visible');
                    var fill = row.querySelector('.rag-score-fill');
                    if (fill) {
                        fill.classList.add(scores[s].colorClass);
                        void fill.offsetWidth; // Force reflow so transition fires
                        fill.style.width = scores[s].score + '%';
                    }
                    await ragSleep(300);
                }

                await ragSleep(600);

                // Arrow 2
                if (!ragAnimationRunning) return;
                document.getElementById('rag-arrow-2').classList.add('visible');
                await ragSleep(400);

                // Stage 3: Answer
                if (!ragAnimationRunning) return;
                document.getElementById('rag-stage-answer').classList.add('visible');
                await ragTypeText(
                    document.getElementById('rag-answer-text'),
                    'Electronics purchased online may be returned within 30 days for a full refund, provided they are in original packaging.',
                    20
                );
                await ragSleep(300);

                // Citations staggered
                if (!ragAnimationRunning) return;
                var citations = document.querySelectorAll('#rag-demo-container .rag-citation');
                for (var c = 0; c < citations.length; c++) {
                    if (!ragAnimationRunning) return;
                    citations[c].classList.add('visible');
                    await ragSleep(200);
                }

                await ragSleep(400);

                // Guardrail badge
                if (!ragAnimationRunning) return;
                document.getElementById('rag-guardrail').classList.add('visible');
                await ragSleep(500);

                // Metrics
                if (!ragAnimationRunning) return;
                document.getElementById('rag-metrics').classList.add('visible');
                animateGroundingCounter(document.getElementById('rag-latency'), 1200, '', 1500);
                animateGroundingCounter(document.getElementById('rag-tokens'), 3847, '', 1500);
                animateGroundingCounter(document.getElementById('rag-sources'), 2, '', 800);

                // Hold
                await ragSleep(2500);

                // Fade out and loop
                if (!ragAnimationRunning) return;
                ragDemoContainer.style.opacity = '0';
                await ragSleep(500);
                ragDemoContainer.style.opacity = '1';

                if (ragAnimationRunning) {
                    runRagAnimation();
                }
            }

            // -----------------------------------------------
            // IntersectionObserver + Tab Switch Handlers
            // -----------------------------------------------
            var groundingSection = document.getElementById('grounding');
            if (!groundingSection) return;

            var groundingTab1 = document.getElementById('grounding-tab1');
            var groundingTab2 = document.getElementById('grounding-tab2');

            // Viewport observer: start active tab's animation on enter, stop all on exit
            var groundingObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        // Start whichever tab is currently active
                        if (groundingTab1 && groundingTab1.classList.contains('active') && !kgAnimationRunning) {
                            kgAnimationRunning = true;
                            runKgAnimation();
                        }
                        if (groundingTab2 && groundingTab2.classList.contains('active') && !ragAnimationRunning) {
                            ragAnimationRunning = true;
                            runRagAnimation();
                        }
                    } else {
                        // Section left viewport: stop and reset both animations
                        ragAnimationRunning = false;
                        clearRagTimeouts();
                        resetRagAnimation();

                        kgAnimationRunning = false;
                        clearKgTimeouts();
                        resetKgAnimation();
                    }
                });
            }, { threshold: 0.3 });

            groundingObserver.observe(groundingSection);

            // Tab switch handlers: stop one animation, start the other
            var groundingTabButtons = document.querySelectorAll(
                '[data-section-tab="grounding-tab1"], [data-section-tab="grounding-tab2"]'
            );

            groundingTabButtons.forEach(function(tab) {
                tab.addEventListener('click', function() {
                    if (tab.dataset.sectionTab === 'grounding-tab1') {
                        // Switching to KG tab: stop RAG, start KG
                        ragAnimationRunning = false;
                        clearRagTimeouts();
                        resetRagAnimation();

                        kgAnimationRunning = true;
                        runKgAnimation();
                    } else if (tab.dataset.sectionTab === 'grounding-tab2') {
                        // Switching to RAG tab: stop KG, start RAG
                        kgAnimationRunning = false;
                        clearKgTimeouts();
                        resetKgAnimation();

                        ragAnimationRunning = true;
                        runRagAnimation();
                    }
                });
            });

            // Recalculate KG edge positions on window resize
            var resizeTimeout = null;
            window.addEventListener('resize', function() {
                if (resizeTimeout) clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function() {
                    if (kgAnimationRunning) {
                        drawKgEdges();
                    }
                }, 200);
            });
        })();

        // === CONTEXT WINDOW SECTION ANIMATIONS ===
        (function() {
            // --- Adaptive Engine + Live Compressor ---
            var cwAssemblyRunning = false;
            var cwAssemblyTimeouts = [];
            var cwCondenseRunning = false;
            var cwCondenseTimeouts = [];

            function cwSleep(arr, ms) {
                return new Promise(function(resolve) { var id = setTimeout(resolve, ms); arr.push(id); });
            }
            function clearArr(arr) { arr.forEach(function(id) { clearTimeout(id); }); arr.length = 0; }

            // Counter animation helper
            function cwCounter(el, from, to, suffix, duration) {
                if (!el) return;
                var startTime = performance.now();
                function update(now) {
                    var p = Math.min((now - startTime) / duration, 1);
                    var eased = 1 - Math.pow(1 - p, 3);
                    var v = from + (to - from) * eased;
                    if (Math.abs(to) >= 1000) {
                        el.textContent = Math.round(v).toLocaleString() + (suffix || '');
                    } else {
                        el.textContent = (Math.round(v * 10) / 10) + (suffix || '');
                    }
                    if (p < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
            }

            // -----------------------------------------------
            // TAB 1: Budget Orchestration — Scenario Morphing
            // -----------------------------------------------
            var cwModuleKeys = ['system', 'tools', 'history', 'rag', 'knowledge', 'plan', 'docs', 'components', 'workflow', 'graph', 'memory', 'release', 'findings'];

            var cwScenarios = [
                {
                    name: 'RAG Analysis Query',
                    decision: 'high_confidence_rag \u2192 tools \u221250%',
                    util: 72,
                    alloc: [9, 7, 12, 21, 13, 7, 6, 4, 6, 7, 4, 2, 2],
                    tokens: ['15.8K','12.3K','21.1K','40.5K','22.9K','12.3K','10.6K','7.0K','10.6K','12.3K','7.0K','3.5K','3.5K']
                },
                {
                    name: 'Code Generation Task',
                    decision: 'complex_tooling \u2192 rag \u221260%, boost tools',
                    util: 85,
                    alloc: [7, 20, 16, 5, 5, 13, 9, 7, 5, 5, 4, 2, 2],
                    tokens: ['12.3K','38.7K','28.2K','8.8K','8.8K','22.9K','15.8K','12.3K','8.8K','8.8K','7.0K','3.5K','3.5K']
                },
                {
                    name: 'Document Review',
                    decision: 'doc_heavy \u2192 compress history, expand docs',
                    util: 78,
                    alloc: [7, 5, 9, 11, 9, 5, 23, 11, 8, 4, 4, 2, 2],
                    tokens: ['12.3K','8.8K','15.8K','19.4K','15.8K','8.8K','44.0K','19.4K','14.1K','7.0K','7.0K','3.5K','3.5K']
                }
            ];

            var cwCurrentAlloc = null;

            function resetCwAssembly() {
                clearArr(cwAssemblyTimeouts);
                var s0 = cwScenarios[0];
                // Show Scenario 1 stage immediately
                var sc = document.getElementById('cw-scenario');
                if (sc) sc.classList.add('visible');
                var sn = document.getElementById('cw-scenario-name');
                if (sn) { sn.textContent = s0.name; sn.style.opacity = '1'; }
                var hd = document.getElementById('cw-model-header');
                if (hd) hd.classList.add('visible');
                var sw = document.getElementById('cw-stacked-wrap');
                if (sw) { sw.classList.add('visible'); sw.classList.remove('morphing'); }
                cwModuleKeys.forEach(function(key, i) {
                    var seg = document.getElementById('cw-seg-' + key);
                    if (seg) { seg.style.width = s0.alloc[i] + '%'; seg.classList.remove('growing', 'shrinking'); }
                });
                cwCurrentAlloc = s0.alloc.slice();
                var leg = document.getElementById('cw-legend');
                if (leg) leg.classList.add('visible');
                cwModuleKeys.forEach(function(key, i) {
                    var lp = document.getElementById('cw-lp-' + key);
                    if (lp) { lp.textContent = s0.alloc[i] + '%'; lp.classList.remove('changing'); }
                    var lt = document.getElementById('cw-lt-' + key);
                    if (lt) { lt.textContent = s0.tokens[i]; lt.classList.remove('changing'); }
                });
                var eng = document.getElementById('cw-engine');
                if (eng) eng.classList.add('visible');
                var et = document.getElementById('cw-engine-text');
                if (et) et.textContent = s0.decision;
                var ut = document.getElementById('cw-util');
                if (ut) ut.classList.add('visible');
                var uf = document.getElementById('cw-util-fill');
                if (uf) uf.style.width = s0.util + '%';
                var ul = document.getElementById('cw-util-label');
                if (ul) ul.textContent = s0.util + '% utilized';
                var anno1 = document.getElementById('cw-anno-tab1');
                if (anno1) anno1.classList.add('visible');
            }

            function cwApplyScenario(s, stagger) {
                // Set segments
                cwModuleKeys.forEach(function(key, i) {
                    var seg = document.getElementById('cw-seg-' + key);
                    if (seg) {
                        if (stagger) {
                            (function(el, pct, delay) {
                                var tid = setTimeout(function() { el.style.width = pct + '%'; }, delay);
                                cwAssemblyTimeouts.push(tid);
                            })(seg, s.alloc[i], i * 80);
                        } else {
                            seg.style.width = s.alloc[i] + '%';
                        }
                    }
                    // Legend values
                    var lp = document.getElementById('cw-lp-' + key);
                    if (lp) lp.textContent = s.alloc[i] + '%';
                    var lt = document.getElementById('cw-lt-' + key);
                    if (lt) lt.textContent = s.tokens[i];
                });
                cwCurrentAlloc = s.alloc.slice();
            }

            function cwMorphTo(s) {
                var wrap = document.getElementById('cw-stacked-wrap');
                if (wrap) wrap.classList.add('morphing');
                // Brightness feedback
                cwModuleKeys.forEach(function(key, i) {
                    var seg = document.getElementById('cw-seg-' + key);
                    if (seg && cwCurrentAlloc) {
                        if (s.alloc[i] > cwCurrentAlloc[i]) seg.classList.add('growing');
                        else if (s.alloc[i] < cwCurrentAlloc[i]) seg.classList.add('shrinking');
                    }
                    // Pulse legend values
                    var lp = document.getElementById('cw-lp-' + key);
                    if (lp && cwCurrentAlloc && s.alloc[i] !== cwCurrentAlloc[i]) lp.classList.add('changing');
                    var lt = document.getElementById('cw-lt-' + key);
                    if (lt && cwCurrentAlloc && s.alloc[i] !== cwCurrentAlloc[i]) lt.classList.add('changing');
                });
                // Apply new widths + values
                cwApplyScenario(s, false);
                // Update decision
                var et = document.getElementById('cw-engine-text');
                if (et) et.textContent = s.decision;
                // Update util
                var uf = document.getElementById('cw-util-fill');
                if (uf) uf.style.width = s.util + '%';
                var ul = document.getElementById('cw-util-label');
                if (ul) cwCounter(ul, 0, s.util, '% utilized', 800);
                // Crossfade scenario name
                var sn = document.getElementById('cw-scenario-name');
                if (sn) {
                    sn.style.opacity = '0';
                    var tid = setTimeout(function() {
                        sn.textContent = s.name;
                        sn.style.opacity = '1';
                    }, 300);
                    cwAssemblyTimeouts.push(tid);
                }
                // Clean up after transition
                var tid2 = setTimeout(function() {
                    if (wrap) wrap.classList.remove('morphing');
                    cwModuleKeys.forEach(function(key) {
                        var seg = document.getElementById('cw-seg-' + key);
                        if (seg) seg.classList.remove('growing', 'shrinking');
                        var lp = document.getElementById('cw-lp-' + key);
                        if (lp) lp.classList.remove('changing');
                        var lt = document.getElementById('cw-lt-' + key);
                        if (lt) lt.classList.remove('changing');
                    });
                }, 1000);
                cwAssemblyTimeouts.push(tid2);
            }

            async function runCwAssemblyAnimation() {
                if (!cwAssemblyRunning) return;
                resetCwAssembly();
                var s = cwSleep.bind(null, cwAssemblyTimeouts);

                // Stage is already visible (Scenario 1) — hold
                await s(2000);

                // Morph to scenario 2
                if (!cwAssemblyRunning) return;
                cwMorphTo(cwScenarios[1]);
                await s(2500);

                // Morph to scenario 3
                if (!cwAssemblyRunning) return;
                cwMorphTo(cwScenarios[2]);
                await s(1500);

                // Done — hold final state
                cwAssemblyRunning = false;
            }

            // -----------------------------------------------
            // TAB 2: Context Management — Live Adaptation
            // -----------------------------------------------
            var cwManageRunning = false;
            var cwManageTimeouts = [];

            var cwDefaultAlloc = [8, 8, 8, 8, 8, 8, 8, 8, 7, 9, 9, 9, 2];

            // Intermediate allocations after each decision step
            var cwAdaptSteps = [
                // Step 1: Analyzing — no bar change
                null,
                // Step 2: expand rag_context +15% (8→23), shrink others slightly
                [8, 7, 8, 21, 8, 7, 7, 6, 6, 8, 7, 5, 2],
                // Step 3: boost knowledge +7% (8→15), adjust
                [8, 7, 8, 21, 15, 6, 6, 5, 5, 7, 6, 4, 2],
                // Step 4: compress tools −55% (7→3), redistribute
                [8, 3, 8, 21, 15, 7, 7, 5, 6, 8, 6, 4, 2],
                // Step 5: expand history to 14%
                [8, 3, 14, 21, 15, 6, 6, 4, 5, 7, 5, 4, 2],
                // Step 6: compress workflow −42% (5→3), final rebalance
                [8, 3, 14, 21, 15, 6, 7, 4, 3, 7, 6, 4, 2]
            ];

            function resetCwManage() {
                clearArr(cwManageTimeouts);
                // Show stage immediately: header, bar, workload, log container, metrics, annotation
                var hd = document.getElementById('cw-cm-header');
                if (hd) hd.classList.add('visible');
                var st = document.getElementById('cw-cm-status');
                if (st) { st.textContent = 'Idle'; st.className = 'cw-cm-status fira-code idle'; }
                var bw = document.getElementById('cw-cm-bar-wrap');
                if (bw) { bw.classList.add('visible'); bw.classList.remove('morphing'); }
                cwModuleKeys.forEach(function(key, i) {
                    var seg = document.getElementById('cw-cm-seg-' + key);
                    if (seg) { seg.style.width = cwDefaultAlloc[i] + '%'; seg.classList.remove('growing', 'shrinking'); }
                });
                var wl = document.getElementById('cw-workload');
                if (wl) wl.classList.add('visible');
                var log = document.getElementById('cw-cm-log');
                if (log) log.classList.add('visible');
                // Log lines hidden (will animate)
                for (var i = 1; i <= 6; i++) {
                    var line = document.getElementById('cw-cm-log-' + i);
                    if (line) { line.className = 'cw-cm-log-line'; }
                }
                // Final status hidden (result of animation)
                var fin = document.getElementById('cw-cm-final');
                if (fin) fin.classList.remove('visible');
                var uf = document.getElementById('cw-cm-util-fill');
                if (uf) uf.style.width = '0%';
                var ulb = document.getElementById('cw-cm-util-label');
                if (ulb) ulb.textContent = '0% utilized';
                var met = document.getElementById('cw-cm-metrics');
                if (met) met.classList.add('visible');
                var anno2 = document.getElementById('cw-anno-tab2');
                if (anno2) anno2.classList.add('visible');
            }

            function cwApplyManageAlloc(alloc, glow) {
                var bw = document.getElementById('cw-cm-bar-wrap');
                if (glow && bw) bw.classList.add('morphing');
                cwModuleKeys.forEach(function(key, i) {
                    var seg = document.getElementById('cw-cm-seg-' + key);
                    if (seg) {
                        var prev = parseFloat(seg.style.width) || 0;
                        seg.style.width = alloc[i] + '%';
                        if (glow) {
                            if (alloc[i] > prev + 1) seg.classList.add('growing');
                            else if (alloc[i] < prev - 1) seg.classList.add('shrinking');
                        }
                    }
                });
                if (glow) {
                    var tid = setTimeout(function() {
                        if (bw) bw.classList.remove('morphing');
                        cwModuleKeys.forEach(function(key) {
                            var seg = document.getElementById('cw-cm-seg-' + key);
                            if (seg) seg.classList.remove('growing', 'shrinking');
                        });
                    }, 800);
                    cwManageTimeouts.push(tid);
                }
            }

            async function runCwManageAnimation() {
                if (!cwManageRunning) return;
                resetCwManage();
                var s = cwSleep.bind(null, cwManageTimeouts);
                var st = document.getElementById('cw-cm-status');

                // Stage is visible (Idle + default allocation) — brief pause
                await s(500);

                // Status → Adapting...
                if (!cwManageRunning) return;
                if (st) { st.textContent = 'Adapting...'; st.classList.remove('idle'); st.classList.add('adapting'); }
                await s(300);

                // Process 6 log lines — each triggers bar change
                for (var i = 1; i <= 6; i++) {
                    if (!cwManageRunning) return;
                    var line = document.getElementById('cw-cm-log-' + i);
                    if (line) { line.classList.add('visible'); line.classList.add('active'); }
                    await s(300);

                    // Apply bar change if this step has one
                    if (!cwManageRunning) return;
                    if (cwAdaptSteps[i - 1]) {
                        cwApplyManageAlloc(cwAdaptSteps[i - 1], true);
                    }
                    await s(400);

                    // Mark done
                    if (line) { line.classList.remove('active'); line.classList.add('done'); }
                    await s(100);
                }

                await s(300);

                // Final status
                if (!cwManageRunning) return;
                if (st) { st.textContent = 'Adapted'; st.classList.remove('adapting'); st.classList.add('adapted'); }
                var fin = document.getElementById('cw-cm-final');
                if (fin) fin.classList.add('visible');
                var uf = document.getElementById('cw-cm-util-fill');
                if (uf) setTimeout(function() { uf.style.width = '72%'; }, 50);
                var ulb = document.getElementById('cw-cm-util-label');
                if (ulb) cwCounter(ulb, 0, 72, '% utilized', 800);
                await s(800);

                // Done
                cwManageRunning = false;
            }

            // -----------------------------------------------
            // TAB 3: Smart Condensation — Live Compressor
            // -----------------------------------------------
            var cwCompressSteps = [
                { id: 'cw-cs-tools', savings: 4500 },
                { id: 'cw-cs-history', savings: 8000 },
                { id: 'cw-cs-rag', savings: 5500 },
                { id: 'cw-cs-docs', savings: 6000 }
            ];
            var cwStartTokens = 51000;
            var cwBudget = 40000;

            function resetCwCondense() {
                clearArr(cwCondenseTimeouts);
                // Show stage immediately: header, bar at 100% (over budget), counter at 51K, trigger, annotation
                var ch = document.getElementById('cw-cap-header');
                if (ch) ch.classList.add('visible');
                var cs = document.getElementById('cw-cap-status');
                if (cs) { cs.textContent = '\u26A0 OVER BUDGET'; cs.className = 'cw-cap-status fira-code visible over'; }
                var cw = document.getElementById('cw-cap-wrap');
                if (cw) cw.classList.add('visible');
                var cf = document.getElementById('cw-cap-fill');
                if (cf) { cf.style.width = '100%'; cf.className = 'cw-cap-fill over'; }
                var tl = document.getElementById('cw-token-live');
                if (tl) tl.classList.add('visible');
                var tv = document.getElementById('cw-token-value');
                if (tv) { tv.textContent = '51,000'; tv.className = 'cw-token-value fira-code over'; }
                var tr = document.getElementById('cw-trigger');
                if (tr) tr.classList.add('visible');
                // Compression steps hidden (will animate)
                cwCompressSteps.forEach(function(step) {
                    var el = document.getElementById(step.id);
                    if (el) el.className = 'cw-step';
                });
                // Result hidden (result of animation)
                var res = document.getElementById('cw-result');
                if (res) res.classList.remove('visible');
                var rv = document.getElementById('cw-result-value');
                if (rv) rv.textContent = '0';
                var rp = document.getElementById('cw-result-pct');
                if (rp) rp.textContent = '0';
                var anno3 = document.getElementById('cw-anno-tab3');
                if (anno3) anno3.classList.add('visible');
            }

            async function runCwCondenseAnimation() {
                if (!cwCondenseRunning) return;
                resetCwCondense();
                var s = cwSleep.bind(null, cwCondenseTimeouts);
                var cf = document.getElementById('cw-cap-fill');
                var tv = document.getElementById('cw-token-value');
                var cs = document.getElementById('cw-cap-status');

                // Stage is visible (bar at 100%, OVER BUDGET, 51K) — brief pause
                await s(500);

                // Compression steps — the main event
                var currentTokens = cwStartTokens;
                for (var i = 0; i < cwCompressSteps.length; i++) {
                    if (!cwCondenseRunning) return;
                    var step = cwCompressSteps[i];
                    var el = document.getElementById(step.id);

                    // Show step + highlight active
                    if (el) { el.classList.add('visible'); el.classList.add('active'); }
                    await s(300);

                    // Compress: shrink bar + count down
                    if (!cwCondenseRunning) return;
                    var prevTokens = currentTokens;
                    currentTokens -= step.savings;
                    var barPct = (currentTokens / cwStartTokens) * 100;
                    if (cf) cf.style.width = barPct + '%';
                    if (tv) cwCounter(tv, prevTokens, currentTokens, '', 500);

                    // Check if crossing budget line
                    if (currentTokens <= cwBudget && prevTokens > cwBudget) {
                        await s(350);
                        if (cf) { cf.classList.remove('over'); cf.classList.add('under'); }
                        if (tv) tv.classList.remove('over');
                        if (tv) tv.classList.add('under');
                        if (cs) { cs.textContent = '\u2713 OPTIMIZED'; cs.classList.remove('over'); cs.classList.add('ok'); }
                    }

                    await s(400);
                    // Mark done
                    if (el) { el.classList.remove('active'); el.classList.add('done'); }
                    await s(200);
                }

                await s(600);

                // Savings result
                if (!cwCondenseRunning) return;
                var res = document.getElementById('cw-result');
                if (res) res.classList.add('visible');
                var totalSaved = cwStartTokens - currentTokens;
                var pctReduction = Math.round((totalSaved / cwStartTokens) * 100);
                var rv = document.getElementById('cw-result-value');
                if (rv) cwCounter(rv, 0, totalSaved, '', 800);
                var rp = document.getElementById('cw-result-pct');
                if (rp) cwCounter(rp, 0, pctReduction, '', 800);
                await s(1000);

                // Done — hold final state
                cwCondenseRunning = false;
            }

            // -----------------------------------------------
            // IntersectionObserver + Tab Switch (3 tabs)
            // -----------------------------------------------
            var cwSection = document.getElementById('context-window');
            if (!cwSection) return;
            var cwTab1 = document.getElementById('context-tab1');
            var cwTab2 = document.getElementById('context-tab2');
            var cwTab3 = document.getElementById('context-tab3');

            function cwStopAll() {
                cwAssemblyRunning = false;
                clearArr(cwAssemblyTimeouts);
                resetCwAssembly();
                cwManageRunning = false;
                clearArr(cwManageTimeouts);
                resetCwManage();
                cwCondenseRunning = false;
                clearArr(cwCondenseTimeouts);
                resetCwCondense();
            }

            var cwObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        if (cwTab1 && cwTab1.classList.contains('active') && !cwAssemblyRunning) {
                            cwAssemblyRunning = true;
                            runCwAssemblyAnimation();
                        }
                        if (cwTab2 && cwTab2.classList.contains('active') && !cwManageRunning) {
                            cwManageRunning = true;
                            runCwManageAnimation();
                        }
                        if (cwTab3 && cwTab3.classList.contains('active') && !cwCondenseRunning) {
                            cwCondenseRunning = true;
                            runCwCondenseAnimation();
                        }
                    } else {
                        cwStopAll();
                    }
                });
            }, { threshold: 0.3 });
            cwObserver.observe(cwSection);

            var cwTabButtons = document.querySelectorAll(
                '[data-section-tab="context-tab1"], [data-section-tab="context-tab2"], [data-section-tab="context-tab3"]'
            );
            cwTabButtons.forEach(function(tab) {
                tab.addEventListener('click', function() {
                    cwStopAll();
                    if (tab.dataset.sectionTab === 'context-tab1') {
                        cwAssemblyRunning = true;
                        runCwAssemblyAnimation();
                    } else if (tab.dataset.sectionTab === 'context-tab2') {
                        cwManageRunning = true;
                        runCwManageAnimation();
                    } else if (tab.dataset.sectionTab === 'context-tab3') {
                        cwCondenseRunning = true;
                        runCwCondenseAnimation();
                    }
                });
            });
        })();

        // ===========================================
        // CONTACT MODAL FUNCTIONALITY
        // ===========================================
        (() => {
            const modalOverlay = document.getElementById('contact-modal-overlay');
            const modal = document.querySelector('.contact-modal');
            const cancelBtn = document.getElementById('contact-cancel');
            const contactForm = document.getElementById('contact-form');
            const submitBtn = document.getElementById('contact-submit');
            const submitText = document.getElementById('submit-text');
            const submitLoading = document.getElementById('submit-loading');
            const formSuccess = document.getElementById('form-success');
            const formError = document.getElementById('form-error');
            const successMessage = document.getElementById('success-message');
            const errorMessage = document.getElementById('error-message');

            // Get all "Request Demo" links
            const requestDemoLinks = document.querySelectorAll('a[href="#contact"]');

            // Track trigger element for focus return
            let triggerElement = null;

            // Open modal
            function openModal(e) {
                if (e) {
                    e.preventDefault();
                    triggerElement = e.target;
                }
                modalOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';

                // Focus first input after animation
                setTimeout(() => {
                    document.getElementById('contact-name').focus();
                }, 100);
            }

            // Close modal
            function closeModal() {
                modalOverlay.style.display = 'none';
                document.body.style.overflow = '';
                resetForm();

                // Return focus to trigger element
                if (triggerElement) {
                    triggerElement.focus();
                    triggerElement = null;
                }
            }

            // Reset form
            function resetForm() {
                contactForm.reset();
                clearErrors();
                hideMessages();
                submitBtn.disabled = false;
                submitText.style.display = 'inline';
                submitLoading.style.display = 'none';
            }

            // Clear all error messages
            function clearErrors() {
                document.querySelectorAll('.form-error').forEach(error => {
                    error.textContent = '';
                });
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('error');
                });
            }

            // Hide success/error messages
            function hideMessages() {
                formSuccess.style.display = 'none';
                formError.style.display = 'none';
            }

            // Show error message
            function showError(message) {
                hideMessages();
                errorMessage.textContent = message;
                formError.style.display = 'flex';
            }

            // Show success message
            function showSuccess(message) {
                hideMessages();
                successMessage.textContent = message;
                formSuccess.style.display = 'flex';
            }

            // Validate email format
            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            // Validate form
            function validateForm(formData) {
                clearErrors();
                let isValid = true;

                // Validate name
                if (!formData.name || formData.name.trim().length === 0) {
                    document.getElementById('name-error').textContent = 'Name is required';
                    document.getElementById('contact-name').closest('.form-group').classList.add('error');
                    isValid = false;
                }

                // Validate email
                if (!formData.email || formData.email.trim().length === 0) {
                    document.getElementById('email-error').textContent = 'Email is required';
                    document.getElementById('contact-email').closest('.form-group').classList.add('error');
                    isValid = false;
                } else if (!isValidEmail(formData.email)) {
                    document.getElementById('email-error').textContent = 'Please enter a valid email address';
                    document.getElementById('contact-email').closest('.form-group').classList.add('error');
                    isValid = false;
                }

                // Validate company
                if (!formData.company || formData.company.trim().length === 0) {
                    document.getElementById('company-error').textContent = 'Company is required';
                    document.getElementById('contact-company').closest('.form-group').classList.add('error');
                    isValid = false;
                }

                return isValid;
            }

            // Handle form submission
            async function handleSubmit(e) {
                e.preventDefault();
                hideMessages();

                // Get form data
                const formData = {
                    name: document.getElementById('contact-name').value.trim(),
                    email: document.getElementById('contact-email').value.trim(),
                    company: document.getElementById('contact-company').value.trim(),
                    message: document.getElementById('contact-message').value.trim()
                };

                // Validate
                if (!validateForm(formData)) {
                    return;
                }

                // Show loading state
                submitBtn.disabled = true;
                submitText.style.display = 'none';
                submitLoading.style.display = 'inline-flex';

                try {
                    // Submit to backend API
                    const response = await fetch('http://192.168.0.46:5050/api/v1/contact/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });

                    const result = await response.json();

                    if (response.ok && result.success) {
                        // Success
                        showSuccess(result.message || 'Thank you! We\'ll be in touch soon.');

                        // Close modal after 3 seconds
                        setTimeout(() => {
                            closeModal();
                        }, 3000);
                    } else {
                        // Error from server
                        showError(result.error || 'Failed to send your request. Please try again.');
                        submitBtn.disabled = false;
                        submitText.style.display = 'inline';
                        submitLoading.style.display = 'none';
                    }
                } catch (error) {
                    // Network or other error
                    console.error('Contact form error:', error);
                    showError('Unable to connect to the server. Please try again later.');
                    submitBtn.disabled = false;
                    submitText.style.display = 'inline';
                    submitLoading.style.display = 'none';
                }
            }

            // Focus trap for accessibility
            function setupFocusTrap() {
                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];

                modal.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab') {
                        if (e.shiftKey) {
                            // Shift + Tab
                            if (document.activeElement === firstFocusable) {
                                e.preventDefault();
                                lastFocusable.focus();
                            }
                        } else {
                            // Tab
                            if (document.activeElement === lastFocusable) {
                                e.preventDefault();
                                firstFocusable.focus();
                            }
                        }
                    }
                });
            }

            // Event listeners
            requestDemoLinks.forEach(link => {
                link.addEventListener('click', openModal);
            });

            cancelBtn.addEventListener('click', closeModal);

            // Close on overlay click (but not on modal content click)
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
                    closeModal();
                }
            });

            // Handle form submission
            contactForm.addEventListener('submit', handleSubmit);

            // Setup focus trap
            setupFocusTrap();

            // Clear individual field errors on input
            ['contact-name', 'contact-email', 'contact-company'].forEach(fieldId => {
                const field = document.getElementById(fieldId);
                field.addEventListener('input', () => {
                    const errorSpan = document.getElementById(fieldId.replace('contact-', '') + '-error');
                    if (errorSpan) {
                        errorSpan.textContent = '';
                        field.closest('.form-group').classList.remove('error');
                    }
                });
            });
        })();

        // ===========================================
        // IFOC WORKFLOW ANIMATION
        // ===========================================
        (() => {
            const canvas = document.getElementById('ifoc-workflow-canvas');
            if (!canvas) return;

            const controlBtn = document.getElementById('ifoc-control-btn');
            const timelineFill = document.getElementById('ifoc-timeline-fill');
            const timelineLabel = document.getElementById('ifoc-timeline-label');
            const phasesGrid = document.getElementById('ifoc-phases-grid');
            const intentDisplay = document.getElementById('ifoc-intent-display');
            const phaseProgress = document.getElementById('ifoc-phase-progress');
            const detailsPanel = document.getElementById('ifoc-details-panel');

            // Animation state
            let animationInterval = null;
            let animationStartTime = null;
            let isPlaying = true; // Start as playing (autostart)
            let currentPhaseId = null; // Track current phase to avoid duplicate updates
            let currentTypingInterval = null; // Track typing animation to cancel if needed
            let pendingAssistantTimeout = null; // Track pending assistant message timeout

            // IFOC Workflow configuration
            const IFOC_WORKFLOW = {
                question: "Analyze Q4 performance, check compliance, recommend strategy",
                subtitle: "Watch how IFOC phases compose for complex intelligence work",
                phases: [
                    {
                        id: "ideate",
                        step: "1/4",
                        action: "Drafting multi-phase analysis approach...",
                        duration: 5000
                    },
                    {
                        id: "focus",
                        step: "2/4",
                        action: "Verifying regulatory compliance from policy documents...",
                        duration: 5000
                    },
                    {
                        id: "optimize",
                        step: "3/4",
                        action: "Executing cross-system analysis with Fusion Optimizer...",
                        duration: 5000
                    },
                    {
                        id: "coordinate",
                        step: "4/4",
                        action: "Orchestrating specialist teams for strategic synthesis...",
                        result: "✓ Comprehensive strategic recommendation with compliance verified",
                        duration: 5000
                    }
                ]
            };

            const PHASE_INFO = {
                ideate: {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M9 16a5 5 0 1 1 6 0v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1z"/></svg>`,
                    name: "IDEATE",
                    color: "#4ade80",
                    philosophy: "Creative Discovery",
                    access: "LLM only (Tools / RAG Optional)",
                    value: "High Impact Exploration"
                },
                focus: {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`,
                    name: "FOCUS",
                    color: "#3b82f6",
                    philosophy: "Verified intelligence",
                    access: "Documents only (RAG)",
                    value: "Zero hallucination"
                },
                optimize: {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/></svg>`,
                    name: "OPTIMIZE",
                    color: "#F15F22",
                    philosophy: "Sovereign Efficiency",
                    access: "Full MCP Tools + Prompts",
                    value: "Operationalize at Scale without sacrificing Data Souvereignty"
                },
                coordinate: {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 10V6m0 12v-4M10 12H6m12 0h-4M7.05 7.05l3.54 3.54m4.82 4.82l3.54 3.54M7.05 16.95l3.54-3.54m4.82-4.82l3.54-3.54"/></svg>`,
                    name: "COORDINATE",
                    color: "#9333ea",
                    philosophy: "Autonomous orchestration",
                    access: "All sources (adaptive)",
                    value: "Organizational scale"
                }
            };

            const ANIMATION_DURATION = 48000; // 48 seconds total (12s per phase)
            const PAUSE_DURATION = 3000; // 3 seconds pause at end

            // Conversation messages for each phase
            const CONVERSATION_MESSAGES = {
                ideate: {
                    user: {
                        tag: '@IDEATE',
                        tagClass: 'tag-ideate',
                        text: 'Explore Q4 analysis approaches'
                    },
                    assistant: {
                        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; color: #4ade80; flex-shrink: 0;"><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M9 16a5 5 0 1 1 6 0v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1z"/></svg>`,
                        text: '3 angles to consider:\n• Margin compression risks\n• Market share vs. competitors\n• Working capital efficiency\n[Try risk-free - refine before executing]'
                    }
                },
                focus: {
                    user: {
                        tag: '@FOCUS',
                        tagClass: 'tag-focus',
                        text: 'Data retention policy for financials?'
                    },
                    assistant: {
                        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; color: #3b82f6; flex-shrink: 0;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`,
                        text: 'Policy Doc #447: "7-year retention per SOX"\n[Verified source - zero hallucination]'
                    }
                },
                optimize: {
                    user: {
                        tag: '@OPTIMIZE',
                        tagClass: 'tag-optimize',
                        text: 'Analyze Q4 revenue performance'
                    },
                    assistant: {
                        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; color: #F15F22; flex-shrink: 0;"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/></svg>`,
                        text: 'Planning with aggregated data...\n✓ Strategy built (80% fewer tokens)\n→ Executing on local financial data\n✓ Results: $2.4M enterprise (+12%), $1.1M SMB (+8%)\n[Sensitive data never left your environment]'
                    }
                },
                coordinate: {
                    user: {
                        tag: '@COORDINATE',
                        tagClass: 'tag-coordinate',
                        text: 'Synthesize Q4 insights'
                    },
                    assistant: {
                        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; color: #9333ea; flex-shrink: 0;"><circle cx="12" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 10V6m0 12v-4M10 12H6m12 0h-4M7.05 7.05l3.54 3.54m4.82 4.82l3.54 3.54M7.05 16.95l3.54-3.54m4.82-4.82l3.54-3.54"/></svg>`,
                        text: 'Orchestrating analysis...\n→ Finance: Revenue +12%, margins -2%\n→ Risk: Working capital tight\n→ Strategy: Strong growth, monitor cash\n[3 specialists aligned]'
                    }
                }
            };

            // Initialize phase cards
            function initPhaseCards() {
                phasesGrid.innerHTML = '';
                Object.entries(PHASE_INFO).forEach(([id, info]) => {
                    const card = document.createElement('div');
                    card.className = `ifoc-phase-card ${id}`;
                    card.dataset.phaseId = id;
                    card.innerHTML = `
                        <div class="phase-status"></div>
                        <div class="phase-icon" style="color: ${info.color};">${info.icon}</div>
                        <div class="phase-name">${info.name}</div>
                        <div class="phase-philosophy">${info.philosophy}</div>
                    `;

                    // Click to show phase details
                    card.addEventListener('click', () => showPhaseDetails(id));

                    phasesGrid.appendChild(card);
                });
            }

            // Show phase details
            function showPhaseDetails(phaseId) {
                const info = PHASE_INFO[phaseId];
                detailsPanel.innerHTML = `
                    <div class="detail-row">
                        <div class="detail-label">Philosophy:</div>
                        <div class="detail-value">${info.philosophy}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Access:</div>
                        <div class="detail-value">${info.access}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Value:</div>
                        <div class="detail-value">${info.value}</div>
                    </div>
                `;
            }

            // Typing animation function with @TAG support
            function typeText(element, text, speed = 120) {
                // Cancel any existing typing interval
                if (currentTypingInterval) {
                    clearInterval(currentTypingInterval);
                    currentTypingInterval = null;
                }

                let index = 0;
                const tagText = element.dataset.tag;
                const tagClass = element.dataset.tagClass;

                // Find and hide the spacer (but keep it for sizing)
                const spacer = element.querySelector('.typing-spacer');
                if (spacer) {
                    spacer.style.position = 'absolute';
                    spacer.style.pointerEvents = 'none';
                }

                // Clear visible children
                const children = Array.from(element.childNodes);
                children.forEach(child => {
                    if (child !== spacer) {
                        element.removeChild(child);
                    }
                });

                // Create tag element
                const tagSpan = document.createElement('span');
                tagSpan.className = `tag-highlight ${tagClass}`;
                tagSpan.style.position = 'relative';
                tagSpan.style.zIndex = '1';
                element.appendChild(tagSpan);

                // Create text node
                const textNode = document.createTextNode('');
                element.appendChild(textNode);

                element.classList.add('typing');

                return new Promise((resolve) => {
                    currentTypingInterval = setInterval(() => {
                        if (index < text.length) {
                            const char = text.charAt(index);

                            // Type @TAG characters
                            if (index < tagText.length) {
                                tagSpan.textContent += char;
                            }
                            // Add space after tag
                            else if (index === tagText.length) {
                                textNode.textContent = ' ';
                            }
                            // Type rest of message
                            else {
                                textNode.textContent += char;
                            }

                            index++;
                        } else {
                            clearInterval(currentTypingInterval);
                            currentTypingInterval = null;
                            element.classList.remove('typing');
                            // Remove spacer now that typing is complete
                            if (spacer) spacer.remove();
                            resolve();
                        }
                    }, speed);
                });
            }

            // Create message bubble element
            function createMessageBubble(messageData, isUser, skipTyping = false) {
                const bubble = document.createElement('div');
                bubble.className = `message-bubble ${isUser ? 'user' : 'assistant'}`;

                const avatar = document.createElement('div');
                avatar.className = `message-avatar ${isUser ? 'user-avatar' : 'assistant-avatar'}`;
                avatar.textContent = isUser ? 'U' : 'A';

                const container = document.createElement('div');
                container.className = 'message-container';

                const author = document.createElement('span');
                author.className = 'message-author';
                author.textContent = isUser ? 'You' : 'Assistant';

                const content = document.createElement('div');
                content.className = 'message-content';

                if (isUser) {
                    // User message with @TAG inline with text
                    const paragraph = document.createElement('p');
                    paragraph.style.margin = '0';
                    paragraph.style.position = 'relative';

                    if (skipTyping) {
                        // No typing - show immediately
                        const tag = document.createElement('span');
                        tag.className = `tag-highlight ${messageData.tagClass}`;
                        tag.textContent = messageData.tag;
                        paragraph.appendChild(tag);
                        paragraph.appendChild(document.createTextNode(' ' + messageData.text));
                    } else {
                        // Typing animation - store full message (tag + text)
                        paragraph.dataset.fullText = `${messageData.tag} ${messageData.text}`;
                        paragraph.dataset.tagClass = messageData.tagClass;
                        paragraph.dataset.tag = messageData.tag;

                        // Pre-render invisible text to reserve space (NOT absolute positioned)
                        const spacer = document.createElement('span');
                        spacer.style.visibility = 'hidden';
                        spacer.style.display = 'inline';
                        spacer.className = 'typing-spacer';
                        spacer.textContent = `${messageData.tag} ${messageData.text}`;
                        paragraph.appendChild(spacer);
                    }

                    content.appendChild(paragraph);
                    bubble._textElement = paragraph; // Store reference for typing animation
                } else {
                    // Assistant message with icon and text
                    const lines = messageData.text.split('\n');
                    lines.forEach((line, index) => {
                        const p = document.createElement('p');
                        p.style.margin = '0';

                        if (index === 0) {
                            // First line: add SVG icon + text
                            p.style.display = 'flex';
                            p.style.alignItems = 'flex-start';
                            p.style.gap = '0.375rem';
                            p.innerHTML = `${messageData.icon}<span>${line}</span>`;
                        } else {
                            // Subsequent lines: text only with left padding to align with first line
                            p.textContent = line;
                            p.style.marginTop = '0.25rem';
                            p.style.paddingLeft = '1.375rem'; // Align with text after icon
                        }

                        content.appendChild(p);
                    });
                }

                container.appendChild(author);
                container.appendChild(content);

                bubble.appendChild(avatar);
                bubble.appendChild(container);

                return bubble;
            }

            // Render conversation for current phase
            async function updateConversationMockup(phaseId) {
                const messages = CONVERSATION_MESSAGES[phaseId];
                if (!messages) return;

                const conversationContainer = document.getElementById('ifoc-conversation');
                if (!conversationContainer) return;

                // Cancel any pending assistant message
                if (pendingAssistantTimeout) {
                    clearTimeout(pendingAssistantTimeout);
                    pendingAssistantTimeout = null;
                }

                // Clear previous messages completely
                conversationContainer.innerHTML = '';

                // Add user message bubble (without text yet)
                const userBubble = createMessageBubble(messages.user, true, false);
                conversationContainer.appendChild(userBubble);

                // Animate typing for user message
                if (userBubble._textElement && userBubble._textElement.dataset.fullText) {
                    await typeText(userBubble._textElement, userBubble._textElement.dataset.fullText, 120);
                }

                // Add assistant message ONLY after typing completes
                pendingAssistantTimeout = setTimeout(() => {
                    const assistantBubble = createMessageBubble(messages.assistant, false, true);
                    conversationContainer.appendChild(assistantBubble);

                    // Scroll the conversation container (not the page) to show latest message
                    conversationContainer.scrollTop = conversationContainer.scrollHeight;
                    pendingAssistantTimeout = null;
                }, 300);
            }

            // Update active phase
            function updateActivePhase(phaseIndex) {
                // Remove active class from all cards
                phasesGrid.querySelectorAll('.ifoc-phase-card').forEach(card => {
                    card.classList.remove('active');
                });

                // Add active class to current phase
                if (phaseIndex >= 0 && phaseIndex < IFOC_WORKFLOW.phases.length) {
                    const phase = IFOC_WORKFLOW.phases[phaseIndex];
                    const card = phasesGrid.querySelector(`[data-phase-id="${phase.id}"]`);
                    if (card) {
                        card.classList.add('active');
                    }

                    // Update phase progress display
                    const info = PHASE_INFO[phase.id];
                    phaseProgress.innerHTML = `
                        <div class="use-case-step">Phase ${phase.step}: <span style="color: ${info.color};">${info.name}</span></div>
                        <div class="use-case-action">${phase.action}</div>
                        ${phase.result ? `<div class="use-case-result">${phase.result}</div>` : ''}
                    `;

                    // Update details panel
                    showPhaseDetails(phase.id);

                    // Update conversation mockup only when phase changes
                    if (currentPhaseId !== phase.id) {
                        currentPhaseId = phase.id;
                        updateConversationMockup(phase.id);
                    }
                }
            }

            // Start animation
            function startAnimation() {
                if (animationInterval) {
                    clearInterval(animationInterval);
                }

                animationStartTime = Date.now();
                isPlaying = true;
                currentPhaseId = null; // Reset phase tracking

                // Update control button to show pause state
                const pauseIcon = controlBtn.querySelector('.pause-icon');
                const playIcon = controlBtn.querySelector('.play-icon');
                const controlText = controlBtn.querySelector('.control-text');

                pauseIcon.style.display = 'block';
                playIcon.style.display = 'none';
                controlText.textContent = 'Pause';
                controlBtn.classList.add('playing');
                controlBtn.setAttribute('aria-label', 'Pause IFOC workflow animation');

                // Animation loop
                animationInterval = setInterval(() => {
                    const elapsed = Date.now() - animationStartTime;
                    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

                    // Update timeline
                    timelineFill.style.width = `${progress * 100}%`;
                    timelineLabel.textContent = `${Math.floor(progress * 100)}%`;

                    // Determine current phase
                    const currentPhaseIndex = Math.floor((elapsed / ANIMATION_DURATION) * IFOC_WORKFLOW.phases.length);

                    if (currentPhaseIndex < IFOC_WORKFLOW.phases.length) {
                        updateActivePhase(currentPhaseIndex);
                    }

                    // Loop animation
                    if (elapsed >= ANIMATION_DURATION + PAUSE_DURATION) {
                        animationStartTime = Date.now();
                        currentPhaseId = null; // Reset to allow conversation updates on next loop
                    }
                }, 50);
            }

            // Pause animation
            function pauseAnimation() {
                if (animationInterval) {
                    clearInterval(animationInterval);
                    animationInterval = null;
                }

                isPlaying = false;

                // Update control button to show replay state
                const pauseIcon = controlBtn.querySelector('.pause-icon');
                const playIcon = controlBtn.querySelector('.play-icon');
                const controlText = controlBtn.querySelector('.control-text');

                pauseIcon.style.display = 'none';
                playIcon.style.display = 'block';
                controlText.textContent = 'Replay';
                controlBtn.classList.remove('playing');
                controlBtn.setAttribute('aria-label', 'Replay IFOC workflow animation');
            }

            // Toggle play/pause
            controlBtn.addEventListener('click', () => {
                if (isPlaying) {
                    pauseAnimation();
                } else {
                    startAnimation();
                }
            });

            // Initialize on load
            initPhaseCards();

            // Initialize intent display (static)
            intentDisplay.innerHTML = `
                <div class="use-case-question">${IFOC_WORKFLOW.question}</div>
            `;

            // Initial details panel
            showPhaseDetails('ideate');

            // Auto-start/stop animation based on viewport visibility
            const ifocWorkflowObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Element is entering viewport - start animation if not running
                        if (!isPlaying && !animationInterval) {
                            startAnimation();
                        }
                    } else {
                        // Element is leaving viewport - stop and reset animation
                        if (isPlaying || animationInterval) {
                            pauseAnimation();

                            // Reset to initial state
                            setTimeout(() => {
                                if (!entry.isIntersecting) {
                                    // Clear conversation display
                                    const conversationDisplay = document.getElementById('ifoc-conversation-display');
                                    if (conversationDisplay) {
                                        conversationDisplay.innerHTML = '';
                                    }

                                    // Reset phase cards to initial state
                                    initPhaseCards();

                                    // Reset to first phase details
                                    showPhaseDetails('ideate');

                                    // Reset timeline
                                    timelineFill.style.width = '0%';
                                    timelineLabel.textContent = '0%';

                                    // Reset to initial intent display
                                    intentDisplay.innerHTML = `
                                        <div class="use-case-question">${IFOC_WORKFLOW.question}</div>
                                    `;

                                    // Reset button state
                                    isPlaying = false;
                                    const pauseIcon = controlBtn.querySelector('.pause-icon');
                                    const playIcon = controlBtn.querySelector('.play-icon');
                                    const controlText = controlBtn.querySelector('.control-text');
                                    pauseIcon.style.display = 'none';
                                    playIcon.style.display = 'block';
                                    controlText.textContent = 'Pause';
                                    controlBtn.classList.remove('playing');
                                }
                            }, 100);
                        }
                    }
                });
            }, { threshold: 0.3 });

            ifocWorkflowObserver.observe(canvas);
        })();

// === CLARITY AGENT PIPELINE ANIMATION ===
(function() {
    var clRunning = false;
    var clTimeouts = [];

    var clStages = ['query', 'plan', 'execute', 'error', 'recover', 'result'];
    var clDotColors = ['#38bdf8', '#38bdf8', '#F15F22', '#ef4444', '#f59e0b', '#4ade80'];

    var spineLine = document.getElementById('cl-spine-line');
    var spineLength = 0;

    function clearClTimeouts() {
        for (var i = 0; i < clTimeouts.length; i++) clearTimeout(clTimeouts[i]);
        clTimeouts = [];
    }

    function clInitSpine() {
        if (!spineLine) return;
        spineLength = spineLine.getTotalLength();
        spineLine.style.strokeDasharray = spineLength;
        spineLine.style.strokeDashoffset = spineLength;
        spineLine.style.transition = 'none';
    }

    function clDrawSpineTo(dotIndex) {
        if (!spineLine || spineLength === 0) return;
        // Draw spine proportionally: dotIndex 0 = first dot, 5 = last dot
        var fraction = dotIndex / (clStages.length - 1);
        var offset = spineLength * (1 - fraction);
        spineLine.style.transition = 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        spineLine.style.strokeDashoffset = offset;

        // Fill the dot
        var dot = document.getElementById('cl-dot-' + dotIndex);
        if (dot) {
            dot.setAttribute('fill', clDotColors[dotIndex]);
            dot.setAttribute('stroke', clDotColors[dotIndex]);
        }
    }

    function resetCl() {
        // Hide all stages
        clStages.forEach(function(id) {
            var el = document.getElementById('cl-stage-' + id);
            if (el) {
                el.classList.remove('visible');
                el.classList.remove('cl-error-pulse');
                el.classList.remove('cl-result-glow');
            }
        });

        // Reset spine
        if (spineLine) {
            spineLine.style.transition = 'none';
            spineLine.style.strokeDashoffset = spineLength;
        }

        // Reset dots
        for (var i = 0; i < clStages.length; i++) {
            var dot = document.getElementById('cl-dot-' + i);
            if (dot) {
                dot.setAttribute('fill', 'none');
                dot.setAttribute('stroke', 'rgba(255,255,255,0.12)');
            }
        }

        // Reset completion bar
        var fill = document.getElementById('cl-complete-fill');
        if (fill) { fill.style.transition = 'none'; fill.style.width = '0'; }
        var complete = document.getElementById('cl-complete');
        if (complete) complete.classList.remove('visible');
        var label = document.getElementById('cl-complete-label');
        if (label) label.classList.remove('visible');

        // Hide header
        var header = document.getElementById('cl-status-header');
        if (header) header.style.opacity = '0';
    }

    function runCl() {
        if (clRunning) return;
        clRunning = true;
        clearClTimeouts();
        resetCl();
        clInitSpine();

        var delay = 100;

        // 1. Header fade in
        clTimeouts.push(setTimeout(function() {
            var header = document.getElementById('cl-status-header');
            if (header) header.style.opacity = '1';
        }, delay));
        delay += 400;

        // 2. Query card + first dot
        clTimeouts.push(setTimeout(function() {
            var q = document.getElementById('cl-stage-query');
            if (q) q.classList.add('visible');
            clDrawSpineTo(0);
        }, delay));
        delay += 600;

        // 3. PLAN
        clTimeouts.push(setTimeout(function() {
            clDrawSpineTo(1);
            var el = document.getElementById('cl-stage-plan');
            if (el) el.classList.add('visible');
        }, delay));
        delay += 800;

        // 4. EXECUTE
        clTimeouts.push(setTimeout(function() {
            clDrawSpineTo(2);
            var el = document.getElementById('cl-stage-execute');
            if (el) el.classList.add('visible');
        }, delay));
        delay += 800;

        // 5. ERROR (with pulse)
        clTimeouts.push(setTimeout(function() {
            clDrawSpineTo(3);
            var el = document.getElementById('cl-stage-error');
            if (el) {
                el.classList.add('visible');
                el.classList.add('cl-error-pulse');
            }
        }, delay));
        delay += 1000;

        // 6. RECOVER
        clTimeouts.push(setTimeout(function() {
            clDrawSpineTo(4);
            var el = document.getElementById('cl-stage-recover');
            if (el) el.classList.add('visible');
        }, delay));
        delay += 800;

        // 7. RESULT (with glow)
        clTimeouts.push(setTimeout(function() {
            clDrawSpineTo(5);
            var el = document.getElementById('cl-stage-result');
            if (el) {
                el.classList.add('visible');
                el.classList.add('cl-result-glow');
            }
        }, delay));
        delay += 600;

        // 8. Completion bar
        clTimeouts.push(setTimeout(function() {
            var complete = document.getElementById('cl-complete');
            if (complete) complete.classList.add('visible');
            var fill = document.getElementById('cl-complete-fill');
            if (fill) {
                fill.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                fill.style.width = '100%';
            }
            clTimeouts.push(setTimeout(function() {
                var label = document.getElementById('cl-complete-label');
                if (label) label.classList.add('visible');
            }, 400));
        }, delay));
        delay += 3500;

        // Mark animation complete (holds final state, replays on refocus)
        clTimeouts.push(setTimeout(function() {
            clRunning = false;
        }, delay));
    }

    function stopCl() {
        clearClTimeouts();
        clRunning = false;
        resetCl();
    }

    // IntersectionObserver — no tab switching needed
    var claritySection = document.getElementById('clarity');
    if (claritySection) {
        var clObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    runCl();
                } else {
                    stopCl();
                }
            });
        }, { threshold: 0.3 });
        clObserver.observe(claritySection);
    }
})();

// === FINANCIAL VISIBILITY DASHBOARD ANIMATION ===
(function() {
    var fvRunning = false;
    var fvTimeouts = [];
    var fvCycle = 0;

    // Simulated data snapshots — each cycle shows a different month
    var fvSnapshots = [
        { total: 47.23, tokens: 1.2, avgSess: 0.39, avgTurn: 0.04, sessions: 122, budget: 72,
          provs: [60, 27, 8.5, 4.2], provCosts: ['$28.40','$12.80','$4.03','$2.00'],
          models: [18.20, 12.80, 10.20, 4.03, 2.00],
          ragImpr: 847, ragTok: 2.3, ragSaved: 14.20,
          spark: 'M0,40 C20,15 40,30 60,20 C80,8 100,35 120,28 C140,38 160,12 180,22 L200,16',
          topSess: 'Top: #47 $4.82 \u00b7 #12 $3.91 \u00b7 #89 $3.44', topQuery: 'Costliest: \u201canalyze corpus\u2026\u201d $2.10', date: 'Jan 2025' },
        { total: 52.18, tokens: 1.4, avgSess: 0.41, avgTurn: 0.05, sessions: 128, budget: 78,
          provs: [58, 29, 8, 5], provCosts: ['$30.26','$15.13','$4.17','$2.62'],
          models: [19.80, 15.13, 11.40, 3.85, 2.00],
          ragImpr: 923, ragTok: 2.6, ragSaved: 16.40,
          spark: 'M0,35 C20,20 40,38 60,15 C80,25 100,10 120,32 C140,20 160,28 180,18 L200,12',
          topSess: 'Top: #53 $5.10 \u00b7 #19 $4.22 \u00b7 #91 $3.88', topQuery: 'Costliest: \u201cgenerate report\u2026\u201d $2.45', date: 'Feb 2025' },
        { total: 44.91, tokens: 1.1, avgSess: 0.37, avgTurn: 0.03, sessions: 118, budget: 68,
          provs: [62, 24, 9, 5], provCosts: ['$27.84','$10.78','$4.04','$2.25'],
          models: [17.60, 10.78, 10.50, 4.04, 1.99],
          ragImpr: 791, ragTok: 2.1, ragSaved: 12.80,
          spark: 'M0,30 C20,42 40,18 60,35 C80,12 100,28 120,40 C140,15 160,32 180,25 L200,20',
          topSess: 'Top: #38 $4.55 \u00b7 #7 $3.72 \u00b7 #64 $3.19', topQuery: 'Costliest: \u201cdeep search\u2026\u201d $1.95', date: 'Mar 2025' }
    ];

    function clearFvTimeouts() {
        for (var i = 0; i < fvTimeouts.length; i++) clearTimeout(fvTimeouts[i]);
        fvTimeouts = [];
    }

    function fvAnimateVal(el, from, to, prefix, suffix, duration, decimals) {
        var startTime = performance.now();
        function update(now) {
            var elapsed = now - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var easeOut = 1 - Math.pow(1 - progress, 3);
            var current = from + (to - from) * easeOut;
            if (decimals === 0) {
                el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
            } else {
                el.textContent = prefix + current.toFixed(decimals) + suffix;
            }
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    function resetFvDashboard() {
        var el;
        el = document.getElementById('fv-total-cost'); if (el) el.textContent = '$0';
        el = document.getElementById('fv-total-tokens'); if (el) el.textContent = '0';
        el = document.getElementById('fv-avg-session'); if (el) el.textContent = '$0';
        el = document.getElementById('fv-avg-turn'); if (el) el.textContent = '$0';
        el = document.getElementById('fv-sessions'); if (el) el.textContent = '0 sessions';
        el = document.getElementById('fv-rag-impr'); if (el) el.textContent = '0';
        el = document.getElementById('fv-rag-tokens'); if (el) el.textContent = '0';
        el = document.getElementById('fv-rag-saved'); if (el) el.textContent = '$0';

        var provBars = document.querySelectorAll('.fv-bar-fill');
        provBars.forEach(function(bar) { bar.style.transition = 'none'; bar.style.width = '0%'; });

        var budgetFill = document.getElementById('fv-budget-fill');
        if (budgetFill) { budgetFill.style.transition = 'none'; budgetFill.style.width = '0%'; }

        var modelCosts = document.querySelectorAll('.fv-model-cost');
        modelCosts.forEach(function(el) { el.textContent = '$0'; });

        var sparkline = document.getElementById('fv-sparkline-path');
        if (sparkline) {
            var length = sparkline.getTotalLength ? sparkline.getTotalLength() : 600;
            sparkline.style.transition = 'none';
            sparkline.style.strokeDasharray = length;
            sparkline.style.strokeDashoffset = length;
        }

        fvCycle = 0;
    }

    function fvAnimateSnapshot(snap, prevSnap) {
        var dur = prevSnap ? 1200 : 1800;

        // Date
        var dateEl = document.querySelector('.fv-date');
        if (dateEl) dateEl.textContent = snap.date;

        // KPI counters
        var fromTotal = prevSnap ? prevSnap.total : 0;
        var fromTokens = prevSnap ? prevSnap.tokens : 0;
        var fromAvgS = prevSnap ? prevSnap.avgSess : 0;
        var fromAvgT = prevSnap ? prevSnap.avgTurn : 0;
        var fromSess = prevSnap ? prevSnap.sessions : 0;

        var el;
        el = document.getElementById('fv-total-cost'); if (el) fvAnimateVal(el, fromTotal, snap.total, '$', '', dur, 2);
        el = document.getElementById('fv-total-tokens'); if (el) fvAnimateVal(el, fromTokens, snap.tokens, '', 'M', dur, 1);
        el = document.getElementById('fv-avg-session'); if (el) fvAnimateVal(el, fromAvgS, snap.avgSess, '$', '', dur, 2);
        el = document.getElementById('fv-avg-turn'); if (el) fvAnimateVal(el, fromAvgT, snap.avgTurn, '$', '', dur, 2);

        var sessEl = document.getElementById('fv-sessions');
        if (sessEl) fvAnimateVal(sessEl, fromSess, snap.sessions, '', ' sessions', dur, 0);

        // Budget bar
        var budgetFill = document.getElementById('fv-budget-fill');
        if (budgetFill) {
            budgetFill.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
            budgetFill.style.width = snap.budget + '%';
        }

        // Provider bars
        var provRows = document.querySelectorAll('#fv-providers .fv-provider-row');
        provRows.forEach(function(row, i) {
            var fill = row.querySelector('.fv-bar-fill');
            var costEl = row.querySelector('.fv-prov-cost');
            if (fill) {
                fill.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                fill.style.width = snap.provs[i] + '%';
            }
            if (costEl) costEl.textContent = snap.provCosts[i];
        });

        // Model costs
        var modelEls = document.querySelectorAll('.fv-model-cost');
        modelEls.forEach(function(el, i) {
            var fromVal = prevSnap ? prevSnap.models[i] : 0;
            fvAnimateVal(el, fromVal, snap.models[i], '$', '', dur, 2);
        });

        // RAG stats
        var fromImpr = prevSnap ? prevSnap.ragImpr : 0;
        var fromTok = prevSnap ? prevSnap.ragTok : 0;
        var fromSaved = prevSnap ? prevSnap.ragSaved : 0;

        el = document.getElementById('fv-rag-impr'); if (el) fvAnimateVal(el, fromImpr, snap.ragImpr, '', '', dur, 0);
        el = document.getElementById('fv-rag-tokens'); if (el) fvAnimateVal(el, fromTok, snap.ragTok, '', 'M', dur, 1);
        el = document.getElementById('fv-rag-saved'); if (el) fvAnimateVal(el, fromSaved, snap.ragSaved, '$', '', dur, 2);

        // Sparkline
        var sparkline = document.getElementById('fv-sparkline-path');
        if (sparkline) {
            sparkline.setAttribute('d', snap.spark);
            var length = sparkline.getTotalLength ? sparkline.getTotalLength() : 600;
            if (!prevSnap) {
                sparkline.style.transition = 'none';
                sparkline.style.strokeDasharray = length;
                sparkline.style.strokeDashoffset = length;
                // Force reflow then animate
                sparkline.getBoundingClientRect();
                sparkline.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                sparkline.style.strokeDashoffset = '0';
            } else {
                sparkline.style.strokeDasharray = length;
                sparkline.style.strokeDashoffset = '0';
            }
        }

        // Footer
        var footer = document.getElementById('fv-footer');
        if (footer) {
            var spans = footer.querySelectorAll('span:not(.fv-footer-sep)');
            if (spans[0]) spans[0].textContent = snap.topSess;
            if (spans[1]) spans[1].textContent = snap.topQuery;
        }
    }

    function runFvDashboardAnimation() {
        if (fvRunning) return;
        fvRunning = true;
        clearFvTimeouts();
        resetFvDashboard();

        // Initial build — animate from zero to first snapshot
        fvTimeouts.push(setTimeout(function() {
            fvAnimateSnapshot(fvSnapshots[0], null);
        }, 200));

        // Cycle through subsequent snapshots every 4s
        fvSnapshots.forEach(function(snap, i) {
            if (i === 0) return;
            fvTimeouts.push(setTimeout(function() {
                fvAnimateSnapshot(snap, fvSnapshots[i - 1]);
            }, 4000 * i + 200));
        });

        // After all snapshots, loop back
        var totalCycles = fvSnapshots.length;
        var loopDelay = 4000 * totalCycles + 200;

        function scheduleLoop() {
            fvTimeouts.push(setTimeout(function() {
                if (!fvRunning) return;
                fvCycle++;
                var idx = fvCycle % fvSnapshots.length;
                var prevIdx = (fvCycle - 1 + fvSnapshots.length) % fvSnapshots.length;
                fvAnimateSnapshot(fvSnapshots[idx], fvSnapshots[prevIdx]);
                scheduleLoop();
            }, 4000));
        }

        fvTimeouts.push(setTimeout(function() {
            fvCycle = totalCycles - 1;
            scheduleLoop();
        }, loopDelay));
    }

    function stopFvAnimation() {
        clearFvTimeouts();
        fvRunning = false;
        resetFvDashboard();
    }

    var fvSection = document.getElementById('financial-visibility');
    if (fvSection) {
        var fvObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var tab1 = document.getElementById('fv-tab1');
                    if (tab1 && tab1.classList.contains('active')) {
                        runFvDashboardAnimation();
                    }
                } else {
                    stopFvAnimation();
                }
            });
        }, { threshold: 0.3 });
        fvObserver.observe(fvSection);

        var fvTabs = fvSection.querySelectorAll('.section-tab');
        fvTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                if (tab.dataset.sectionTab === 'fv-tab1') {
                    setTimeout(runFvDashboardAnimation, 100);
                } else {
                    stopFvAnimation();
                }
            });
        });
    }
})();

// === FUSION OPTIMIZER PIPELINE ANIMATION ===
(function() {
    var foRunning = false;
    var foTimeouts = [];
    var foRafIds = [];

    var foStages = ['request', 'validate', 'optimize', 'execute', 'recover', 'result'];
    var foDotColors = ['#38bdf8', '#38bdf8', '#38bdf8', '#F15F22', '#f59e0b', '#4ade80'];

    var foSpineLine = document.getElementById('fo-spine-line');
    var foSpineLength = 0;

    // Carousel state
    var foCarouselSub = 0;       // active subsystem index (0-5)
    var foCarouselType = 0;      // active type index within subsystem
    var foCarouselInterval = null;
    var foCarouselPinned = false;

    // Subsystem data: each has types (sub-components) that carousel through
    var foSubData = [
        { types: [
            { name: 'Structural Passes', desc: 'Fix null prompts, classify tools, remove hallucinated arguments' },
            { name: 'Semantic Rewrites', desc: 'Temporal flow, SQL consolidation, loop synthesis, chart cleanup' },
            { name: 'Schema Validation', desc: 'Parameter fuzzy matching at 0.7+ similarity, extraneous arg removal' }
        ]},
        { types: [
            { name: 'Efficiency Detection', desc: 'Identifies plans mixing prompts with direct tool calls' },
            { name: 'Tool-Only Rewrite', desc: 'LLM replans using only direct tools for maximum speed' }
        ]},
        { types: [
            { name: 'Date Range Orchestrator', desc: 'Resolves 12 temporal patterns deterministically \u2014 no LLM needed' },
            { name: 'Column Iteration Guard', desc: 'Validates type compatibility before iteration, skips incompatible' },
            { name: 'Loop Detection', desc: 'Catches string literal loops and routes to correct orchestrator' },
            { name: 'Hydration Validation', desc: 'Validates cross-turn data injection before modifying plan' }
        ]},
        { types: [
            { name: 'TableNotFoundStrategy', desc: 'LLM uses listTables tool \u2014 forbidden to guess table names' },
            { name: 'ColumnNotFoundStrategy', desc: 'LLM uses describeColumns \u2014 validates column mapping' },
            { name: 'GenericCorrectionStrategy', desc: 'Full tool definition + context as fallback, up to 3 retries' }
        ]},
        { types: [
            { name: 'Failed Tool Detection', desc: 'Identifies exhausted correction paths from execution history' },
            { name: 'Global Skip List', desc: 'Adds failed tools to globally_skipped_tools for the turn' },
            { name: 'Plan Regeneration', desc: 'LLM generates entirely new plan, execution restarts from phase 1' }
        ]},
        { types: [
            { name: 'Execution Distiller', desc: 'Replaces results >500 rows with metadata summary' },
            { name: 'Analytical Distillation', desc: 'Column statistics on full dataset + stratified sample' },
            { name: 'Context Window Budget', desc: '5-pass per-module allocation with surplus reallocation' }
        ]}
    ];

    function foCarouselBuild(subIdx) {
        var detailEl = document.getElementById('fo-sub-detail');
        if (!detailEl) return;
        var sub = foSubData[subIdx];
        if (!sub) return;
        var html = '';
        for (var i = 0; i < sub.types.length; i++) {
            html += '<div class="fo-sub-type-item" data-fo-type="' + i + '">' +
                '<div class="fo-sub-type-item-name">' + sub.types[i].name + '</div>' +
                '<div class="fo-sub-type-item-desc">' + sub.types[i].desc + '</div>' +
                '</div>';
        }
        detailEl.innerHTML = html;
    }

    function foCarouselShow(subIdx, typeIdx) {
        // Update left list
        var items = document.querySelectorAll('.fo-sub-item');
        items.forEach(function(el) { el.classList.remove('fo-sub-active'); });
        var activeItem = document.querySelector('.fo-sub-item[data-fo-sub="' + subIdx + '"]');
        if (activeItem) activeItem.classList.add('fo-sub-active');

        // Rebuild right panel if subsystem changed
        if (subIdx !== foCarouselSub) {
            foCarouselBuild(subIdx);
        }

        // Highlight the active type
        var sub = foSubData[subIdx];
        if (!sub) return;
        var tIdx = typeIdx % sub.types.length;

        var typeItems = document.querySelectorAll('.fo-sub-type-item');
        typeItems.forEach(function(el) { el.classList.remove('fo-sub-type-active'); });
        var activeType = document.querySelector('.fo-sub-type-item[data-fo-type="' + tIdx + '"]');
        if (activeType) activeType.classList.add('fo-sub-type-active');

        foCarouselSub = subIdx;
        foCarouselType = tIdx;
    }

    function foCarouselNext() {
        var sub = foSubData[foCarouselSub];
        if (!sub) return;
        var nextType = (foCarouselType + 1) % sub.types.length;
        foCarouselShow(foCarouselSub, nextType);
    }

    function foCarouselStart() {
        foCarouselStop();
        foCarouselInterval = setInterval(function() {
            if (!foCarouselPinned) foCarouselNext();
        }, 2000);
    }

    function foCarouselStop() {
        if (foCarouselInterval) { clearInterval(foCarouselInterval); foCarouselInterval = null; }
    }

    function foCarouselPin(subIdx) {
        foCarouselPinned = true;
        foCarouselShow(subIdx, 0);
    }

    function clearFoTimeouts() {
        for (var i = 0; i < foTimeouts.length; i++) clearTimeout(foTimeouts[i]);
        foTimeouts = [];
        for (var j = 0; j < foRafIds.length; j++) cancelAnimationFrame(foRafIds[j]);
        foRafIds = [];
    }

    function foInitSpine() {
        if (!foSpineLine) return;
        foSpineLength = foSpineLine.getTotalLength();
        foSpineLine.style.strokeDasharray = foSpineLength;
        foSpineLine.style.strokeDashoffset = foSpineLength;
        foSpineLine.style.transition = 'none';
    }

    function foDrawSpineTo(dotIndex) {
        if (!foSpineLine || foSpineLength === 0) return;
        var fraction = dotIndex / (foStages.length - 1);
        var offset = foSpineLength * (1 - fraction);
        foSpineLine.style.transition = 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        foSpineLine.style.strokeDashoffset = offset;

        var dot = document.getElementById('fo-dot-' + dotIndex);
        if (dot) {
            dot.setAttribute('fill', foDotColors[dotIndex]);
            dot.setAttribute('stroke', foDotColors[dotIndex]);
        }
    }

    function foAnimateCounter(el, target, duration) {
        var startTime = performance.now();
        function update(currentTime) {
            var elapsed = currentTime - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var easeOut = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(target * easeOut);
            el.textContent = '-' + current + '%';
            if (progress < 1) {
                var id = requestAnimationFrame(update);
                foRafIds.push(id);
            }
        }
        var id = requestAnimationFrame(update);
        foRafIds.push(id);
    }

    function resetFo() {
        // Hide all stages
        foStages.forEach(function(id) {
            var el = document.getElementById('fo-stage-' + id);
            if (el) {
                el.classList.remove('visible');
                el.classList.remove('fo-error-pulse');
                el.classList.remove('fo-result-glow');
            }
        });

        // Reset spine
        if (foSpineLine) {
            foSpineLine.style.transition = 'none';
            foSpineLine.style.strokeDashoffset = foSpineLength;
        }

        // Reset spine dots
        for (var i = 0; i < foStages.length; i++) {
            var dot = document.getElementById('fo-dot-' + i);
            if (dot) {
                dot.setAttribute('fill', 'none');
                dot.setAttribute('stroke', 'rgba(255,255,255,0.12)');
            }
        }

        // Reset header
        var header = document.getElementById('fo-header');
        if (header) header.style.opacity = '0';

        // Reset 12 validation dots
        for (var d = 0; d < 12; d++) {
            var vdot = document.getElementById('fo-vdot-' + d);
            if (vdot) vdot.classList.remove('fo-vdot-pass');
        }
        var vdotLabel = document.getElementById('fo-vdot-label');
        if (vdotLabel) { vdotLabel.textContent = '0/12'; vdotLabel.classList.remove('fo-vdot-complete'); }

        // Reset check lines (optimize)
        for (var o = 1; o <= 3; o++) {
            var optLine = document.getElementById('fo-opt-' + o);
            if (optLine) optLine.classList.remove('visible');
        }

        // Reset distill counter
        var distillPct = document.getElementById('fo-distill-pct');
        if (distillPct) distillPct.textContent = '0%';

        // Reset exec lines
        for (var e = 1; e <= 3; e++) {
            var execLine = document.getElementById('fo-exec-' + e);
            if (execLine) execLine.classList.remove('visible');
        }
        var errDetail = document.getElementById('fo-exec-err-detail');
        if (errDetail) errDetail.classList.remove('visible');

        // Reset recovery lines
        for (var r = 1; r <= 3; r++) {
            var recLine = document.getElementById('fo-rec-' + r);
            if (recLine) recLine.classList.remove('visible');
        }

        // Reset result metrics
        var resultMetrics = document.getElementById('fo-result-metrics');
        if (resultMetrics) { resultMetrics.style.transition = 'none'; resultMetrics.style.opacity = '0'; }

        // Reset carousel
        var carousel = document.getElementById('fo-carousel');
        if (carousel) carousel.classList.remove('visible');
        foCarouselStop();
        foCarouselPinned = false;
        foCarouselSub = -1;
        foCarouselType = 0;
        foCarouselShow(0, 0);
    }

    function runFo() {
        if (foRunning) return;
        foRunning = true;
        clearFoTimeouts();
        resetFo();
        foInitSpine();
        foCarouselStart();

        var delay = 400;

        // === ACT 1: Request + Validation (0 - 8s) ===

        // Header fade in
        foTimeouts.push(setTimeout(function() {
            var header = document.getElementById('fo-header');
            if (header) header.style.opacity = '1';
        }, delay));
        delay += 1000;

        // REQUEST stage
        foTimeouts.push(setTimeout(function() {
            var q = document.getElementById('fo-stage-request');
            if (q) q.classList.add('visible');
            foDrawSpineTo(0);
        }, delay));
        delay += 1600;

        // PLAN VALIDATION stage card → pin carousel to S1
        foTimeouts.push(setTimeout(function() {
            foDrawSpineTo(1);
            var el = document.getElementById('fo-stage-validate');
            if (el) el.classList.add('visible');
            foCarouselPin(0);
            var carousel = document.getElementById('fo-carousel');
            if (carousel) carousel.classList.add('visible');
        }, delay));
        delay += 1000;

        // 12-dot cascade: light up one dot every 140ms
        var dotCascadeStart = delay;
        for (var d = 0; d < 12; d++) {
            (function(idx) {
                foTimeouts.push(setTimeout(function() {
                    var vdot = document.getElementById('fo-vdot-' + idx);
                    if (vdot) vdot.classList.add('fo-vdot-pass');
                    var label = document.getElementById('fo-vdot-label');
                    if (label) label.textContent = (idx + 1) + '/12';
                }, dotCascadeStart + idx * 140));
            })(d);
        }
        delay = dotCascadeStart + 12 * 140 + 600;

        // Mark validation label complete
        foTimeouts.push(setTimeout(function() {
            var label = document.getElementById('fo-vdot-label');
            if (label) {
                label.textContent = '12/12 \u2713';
                label.classList.add('fo-vdot-complete');
            }
        }, delay));
        delay += 1000;

        // === ACT 2: Pre-Execution Optimization (8 - 14s) ===

        foTimeouts.push(setTimeout(function() {
            foDrawSpineTo(2);
            var el = document.getElementById('fo-stage-optimize');
            if (el) el.classList.add('visible');
        }, delay));
        delay += 1000;

        // Stagger 3 optimization check lines → pin carousel to S3, S6, S2
        foTimeouts.push(setTimeout(function() {
            var line = document.getElementById('fo-opt-1');
            if (line) line.classList.add('visible');
            foCarouselPin(2); // S3 Hallucination Prevention
        }, delay));
        delay += 1000;

        foTimeouts.push(setTimeout(function() {
            var line = document.getElementById('fo-opt-2');
            if (line) line.classList.add('visible');
            var distillEl = document.getElementById('fo-distill-pct');
            if (distillEl) foAnimateCounter(distillEl, 74, 1200);
            foCarouselPin(5); // S6 Context Distillation
        }, delay));
        delay += 1000;

        foTimeouts.push(setTimeout(function() {
            var line = document.getElementById('fo-opt-3');
            if (line) line.classList.add('visible');
            foCarouselPin(1); // S2 Proactive Re-planning
        }, delay));
        delay += 1400;

        // === ACT 3: Execution + Error (14 - 21s) ===

        foTimeouts.push(setTimeout(function() {
            foDrawSpineTo(3);
            var el = document.getElementById('fo-stage-execute');
            if (el) el.classList.add('visible');
        }, delay));
        delay += 1000;

        // Exec line 1: Schema discovery
        foTimeouts.push(setTimeout(function() {
            var line = document.getElementById('fo-exec-1');
            if (line) line.classList.add('visible');
        }, delay));
        delay += 1100;

        // Exec line 2: SQL generation
        foTimeouts.push(setTimeout(function() {
            var line = document.getElementById('fo-exec-2');
            if (line) line.classList.add('visible');
        }, delay));
        delay += 1100;

        // Exec line 3: ERROR + flash
        foTimeouts.push(setTimeout(function() {
            var line = document.getElementById('fo-exec-3');
            if (line) line.classList.add('visible');
            var stage = document.getElementById('fo-stage-execute');
            if (stage) stage.classList.add('fo-error-pulse');
        }, delay));
        delay += 1300;

        // Error detail
        foTimeouts.push(setTimeout(function() {
            var detail = document.getElementById('fo-exec-err-detail');
            if (detail) detail.classList.add('visible');
        }, delay));
        delay += 1600;

        // === ACT 4: Recovery (21 - 26s) ===

        foTimeouts.push(setTimeout(function() {
            foDrawSpineTo(4);
            var el = document.getElementById('fo-stage-recover');
            if (el) el.classList.add('visible');
            foCarouselPin(3); // S4 Error Correction
        }, delay));
        delay += 1200;

        // Stagger 3 recovery check lines
        foTimeouts.push(setTimeout(function() {
            var line = document.getElementById('fo-rec-1');
            if (line) line.classList.add('visible');
        }, delay));
        delay += 900;

        foTimeouts.push(setTimeout(function() {
            var line = document.getElementById('fo-rec-2');
            if (line) line.classList.add('visible');
        }, delay));
        delay += 900;

        foTimeouts.push(setTimeout(function() {
            var line = document.getElementById('fo-rec-3');
            if (line) line.classList.add('visible');
        }, delay));
        delay += 1400;

        // === ACT 5: Result (26 - 30s) ===

        foTimeouts.push(setTimeout(function() {
            foDrawSpineTo(5);
            var el = document.getElementById('fo-stage-result');
            if (el) {
                el.classList.add('visible');
                el.classList.add('fo-result-glow');
            }
        }, delay));
        delay += 1000;

        // Result metrics fade in
        foTimeouts.push(setTimeout(function() {
            var metrics = document.getElementById('fo-result-metrics');
            if (metrics) { metrics.style.transition = 'opacity 0.4s ease'; metrics.style.opacity = '1'; }
        }, delay));
        delay += 1200;

        delay += 5000;

        // Mark animation complete — stop carousel
        foTimeouts.push(setTimeout(function() {
            foRunning = false;
            foCarouselStop();
        }, delay));
    }

    function stopFo() {
        clearFoTimeouts();
        foCarouselStop();
        foRunning = false;
        resetFo();
    }

    // Build animation for Tab 1 (stagger-reveal cards)
    function runFoBuild() {
        var cards = document.querySelectorAll('#optimizer-fusion .fo-build-card');
        cards.forEach(function(card) { card.classList.remove('fo-build-visible'); });
        cards.forEach(function(card, i) {
            setTimeout(function() { card.classList.add('fo-build-visible'); }, 150 * (i + 1));
        });
    }

    // IntersectionObserver + tab switching
    var optimizerSection = document.getElementById('optimizer');
    if (optimizerSection) {
        var foObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var tab2 = document.getElementById('optimizer-action');
                    if (tab2 && tab2.classList.contains('active')) {
                        runFo();
                    }
                    var tab1 = document.getElementById('optimizer-fusion');
                    if (tab1 && tab1.classList.contains('active')) {
                        runFoBuild();
                    }
                } else {
                    stopFo();
                }
            });
        }, { threshold: 0.3 });
        foObserver.observe(optimizerSection);

        // Tab switch handlers
        var foTabs = optimizerSection.querySelectorAll('.section-tab');
        foTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                if (tab.dataset.sectionTab === 'optimizer-action') {
                    setTimeout(runFo, 100);
                } else {
                    stopFo();
                    if (tab.dataset.sectionTab === 'optimizer-fusion') {
                        setTimeout(runFoBuild, 100);
                    }
                }
            });
        });
    }
})();

// === MARKETPLACE BROWSER ANIMATION ===
(function() {
    var mpRunning = false;
    var mpTimeouts = [];
    var mpCards = [
        { stars: 4, downloads: 142 },
        { stars: 5, downloads: 89 },
        { stars: 5, downloads: 312 },
        { stars: 5, downloads: 234 },
        { stars: 4, downloads: 178 },
        { stars: 4, downloads: 67 }
    ];
    var mpNetworkData = { users: 847, assets: 156 };

    function clearMpTimeouts() {
        for (var i = 0; i < mpTimeouts.length; i++) clearTimeout(mpTimeouts[i]);
        mpTimeouts = [];
    }

    function mpAnimateCounter(el, target, duration, suffix) {
        var start = performance.now();
        function update(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + (suffix || '');
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    function resetMp() {
        // Top section — always shown in final state (no animation)
        var header = document.getElementById('mp-header');
        if (header) header.style.opacity = '1';
        var count = document.getElementById('mp-count');
        if (count) count.textContent = '38 assets';
        var catalog = document.getElementById('mp-catalog');
        if (catalog) catalog.classList.add('visible');
        var tags = document.querySelectorAll('.mp-type-tag');
        tags.forEach(function(tag) { tag.classList.add('visible'); tag.classList.remove('active'); });
        var agentTag = document.getElementById('mp-tag-2');
        if (agentTag) agentTag.classList.add('active');
        var cards = document.querySelectorAll('.mp-card');
        cards.forEach(function(card, i) {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '';
            var stars = card.querySelector('.mp-stars');
            if (stars) {
                var numStars = mpCards[i].stars;
                var starStr = '';
                for (var s = 0; s < 5; s++) starStr += s < numStars ? '\u2605' : '\u2606';
                stars.textContent = starStr;
                stars.style.color = '#f59e0b';
            }
            var dl = card.querySelector('.mp-downloads');
            if (dl) dl.textContent = mpCards[i].downloads + ' \u2193';
        });
        if (cards[2]) cards[2].style.boxShadow = '0 0 12px rgba(241,95,34,0.4)';

        // Bottom section — reset for animation
        var acquire = document.getElementById('mp-acquire');
        if (acquire) { acquire.style.opacity = '0'; acquire.classList.remove('visible'); }
        var steps = document.querySelectorAll('.mp-step');
        steps.forEach(function(s) { s.classList.remove('visible'); });
        var checks = document.querySelectorAll('.mp-step-check');
        checks.forEach(function(c) { c.classList.remove('visible'); });
        var network = document.getElementById('mp-network');
        if (network) network.style.opacity = '0';
        var usersEl = document.getElementById('mp-users');
        if (usersEl) usersEl.textContent = '0';
        var assetsEl = document.getElementById('mp-assets');
        if (assetsEl) assetsEl.textContent = '0';
    }

    function runMpAnimation() {
        if (mpRunning) return;
        mpRunning = true;
        clearMpTimeouts();
        resetMp();

        // 200ms — Acquire section fades in
        mpTimeouts.push(setTimeout(function() {
            var acquire = document.getElementById('mp-acquire');
            if (acquire) { acquire.style.transition = 'opacity 0.4s ease'; acquire.style.opacity = '1'; acquire.classList.add('visible'); }
        }, 200));

        // 600ms — Step 1 slides in
        mpTimeouts.push(setTimeout(function() {
            var step1 = document.getElementById('mp-step-1');
            if (step1) step1.classList.add('visible');
        }, 600));

        // 1000ms — Step 1 check mark
        mpTimeouts.push(setTimeout(function() {
            var check1 = document.getElementById('mp-check-1');
            if (check1) check1.classList.add('visible');
        }, 1000));

        // 1400ms — Step 2 slides in
        mpTimeouts.push(setTimeout(function() {
            var step2 = document.getElementById('mp-step-2');
            if (step2) step2.classList.add('visible');
        }, 1400));

        // 1800ms — Step 2 check mark
        mpTimeouts.push(setTimeout(function() {
            var check2 = document.getElementById('mp-check-2');
            if (check2) check2.classList.add('visible');
        }, 1800));

        // 2200ms — Step 3 slides in
        mpTimeouts.push(setTimeout(function() {
            var step3 = document.getElementById('mp-step-3');
            if (step3) step3.classList.add('visible');
        }, 2200));

        // 2600ms — Step 3 check mark
        mpTimeouts.push(setTimeout(function() {
            var check3 = document.getElementById('mp-check-3');
            if (check3) check3.classList.add('visible');
        }, 2600));

        // 3200ms — Network stats fade in + counters animate
        mpTimeouts.push(setTimeout(function() {
            var network = document.getElementById('mp-network');
            if (network) { network.style.transition = 'opacity 0.5s ease'; network.style.opacity = '1'; }
            var usersEl = document.getElementById('mp-users');
            if (usersEl) mpAnimateCounter(usersEl, mpNetworkData.users, 800);
            var assetsEl = document.getElementById('mp-assets');
            if (assetsEl) mpAnimateCounter(assetsEl, mpNetworkData.assets, 800);
        }, 3200));

        // Mark animation complete
        mpTimeouts.push(setTimeout(function() {
            mpRunning = false;
        }, 3400));
    }

    function stopMpAnimation() {
        clearMpTimeouts();
        mpRunning = false;
        resetMp();
    }

    var collabSection = document.getElementById('collaborative');
    if (collabSection) {
        var mpObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var tab = document.querySelector('[data-section-tab="collaborative-howitworks"]');
                    if (tab && tab.classList.contains('active')) {
                        runMpAnimation();
                    }
                } else {
                    stopMpAnimation();
                }
            });
        }, { threshold: 0.3 });
        mpObserver.observe(collabSection);

        var mpTabs = collabSection.querySelectorAll('.section-tab');
        mpTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                if (tab.dataset.sectionTab === 'collaborative-howitworks') {
                    setTimeout(runMpAnimation, 100);
                } else {
                    stopMpAnimation();
                }
            });
        });
    }
})();

// === DECOUPLED PIPELINE ANIMATION (Planner + Executor) ===
// === PLANNER + EXECUTOR — Global-to-Local SVG Flow ===
(function() {
    var peRunning = false;
    var peTimeouts = [];
    var peNodes = ['pe-n-global', 'pe-n-infuse', 'pe-n-local', 'pe-n-exec'];
    var peAnnos = ['pe-a-task', 'pe-a-library', 'pe-a-data', 'pe-a-frontier', 'pe-a-adapted', 'pe-a-results'];
    var peEdges = [
        ['pe-n-global', 'pe-n-infuse', 'blue-line'],
        ['pe-n-infuse', 'pe-n-local', 'green-line'],
        ['pe-n-local', 'pe-n-exec', 'green-line'],
        ['pe-a-task', 'pe-n-global', 'gray-line dashed'],
        ['pe-n-global', 'pe-a-frontier', 'gray-line dashed'],
        ['pe-a-library', 'pe-n-infuse', 'gray-line dashed'],
        ['pe-n-infuse', 'pe-a-adapted', 'gray-line dashed'],
        ['pe-a-data', 'pe-n-local', 'gray-line dashed'],
        ['pe-n-exec', 'pe-a-results', 'gray-line dashed']
    ];

    function clearPeTimeouts() {
        for (var i = 0; i < peTimeouts.length; i++) clearTimeout(peTimeouts[i]);
        peTimeouts = [];
    }

    function peNodeCenter(nodeId) {
        var node = document.getElementById(nodeId);
        var diagram = document.getElementById('pe-diagram');
        if (!node || !diagram) return { x: 0, y: 0 };
        var nr = node.getBoundingClientRect();
        var dr = diagram.getBoundingClientRect();
        return { x: (nr.left - dr.left) + nr.width / 2, y: (nr.top - dr.top) + nr.height / 2 };
    }

    function drawPeLines() {
        var svg = document.getElementById('pe-lines');
        var diagram = document.getElementById('pe-diagram');
        if (!svg || !diagram) return;
        svg.innerHTML = '';
        var dr = diagram.getBoundingClientRect();
        svg.setAttribute('viewBox', '0 0 ' + dr.width + ' ' + dr.height);
        svg.setAttribute('width', dr.width);
        svg.setAttribute('height', dr.height);
        peEdges.forEach(function(edge, i) {
            var fromEl = document.getElementById(edge[0]);
            var toEl = document.getElementById(edge[1]);
            if (!fromEl || !toEl || fromEl.offsetParent === null || toEl.offsetParent === null) return;
            var from = peNodeCenter(edge[0]);
            var to = peNodeCenter(edge[1]);
            var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', from.x); line.setAttribute('y1', from.y);
            line.setAttribute('x2', to.x); line.setAttribute('y2', to.y);
            var classes = edge[2].split(' ');
            classes.forEach(function(cls) { line.classList.add(cls); });
            line.dataset.edgeIndex = i;
            svg.appendChild(line);
        });
    }

    function resetPe() {
        peNodes.concat(peAnnos).forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.classList.remove('visible', 'glow');
        });
        var zones = ['pe-zone-blue', 'pe-zone-green'];
        zones.forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.classList.remove('visible');
        });
        var divider = document.getElementById('pe-divider');
        if (divider) divider.classList.remove('visible');
        var svg = document.getElementById('pe-lines');
        if (svg) {
            svg.querySelectorAll('line').forEach(function(l) {
                l.classList.remove('visible', 'highlighted');
            });
        }
    }

    function showPeEdge(index) {
        var svg = document.getElementById('pe-lines');
        if (!svg) return;
        var line = svg.querySelector('[data-edge-index="' + index + '"]');
        if (line) line.classList.add('visible');
    }

    function highlightPeEdge(index) {
        var svg = document.getElementById('pe-lines');
        if (!svg) return;
        var line = svg.querySelector('[data-edge-index="' + index + '"]');
        if (line) line.classList.add('highlighted');
    }

    function showAnno(id) {
        var el = document.getElementById(id);
        if (el) el.classList.add('visible');
    }

    function runPe() {
        if (peRunning) return;
        peRunning = true;
        clearPeTimeouts();
        resetPe();
        drawPeLines();

        var d = 200;
        // Zones fade in
        peTimeouts.push(setTimeout(function() {
            var el = document.getElementById('pe-zone-blue');
            if (el) el.classList.add('visible');
        }, d));
        d += 300;
        peTimeouts.push(setTimeout(function() {
            var el = document.getElementById('pe-zone-green');
            if (el) el.classList.add('visible');
        }, d));
        d += 300;
        // Divider
        peTimeouts.push(setTimeout(function() {
            var el = document.getElementById('pe-divider');
            if (el) el.classList.add('visible');
        }, d));
        d += 400;
        // Global Planning node
        peTimeouts.push(setTimeout(function() {
            var el = document.getElementById('pe-n-global');
            if (el) el.classList.add('visible');
        }, d));
        // Annotations for Global Planning (300ms after)
        peTimeouts.push(setTimeout(function() {
            showAnno('pe-a-task'); showAnno('pe-a-frontier');
            showPeEdge(3); showPeEdge(4);
        }, d + 300));
        d += 800;
        // Line: Global → Infusion
        peTimeouts.push(setTimeout(function() { showPeEdge(0); }, d));
        d += 500;
        // Plan Infusion node (orange, at boundary)
        peTimeouts.push(setTimeout(function() {
            var el = document.getElementById('pe-n-infuse');
            if (el) { el.classList.add('visible'); el.classList.add('glow'); }
        }, d));
        // Annotations for Infusion (300ms after)
        peTimeouts.push(setTimeout(function() {
            showAnno('pe-a-library'); showAnno('pe-a-adapted');
            showPeEdge(5); showPeEdge(6);
        }, d + 300));
        d += 700;
        // Line: Infusion → Local Planning
        peTimeouts.push(setTimeout(function() { showPeEdge(1); }, d));
        d += 500;
        // Local Planning node
        peTimeouts.push(setTimeout(function() {
            var el = document.getElementById('pe-n-local');
            if (el) el.classList.add('visible');
        }, d));
        // Annotation for Local Planning (300ms after)
        peTimeouts.push(setTimeout(function() {
            showAnno('pe-a-data');
            showPeEdge(7);
        }, d + 300));
        d += 600;
        // Line: Local Planning → Execution
        peTimeouts.push(setTimeout(function() { showPeEdge(2); }, d));
        d += 500;
        // Local Execution node
        peTimeouts.push(setTimeout(function() {
            var el = document.getElementById('pe-n-exec');
            if (el) el.classList.add('visible');
        }, d));
        // Annotation for Execution (300ms after)
        peTimeouts.push(setTimeout(function() {
            showAnno('pe-a-results');
            showPeEdge(8);
        }, d + 300));
        d += 500;
        // All glow simultaneously — highlight main flow lines
        peTimeouts.push(setTimeout(function() {
            peNodes.forEach(function(id) {
                var el = document.getElementById(id);
                if (el) el.classList.add('glow');
            });
            highlightPeEdge(0); highlightPeEdge(1); highlightPeEdge(2);
        }, d));
        d += 500;
        // Done
        peTimeouts.push(setTimeout(function() { peRunning = false; }, d));
    }

    function stopPe() {
        clearPeTimeouts();
        peRunning = false;
        resetPe();
    }

    var sovSection = document.getElementById('sovereignty');
    if (sovSection) {
        var peObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var tab = document.querySelector('[data-section-tab="sovereignty-planner"]');
                    if (tab && tab.classList.contains('active')) {
                        runPe();
                    }
                } else {
                    stopPe();
                }
            });
        }, { threshold: 0.3 });
        peObserver.observe(sovSection);

        var peTabs = sovSection.querySelectorAll('.section-tab');
        peTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                if (tab.dataset.sectionTab === 'sovereignty-planner') {
                    setTimeout(runPe, 100);
                } else {
                    stopPe();
                }
            });
        });
    }
})();

// === LEARNING ENGINE — Vertical Pipeline SVG Flow ===
(function() {
    var leRunning = false;
    var leTimeouts = [];
    var leNodes = ['le-n-plans', 'le-n-champion', 'le-n-rag', 'le-n-search', 'le-n-infuse'];
    var leAnnos = ['le-a-sessions', 'le-a-scoring', 'le-a-query', 'le-a-archive', 'le-a-vectors', 'le-a-enhanced'];
    var leEdges = [
        ['le-n-plans', 'le-n-champion', 'blue-line'],
        ['le-n-champion', 'le-n-rag', 'orange-line'],
        ['le-n-rag', 'le-n-search', 'orange-line'],
        ['le-n-search', 'le-n-infuse', 'green-line'],
        ['le-a-sessions', 'le-n-plans', 'gray-line dashed'],
        ['le-n-plans', 'le-a-archive', 'gray-line dashed'],
        ['le-a-scoring', 'le-n-champion', 'gray-line dashed'],
        ['le-n-rag', 'le-a-vectors', 'gray-line dashed'],
        ['le-a-query', 'le-n-search', 'gray-line dashed'],
        ['le-n-infuse', 'le-a-enhanced', 'gray-line dashed']
    ];

    function clearLeTimeouts() {
        for (var i = 0; i < leTimeouts.length; i++) clearTimeout(leTimeouts[i]);
        leTimeouts = [];
    }

    function leNodeCenter(nodeId) {
        var node = document.getElementById(nodeId);
        var diagram = document.getElementById('le-diagram');
        if (!node || !diagram) return { x: 0, y: 0 };
        var nr = node.getBoundingClientRect();
        var dr = diagram.getBoundingClientRect();
        return { x: (nr.left - dr.left) + nr.width / 2, y: (nr.top - dr.top) + nr.height / 2 };
    }

    function drawLeLines() {
        var svg = document.getElementById('le-lines');
        var diagram = document.getElementById('le-diagram');
        if (!svg || !diagram) return;
        svg.innerHTML = '';
        var dr = diagram.getBoundingClientRect();
        svg.setAttribute('viewBox', '0 0 ' + dr.width + ' ' + dr.height);
        svg.setAttribute('width', dr.width);
        svg.setAttribute('height', dr.height);
        leEdges.forEach(function(edge, i) {
            var fromEl = document.getElementById(edge[0]);
            var toEl = document.getElementById(edge[1]);
            if (!fromEl || !toEl || fromEl.offsetParent === null || toEl.offsetParent === null) return;
            var from = leNodeCenter(edge[0]);
            var to = leNodeCenter(edge[1]);
            var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', from.x); line.setAttribute('y1', from.y);
            line.setAttribute('x2', to.x); line.setAttribute('y2', to.y);
            var classes = edge[2].split(' ');
            classes.forEach(function(cls) { line.classList.add(cls); });
            line.dataset.edgeIndex = i;
            svg.appendChild(line);
        });
    }

    function resetLe() {
        leNodes.concat(leAnnos).forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.classList.remove('visible', 'glow');
        });
        var svg = document.getElementById('le-lines');
        if (svg) {
            svg.querySelectorAll('line').forEach(function(l) {
                l.classList.remove('visible', 'highlighted');
            });
        }
    }

    function showLeEdge(index) {
        var svg = document.getElementById('le-lines');
        if (!svg) return;
        var line = svg.querySelector('[data-edge-index="' + index + '"]');
        if (line) line.classList.add('visible');
    }

    function highlightLeEdge(index) {
        var svg = document.getElementById('le-lines');
        if (!svg) return;
        var line = svg.querySelector('[data-edge-index="' + index + '"]');
        if (line) line.classList.add('highlighted');
    }

    function showAnno(id) {
        var el = document.getElementById(id);
        if (el) el.classList.add('visible');
    }

    function runLe() {
        if (leRunning) return;
        leRunning = true;
        clearLeTimeouts();
        resetLe();
        drawLeLines();

        var d = 200;
        // Global Plans node (top)
        leTimeouts.push(setTimeout(function() {
            var el = document.getElementById('le-n-plans');
            if (el) el.classList.add('visible');
        }, d));
        // Annotations for Global Plans (300ms after)
        leTimeouts.push(setTimeout(function() {
            showAnno('le-a-sessions'); showAnno('le-a-archive');
            showLeEdge(4); showLeEdge(5);
        }, d + 300));
        d += 700;
        // Line: Plans → Champion Cases
        leTimeouts.push(setTimeout(function() { showLeEdge(0); }, d));
        d += 500;
        // Champion Cases node (gold)
        leTimeouts.push(setTimeout(function() {
            var el = document.getElementById('le-n-champion');
            if (el) { el.classList.add('visible'); el.classList.add('glow'); }
        }, d));
        // Annotation for Champion Cases (300ms after)
        leTimeouts.push(setTimeout(function() {
            showAnno('le-a-scoring');
            showLeEdge(6);
        }, d + 300));
        d += 700;
        // Line: Champion → RAG Storage
        leTimeouts.push(setTimeout(function() { showLeEdge(1); }, d));
        d += 500;
        // RAG Storage node
        leTimeouts.push(setTimeout(function() {
            var el = document.getElementById('le-n-rag');
            if (el) el.classList.add('visible');
        }, d));
        // Annotation for RAG Storage (300ms after)
        leTimeouts.push(setTimeout(function() {
            showAnno('le-a-vectors');
            showLeEdge(7);
        }, d + 300));
        d += 700;
        // Line: RAG → Semantic Search
        leTimeouts.push(setTimeout(function() { showLeEdge(2); }, d));
        d += 500;
        // Semantic Search node
        leTimeouts.push(setTimeout(function() {
            var el = document.getElementById('le-n-search');
            if (el) el.classList.add('visible');
        }, d));
        // Annotation for Semantic Search (300ms after)
        leTimeouts.push(setTimeout(function() {
            showAnno('le-a-query');
            showLeEdge(8);
        }, d + 300));
        d += 700;
        // Line: Search → Plan Infusion
        leTimeouts.push(setTimeout(function() { showLeEdge(3); }, d));
        d += 500;
        // Plan Infusion node (green, bottom)
        leTimeouts.push(setTimeout(function() {
            var el = document.getElementById('le-n-infuse');
            if (el) el.classList.add('visible');
        }, d));
        // Annotation for Plan Infusion (300ms after)
        leTimeouts.push(setTimeout(function() {
            showAnno('le-a-enhanced');
            showLeEdge(9);
        }, d + 300));
        d += 500;
        // All glow + highlight main flow lines
        leTimeouts.push(setTimeout(function() {
            leNodes.forEach(function(id) {
                var el = document.getElementById(id);
                if (el) el.classList.add('glow');
            });
            for (var i = 0; i < 4; i++) highlightLeEdge(i);
        }, d));
        d += 500;
        // Done
        leTimeouts.push(setTimeout(function() { leRunning = false; }, d));
    }

    function stopLe() {
        clearLeTimeouts();
        leRunning = false;
        resetLe();
    }

    var sovSection = document.getElementById('sovereignty');
    if (sovSection) {
        var leObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var tab = document.querySelector('[data-section-tab="sovereignty-learning"]');
                    if (tab && tab.classList.contains('active')) {
                        runLe();
                    }
                } else {
                    stopLe();
                }
            });
        }, { threshold: 0.3 });
        leObserver.observe(sovSection);

        var leTabs = sovSection.querySelectorAll('.section-tab');
        leTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                if (tab.dataset.sectionTab === 'sovereignty-learning') {
                    setTimeout(runLe, 100);
                } else {
                    stopLe();
                }
            });
        });
    }
})();

// === MODEL TRUST — Hub-and-Spoke SVG Flow ===
(function() {
    var mrRunning = false;
    var mrTimeouts = [];
    var mrNodes = ['mr-n-frontier', 'mr-n-local', 'mr-n-choice', 'mr-n-cloud-path', 'mr-n-both-path', 'mr-n-local-path', 'mr-n-sovereign'];
    var mrAnnos = ['mr-a-complexity', 'mr-a-sensitivity'];
    var mrEdges = [
        ['mr-n-frontier', 'mr-n-choice', 'blue-line'],
        ['mr-n-local', 'mr-n-choice', 'green-line'],
        ['mr-n-choice', 'mr-n-cloud-path', 'blue-line'],
        ['mr-n-choice', 'mr-n-both-path', 'orange-line'],
        ['mr-n-choice', 'mr-n-local-path', 'green-line'],
        ['mr-n-cloud-path', 'mr-n-sovereign', 'blue-line dashed'],
        ['mr-n-both-path', 'mr-n-sovereign', 'orange-line dashed'],
        ['mr-n-local-path', 'mr-n-sovereign', 'green-line dashed'],
        ['mr-a-complexity', 'mr-n-choice', 'gray-line dashed'],
        ['mr-a-sensitivity', 'mr-n-choice', 'gray-line dashed']
    ];

    function clearMrTimeouts() {
        for (var i = 0; i < mrTimeouts.length; i++) clearTimeout(mrTimeouts[i]);
        mrTimeouts = [];
    }

    function mrNodeCenter(nodeId) {
        var node = document.getElementById(nodeId);
        var diagram = document.getElementById('mr-diagram');
        if (!node || !diagram) return { x: 0, y: 0 };
        var nr = node.getBoundingClientRect();
        var dr = diagram.getBoundingClientRect();
        return { x: (nr.left - dr.left) + nr.width / 2, y: (nr.top - dr.top) + nr.height / 2 };
    }

    function drawMrLines() {
        var svg = document.getElementById('mr-lines');
        var diagram = document.getElementById('mr-diagram');
        if (!svg || !diagram) return;
        svg.innerHTML = '';
        var dr = diagram.getBoundingClientRect();
        svg.setAttribute('viewBox', '0 0 ' + dr.width + ' ' + dr.height);
        svg.setAttribute('width', dr.width);
        svg.setAttribute('height', dr.height);
        mrEdges.forEach(function(edge, i) {
            var fromEl = document.getElementById(edge[0]);
            var toEl = document.getElementById(edge[1]);
            if (!fromEl || !toEl || fromEl.offsetParent === null || toEl.offsetParent === null) return;
            var from = mrNodeCenter(edge[0]);
            var to = mrNodeCenter(edge[1]);
            var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', from.x); line.setAttribute('y1', from.y);
            line.setAttribute('x2', to.x); line.setAttribute('y2', to.y);
            var classes = edge[2].split(' ');
            classes.forEach(function(cls) { line.classList.add(cls); });
            line.dataset.edgeIndex = i;
            svg.appendChild(line);
        });
    }

    function resetMr() {
        mrNodes.concat(mrAnnos).forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.classList.remove('visible', 'glow');
        });
        var svg = document.getElementById('mr-lines');
        if (svg) {
            svg.querySelectorAll('line').forEach(function(l) {
                l.classList.remove('visible', 'highlighted');
            });
        }
    }

    function showMrEdge(index) {
        var svg = document.getElementById('mr-lines');
        if (!svg) return;
        var line = svg.querySelector('[data-edge-index="' + index + '"]');
        if (line) line.classList.add('visible');
    }

    function highlightMrEdge(index) {
        var svg = document.getElementById('mr-lines');
        if (!svg) return;
        var line = svg.querySelector('[data-edge-index="' + index + '"]');
        if (line) line.classList.add('highlighted');
    }

    function showAnno(id) {
        var el = document.getElementById(id);
        if (el) el.classList.add('visible');
    }

    function runMr() {
        if (mrRunning) return;
        mrRunning = true;
        clearMrTimeouts();
        resetMr();
        drawMrLines();

        var d = 200;
        // Frontier Models node (top-left)
        mrTimeouts.push(setTimeout(function() {
            var el = document.getElementById('mr-n-frontier');
            if (el) el.classList.add('visible');
        }, d));
        d += 300;
        // Local Models node (top-right)
        mrTimeouts.push(setTimeout(function() {
            var el = document.getElementById('mr-n-local');
            if (el) el.classList.add('visible');
        }, d));
        d += 500;
        // Lines: Frontier → Choice, Local → Choice
        mrTimeouts.push(setTimeout(function() { showMrEdge(0); showMrEdge(1); }, d));
        d += 500;
        // Your Choice node (center, with glow)
        mrTimeouts.push(setTimeout(function() {
            var el = document.getElementById('mr-n-choice');
            if (el) { el.classList.add('visible'); el.classList.add('glow'); }
        }, d));
        // Annotation nodes for Choice (300ms after)
        mrTimeouts.push(setTimeout(function() {
            showAnno('mr-a-complexity'); showAnno('mr-a-sensitivity');
            showMrEdge(8); showMrEdge(9);
        }, d + 300));
        d += 800;
        // Lines: Choice → Cloud Path
        mrTimeouts.push(setTimeout(function() { showMrEdge(2); }, d));
        d += 200;
        // Lines: Choice → Both Path
        mrTimeouts.push(setTimeout(function() { showMrEdge(3); }, d));
        d += 200;
        // Lines: Choice → Local Path
        mrTimeouts.push(setTimeout(function() { showMrEdge(4); }, d));
        d += 400;
        // Cloud Only node
        mrTimeouts.push(setTimeout(function() {
            var el = document.getElementById('mr-n-cloud-path');
            if (el) el.classList.add('visible');
        }, d));
        d += 300;
        // Both node
        mrTimeouts.push(setTimeout(function() {
            var el = document.getElementById('mr-n-both-path');
            if (el) el.classList.add('visible');
        }, d));
        d += 300;
        // Local Only node
        mrTimeouts.push(setTimeout(function() {
            var el = document.getElementById('mr-n-local-path');
            if (el) el.classList.add('visible');
        }, d));
        d += 500;
        // Dashed lines to Sovereign
        mrTimeouts.push(setTimeout(function() {
            showMrEdge(5); showMrEdge(6); showMrEdge(7);
        }, d));
        d += 400;
        // Sovereign node (bottom center, green glow)
        mrTimeouts.push(setTimeout(function() {
            var el = document.getElementById('mr-n-sovereign');
            if (el) { el.classList.add('visible'); el.classList.add('glow'); }
        }, d));
        d += 500;
        // Final glow on all nodes + highlight main flow lines
        mrTimeouts.push(setTimeout(function() {
            mrNodes.forEach(function(id) {
                var el = document.getElementById(id);
                if (el) el.classList.add('glow');
            });
            for (var i = 0; i < 8; i++) highlightMrEdge(i);
        }, d));
        d += 500;
        // Done
        mrTimeouts.push(setTimeout(function() { mrRunning = false; }, d));
    }

    function stopMr() {
        clearMrTimeouts();
        mrRunning = false;
        resetMr();
    }

    var sovSection = document.getElementById('sovereignty');
    if (sovSection) {
        var mrObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var tab = document.querySelector('[data-section-tab="sovereignty-models"]');
                    if (tab && tab.classList.contains('active')) {
                        runMr();
                    }
                } else {
                    stopMr();
                }
            });
        }, { threshold: 0.3 });
        mrObserver.observe(sovSection);

        var mrTabs = sovSection.querySelectorAll('.section-tab');
        mrTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                if (tab.dataset.sectionTab === 'sovereignty-models') {
                    setTimeout(runMr, 100);
                } else {
                    stopMr();
                }
            });
        });
    }
})();

// === FIVE WALLS — Staggered scroll-reveal ===
(function () {
    const wallCards = document.querySelectorAll('.wall-card');
    if (!wallCards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger all cards when the first one enters the viewport
                wallCards.forEach((card, i) => {
                    setTimeout(() => card.classList.add('visible'), i * 110);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    // Observe only the first card — triggers stagger for the entire grid
    observer.observe(wallCards[0]);
})();

// ===========================================================
// COMPONENT ARCHITECTURE SECTION
// (From Static Functionality to Transformative Flexibility)
// Replay-on-scroll-in + replay-on-tab-click, matching the
// IntersectionObserver convention used by the other sections.
// ===========================================================
(function () {
    var caSection = document.getElementById('component-architecture');
    if (!caSection) return;

    var caPanels = caSection.querySelectorAll('.ca-panel');
    var caCountdownTimer = null;
    var caChartTimer = null;
    var caFilesTimer = null;

    function caClearCountdown() {
        if (caCountdownTimer) { clearInterval(caCountdownTimer); caCountdownTimer = null; }
    }

    function caClearCharts() {
        if (caChartTimer) { clearInterval(caChartTimer); caChartTimer = null; }
    }

    // Cycle the Data Visualization demo through every chart type.
    function caStartCharts() {
        var panel = caSection.querySelector('.ca-panel[data-ca="charts"]');
        if (!panel) return;
        caClearCharts();
        var chartEl = panel.querySelector('.ca-chart');
        var views = panel.querySelectorAll('.ca-cv');
        var pills = panel.querySelectorAll('.ca-chart-type');
        var order = ['bar', 'line', 'pie', 'scatter', 'area'];
        var idx = 0;
        function show(type) {
            views.forEach(function (v) { v.classList.toggle('active', v.getAttribute('data-type') === type); });
            pills.forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-type') === type); });
            if (chartEl) chartEl.classList.toggle('ca-chart--pie', type === 'pie');
        }
        idx = 0;
        show(order[0]);
        caChartTimer = setInterval(function () {
            idx = (idx + 1) % order.length;
            show(order[idx]);
        }, 1900);
    }

    function caClearFiles() {
        if (caFilesTimer) { clearInterval(caFilesTimer); caFilesTimer = null; }
    }

    // Files: one store + key-manager combination lit per beat (S3 + AWS KMS, Azure Blob +
    // Key Vault, GCS + Cloud KMS, local + Vault) — the store and the keys are yours to choose.
    function caStartFiles() {
        var panel = caSection.querySelector('.ca-panel[data-ca="files"]');
        if (!panel) return;
        caClearFiles();
        var pairs = [['S3 \u00b7 eu-central-1', 'AWS KMS'], ['Azure Blob', 'Key Vault'], ['GCS', 'Cloud KMS'], ['local', 'Vault']];
        var stores = panel.querySelectorAll('.ca-files-chip[data-store]');
        var keys = panel.querySelectorAll('.ca-files-chip[data-key]');
        var idx = 0;
        function show(i) {
            stores.forEach(function (c) { c.classList.toggle('on', c.getAttribute('data-store') === pairs[i][0]); });
            keys.forEach(function (c) { c.classList.toggle('on', c.getAttribute('data-key') === pairs[i][1]); });
        }
        show(0);
        caFilesTimer = setInterval(function () {
            idx = (idx + 1) % pairs.length;
            show(idx);
        }, 2200);
    }

    // Live countdown for the Task Scheduler "Next run in" readout.
    function caStartCountdown() {
        var el = caSection.querySelector('.ca-sched-countdown');
        if (!el) return;
        caClearCountdown();
        var remaining = 14; // seconds
        function render() {
            var m = Math.floor(remaining / 60);
            var s = remaining % 60;
            el.textContent = '00:' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
        }
        render();
        caCountdownTimer = setInterval(function () {
            remaining = remaining <= 0 ? 14 : remaining - 1; // loop for a living demo
            render();
        }, 1000);
    }

    function caGetActivePanel() {
        return caSection.querySelector('.ca-panel.active');
    }

    // Replay the active panel's animations by re-applying the .ca-live gate.
    function caPlayActive() {
        caClearCountdown();
        caClearCharts();
        caClearFiles();
        caPanels.forEach(function (p) { p.classList.remove('ca-live'); });
        var active = caGetActivePanel();
        if (!active) return;
        // Force reflow so removing then adding .ca-live restarts CSS animations.
        void active.offsetWidth;
        active.classList.add('ca-live');
        var which = active.getAttribute('data-ca');
        if (which === 'scheduler') {
            caStartCountdown();
        } else if (which === 'charts') {
            caStartCharts();
        } else if (which === 'files') {
            caStartFiles();
        }
    }

    function caStop() {
        caClearCountdown();
        caClearCharts();
        caClearFiles();
        caPanels.forEach(function (p) { p.classList.remove('ca-live'); });
    }

    var caVisible = false;
    var caObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                if (!caVisible) {
                    caVisible = true;
                    caPlayActive();
                }
            } else {
                caVisible = false;
                caStop();
            }
        });
    }, { threshold: 0.3 });
    caObserver.observe(caSection);

    // Tab clicks: the global .section-tab handler toggles .active; we then
    // replay the now-active panel (deferred so the active class is settled).
    var caTabs = caSection.querySelectorAll('.component-tabs .section-tab');
    caTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            if (!caVisible) return;
            setTimeout(caPlayActive, 0);
        });
    });
})();


// ===========================================================
// TRUST COMPLETION SECTIONS
// Verifiable Trust · Honest Refusal · Measured Conduct ·
// Bounded Autonomy — loop while visible, replay on tab click.
// ===========================================================

// --- shared micro-sequencer: schedule steps, loop, cancel ---
function tdaSequence(loopMs) {
    var timers = [];
    var running = false;
    var steps = [];
    function schedule() {
        steps.forEach(function (s) { timers.push(setTimeout(s.fn, s.at)); });
        timers.push(setTimeout(function () { if (running) { clear(); schedule(); } }, loopMs));
    }
    function clear() { timers.forEach(clearTimeout); timers = []; }
    return {
        step: function (at, fn) { steps.push({ at: at, fn: fn }); return this; },
        start: function () { if (running) return; running = true; schedule(); },
        stop: function () { running = false; clear(); },
        restart: function () { this.stop(); this.start(); }
    };
}

// === VERIFIABLE TRUST — Tab 1: compositional signing ===
(function () {
    var container = document.getElementById('vt-container');
    if (!container) return;
    var ing = [1, 2, 3].map(function (i) { return document.querySelector('#vt-ing-' + i + ' .vt-ing-status'); });
    var agent = document.getElementById('vt-agent');
    var badge = document.getElementById('vt-badge');
    var event = document.getElementById('vt-event');

    function setStatus(el, text, cls) {
        el.textContent = text;
        el.className = 'vt-ing-status fira-code' + (cls ? ' ' + cls : '');
    }
    function setBadge(state, label) {
        badge.setAttribute('data-state', state);
        badge.querySelector('b').textContent = label;
        agent.classList.toggle('sealed', state === 'trusted');
        agent.classList.toggle('dirty', state === 'changed');
    }
    function reset() {
        ing.forEach(function (el) { setStatus(el, 'queued', ''); });
        setBadge('unsigned', 'UNSIGNED');
        event.textContent = ' ';
        event.className = 'vt-event fira-code';
    }

    var seq = tdaSequence(12000)
        .step(0, reset)
        .step(400,  function () { setStatus(ing[0], 'validating…', 'checking'); })
        .step(1300, function () { setStatus(ing[0], '✓ conformant · SIGNED', 'signed'); })
        .step(1600, function () { setStatus(ing[1], 'screening…', 'checking'); })
        .step(2500, function () { setStatus(ing[1], '✓ clean · SIGNED', 'signed'); })
        .step(2800, function () { setStatus(ing[2], 'verifying…', 'checking'); })
        .step(3700, function () { setStatus(ing[2], '✓ intact · SIGNED', 'signed'); })
        .step(4400, function () { setBadge('trusted', 'TRUSTED'); event.textContent = 'every ingredient signed → the agent seals'; event.className = 'vt-event fira-code ok'; })
        .step(6200, function () { setStatus(ing[1], 'content hash changed', 'dirty'); event.textContent = '⚠ skill edited — composition no longer matches the signature'; event.className = 'vt-event fira-code warn'; })
        .step(6800, function () { setBadge('changed', 'CHANGED'); })
        .step(8800, function () { setStatus(ing[1], 're-screening…', 'checking'); event.textContent = 'owner re-signs the skill'; event.className = 'vt-event fira-code'; })
        .step(9700, function () { setStatus(ing[1], '✓ clean · SIGNED', 'signed'); })
        .step(10300, function () { setBadge('trusted', 'TRUSTED'); event.textContent = 'trust re-earned — never assumed'; event.className = 'vt-event fira-code ok'; });

    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? seq.start() : seq.stop(); });
    }, { threshold: 0.3 });
    obs.observe(container);
    document.querySelectorAll('[data-section-tab="vt-tab1"]').forEach(function (tab) {
        tab.addEventListener('click', function () { seq.restart(); });
    });
})();

// === VERIFIABLE TRUST — Tab 2: one key, three signatures ===
(function () {
    var container = document.getElementById('vt3-container');
    if (!container) return;
    var key = document.getElementById('vt3-key');
    var cells = [1, 2, 3].map(function (i) { return document.getElementById('vt3-cell-' + i); });
    var verify = document.getElementById('vt3-verify');

    function reset() {
        cells.forEach(function (c) { c.classList.remove('signed'); });
        verify.classList.remove('show');
        key.classList.remove('pulse');
    }
    function pulseThenSign(cell) {
        key.classList.remove('pulse');
        void key.offsetWidth; // restart animation
        key.classList.add('pulse');
        cell.classList.add('signed');
    }
    var seq = tdaSequence(8000)
        .step(0, reset)
        .step(600,  function () { pulseThenSign(cells[0]); })
        .step(1500, function () { pulseThenSign(cells[1]); })
        .step(2400, function () { pulseThenSign(cells[2]); })
        .step(3400, function () { verify.classList.add('show'); });

    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? seq.start() : seq.stop(); });
    }, { threshold: 0.3 });
    obs.observe(container);
    document.querySelectorAll('[data-section-tab="vt-tab2"]').forEach(function (tab) {
        tab.addEventListener('click', function () { seq.restart(); });
    });
})();

// === VERIFIABLE TRUST — Tab 3: execution chain (provenance + lineage, sealed with the badge) ===
(function () {
    var container = document.getElementById('epc-container');
    if (!container) return;
    var hashes = ['a7f3e21b', 'd9c4b1f8', '3e8a0fc2', '91d7b543', 'f2c6e89a'];
    var pairs = ['01', '12', '23', '34'];
    function $(id) { return document.getElementById('epc-' + id); }
    var tamper = $('tamper'), verify = $('verify'), seal = $('seal'), count = $('step-count');
    var countTimer = null;

    function reset() {
        clearInterval(countTimer);
        for (var i = 0; i <= 4; i++) {
            $('block-' + i).classList.remove('visible', 'tampered');
            $('hash-' + i).textContent = '';
            if (i > 0) $('prev-' + i).textContent = '';
            $('sig-' + i).classList.remove('valid', 'invalid');
        }
        pairs.forEach(function (p) { $('link-' + p).classList.remove('visible', 'broken'); $('linkhash-' + p).textContent = ''; });
        tamper.classList.remove('visible');
        verify.classList.remove('visible');
        seal.classList.remove('visible');
        count.textContent = '0';
    }
    var seq = tdaSequence(15000).step(0, reset);
    // build: five blocks, each hashed, linked to the previous one and signed
    [0, 1, 2, 3, 4].forEach(function (i) {
        var at = 400 + i * 900;
        seq.step(at,       function () { $('block-' + i).classList.add('visible'); })
           .step(at + 200, function () { $('hash-' + i).textContent = hashes[i] + '...'; })
           .step(at + 500, function () { $('sig-' + i).classList.add('valid'); });
        if (i > 0) seq.step(at + 350, function () { $('prev-' + i).textContent = hashes[i - 1] + '...'; });
        if (i < 4) seq.step(at + 650, function () { $('link-' + pairs[i]).classList.add('visible'); $('linkhash-' + pairs[i]).textContent = hashes[i].slice(0, 4) + '...'; });
    });
    // tamper with step 2: every link after it breaks, then the chain is restored and verifies
    var t = 400 + 5 * 900 + 400;
    seq.step(t, function () {
            $('block-2').classList.add('tampered');
            $('sig-2').classList.replace('valid', 'invalid');
            $('hash-2').textContent = 'XX??XX??...';
        })
       .step(t + 400, function () {
            $('link-23').classList.add('broken'); $('link-34').classList.add('broken');
            [3, 4].forEach(function (k) { $('sig-' + k).classList.replace('valid', 'invalid'); });
        })
       .step(t + 800, function () { tamper.classList.add('visible'); })
       .step(t + 3300, function () {
            tamper.classList.remove('visible');
            $('block-2').classList.remove('tampered');
            $('hash-2').textContent = hashes[2] + '...';
            [2, 3, 4].forEach(function (k) { $('sig-' + k).classList.replace('invalid', 'valid'); });
            $('link-23').classList.remove('broken'); $('link-34').classList.remove('broken');
        })
       .step(t + 3700, function () { verify.classList.add('visible'); })
       .step(t + 4100, function () {
            seal.classList.add('visible');
            var n = 0;
            clearInterval(countTimer);
            countTimer = setInterval(function () { count.textContent = ++n; if (n >= 26) clearInterval(countTimer); }, 30);
        });

    // a hidden tab is never intersecting, so the chain plays only while its tab is open and on screen
    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? seq.start() : (seq.stop(), reset()); });
    }, { threshold: 0.3 });
    obs.observe(container);
    document.querySelectorAll('[data-section-tab="vt-tab3"]').forEach(function (tab) {
        tab.addEventListener('click', function () { setTimeout(function () { seq.restart(); }, 0); });
    });
})();

// === HONEST REFUSAL — Tab 1: grounding gate console ===
(function () {
    var container = document.getElementById('gg-container');
    if (!container) return;
    var lines = [1, 2, 3, 4, 5, 6].map(function (i) { return document.getElementById('gg-line-' + i); });
    var draft = document.getElementById('gg-draft');
    var bench = document.getElementById('gg-bench');

    function reset() {
        lines.forEach(function (l) { l.classList.remove('show'); });
        draft.classList.remove('struck');
        bench.classList.remove('show');
    }
    var seq = tdaSequence(10500)
        .step(0, reset)
        .step(300,  function () { lines[0].classList.add('show'); })
        .step(1200, function () { lines[1].classList.add('show'); })
        .step(2100, function () { lines[2].classList.add('show'); })
        .step(3000, function () { lines[3].classList.add('show'); })
        .step(3800, function () { lines[4].classList.add('show'); draft.classList.add('struck'); })
        .step(4600, function () { lines[5].classList.add('show'); })
        .step(5600, function () { bench.classList.add('show'); });

    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? seq.start() : seq.stop(); });
    }, { threshold: 0.3 });
    obs.observe(container);
    document.querySelectorAll('[data-section-tab="gg-tab1"]').forEach(function (tab) {
        tab.addEventListener('click', function () { seq.restart(); });
    });
})();

// === HONEST REFUSAL — Tab 3: honesty gate (claims vs evidence) ===
(function () {
    var container = document.getElementById('hg-container');
    if (!container) return;
    container.classList.add('hg-armed');
    function step(n) { return container.querySelector('[data-hg="' + n + '"]'); }
    var draft = document.getElementById('hg-draft');
    function reset() {
        container.querySelectorAll('[data-hg]').forEach(function (e) { e.classList.remove('show'); });
        draft.classList.remove('struck');
    }
    var seq = tdaSequence(12000)
        .step(0, reset)
        .step(300,  function () { step(1).classList.add('show'); })          // the data query runs
        .step(1100, function () { step(2).classList.add('show'); })          // ... and fails
        .step(2000, function () { step(3).classList.add('show'); })          // the model drafts "0 orders"
        .step(3200, function () { draft.classList.add('struck'); step(4).classList.add('show'); })  // the gate names it
        .step(4400, function () { step(5).classList.add('show'); })          // the honest answer is delivered
        .step(5600, function () { step(6).classList.add('show'); })          // the other cases it catches
        .step(6400, function () { step(7).classList.add('show'); });         // an honest zero passes

    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? seq.start() : seq.stop(); });
    }, { threshold: 0.3 });
    obs.observe(container);
    document.querySelectorAll('[data-section-tab="gg-tab3"]').forEach(function (tab) {
        tab.addEventListener('click', function () { seq.restart(); });
    });
})();

// === HONEST REFUSAL — Tab 2: guardrails both edges ===
(function () {
    var container = document.getElementById('gd-container');
    if (!container) return;
    var inj = document.getElementById('gd-inj');
    var shieldIn = document.getElementById('gd-shield-in');
    var verdictIn = document.getElementById('gd-verdict-in');
    var pii = document.getElementById('gd-pii');
    var shieldOut = document.getElementById('gd-shield-out');
    var verdictOut = document.getElementById('gd-verdict-out');
    var note = document.getElementById('gd-note');

    function reset() {
        [inj, pii].forEach(function (m) { m.classList.remove('show', 'neutralized'); });
        [verdictIn, verdictOut].forEach(function (v) { v.classList.remove('show'); });
        shieldIn.classList.remove('block'); shieldOut.classList.remove('pass');
        note.classList.remove('show');
    }
    var seq = tdaSequence(10000)
        .step(0, reset)
        .step(300,  function () { inj.classList.add('show'); })
        .step(1300, function () { shieldIn.classList.add('block'); inj.classList.add('neutralized'); })
        .step(1700, function () { verdictIn.classList.add('show'); })
        .step(3100, function () { pii.classList.add('show'); })
        .step(4100, function () { shieldOut.classList.add('pass'); })
        .step(4500, function () { verdictOut.classList.add('show'); })
        .step(5600, function () { note.classList.add('show'); });

    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? seq.start() : seq.stop(); });
    }, { threshold: 0.3 });
    obs.observe(container);
    document.querySelectorAll('[data-section-tab="gg-tab2"]').forEach(function (tab) {
        tab.addEventListener('click', function () { seq.restart(); });
    });
})();

// === MEASURED CONDUCT — health card + breaker ===
(function () {
    var container = document.getElementById('mc-container');
    if (!container) return;
    var ring = document.getElementById('mc-ring');
    var state = document.getElementById('mc-state');
    var fills = [1, 2, 3, 4, 5, 6].map(function (i) { return document.getElementById('mc-fill-' + i); });
    var val3 = document.getElementById('mc-val-3');
    var breaker = document.getElementById('mc-breaker');
    var rungs = document.querySelectorAll('#mc-ladder .mc-rung');
    var CIRC = 194.8;

    function setRing(pct, color) {
        ring.style.strokeDashoffset = String(CIRC * (1 - pct));
        ring.style.stroke = color;
    }
    function setState(s, label) {
        state.setAttribute('data-state', s); state.textContent = label;
        rungs.forEach(function (r) { r.classList.toggle('active', r.getAttribute('data-s') === s); });
    }
    function setScope(pct, cls, text) {
        fills[2].style.width = pct + '%';
        fills[2].className = 'mc-fill mc-fill-drop' + (cls ? ' ' + cls : '');
        val3.textContent = text;
        val3.className = 'mc-val fira-code' + (cls ? ' ' + cls : '');
    }
    function reset() {
        fills.forEach(function (f) { f.style.width = '0'; });
        fills[2].className = 'mc-fill mc-fill-drop';
        val3.textContent = '92%'; val3.className = 'mc-val fira-code';
        setState('proven', 'PROVEN');
        setRing(0.9, '#4ade80');
        breaker.classList.remove('show');
    }
    var seq = tdaSequence(12500)
        .step(0, reset)
        .step(400, function () {
            fills.forEach(function (f) { f.style.width = f.getAttribute('data-to') + '%'; });
        })
        .step(3000, function () { setScope(61, 'warn', '61%'); setState('watch', 'WATCH'); setRing(0.62, '#f59e0b'); })
        .step(5200, function () { setScope(34, 'danger', '34%'); setState('at-risk', 'AT-RISK'); setRing(0.34, '#ef4444'); })
        .step(6200, function () { breaker.classList.add('show'); })
        .step(9800, function () { breaker.classList.remove('show'); setScope(74, 'warn', '74%'); setState('watch', 'WATCH'); setRing(0.72, '#f59e0b'); });

    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? seq.start() : seq.stop(); });
    }, { threshold: 0.3 });
    obs.observe(container);
})();

// === BOUNDED AUTONOMY — authority terminal ===
(function () {
    var container = document.getElementById('aa-container');
    if (!container) return;
    var lines = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) { return document.getElementById('aa-line-' + i); });
    var budgetFill = document.getElementById('aa-budget-fill');
    var budgetVal = document.getElementById('aa-budget-val');

    function reset() {
        lines.forEach(function (l) { l.classList.remove('show', 'resolved', 'denied'); });
        if (budgetFill) { budgetFill.style.width = '0'; }
        if (budgetVal) { budgetVal.textContent = '$0.00 / $0.50'; }
    }
    function call(line, denied) {
        line.classList.add('show');
        setTimeout(function () {
            line.classList.add('resolved');
            if (denied) line.classList.add('denied');
        }, 500);
    }
    function spend(pct, label) {
        if (budgetFill) budgetFill.style.width = pct + '%';
        if (budgetVal) budgetVal.textContent = label;
    }
    var seq = tdaSequence(13500)
        .step(0, reset)
        .step(300,  function () { lines[0].classList.add('show'); })
        .step(1100, function () { lines[1].classList.add('show'); })
        .step(1900, function () { lines[2].classList.add('show'); })
        .step(2900, function () { call(lines[3], false); spend(10, '$0.05 / $0.50'); })
        .step(4100, function () { call(lines[4], true); })
        .step(5300, function () { call(lines[5], false); spend(16, '$0.08 / $0.50'); })
        .step(6500, function () { call(lines[6], true); })
        .step(7700, function () { call(lines[7], false); spend(24, '$0.12 / $0.50'); })
        .step(8800, function () { lines[8].classList.add('show'); });

    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? seq.start() : seq.stop(); });
    }, { threshold: 0.3 });
    obs.observe(container);
})();


// === OBDA — From Improvised SQL to Signed Contracts (plane cycle while visible) ===
(function () {
    var card = document.querySelector('#obda .ob-card');
    if (!card) return;
    var order = ['model', 'read', 'act'], idx = 1, timer = null, pinned = false;
    function show(p) {
        card.querySelectorAll('.ob-plane').forEach(function (b) { b.classList.toggle('on', b.dataset.p === p); });
        card.querySelectorAll('.ob-scene').forEach(function (sc) {
            sc.classList.remove('on');
            if (sc.dataset.s === p) { void sc.offsetWidth; sc.classList.add('on'); }
        });
    }
    function start() {
        card.classList.add('ob-live');
        show(order[idx]);
        clearInterval(timer);
        timer = setInterval(function () { if (!pinned) { idx = (idx + 1) % order.length; show(order[idx]); } }, 7000);
    }
    function stop() { clearInterval(timer); timer = null; pinned = false; }
    card.querySelectorAll('.ob-plane').forEach(function (b) {
        b.addEventListener('click', function () { pinned = true; idx = order.indexOf(b.dataset.p); show(b.dataset.p); });
    });
    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? start() : stop(); });
    }, { threshold: 0.3 });
    obs.observe(card);
})();


// === Per-answer assurance — Delivered / Held for review (alternates while visible) ===
(function () {
    var card = document.querySelector('#per-answer .pa-card');
    if (!card) return;
    var order = ['ok', 'held'], idx = 0, timer = null, pinned = false;
    function show(p) {
        card.querySelectorAll('.pa-tab').forEach(function (b) { b.classList.toggle('on', b.dataset.p === p); });
        card.querySelectorAll('.pa-scene').forEach(function (sc) {
            sc.classList.remove('on');
            if (sc.dataset.s === p) { void sc.offsetWidth; sc.classList.add('on'); }
        });
    }
    function start() {
        card.classList.add('pa-live');
        show(order[idx]);
        clearInterval(timer);
        timer = setInterval(function () { if (!pinned) { idx = (idx + 1) % order.length; show(order[idx]); } }, 8000);
    }
    function stop() { clearInterval(timer); timer = null; pinned = false; }
    card.querySelectorAll('.pa-tab').forEach(function (b) {
        b.addEventListener('click', function () { pinned = true; idx = order.indexOf(b.dataset.p); show(b.dataset.p); });
    });
    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? start() : stop(); });
    }, { threshold: 0.3 });
    obs.observe(card);
})();

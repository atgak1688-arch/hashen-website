/* ============================================
   喝神手作茶飲 Ha ShEN — Splash Animation
   Brush calligraphy reveal with natural timing
   ============================================ */

(function() {
  // Check if already visited this session
  if (sessionStorage.getItem('hashen_splash_seen')) {
    const splash = document.querySelector('.splash-screen');
    if (splash) splash.remove();
    // Directly show hero animations
    requestAnimationFrame(() => {
      document.querySelectorAll('.hero-calligraphy-text, .hero-brand-en, .hero-tagline, .hero-buttons')
        .forEach(el => el.classList.add('animate-in'));
    });
    return;
  }

  const splash = document.querySelector('.splash-screen');
  if (!splash) return;

  // Prevent scroll during splash
  document.body.style.overflow = 'hidden';

  const chars = splash.querySelectorAll('.splash-char');
  const englishText = splash.querySelector('.splash-english');
  const subtitle = splash.querySelector('.splash-subtitle');
  const goldLine = splash.querySelector('.splash-line');
  const skipBtn = splash.querySelector('.splash-skip');

  /* --- Animation Timeline ---
     Simulates the rhythm of a calligrapher:
     - Pause (gathering focus)
     - Write 「喝」 (brush hits paper, ink spreads)
     - Brief lift (pen leaves paper, repositions)
     - Write 「神」 (second stroke, confident)
     - Settle (ink dries, everything lands)
     - English text fades in
     - Gold line extends
     - Transition out
  ------------------------------------------ */

  const timeline = {
    initialPause: 400,       // Gathering focus before first stroke
    char1Start: 400,         // 「喝」starts writing
    char1Duration: 1000,     // Time for 喝 to fully appear
    penLiftPause: 300,       // Pause between characters (pen lift)
    char2Duration: 900,      // Time for 神 to fully appear (slightly faster, more confident)
    settleTime: 400,         // Ink settling moment
    englishDelay: 200,       // After settle
    subtitleDelay: 350,      // After english
    goldLineDelay: 400,      // After subtitle
    exitDelay: 1200,         // Hold before transition out
  };

  // Calculate cumulative times
  const t = {};
  t.char1 = timeline.initialPause;
  t.char2 = t.char1 + timeline.char1Duration + timeline.penLiftPause;
  t.settle = t.char2 + timeline.char2Duration;
  t.english = t.settle + timeline.settleTime + timeline.englishDelay;
  t.subtitle = t.english + timeline.subtitleDelay;
  t.goldLine = t.subtitle + timeline.goldLineDelay;
  t.exit = t.goldLine + timeline.exitDelay;

  // Step 1: Write 「喝」
  setTimeout(() => {
    if (chars[0]) chars[0].classList.add('writing');
  }, t.char1);

  // Step 2: Write 「神」
  setTimeout(() => {
    if (chars[1]) chars[1].classList.add('writing');
  }, t.char2);

  // Step 3: Show English text
  setTimeout(() => {
    if (englishText) englishText.classList.add('visible');
  }, t.english);

  // Step 4: Show subtitle
  setTimeout(() => {
    if (subtitle) subtitle.classList.add('visible');
  }, t.subtitle);

  // Step 5: Gold line expansion
  setTimeout(() => {
    if (goldLine) goldLine.classList.add('visible');
  }, t.goldLine);

  // Step 6: Exit splash
  setTimeout(() => {
    dismissSplash();
  }, t.exit);

  // Skip button
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      dismissSplash();
    });
  }

  function dismissSplash() {
    if (splash.classList.contains('fade-out')) return;

    splash.classList.add('fade-out');
    document.body.style.overflow = '';
    sessionStorage.setItem('hashen_splash_seen', '1');

    // Trigger hero animations after splash fades
    setTimeout(() => {
      splash.remove();
      triggerHeroAnimations();
    }, 800);
  }

  function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll(
      '.hero-calligraphy-text, .hero-brand-en, .hero-tagline, .hero-buttons'
    );
    heroElements.forEach(el => el.classList.add('animate-in'));
  }
})();

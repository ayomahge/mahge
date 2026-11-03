
const entryScreen = document.getElementById('entryScreen');
const profileScreen = document.getElementById('profileScreen');
const typedText = document.getElementById('typedText');
const scrollCue = document.getElementById('scrollCue');
const moreSection = document.getElementById('moreSection');

const phrase = 'ok is the hardest, istg';

let entered = false;
let animationTimer;

// Type, pause, backspace, and repeat forever.
function runTypewriter() {
  let index = 0;
  let deleting = false;

  function tick() {
    typedText.textContent = phrase.slice(0, index);

    if (!deleting && index < phrase.length) {
      index += 1;
      animationTimer = window.setTimeout(tick, 95);
    } else if (!deleting) {
      deleting = true;
      animationTimer = window.setTimeout(tick, 1150);
    } else if (index > 0) {
      index -= 1;
      animationTimer = window.setTimeout(tick, 48);
    } else {
      deleting = false;
      animationTimer = window.setTimeout(tick, 420);
    }
  }

  tick();
}

// Enter the site when any part of the entry screen is clicked.
function enterSite() {
  if (entered) return;

  entered = true;
  entryScreen.classList.add('leaving');
  profileScreen.classList.add('visible');
  document.body.classList.add('profile-active');
  profileScreen.setAttribute('aria-hidden', 'false');

  window.setTimeout(runTypewriter, 650);
}

entryScreen.addEventListener('click', enterSite);

// Keyboard support for the entry screen.
entryScreen.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    enterSite();
  }
});

// Smoothly scroll down when the scroll prompt is clicked.
scrollCue.addEventListener('click', () => {
  moreSection.scrollIntoView({
    behavior: 'smooth'
  });
});

// Background GIF parallax movement.
let scrollFrame = 0;

window.addEventListener('scroll', () => {
  if (scrollFrame) return;

  scrollFrame = window.requestAnimationFrame(() => {
    const drift = Math.min(window.scrollY * 0.22, 180);

    document.body.style.setProperty(
      '--background-drift',
      `${drift}px`
    );

    scrollFrame = 0;
  });
}, { passive: true });

// Fade in the lower section when it enters the screen.
if ('IntersectionObserver' in window && moreSection) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        moreSection.classList.add('in-view');
        revealObserver.unobserve(moreSection);
      }
    });
  }, {
    threshold: 0.2
  });

  revealObserver.observe(moreSection);
}

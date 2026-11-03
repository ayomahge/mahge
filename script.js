
const entryScreen = document.getElementById("entryScreen");
const profileScreen = document.getElementById("profileScreen");
const scrollCue = document.getElementById("scrollCue");
const typedText = document.getElementById("typedText");
const moreSection = document.getElementById("moreSection");

// Enter website
function enterSite() {
  if (!entryScreen || !profileScreen || document.body.classList.contains("profile-active")) {
    return;
  }

  // Start background music
  const backgroundMusic = document.getElementById("backgroundMusic");

  if (backgroundMusic) {
    backgroundMusic.volume = 0.35;
    backgroundMusic.play().catch((error) => {
      console.log("Music playback was blocked:", error);
    });
  }

  entryScreen.classList.add("leaving");
  document.body.classList.add("profile-active");

  profileScreen.classList.add("visible");
  profileScreen.setAttribute("aria-hidden", "false");

  runTypewriter();
}

entryScreen?.addEventListener("click", enterSite);

entryScreen?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    enterSite();
  }
});

// Subtitle typewriter
const subtitle = "ok is the hardest, istg";
let subtitleIndex = 0;
let deletingSubtitle = false;

function runTypewriter() {
  if (!typedText) return;

  const currentText = subtitle.substring(0, subtitleIndex);
  typedText.textContent = currentText;

  if (!deletingSubtitle && subtitleIndex < subtitle.length) {
    subtitleIndex++;
    setTimeout(runTypewriter, 95);
  } else if (!deletingSubtitle) {
    deletingSubtitle = true;
    setTimeout(runTypewriter, 1800);
  } else if (subtitleIndex > 0) {
    subtitleIndex--;
    setTimeout(runTypewriter, 55);
  } else {
    deletingSubtitle = false;
    setTimeout(runTypewriter, 700);
  }
}

// Animated browser tab title
const tabTitle = "@ayomahge";
let titleIndex = 0;
let deletingTitle = false;

function animateTabTitle() {
  document.title = tabTitle.substring(0, titleIndex);

  if (!deletingTitle && titleIndex < tabTitle.length) {
    titleIndex++;
    setTimeout(animateTabTitle, 180);
  } else if (!deletingTitle) {
    deletingTitle = true;
    setTimeout(animateTabTitle, 1300);
  } else if (titleIndex > 0) {
    titleIndex--;
    setTimeout(animateTabTitle, 100);
  } else {
    deletingTitle = false;
    setTimeout(animateTabTitle, 500);
  }
}

animateTabTitle();

// Scroll cue
scrollCue?.addEventListener("click", () => {
  moreSection?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

// Background movement while scrolling
let scrollTicking = false;

window.addEventListener("scroll", () => {
  if (scrollTicking) return;

  scrollTicking = true;

  window.requestAnimationFrame(() => {
    const drift = Math.min(window.scrollY * 0.16, 180);
    document.body.style.setProperty("--background-drift", `${drift}px`);
    scrollTicking = false;
  });
}, { passive: true });

// Lower section fade-in
if (moreSection && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        moreSection.classList.add("in-view");
      }
    });
  }, { threshold: 0.2 });

  observer.observe(moreSection);
}

// Right-click deterrent
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  showStealMessage();
});

// Message displayed when someone tries to right-click
function showStealMessage() {
  let message = document.getElementById("stealMessage");

  if (!message) {
    message = document.createElement("div");
    message.id = "stealMessage";
    message.textContent = "quit tryna steal my shi";

    Object.assign(message.style, {
      position: "fixed",
      zIndex: "99999",
      left: "50%",
      bottom: "35px",
      transform: "translateX(-50%)",
      padding: "13px 20px",
      background: "rgba(10, 10, 10, 0.92)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: "8px",
      fontFamily: "Space Mono, monospace",
      fontSize: "12px",
      boxShadow: "0 5px 25px rgba(0,0,0,0.5)",
      opacity: "0",
      transition: "opacity 0.25s ease",
      pointerEvents: "none"
    });

    document.body.appendChild(message);
  }

  message.style.opacity = "1";

  clearTimeout(window.stealMessageTimeout);
  window.stealMessageTimeout = setTimeout(() => {
    message.style.opacity = "0";
  }, 1800);
}

// Console warning
console.log(
  "%cquit tryna steal my shi",
  "color: white; background: #111; font-size: 18px; font-weight: bold; padding: 12px 18px; border-radius: 6px;"
);

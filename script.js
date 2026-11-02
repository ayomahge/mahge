const entryScreen = document.getElementById('entryScreen');
const profileScreen = document.getElementById('profileScreen');
const enterButton = document.getElementById('enterButton');
const typedText = document.getElementById('typedText');
const scrollCue = document.getElementById('scrollCue');
const phrase = 'ok is the hardest, istg';
let typingStarted = false;

function typePhrase() {
  if (typingStarted) return;
  typingStarted = true;
  let index = 0;
  const typeNext = () => {
    typedText.textContent = phrase.slice(0, index);
    if (index < phrase.length) {
      index += 1;
      window.setTimeout(typeNext, index < 3 ? 190 : 82);
    }
  };
  typeNext();
}

enterButton.addEventListener('click', () => {
  entryScreen.classList.add('leaving');
  profileScreen.classList.add('visible');
  profileScreen.setAttribute('aria-hidden', 'false');
  window.setTimeout(typePhrase, 650);
});

scrollCue.addEventListener('click', () => {
  document.getElementById('moreSection').scrollIntoView({ behavior: 'smooth' });
});

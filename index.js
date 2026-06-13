/* ===== PÉTALAS ===== */
function createPetals() {
  const container = document.getElementById('petals');
  if (!container) return;
  const symbols = ['🌸', '🌹', '❤️', '🌷'];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('span');
    el.className = 'petal';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
    el.style.animationDuration = (8 + Math.random() * 12) + 's';
    el.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(el);
  }
}

/* ===== BOTÃO NÃO ===== */
let noCount = 0;
const messages = [
  'Tem certeza? 🥺',
  'Vai mesmo não? 😢',
  'Pensa bem...',
  'Último aviso! 🌹',
  'Ei, volta aqui!',
  'Não foge não! 😅',
  'Você vai se arrepender!',
  'Olha o botão fugindo hehe',
  'Impossível clicar em mim 😜',
  'Desiste e clica no Sim! 💌',
];

function moveNoButton() {
  const btn = document.getElementById('btnNo');
  if (!btn) return;

  const btnW = btn.offsetWidth  || 80;
  const btnH = btn.offsetHeight || 44;
  const margin = 16;

  const maxX = window.innerWidth  - btnW - margin;
  const maxY = window.innerHeight - btnH - margin;

  const x = Math.floor(margin + Math.random() * maxX);
  const y = Math.floor(margin + Math.random() * maxY);

  btn.classList.add('escaped');
  btn.style.left = x + 'px';
  btn.style.top  = y + 'px';

  noCount++;
  const countEl = document.getElementById('noCount');
  if (countEl) {
    countEl.textContent = messages[Math.min(noCount - 1, messages.length - 1)];
  }
}

/* ===== MÚSICA ===== */
let musicPlaying = false;

function startMusic() {
  const audio = document.getElementById('musica');
  if (!audio) return;

  // Pega o nome do arquivo e exibe no player
  const src = audio.getAttribute('src') || '';
  const nome = src.split('/').pop().replace(/\.[^.]+$/, '');
  const titleEl = document.getElementById('vinylTitle');
  if (titleEl) titleEl.textContent = nome || 'música';

  audio.play().then(() => {
    musicPlaying = true;
  }).catch(() => {
    // autoplay bloqueado — silencioso
  });
}

function toggleMusic() {
  const audio  = document.getElementById('musica');
  const disc   = document.getElementById('vinylDisc');
  const btn    = document.getElementById('vinylBtn');
  const status = document.getElementById('vinylStatus');
  if (!audio) return;

  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
    disc.classList.add('paused');
    btn.textContent = '▶';
    if (status) status.textContent = 'pausado';
  } else {
    audio.play();
    musicPlaying = true;
    disc.classList.remove('paused');
    btn.textContent = '⏸';
    if (status) status.textContent = 'tocando ♪';
  }
}

/* ===== ABRIR CARTA ===== */
function openLetter() {
  const gate = document.getElementById('gate');
  const main = document.getElementById('main');

  gate.classList.add('hide');
  setTimeout(() => {
    gate.style.display = 'none';
    main.style.display = 'block';
    createPetals();
    startMusic();
  }, 600);
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  const btnNo = document.getElementById('btnNo');
  if (btnNo) {
    btnNo.addEventListener('mouseenter', moveNoButton);
    btnNo.addEventListener('touchstart', (e) => {
      e.preventDefault();
      moveNoButton();
    }, { passive: false });
  }
});
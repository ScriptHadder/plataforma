// Menu mobile
const hamburguer = document.getElementById('hamburguer');
const navMenu = document.querySelector('.nav-menu');
const btnHamburguer = document.getElementById('hamburguer');
const menu = document.getElementById('menu');

if (hamburguer && navMenu) {
  hamburguer.addEventListener('click', () => {
    hamburguer.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

btnHamburguer.addEventListener('click', () => {
    menu.classList.toggle('ativo');
});

// Contador (stats)
document.querySelectorAll('.stat-item h4').forEach(el => {
  const target = +el.textContent.replace('+', '');
  el.textContent = '0';
  let count = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    count += increment;
    if(count >= target) {
      el.textContent = target + (el.textContent.includes('+') ? '+' : '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(count);
    }
  }, 20);
});

// Submissão formulário
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  // Pode integrar com WhatsApp API ou enviar por backend
  alert('Obrigado! Entraremos em contato em breve.');
  e.target.reset();
});

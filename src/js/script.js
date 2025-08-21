// Menu mobile
const hamburguer = document.getElementById('hamburguer');
const navMenu = document.querySelector('.nav-menu');

if (hamburguer && navMenu) {
  hamburguer.addEventListener('click', () => {
    hamburguer.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// Swiper equipe (coverflow)
const teamSwiper = new Swiper(".teamSwiper", {
  effect: "coverflow", grabCursor: true, centeredSlides: true, slidesPerView: "auto",
  coverflowEffect: { rotate:0, stretch:0, depth:150, modifier:1, slideShadows:false },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
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

// Quando clica em uma imagem
document.querySelectorAll('.imagem-clicavel').forEach(img => {
img.addEventListener('click', function () {
    const descricao = this.getAttribute('data-descricao');
    document.getElementById('descricao-texto').textContent = descricao;
    document.getElementById('janela-descricao').style.display = 'block';
});
});

// Fecha a descrição
function fecharDescricao() {
document.getElementById('janela-descricao').style.display = 'none';
}

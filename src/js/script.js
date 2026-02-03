// Menu mobile
const hamburguer = document.getElementById('hamburguer');
const navMenu = document.querySelector('.nav-menu');
const menu = document.getElementById('menu');

if (hamburguer && navMenu) {
  hamburguer.addEventListener('click', () => {
    hamburguer.classList.toggle('active');
    navMenu.classList.toggle('active');
    menu.classList.toggle('ativo');
  });
}

// Advanced Services Section Animations
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll) if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });
  }
  
  // Enhanced Services Animations
  const servicesSection = document.querySelector('.services-section');
  if (servicesSection) {
    // Intersection Observer for services section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger typewriter effect
          const typewriterText = entry.target.querySelector('.typewriter-text');
          if (typewriterText) {
            typewriterText.classList.add('active');
          }
          
          // Animate feature items sequentially
          const featureItems = entry.target.querySelectorAll('.feature-item');
          featureItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.animation = `slideInFromLeft 0.6s ease-out ${index * 0.1}s both`;
            }, 500);
          });
          
          // Animate specialty tags
          const specialtyTags = entry.target.querySelectorAll('.specialty-tag');
          specialtyTags.forEach((tag, index) => {
            setTimeout(() => {
              tag.style.animation = `bounceIn 0.5s ease-out ${index * 0.1}s both`;
            }, 1000);
          });
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(servicesSection);
  }
  
  // Enhanced hover effects for specialty tags
  const specialtyTags = document.querySelectorAll('.specialty-tag');
  specialtyTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.05) rotate(2deg)';
    });
    
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
  });
  
  // Particle system for floating elements
  function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(99, 102, 241, 0.6);
      border-radius: 50%;
      pointer-events: none;
      left: ${Math.random() * 100}%;
      top: 100%;
      animation: floatUp ${3 + Math.random() * 4}s linear infinite;
    `;
    container.appendChild(particle);
    
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 7000);
  }
  
  // Generate particles
  const servicesContent = document.querySelector('.services-content');
  if (servicesContent) {
    setInterval(() => {
      if (document.visibilityState === 'visible') {
        createParticle(servicesContent);
      }
    }, 2000);
  }
});

// Add CSS animations programmatically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3) translateY(50px);
    }
    50% {
      transform: scale(1.05) translateY(-10px);
    }
    70% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  
  @keyframes floatUp {
    0% {
      opacity: 0;
      transform: translateY(0);
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(-200px);
    }
  }
  
  .floating-particle {
    z-index: 1;
  }
`;
document.head.appendChild(style);

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
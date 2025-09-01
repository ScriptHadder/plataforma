// Contador animado
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;

    const increment = target / 80;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCount, 25);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
});

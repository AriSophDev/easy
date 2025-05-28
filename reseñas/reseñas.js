document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('reseñasSection');
  if (!section) return;
  const bubbles = section.querySelectorAll('.reseña-bubble');
  let inView = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target !== section) return;
      if (entry.isIntersecting && !inView) {
        section.classList.add('in');
        section.classList.remove('exit');
        bubbles.forEach(b => {
          b.classList.add('in');
          b.classList.remove('exit');
        });
        inView = true;
      } else if (!entry.isIntersecting && inView) {
        section.classList.remove('in');
        section.classList.add('exit');
        bubbles.forEach(b => {
          b.classList.remove('in');
          b.classList.add('exit');
        });
        inView = false;
      }
    });
  }, { threshold: 0.5 });

  observer.observe(section);
});
const cursor = document.querySelector('.cursor');

window.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

window.addEventListener('scroll', () => {

  const cards = document.querySelectorAll('.card');

  cards.forEach((card, index) => {

    const speed = window.scrollY * 0.03;

    card.style.transform = `translateY(${speed * (index + 1)}px)`;
  });
});

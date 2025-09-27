document.getElementById('year').textContent = new Date().getFullYear();

window.addEventListener('load', () => {
  const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' }});
  tl.from('.logo', { y: -20, opacity: 0 })
    .from('#hero h1', { y: 30, opacity: 0 }, 0.1)
    .from('#hero p', { y: 30, opacity: 0 }, 0.2)
    .from('#cta', { scale: 0.8, opacity: 0 }, 0.3);

  const btn = document.getElementById('cta');
  btn.addEventListener('pointerenter', () => gsap.to(btn, { y: -2, duration: 0.15 }));
  btn.addEventListener('pointerleave', () => gsap.to(btn, { y: 0, duration: 0.15 }));
  btn.addEventListener('click', () => {
    gsap.fromTo('#hero', { scale: 0.98 }, { scale: 1, duration: 0.3, ease: 'power2.out' });
    if (location.pathname !== '/') location.href = '/';
  });
});

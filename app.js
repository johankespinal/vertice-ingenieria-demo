(() => {
  'use strict';
  const menu = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Abrir menú');
    }));
  }
  const sections = ['inicio', 'firma', 'servicios', 'metodo', 'proyectos', 'contacto'];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        nav?.querySelectorAll('a[href^="#"]').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, {rootMargin:'-12% 0px -65% 0px', threshold:0});
    sections.forEach(id => {const el = document.getElementById(id); if (el) observer.observe(el);});
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (form && feedback) form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.elements.namedItem('nombre');
    const email = form.elements.namedItem('email');
    const area = form.elements.namedItem('area');
    const message = form.elements.namedItem('mensaje');
    if (!name.value.trim() || !email.value.trim() || !email.validity.valid || !area.value || !message.value.trim()) {
      feedback.className = 'error';
      feedback.textContent = 'Completa todos los campos y utiliza un correo válido.';
      return;
    }
    feedback.className = 'success';
    feedback.textContent = '¡Formulario de muestra completado! Los datos no se enviaron ni almacenaron.';
    form.reset();
  });
})();
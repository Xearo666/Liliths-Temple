// Rok w stopce
document.getElementById('year').textContent = new Date().getFullYear();

// Płynne odsłanianie sekcji
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }
  });
}, {threshold: .16});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Płynny scroll dla kotwic
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    if(id.length>1){
      const el = document.querySelector(id);
      if(!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      history.pushState(null, '', id);
    }
  })
});

// Prosty, lokalny handler formularza (na produkcji: Netlify Forms / Formspree)
function sendFake(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const msg  = document.getElementById('msg').value.trim();
  const out  = document.getElementById('formStatus');
  if(!name || !msg){ out.textContent = 'Uzupełnij pola.'; return; }
  out.textContent = 'Dziękuję. Wrócę z odpowiedzią niezwłocznie.';
  e.target.reset();
}
window.sendFake = sendFake;
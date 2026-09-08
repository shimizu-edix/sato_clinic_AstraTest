const menu=document.querySelector('#mobile-menu'),toggle=document.querySelector('.menu-toggle');
toggle?.addEventListener('click',()=>menu.showModal());
menu?.querySelector('[data-close]').addEventListener('click',()=>menu.close());
menu?.addEventListener('close',()=>toggle.focus());
addEventListener('scroll',()=>document.querySelector('.site-header').classList.toggle('scrolled',scrollY>15),{passive:true});
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('reveal-enter');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.section').forEach(s=>io.observe(s));}
if(document.querySelector('#app')||document.querySelector('[data-news-list]')||document.querySelector('#news-detail'))import('./pages/app.js').catch(()=>{const app=document.querySelector('#app');if(app)app.innerHTML='<div class="error-box">この画面を読み込めませんでした。ページを再読み込みしてください。</div>';});

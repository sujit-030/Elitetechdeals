// Lightweight interactivity: menu, modals, toasts, forms
document.addEventListener('DOMContentLoaded',()=>{
  const menuBtns = document.querySelectorAll('.menu-btn');
  const nav = document.getElementById('navLinks');
  menuBtns.forEach(btn=>btn.addEventListener('click',()=>{if(nav)nav.classList.toggle('active')}));

  // Modal helpers
  window.openModal = function(id){const m=document.getElementById(id);if(!m)return; m.style.display='flex'; m.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'}
  window.closeModal = function(id){const m=document.getElementById(id);if(!m)return; m.style.display='none'; m.setAttribute('aria-hidden','true'); document.body.style.overflow='auto'}
  window.addEventListener('click',(e)=>{if(e.target.classList && e.target.classList.contains('modal')){e.target.style.display='none';document.body.style.overflow='auto'}})

  // Toast
  window.showToast = function(msg, d=3000){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),d)}

  // Forms
  const contactForm = document.getElementById('contactForm');
  if(contactForm)contactForm.addEventListener('submit',(e)=>{e.preventDefault();showToast('Message sent. We will review your proposal.');closeModal('contactModal');contactForm.reset()});
  const newsletter = document.getElementById('newsletterForm');
  if(newsletter)newsletter.addEventListener('submit',(e)=>{e.preventDefault();showToast('Thanks for subscribing! Check your email.');newsletter.reset()});
  const contactPage = document.getElementById('contactPageForm');
  if(contactPage)contactPage.addEventListener('submit',(e)=>{e.preventDefault();showToast('Thanks — we will reply shortly.');contactPage.reset()});
});

// --- Affiliate link wiring ---
(function(){
  // load affiliate config if present
  const cfg = window.affiliateConfig || { utm:{source:'elitetech',medium:'affiliate',campaign:'deal'}, platforms:{} };

  function appendParams(url, params){
    try{
      const u = new URL(url, window.location.origin);
      Object.keys(params).forEach(k=>{
        if(params[k]) u.searchParams.set(k, params[k]);
      });
      return u.toString();
    }catch(e){
      // fallback: naive append
      const sep = url.includes('?') ? '&' : '?';
      const q = Object.keys(params).map(k=>`${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
      return url + sep + q;
    }
  }

  function buildAffiliateUrl(base, platform, campaignOverride){
    const params = {};
    // add affiliate id param if available
    if(cfg.platforms && cfg.platforms[platform] && cfg.platforms[platform].param && cfg.platforms[platform].id){
      params[cfg.platforms[platform].param] = cfg.platforms[platform].id;
    }
    // add UTM params
    params.utm_source = cfg.utm && cfg.utm.source ? cfg.utm.source : 'elitetech';
    params.utm_medium = cfg.utm && cfg.utm.medium ? cfg.utm.medium : 'affiliate';
    params.utm_campaign = campaignOverride || (cfg.utm && cfg.utm.campaign ? cfg.utm.campaign : 'deal');
    return appendParams(base, params);
  }

  // Replace buy links annotated with data-aff-url
  function wireAffiliateLinks(){
    document.querySelectorAll('a.buy-btn[data-aff-url]').forEach(a => {
      const base = a.getAttribute('data-aff-url');
      const platform = a.getAttribute('data-aff-platform');
      const campaign = a.getAttribute('data-aff-campaign') || undefined;
      const href = buildAffiliateUrl(base, platform, campaign);
      a.setAttribute('href', href);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });
  }

  // run on load and also expose to window for dynamic updates
  try{ wireAffiliateLinks(); }catch(e){}
  window.wireAffiliateLinks = wireAffiliateLinks;
})();

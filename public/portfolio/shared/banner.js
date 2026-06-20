(() => {
  const params = new URLSearchParams(location.search);
  const refParam = params.get('ref');
  const langParam = params.get('lang');

  if (refParam === 'smws') sessionStorage.setItem('smws_ref', 'smws');
  if (langParam === 'ar') sessionStorage.setItem('smws_lang', 'ar');

  const isInternal = refParam === 'smws' || sessionStorage.getItem('smws_ref') === 'smws';
  const isArabic   = langParam === 'ar'   || sessionStorage.getItem('smws_lang') === 'ar';

  const externalBanner = document.getElementById('banner-external');
  const internalBanner = document.getElementById('banner-internal');

  const alreadySeen = sessionStorage.getItem('smws_banner_seen');
  sessionStorage.setItem('smws_banner_seen', '1');

  function showBanner(el) {
    if (alreadySeen) {
      el.style.animation = 'none';
      el.style.opacity = '1';
    }
    el.style.display = 'flex';
  }

  if (!isInternal) {
    if (externalBanner) showBanner(externalBanner);
    if (internalBanner) internalBanner.remove();
    return;
  }

  if (internalBanner) showBanner(internalBanner);
  if (externalBanner) externalBanner.remove();

  if (isArabic && internalBanner) {
    internalBanner.setAttribute('dir', 'rtl');
    const backText = internalBanner.querySelector('.back-text');
    const ctaText  = internalBanner.querySelector('.cta-text');
    const backIcon = internalBanner.querySelector('.back-icon');
    const ctaIcon  = internalBanner.querySelector('.cta-icon');
    const ctaLink  = internalBanner.querySelector('.banner-cta');
    if (backText) backText.textContent = 'العودة';
    if (ctaText)  ctaText.textContent  = 'احصل على موقعك';
    if (backIcon) backIcon.style.transform = 'rotate(180deg)';
    if (ctaIcon)  ctaIcon.style.transform  = 'rotate(180deg)';
    if (ctaLink)  ctaLink.href = 'https://smwebdesign.studio/ar#contact';
  }

  const backBtn = internalBanner?.querySelector('.banner-back');
  if (backBtn) backBtn.addEventListener('click', () => window.close());
})();

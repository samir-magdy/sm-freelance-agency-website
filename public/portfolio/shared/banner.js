(() => {
  // ── Visitor origin detection ──────────────────────────────────────────────

  const params = new URLSearchParams(location.search);

  const getReferrerHostname = () => {
    try {
      return document.referrer ? new URL(document.referrer).hostname : '';
    } catch {
      return '';
    }
  };

  const TRUSTED_DOMAINS = ['smwebdesign.studio', 'samirmagdy.com', 'localhost'];
  const referrerHostname = getReferrerHostname();

  const isInternalVisitor =
    params.get('ref') === 'smws' ||
    sessionStorage.getItem('smws-internal') === '1' ||
    TRUSTED_DOMAINS.some(
      domain => referrerHostname === domain || referrerHostname.endsWith(`.${domain}`)
    );

  const isArabic =
    params.get('lang') === 'ar' ||
    sessionStorage.getItem('smws-lang') === 'ar' ||
    document.referrer.includes('/ar');

  // ── DOM references ────────────────────────────────────────────────────────

  const backButton    = document.querySelector('.banner-back');
  const brandElement  = document.querySelector('.banner-brand');
  const bannerSection = document.querySelector('.demo-banner');

  // ── External visitor: hide back button, keep branding ─────────────────────

  if (!isInternalVisitor) {
    backButton?.style.setProperty('display', 'none');
    return;
  }

  // ── Internal visitor: inject styles ──────────────────────────────────────

  const style = document.createElement('style');
  style.textContent = `
    .banner-back, .banner-cta {
      color: rgba(255, 255, 255, 0.78) !important;
      transition: color 0.25s ease;
    }
    .banner-back:hover, .banner-cta:hover {
      color: #fff !important;
    }
    .banner-back svg {
      transition: transform 0.25s ease;
    }
    .banner-back:hover svg {
      transform: translateX(-4px);
    }
    .banner-cta svg {
      transition: transform 0.25s ease;
      transform: scaleX(-1);
    }
    .banner-cta:hover svg {
      transform: scaleX(-1) translateX(-4px);
    }

    @media (min-width: 1024px) {
      .banner-back, .banner-cta {
        padding-left: 18rem !important;
        padding-right: 18rem !important;
      }
    }

    @media (max-width: 1023px) {
      .demo-banner.is-ar .banner-back,
      .demo-banner.is-ar .banner-cta {
        font-size: 1.1rem !important;
      }
    }

    .demo-banner.is-ar .banner-back svg            { transform: scaleX(-1); }
    .demo-banner.is-ar .banner-back:hover svg      { transform: scaleX(-1) translateX(-4px); }
    .demo-banner.is-ar .banner-cta svg             { transform: none; }
    .demo-banner.is-ar .banner-cta:hover svg       { transform: translateX(-4px); }
    .demo-banner.is-ar .banner-back,
    .demo-banner.is-ar .banner-cta                 { flex-direction: row-reverse; }
  `;
  document.head.appendChild(style);

  // ── Hide studio branding ──────────────────────────────────────────────────

  if (brandElement) brandElement.style.display = 'none';

  // ── Style, localise, and wire up the back button ─────────────────────────

  if (backButton) {
    Object.assign(backButton.style, {
      position: 'static',
      padding:  '0.5rem 0.9rem',
      fontSize: '1.1em',
    });

    const textNode = [...backButton.childNodes].find(
      node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
    );
    if (textNode) textNode.textContent = isArabic ? ' العودة' : ' Back';
    if (isArabic) backButton.style.fontSize = '1.25em';

    backButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.close();
    });
  }

  // ── Build and append the CTA link ────────────────────────────────────────

  if (bannerSection) {
    Object.assign(bannerSection.style, {
      justifyContent:    'flex-start',
      paddingInlineStart: '0.5rem',
      paddingInlineEnd:   '0.5rem',
    });

    const ctaLink = document.createElement('a');
    ctaLink.href      = `https://smwebdesign.studio/${isArabic ? 'ar' : 'en'}#contact`;
    ctaLink.className = 'banner-cta';

    const arrowSvg = backButton?.querySelector('svg')?.cloneNode(true) ?? null;
    ctaLink.append(isArabic ? 'احصل على موقعك ' : 'Get a Site Like This ');
    if (arrowSvg) ctaLink.append(arrowSvg);

    Object.assign(ctaLink.style, {
      marginLeft:     'auto',
      padding:        '0.5rem 0.9rem',
      textDecoration: 'none',
      fontSize:       '1.1em',
      whiteSpace:     'nowrap',
      letterSpacing:  '0.02em',
      display:        'inline-flex',
      alignItems:     'center',
      gap:            '0.6em',
    });

    bannerSection.appendChild(ctaLink);

    // Arabic layout: flip positions, swap arrow sides
    if (isArabic) {
      Object.assign(bannerSection.style, {
        flexDirection:  'row-reverse',
        justifyContent: 'space-between',
      });
      ctaLink.style.marginLeft = '0';
      bannerSection.classList.add('is-ar');
    }
  }
})();

'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function PageVisibility() {
  const pathname = usePathname();

  useEffect(() => {
    const showPage = () => {
      document.body.classList.remove('js-cloak');
      document.body.classList.add('page-loaded');
    };

    // 1. Handle Client-side Navigation (Language Toggle)
    // If the document is already 'complete', it means we are navigating 
    // internally. We should show the page immediately.
    if (document.readyState === 'complete') {
      showPage();
      return; 
    }

    // 2. Handle Initial Hard Load
    // If we reach here, the page is still loading assets.
    window.addEventListener('DOMContentLoaded', showPage);
    
    // Safety fallback (3s)
    const timeout = setTimeout(showPage, 3000);

    return () => {
      window.removeEventListener('DOMContentLoaded', showPage);
      clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}
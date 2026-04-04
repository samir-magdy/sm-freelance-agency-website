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

    // Trigger immediately on mount/path change instead of waiting for DOM events
    showPage();

  }, [pathname]);

  return null;
}
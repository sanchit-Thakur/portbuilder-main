'use client';

import { useEffect } from 'react';
import PortfolioRenderer from '@/components/portfolio/PortfolioRenderer';

export default function PortfolioClient({ data, username }) {
  // Track page view
  useEffect(() => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        referrer: document.referrer || '',
        userAgent: navigator.userAgent || '',
      }),
    }).catch(() => {}); // silently fail
  }, [username]);

  return <PortfolioRenderer data={data} />;
}

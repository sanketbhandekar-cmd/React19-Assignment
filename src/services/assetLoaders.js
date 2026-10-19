import { preload, preinit, preconnect, prefetchDNS } from 'react-dom';

/**
 * React 19 Asset Loading APIs Demonstration
 *
 * React 19 introduces native asset loading APIs directly in 'react-dom', allowing
 * developers to programmatically instruct the browser to optimize resource discovery
 * and download lifecycle.
 */
export function initializeAssetOptimizations() {
  // 1. preconnect()
  // Establishes an early TCP/TLS handshake with the Unsplash image CDN.
  // This reduces latency when product cards render their imagery.
  preconnect('https://images.unsplash.com');

  // 2. prefetchDNS()
  // Performs a lightweight DNS resolution for Google Fonts domain ahead of time.
  prefetchDNS('https://fonts.googleapis.com');
  prefetchDNS('https://fonts.gstatic.com');

  // 3. preload()
  // Instructs the browser to immediately begin downloading the primary hero product image
  // so it is already available in browser cache when the image element mounts.
  preload(
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    { as: 'image' }
  );

  // 4. preinit()
  // Downloads and initializes the font stylesheet immediately.
  preinit(
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
    { as: 'style' }
  );
}

'use client';

import { useEffect } from 'react';

export default function PWAProvider() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register the service worker
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered successfully:', registration);

          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute
        })
        .catch((error) => {
          console.log('❌ Service Worker registration failed:', error);
        });

      // Listen for controller change (app update)
      navigator.serviceWorker.addEventListener('controller', () => {
        console.log('🔄 New service worker activated');
      });

      // Handle messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_ACTIVATED') {
          console.log('📱 PWA is ready for offline use');
        }
      });
    }
  }, []);

  return null;
}

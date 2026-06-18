# PWA Setup Guide

Your app is now configured as a Progressive Web App! Here's what's been set up:

## ✅ What's Configured

1. **Service Worker** (`public/sw.js`) - Caches app shell and enables offline functionality
2. **Web Manifest** (`public/manifest.json`) - Allows installation on home screens
3. **PWA Meta Tags** - Apple iOS support, theme colors, and app configuration
4. **Manual Caching** - Smart caching for assets and API calls
5. **PWA Provider** - Automatic service worker registration on app load

## 📱 Installation

Users can now:
- **Desktop/Chrome**: Click the "Install" button in the address bar
- **Mobile/iOS**: Use "Share" → "Add to Home Screen"
- **Mobile/Android**: Press menu → "Install app"

## 🎨 Required: App Icons

The PWA needs icons in the `public/` folder. Create or download the following:

```
public/
  icon-192.png           # 192x192 PNG icon
  icon-192-maskable.png  # 192x192 PNG (maskable format)
  icon-512.png           # 512x512 PNG icon
  icon-512-maskable.png  # 512x512 PNG (maskable format)
  screenshot-192.png     # 192x192 screenshot
  screenshot-512.png     # 512x512 screenshot
```

### Quick Icon Generation Options:

1. **Using Online Tools**:
   - https://www.favicon-generator.org/ - Generate icons from a logo
   - https://www.pwabuilder.com/imageGenerator - PWA-specific icons

2. **Using ImageMagick** (if installed):
   ```bash
   convert logo.png -resize 192x192 public/icon-192.png
   convert logo.png -resize 512x512 public/icon-512.png
   ```

3. **Using your design tool**:
   - Export as PNG at 192x192 and 512x512 sizes
   - For maskable icons, ensure important content is within the center safe zone

### Safe Zone for Maskable Icons:
- Maskable icons will be cropped to circles/shapes on some devices
- Keep important content within the center 40% of the image
- Use solid backgrounds that extend to edges

## 🚀 Features Enabled

### Offline Support
- **Cache-first strategy** for pages and static assets
- **Network-first strategy** for API calls with fallback to cache
- Graceful fallback when offline

### Shortcuts (Web App Menu)
Users can create shortcuts to:
- Get a lunch suggestion
- Add a new place

### Install Prompt
- Auto-install prompts on compatible browsers
- Standalone app mode (no browser chrome)
- Custom splash screens

## 🔄 Caching Strategy

```
Static Assets & Pages
  └─ Cache First → Network fallback

API Routes (/api/*)
  └─ Network First → Cache fallback
```

## 📝 Files Added/Modified

### New Files:
- `public/manifest.json` - Web app manifest
- `public/sw.js` - Service worker
- `components/PWAProvider.tsx` - Service worker registration component
- `public/icon-placeholder.svg` - Placeholder icon for generation
- `generate-icons.sh` / `generate-icons.bat` - Icon generation helpers

### Modified Files:
- `app/layout.tsx` - Added viewport export and PWA meta tags
- `tsconfig.json` - Updated TypeScript configuration
- `next.config.js` - Kept simple (no additional PWA package)

## 🧪 Testing Your PWA

1. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

2. **Chrome DevTools**:
   - Open DevTools → Application tab
   - Check Service Workers, Cache Storage, and Manifest

3. **Lighthouse Audit**:
   - DevTools → Lighthouse
   - Run PWA audit to verify all requirements

4. **Installation Test**:
   - Wait a few seconds, look for install prompt
   - Try installing on home screen

## 📝 Manifest Details

Located in `public/manifest.json`:
- App name and short name
- Display mode (standalone)
- Theme colors
- App shortcuts
- Icons and screenshots

## 🔒 Important Notes

- Service Worker is registered automatically by `PWAProvider` component
- PWA features work best when served over **HTTPS** (required in production)
- Service Worker will cache successful API responses for offline access
- Offline API requests return a 503 error with "Offline" message

## 🐛 Troubleshooting

**App won't install?**
- Ensure served over HTTPS (required for PWA)
- Check manifest.json is accessible at `/manifest.json`
- Verify icons exist in public/ folder
- Check browser console for service worker registration errors

**Service Worker not updating?**
- Clear site data in browser settings
- Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- Check DevTools → Application → Service Workers

**Offline doesn't work?**
- Check DevTools → Application → Cache Storage
- Ensure API responses have proper status codes
- Test in DevTools offline mode (DevTools → Network → Offline)

## 📚 Resources

- [MDN PWA Documentation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Builder](https://www.pwabuilder.com/)
- [Next.js App Router](https://nextjs.org/docs/app)

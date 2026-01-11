# PWA Installation Setup

The app now includes Progressive Web App (PWA) functionality with an install prompt.

## What's Included

1. **manifest.json** - App manifest file with app metadata
2. **sw.js** - Service worker for offline functionality
3. **InstallPrompt Component** - Custom install prompt that appears to users

## Icon Files Required

For the PWA to work fully, you need to add icon files to the `public` folder:

- `public/icon-192.png` - 192x192 pixels
- `public/icon-512.png` - 512x512 pixels

### Creating Icons

You can create icons using:
1. Online tools like [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Image editing software (GIMP, Photoshop, etc.)
3. Or use an SVG converter

The icons should represent your app brand/logo.

### Temporary Solution

Until you add custom icons, you can:
1. Create simple colored square icons
2. Use a favicon generator website
3. The install prompt will still work, but without custom icons

## How It Works

1. When a user visits the site (on supported browsers), the browser checks for PWA installation criteria
2. If criteria are met, the `beforeinstallprompt` event fires
3. Our custom InstallPrompt component shows a friendly popup after 3 seconds
4. User can click "Install" to add the app to their device
5. The app will work offline and appear like a native app

## Supported Browsers

- Chrome (Desktop & Android)
- Edge (Desktop & Android)
- Safari (iOS - manual install)
- Samsung Internet

## Testing

1. Open the app in Chrome/Edge
2. Open DevTools (F12)
3. Go to Application tab > Manifest
4. Check for any errors
5. The install prompt should appear after a few seconds

## Notes

- The prompt shows once per session (stored in sessionStorage)
- If the app is already installed, the prompt won't show
- The service worker enables offline functionality and caching


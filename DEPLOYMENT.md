# Deployment Guide

## GitHub Pages Deployment

To deploy this Vue.js application to GitHub Pages:

1. Install `gh-pages` package:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json` scripts:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Update `vite.config.js` for GitHub Pages:
```javascript
export default defineConfig({
  base: '/ashishcomputers-frontend/', // Replace with your repo name
  // ... other config
})
```

4. Deploy:
```bash
npm run deploy
```

## Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

## Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Vue.js settings
3. Deploy!

## Environment Variables

For production deployment, make sure to set:
- `VITE_API_BASE_URL` - Your backend API URL
- Any other environment-specific variables

## Build Optimization

For production builds:
```bash
npm run build
```

The optimized files will be in the `dist/` directory.

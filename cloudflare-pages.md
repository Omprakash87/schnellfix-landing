# Cloudflare Pages Deployment Guide

## Important Considerations

### 1. Build Configuration
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (root of repository)

### 2. Node.js Version
Cloudflare Pages supports Node.js versions. Recommended:
- Node.js 18.x or 20.x (LTS versions)
- Specify in `.nvmrc` or `.node-version` file (optional but recommended)

### 3. Environment Variables
Currently, no environment variables are required. If you add any:
- Go to Cloudflare Pages dashboard → Your project → Settings → Environment Variables
- Add variables for Production, Preview, and Branch preview deployments

### 4. Build Settings
- **Framework preset**: Vite (auto-detected)
- **Build command**: `npm run build`
- **Output directory**: `dist`

### 5. Performance Optimizations
The project is already optimized with:
- ✅ Vite for fast builds
- ✅ Code splitting
- ✅ Optimized assets
- ✅ GSAP animations use `will-change` and `transform` for GPU acceleration

### 6. Routing
- Single-page application (SPA) with client-side routing
- Cloudflare Pages handles this automatically
- No additional routing configuration needed

### 7. Caching Headers
Cloudflare Pages automatically handles caching for static assets. For optimal performance:
- Static assets: Long-term caching (1 year)
- HTML: No cache (always fresh)

### 8. Deployment Steps

#### Option 1: Connect GitHub Repository (Recommended)
1. Go to Cloudflare Dashboard → Pages
2. Click "Create a project"
3. Connect your GitHub account
4. Select `Omprakash87/schnellfix-landing`
5. Configure build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Click "Save and Deploy"

#### Option 2: Deploy via Wrangler CLI
```bash
npm install -g wrangler
wrangler pages deploy dist --project-name=schnellfix-landing
```

### 9. Custom Domain Setup
1. In Cloudflare Pages project settings
2. Go to "Custom domains"
3. Add your domain
4. Cloudflare will automatically configure DNS

### 10. Preview Deployments
- Every pull request automatically gets a preview deployment
- Branch deployments for feature branches
- Easy to test before merging

### 11. Build Time Considerations
- Build time: ~5-15 seconds (typical)
- Cold start: First build may take longer
- Build cache: Cloudflare caches `node_modules` for faster subsequent builds

### 12. Known Issues & Solutions

#### Issue: Build fails with memory errors
**Solution**: Add to `package.json`:
```json
"scripts": {
  "build": "NODE_OPTIONS='--max-old-space-size=4096' tsc -b && vite build"
}
```

#### Issue: 404 errors on direct page access
**Solution**: Not applicable (SPA with no client-side routes)

#### Issue: Assets not loading
**Solution**: Ensure `dist` folder is correctly deployed and assets use relative paths

### 13. Monitoring
- Cloudflare Analytics available in dashboard
- Real-time deployment logs
- Build success/failure notifications

### 14. Production Checklist
- [x] Build command configured
- [x] Output directory set to `dist`
- [x] No hardcoded localhost URLs
- [x] Assets use relative paths
- [x] Environment variables configured (if any)
- [x] Custom domain configured (optional)
- [x] SSL certificate auto-provisioned by Cloudflare

### 15. Performance Tips
1. Enable Cloudflare CDN (automatic with Pages)
2. Enable Auto Minify in Cloudflare settings
3. Enable Brotli compression
4. Use Cloudflare's image optimization (if adding images later)

## Quick Deploy Command
```bash
# After connecting GitHub, deployments are automatic
# Manual deploy via Wrangler:
wrangler pages deploy dist --project-name=schnellfix-landing
```

## Support
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages/
- Vite Deployment Guide: https://vitejs.dev/guide/static-deploy.html


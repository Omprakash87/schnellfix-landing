# SchnellFix Landing Page

A modern, professional landing page for SchnellFix with innovative animations and interactive elements.

Built with React, TypeScript, Vite, and GSAP animations.

## 🚀 Features

- **Professional Animations**: Smooth, elegant animations using GSAP
- **Interactive Elements**: Magnetic fields, parallax effects, and creative hover interactions
- **Responsive Design**: Fully responsive across all devices
- **Performance Optimized**: Fast loading with Vite and optimized assets
- **Modern UI**: Dark theme with professional color palette

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **GSAP** - Advanced animations
- **Lucide React** - Icons
- **Styled Components** - Component styling

## 📦 Installation

```bash
npm install
```

## 🎨 Development

```bash
npm run dev
```

Runs the development server at `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

Builds the app for production to the `dist` folder.

## 🚢 Deployment to Cloudflare Pages

### Prerequisites
- Cloudflare account
- GitHub repository connected

### Quick Deploy via GitHub

1. **Connect Repository**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
   - Click "Create a project" → "Connect to Git"
   - Select your GitHub repository: `Omprakash87/schnellfix-landing`

2. **Configure Build Settings**
   - Framework preset: **Vite** (auto-detected)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (leave empty)

3. **Deploy**
   - Click "Save and Deploy"
   - Cloudflare will automatically build and deploy your site

### Manual Deploy via Wrangler CLI

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=schnellfix-landing
```

### Environment Variables

Currently, no environment variables are required. If needed in the future:
- Go to Cloudflare Pages project settings
- Navigate to "Environment Variables"
- Add variables for Production, Preview, and Branch previews

## 📋 Important Considerations for Cloudflare Pages

### ✅ Already Configured

1. **Build Command**: `npm run build`
2. **Output Directory**: `dist` (standard Vite output)
3. **Node Version**: Specify in `.nvmrc` (Node 20)
4. **Static Assets**: All assets use relative paths

### 🔧 Cloudflare Settings

1. **Auto Minify**: Enable in Cloudflare dashboard
   - Settings → Speed → Auto Minify → Enable JavaScript, CSS, HTML

2. **Brotli Compression**: Enabled by default

3. **Browser Cache TTL**: Automatic caching for static assets

4. **Custom Domain**: 
   - Project Settings → Custom domains
   - Add your domain and follow DNS setup instructions

### 📊 Performance

- **Build Time**: ~5-15 seconds
- **CDN**: Automatic global distribution via Cloudflare
- **SSL**: Automatic HTTPS certificates
- **Analytics**: Available in Cloudflare dashboard

### 🐛 Troubleshooting

#### Build Fails
- Check build logs in Cloudflare dashboard
- Ensure Node.js version is compatible (Node 18+)
- Verify all dependencies are in `package.json`

#### Assets Not Loading
- Ensure assets use relative paths (already configured)
- Check `dist` folder structure after build
- Verify build output directory is `dist`

#### Memory Issues During Build
If you encounter memory errors, add to `package.json`:
```json
"scripts": {
  "build": "NODE_OPTIONS='--max-old-space-size=4096' tsc -b && vite build"
}
```

## 📁 Project Structure

```
schnellfix-landing/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ServiceGrid.tsx
│   │   └── ...              # Animation components
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── dist/                    # Build output (deployed)
├── public/                  # Static assets
└── package.json

```

## 🎭 Animation Components

- **SmoothReveal**: Scroll-triggered element reveals
- **ElegantHover**: Subtle 3D hover effects
- **MagneticField**: Interactive magnetic interactions
- **CreativeTextReveal**: Character-by-character text animations
- **AdvancedParallax**: Multi-directional parallax effects
- **LiquidMorph**: Organic morphing blob animations
- **MorphingGradient**: Dynamic background gradients
- **GlowOrb**: Pulsing ambient light effects

## 🔗 Links

- **GitHub Repository**: https://github.com/Omprakash87/schnellfix-landing
- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages/
- **Vite Docs**: https://vitejs.dev/
- **GSAP Docs**: https://greensock.com/docs/

## 📝 License

Private project - All rights reserved

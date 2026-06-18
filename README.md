# Porto Gue — Creative Portfolio

A modern, bilingual portfolio website built with Next.js, featuring smooth animations, dark/light theme support, and responsive design.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4?style=for-the-badge&logo=tailwind-css)

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) | Server-side rendering, routing, file-based routing |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) | Type-safe code |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) | Utility-first CSS framework |
| **Animations** | [Framer Motion](https://www.framer.com/motion) | Declarative React animations (scroll, layout, hover effects) |
| **Animations** | [GSAP](https://gsap.com) | Advanced timeline-based animations |
| **Smooth Scroll** | [Lenis](https://github.com/studio-freight/lenis) | Smooth/inertial scroll experience |
| **Icons** | [Lucide React](https://lucide.dev) + [React Icons](https://react-icons.github.io) | Icon libraries |
| **Linting** | [ESLint 9](https://eslint.org) | Code quality and consistency |

## Features

- **Bilingual Support** — Switch between English and Bahasa Indonesia via `LanguageToggle`
- **Dark / Light Theme** — Toggle theme with `ThemeToggle`, persisted via context
- **Splash Screen** — Animated loading screen on initial load
- **Smooth Scroll** — Lenis-based inertial scrolling
- **Animated Sections** — Hero, About, Projects, Future Projects, Photo Carousel, Parallax Showcase, Tech Marquee, Contact, and Footer
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Font Optimization** — Auto-optimized Geist font via `next/font`

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers (theme, language)
├── page.tsx            # Home page — assembles all sections
├── globals.css         # Global styles & Tailwind directives
├── components/         # Reusable UI components
│   ├── Hero.tsx            # Hero section with animated intro
│   ├── About.tsx           # About / bio section
│   ├── Navbar.tsx          # Navigation bar
│   ├── LogoLoop.tsx        # Animated logo carousel
│   ├── Projects.tsx        # Featured projects grid
│   ├── FutureProjects.tsx  # Upcoming projects teaser
│   ├── ParallaxShowcase.tsx # Parallax image showcase
│   ├── PhotoCarousel.tsx   # Interactive photo carousel
│   ├── SplashScreen.tsx    # Loading splash screen
│   ├── TechMarquee.tsx     # Scrolling tech stack ticker
│   ├── Contact.tsx         # Contact form / info
│   ├── Footer.tsx          # Site footer
│   ├── LanguageToggle.tsx  # EN/ID language switcher
│   └── ThemeToggle.tsx     # Dark/light theme toggle
├── context/
│   ├── ThemeContext.tsx      # Theme state provider
│   └── LanguageContext.tsx   # Language state provider
└── data/
    ├── projects.ts             # Project data definitions
    └── translations.ts         # i18n translation dictionaries
```

## Getting Started

### Prerequisites

- Node.js 18+ (Node 20+ recommended)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd porto

# Install dependencies
npm install

# Or with pnpm
pnpm install

# Or with yarn
yarn install
```

### Development

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Deploy

### Vercel (Recommended)

The easiest way to deploy is via [Vercel](https://vercel.com).

```bash
npm i -g vercel
vercel
```

### Other Platforms

This is a statically-oriented Next.js app. It can be deployed on any platform that supports Node.js servers or static generation (Netlify, Railway, Cloudflare Pages, etc.).

## License

Private — all rights reserved.

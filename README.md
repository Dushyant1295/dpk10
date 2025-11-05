# Crowd Next WordPress Boilerplate

A modern WordPress theme boilerplate powered by Webpack and Vite for efficient development.

---

## 🚀 Quick Start

### 1. Install Node Packages
Run the following command to install all required Node.js dependencies:
```sh
npm install
```

### 2. Install Timber
Install Timber for WordPress templating:
```sh
composer require timber/timber:^2.3.2
```

### 3. Start Development Server
#### Using Webpack:
```sh
npm run dev
```

#### Using Vite:
> Ensure `vite.php` is included in `functions.php`:
```php
// include "config/vite.php";
```
Then run:
```sh
npm run dev-vite
```

### 4. Build for Production
#### Using Webpack:
> Ensure `vite.php` is commented out in `functions.php`:
```php
// include "config/vite.php";
```
Then run:
```sh
npm run build
```

---

## 🌟 Features

### Page Transitions
- **[Barba.js](https://barba.js.org/):** Smooth and fluid page transitions.

### Animations
- **[GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/):** Create dynamic animations.

### Sliders
- **[Swiper](https://swiperjs.com/):** Fully customizable sliders.

### Smooth Scrolling
- **[Smooth-scrollbar](https://github.com/idiotWu/smooth-scrollbar)** or **[Lenis](https://lenis.studiofreight.com/):** Achieve smooth scrolling effects.

### CSS Optimization
- **[PostCSS](https://postcss.org/):** Extend CSS with plugins.
- **[CSSnano](https://cssnano.co/):** Minify and optimize CSS.
- **[Autoprefixer](https://autoprefixer.github.io/):** Add vendor prefixes automatically.

---

## 🛠️ Development Notes

- **Caching:** If using SiteGround, clear the cache after changes. Always test in incognito mode to avoid cached results.
- **File Structure:** Follow the modular structure for SCSS, JavaScript, and Twig templates for maintainability.

---

## 📂 File Structure Overview

```
├── acf-json/               # Advanced Custom Fields JSON files
├── config/                 # Configuration files (Webpack, Vite, etc.)
├── src/                    # Source files for SCSS, JS, and other assets
│   ├── css/                # SCSS styles
│   ├── js/                 # JavaScript modules
├── templates/              # Twig templates
├── pages/                  # Custom page templates
├── vendor/                 # Composer dependencies
└── functions.php           # WordPress theme functions
```

---

## 📖 Additional Resources

- **Timber Documentation:** [https://timber.github.io/docs/](https://timber.github.io/docs/)
- **WordPress Theme Development:** [https://developer.wordpress.org/themes/](https://developer.wordpress.org/themes/)
- **Webpack Documentation:** [https://webpack.js.org/](https://webpack.js.org/)
- **Vite Documentation:** [https://vitejs.dev/](https://vitejs.dev/)
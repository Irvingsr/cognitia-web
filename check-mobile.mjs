import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const BASE = 'https://cognitia-web-lemon.vercel.app';
const OUT  = './mobile-screenshots';
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: 'mobile',  width: 375, height: 812 },   // iPhone SE
  { name: 'tablet',  width: 768, height: 1024 },  // iPad
];

const PAGES = [
  { path: '/',            name: 'home' },
  { path: '/servicios',   name: 'servicios' },
  { path: '/manifiesto',  name: 'manifiesto' },
  { path: '/diagnostico', name: 'diagnostico' },
  { path: '/calculadora', name: 'calculadora' },
  { path: '/contacto',    name: 'contacto' },
];

const browser = await chromium.launch();
const results = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
  });
  const page = await ctx.newPage();

  for (const pg of PAGES) {
    await page.goto(BASE + pg.path, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(600);

    const file = `${OUT}/${vp.name}-${pg.name}.png`;
    await page.screenshot({ path: file, fullPage: true });

    // Check for horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    // Check for any element wider than viewport
    const overflowEls = await page.evaluate((vpw) => {
      const els = [...document.querySelectorAll('*')];
      return els
        .filter(el => {
          const r = el.getBoundingClientRect();
          return r.right > vpw + 5;
        })
        .slice(0, 5)
        .map(el => `${el.tagName.toLowerCase()}${el.className ? '.' + [...el.classList].join('.') : ''}`);
    }, vp.width);

    results.push({
      viewport: vp.name,
      page: pg.name,
      hasOverflow: overflow,
      overflowElements: overflowEls,
      screenshot: file,
    });

    console.log(`[${vp.name}] ${pg.path} → overflow:${overflow} | ${overflowEls.length ? overflowEls.join(', ') : 'none'}`);
  }

  await ctx.close();
}

await browser.close();

console.log('\n=== SUMMARY ===');
const issues = results.filter(r => r.hasOverflow);
if (issues.length === 0) {
  console.log('✅ No horizontal overflow detected on any page/viewport');
} else {
  issues.forEach(i => {
    console.log(`⚠️  [${i.viewport}] /${i.page} — overflow elements: ${i.overflowElements.join(', ') || 'detected'}`);
  });
}

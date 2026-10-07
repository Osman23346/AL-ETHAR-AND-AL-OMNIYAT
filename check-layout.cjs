const assert = require('node:assert/strict');
const { chromium } = require('./node_modules/.browser-check/node_modules/playwright-core');
(async()=>{ const browser=await chromium.launch({executablePath:'C:/Users/DELL/.cache/puppeteer/chrome/win64-127.0.6533.88/chrome-win64/chrome.exe',headless:true});
for (const width of [320,390,768,1440]) {
 const page=await browser.newPage({viewport:{width,height:900},isMobile:width<900});
 await page.goto('http://127.0.0.1:5173', {waitUntil:'domcontentloaded'}); await page.waitForTimeout(600);
 const sizes=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth})); assert.equal(sizes.scroll,width); assert.equal(sizes.viewport,width);
 if(width<900){ assert.equal(await page.locator('#main-navigation').isVisible(),false); await page.locator('.mobile-menu').click(); assert.equal(await page.locator('#main-navigation').isVisible(),true); await page.locator('#main-navigation a').first().click(); assert.equal(await page.locator('#main-navigation').isVisible(),false); }
 const alpha=await page.locator('.brand-logo-image').first().evaluate(async img=>{await img.decode(); const c=document.createElement('canvas'); c.width=img.naturalWidth;c.height=img.naturalHeight;const ctx=c.getContext('2d');ctx.drawImage(img,0,0);return ctx.getImageData(0,0,1,1).data[3];});assert.equal(alpha,0);
 if(width===390){await page.locator('.footer').scrollIntoViewIfNeeded();await page.screenshot({path:'node_modules/.browser-check/footer.png'});}
 console.log(`PASS ${width}px: no overflow, menu behavior, transparent logo`);await page.close();
} await browser.close();})().catch(e=>{console.error(e);process.exit(1)});

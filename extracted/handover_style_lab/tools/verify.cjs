/**
 * 观澜 Style Lab · 一键自检
 * 用法：node tools/verify.cjs
 * 环境变量：CHROME_PATH（可选，默认用本机 Chrome）
 */
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const CHROME = process.env.CHROME_PATH || 'C:/Users/etyph/.agent-browser/browsers/chrome-152.0.7977.82/chrome.exe';

let chromium;
try {
  ({ chromium } = require('playwright-core'));
} catch (e) {
  console.error('[ENV] 缺少 playwright-core。请先安装：npm i playwright-core@1.49.0');
  console.error('      并设置 NODE_PATH 指向 node_modules，或在本目录 npm 安装。');
  process.exit(2);
}

const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); return cond; };

(async () => {
  const browser = await chromium.launch({
    executablePath: CHROME,
    args: [
      '--enable-unsafe-swiftshader',
      '--allow-file-access-from-files',
      '--autoplay-policy=no-user-gesture-required'
    ]
  });

  try {
    /* ---------------- 1. 静态样板间 ---------------- */
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
      const errors = [];
      page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
      page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));

      await page.goto(pathToFileURL(path.join(ROOT, 'style-lab.html')).href, { waitUntil: 'load' });
      await page.evaluate(async () => {
        const h = document.body.scrollHeight;
        for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
        window.scrollTo(0, 0);
      });
      await page.waitForFunction(
        () => [...document.querySelectorAll('.shot img, .cel-wrap img')].every(i => i.complete && i.naturalWidth > 0),
        null, { timeout: 30000 }
      ).catch(() => {});

      const info = await page.evaluate(() => window.__STYLELAB);
      ok(!!info, '静态页：__STYLELAB 句柄缺失');
      if (info) {
        ok(info.count === 6, `静态页：卡片数 ${info.count}（应为 6）`);
        ok(info.styles.length === 6, `静态页：风格名数量 ${info.styles.length}`);
        console.log('styles:', info.styles.join(' | '));
        info.images.forEach((im, i) => ok(im.ok, `静态页：第 ${i + 1} 张图未加载（${im.src}）`));
      }

      const all = await page.evaluate(() => {
        const imgs = [...document.querySelectorAll('.shot img, .cel-wrap img')];
        return {
          n: imgs.length,
          bad: imgs.filter(i => !(i.complete && i.naturalWidth > 0)).map(i => i.getAttribute('src')),
          hasCel: !!document.querySelector('.cel-main img'),
          celSrc: document.querySelector('.cel-main img')?.getAttribute('src') || ''
        };
      });
      ok(all.n === 8, `静态页：内容图 ${all.n} 张（应为 8）`);
      ok(all.bad.length === 0, '静态页：未加载 ' + all.bad.join(', '));
      ok(all.hasCel && all.celSrc.includes('07_cel_classic'), '静态页：赛璐璐区块缺失');
      console.log('images:', all.n, '| cel:', all.celSrc);

      await page.locator('.shot').first().click();
      await page.waitForTimeout(400);
      ok(await page.evaluate(() => document.getElementById('lb').open), '静态页：灯箱未打开');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      ok(await page.evaluate(() => !document.getElementById('lb').open), '静态页：灯箱 ESC 未关闭');
      ok(errors.length === 0, '静态页：console error -> ' + errors.join(' | '));
      await page.close();
    }

    /* ---------------- 2. 动图展厅 ---------------- */
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
      const errors = [];
      page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
      page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));

      await page.goto(pathToFileURL(path.join(ROOT, 'style-lab-motion.html')).href, { waitUntil: 'load' });
      await page.waitForFunction(
        () => [...document.querySelectorAll('.frame video')].every(v => v.readyState >= 2 && v.videoWidth > 0),
        null, { timeout: 60000 }
      ).catch(() => {});

      const m = await page.evaluate(() => window.__MOTIONLAB);
      ok(!!m, '动图页：__MOTIONLAB 句柄缺失');
      if (m) {
        ok(m.count === 7, `动图页：视频数 ${m.count}（应为 7）`);
        m.ready.forEach((v, i) => {
          ok(v.w === 1176 && v.h === 784, `动图页：第 ${i + 1} 条尺寸 ${v.w}x${v.h}`);
          ok(v.dur >= 4.5, `动图页：第 ${i + 1} 条时长 ${v.dur}s`);
          console.log(`  ${i + 1}. ${v.w}x${v.h} ${v.dur}s  ${v.src}`);
        });
      }

      const playing = await page.evaluate(() => [...document.querySelectorAll('.frame video')].filter(v => !v.paused).length);
      ok(playing > 0, '动图页：没有视频在自动播放');

      await page.click('#toggle');
      await page.waitForTimeout(350);
      ok(await page.evaluate(() => [...document.querySelectorAll('.frame video')].every(v => v.paused)), '动图页：全部暂停失效');
      await page.click('#toggle');
      await page.waitForTimeout(350);

      // 逐帧像素差：证明"真的在动"
      const diffs = await page.evaluate(async () => {
        const vids = [...document.querySelectorAll('.frame video')];
        vids.forEach(v => v.pause());
        const out = [];
        for (const v of vids) {
          const c = document.createElement('canvas'); c.width = 320; c.height = 213;
          const ctx = c.getContext('2d', { willReadFrequently: true });
          const grab = t => new Promise(res => {
            const on = () => {
              v.removeEventListener('seeked', on);
              setTimeout(() => { ctx.drawImage(v, 0, 0, 320, 213); res(ctx.getImageData(0, 0, 320, 213).data); }, 120);
            };
            v.addEventListener('seeked', on);
            v.currentTime = t;
          });
          const a = await grab(0.15), b = await grab(2.4);
          let s = 0;
          for (let i = 0; i < a.length; i += 4) s += Math.abs(a[i]-b[i]) + Math.abs(a[i+1]-b[i+1]) + Math.abs(a[i+2]-b[i+2]);
          out.push({ src: v.getAttribute('src').split('/').pop(), d: +(s / (a.length/4*3)).toFixed(2) });
        }
        return out;
      });
      diffs.forEach(d => {
        const is2D = d.src.includes('04_') || d.src.includes('07_');
        const min = is2D ? 5 : 15;
        console.log(`${d.d >= min ? 'OK  ' : 'FLAT'} ${d.src}  diff=${d.d}`);
        ok(d.d >= min, `动图页：${d.src} 像素差 ${d.d}（阈值 ${min}，疑似静止）`);
      });

      ok(errors.length === 0, '动图页：console error -> ' + errors.join(' | '));
      await page.close();
    }
  } finally {
    await browser.close();
  }

  console.log('');
  if (fails.length) {
    console.log('FAIL');
    fails.forEach(f => console.log(' - ' + f));
    process.exit(1);
  }
  console.log('PASS  all checks');
})();

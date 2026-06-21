import { chromium } from 'playwright'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const targets = [
  {
    name: 'dataground',
    url: 'https://dataground-drab.vercel.app/',
    output: path.join(root, 'public/images/dataground/dataground.webp'),
  },
  {
    name: 'In Loving Memory',
    url: 'https://maselinejoseph.vercel.app/',
    output: path.join(root, 'public/images/maseline-joseph/maseline-joseph.webp'),
  },
]

const browser = await chromium.launch()

for (const target of targets) {
  const page = await browser.newPage()
  try {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto(target.url, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(1000)
    const pngBuffer = await page.screenshot({ type: 'png' })
    await sharp(pngBuffer).webp({ quality: 85 }).toFile(target.output)
    console.log(`✓ ${target.name} → ${path.relative(root, target.output)}`)
  } catch (err) {
    console.error(`✗ ${target.name} failed: ${err.message}`)
  } finally {
    await page.close()
  }
}

await browser.close()

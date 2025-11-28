const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

const START_URLS = [
  'http://localhost:3000/mobile-app',
  'http://localhost:3000/admin-panel',
  'http://localhost:3000/web-page'
];
const OUTPUT_PDF = 'elms-documentation.pdf';

async function crawlPages(page, startUrl) {
  const visitedPages = new Set();
  const pagesToVisit = [startUrl];
  const sectionBase = new URL(startUrl).pathname.split('/')[1];

  while (pagesToVisit.length > 0) {
    const currentUrl = pagesToVisit.shift();

    if (visitedPages.has(currentUrl)) continue;
    visitedPages.add(currentUrl);

    try {
      console.log(`  Crawling: ${currentUrl}`);
      await page.goto(currentUrl, { waitUntil: 'networkidle2', timeout: 30000 });

      // Find next page link
      const nextPageLink = await page.evaluate(() => {
        const nextLink = document.querySelector('a.pagination-nav__link--next');
        return nextLink ? nextLink.href : null;
      });

      if (nextPageLink && nextPageLink.includes(`/${sectionBase}`)) {
        pagesToVisit.push(nextPageLink);
      }
    } catch (error) {
      console.error(`  Error crawling ${currentUrl}:`, error.message);
    }
  }

  return Array.from(visitedPages);
}

async function generatePDF() {
  console.log('Starting PDF generation...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    const mergedPdf = await PDFDocument.create();
    let allPages = [];

    // Crawl each section
    for (const startUrl of START_URLS) {
      const section = new URL(startUrl).pathname;
      console.log(`Crawling section: ${section}`);
      const pages = await crawlPages(page, startUrl);
      console.log(`  Found ${pages.length} pages\n`);
      allPages.push(...pages);
    }

    console.log(`\nTotal pages to process: ${allPages.length}\n`);

    // Generate PDF for each page and merge
    for (let i = 0; i < allPages.length; i++) {
      const pageUrl = allPages[i];
      console.log(`[${i + 1}/${allPages.length}] Processing: ${pageUrl}`);

      await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 30000 });

      // Hide navigation elements
      await page.evaluate(() => {
        const elementsToHide = [
          '.navbar',
          'nav.menu',
          '.theme-doc-sidebar-container',
          '.pagination-nav',
          'footer',
          '.theme-edit-this-page',
          '.breadcrumbs'
        ];

        elementsToHide.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            if (el) el.style.display = 'none';
          });
        });

        // Expand main content to full width
        const article = document.querySelector('article');
        if (article) {
          article.style.maxWidth = '100%';
        }
      });

      const pdfBytes = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' }
      });

      // Load this page's PDF and copy to merged PDF
      const pagePdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pagePdf, pagePdf.getPageIndices());
      copiedPages.forEach((p) => mergedPdf.addPage(p));
    }

    // Save merged PDF
    const pdfBytes = await mergedPdf.save();
    fs.writeFileSync(OUTPUT_PDF, pdfBytes);

    console.log(`\n✓ PDF generated successfully: ${OUTPUT_PDF}`);
    console.log(`  Total pages: ${allPages.length}`);

  } catch (error) {
    console.error('\n✗ Error:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

generatePDF().catch(() => process.exit(1));

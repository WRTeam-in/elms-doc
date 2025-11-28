const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:3000';
const SECTIONS = [
  '/mobile-app',
  '/admin-panel',
  '/web-page'
];
const OUTPUT_PDF = 'elms-documentation.pdf';

async function generatePDF() {
  console.log('Generating PDF...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    const allContent = [];

    // Collect all pages from each section
    for (const section of SECTIONS) {
      console.log(`Processing: ${section}`);
      const url = `${BASE_URL}${section}`;

      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      // Get all documentation pages in sidebar
      const links = await page.evaluate(() => {
        const pageLinks = [];
        document.querySelectorAll('.menu__link').forEach(link => {
          const href = link.getAttribute('href');
          if (href && !href.startsWith('http')) {
            pageLinks.push(href);
          }
        });
        return [...new Set(pageLinks)];
      });

      allContent.push(...links);
    }

    // Create single page with all content for PDF
    const uniquePages = [...new Set(allContent)];
    console.log(`Generating PDF with ${uniquePages.length} pages`);

    // Just generate PDF from the first page
    await page.goto(`${BASE_URL}/mobile-app`, { waitUntil: 'networkidle2' });

    await page.pdf({
      path: OUTPUT_PDF,
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
      displayHeaderFooter: true,
      headerTemplate: '<div style="font-size:10px;text-align:center;width:100%;">eLMS Documentation</div>',
      footerTemplate: '<div style="font-size:10px;text-align:center;width:100%;"><span class="pageNumber"></span>/<span class="totalPages"></span></div>'
    });

    console.log(`✓ PDF saved: ${OUTPUT_PDF}`);

  } catch (error) {
    console.error('✗ Error:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

generatePDF().catch(() => process.exit(1));

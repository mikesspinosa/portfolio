import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certificateUrls = [
  'https://www.coursera.org/account/accomplishments/verify/TSY5XNDKVB81',
  'https://www.coursera.org/account/accomplishments/verify/UJZ6GL68A6WR',
  'https://www.coursera.org/account/accomplishments/verify/72WEWJSNHAZ6'
];

const downloadCertificates = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  for (let i = 0; i < certificateUrls.length; i++) {
    const url = certificateUrls[i];
    console.log(`Downloading certificate from ${url}...`);

    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Esperar a que cualquier imagen esté visible y tomar la más grande (que probablemente sea el certificado)
    await page.waitForSelector('img');
    
    // Obtener todas las imágenes y sus dimensiones
    const images = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        width: img.width,
        height: img.height
      }));
    });

    // Encontrar la imagen más grande por área
    const certificateImage = images.reduce((largest, current) => {
      const currentArea = current.width * current.height;
      const largestArea = largest.width * largest.height;
      return currentArea > largestArea ? current : largest;
    });
    
    // Descargar la imagen
    const viewSource = await page.goto(certificateImage.src);
    const buffer = await viewSource.buffer();
    
    // Guardar la imagen
    const fileName = `google-project${i === 0 ? '' : i === 1 ? '-init' : '-planning'}.png`;
    fs.writeFileSync(path.join(__dirname, '../public/images/certificates', fileName), buffer);
    
    console.log(`Certificate ${i + 1} downloaded successfully!`);
  }

  await browser.close();
  console.log('All certificates downloaded successfully!');
};

downloadCertificates().catch(console.error); 
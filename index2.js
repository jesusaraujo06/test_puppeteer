import puppeteer from 'puppeteer';
import fs from 'fs/promises';


async function handleDynamicWebPage(){
  const browser = await puppeteer.launch({
    headless: true,
    slowMode: 400,
  });
  const page = await browser.newPage();

  //#region Olimpica
  console.log('Ingresando al sitio web de OLIMPICA');

  await page.goto('https://www.olimpica.com/cerave-locion-hidratante-x-473-ml/p');

  console.log('Esperando que el sitio web cargue...');

  await new Promise(cb => setTimeout(cb, 5000));

  console.log('Obteniendo precio del producto...');

  const resultOlimpica = await page.evaluate(() => {

    const title = document.querySelector('span.vtex-store-components-3-x-productBrand.vtex-store-components-3-x-productBrand--quickview').innerText;

    const product = document.querySelector('.vtex-product-price-1-x-sellingPrice--hasListPrice--dynamicF').innerText;

    const Olimpica = {
      title,
      product
    }
    return { Olimpica }
  });
  console.log('Proceso finalizado.');
  //#endregion 

  //#region Drogas la rebaja
  console.log('Ingresando al sitio web de DROGAS LA REBAJA');

  await page.goto('https://www.larebajavirtual.com/locion-hidratante-cerave-150821/p');

  console.log('Esperando que el sitio web cargue...');

  await new Promise(cb => setTimeout(cb, 5000));

  console.log('Obteniendo precio del producto...');

  const resultDrogasLaRebaja = await page.evaluate(() => {

    const title = document.querySelector('span.vtex-store-components-3-x-productBrand').innerText;

    const product = document.querySelector('span.copservir-larebaja-theme-0-x-productPriceValue').innerText;

    const DrogasLaRebaja = {
      title,
      product
    }

    return { DrogasLaRebaja }
  });

  console.log('Proceso finalizado.');
  //#endregion

  await browser.close();

  console.log(resultOlimpica, resultDrogasLaRebaja);

  fs.writeFile('quotes.json', JSON.stringify({resultOlimpica, resultDrogasLaRebaja}));
  
}

await handleDynamicWebPage();
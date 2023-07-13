import puppeteer from 'puppeteer';
import fs from 'fs/promises';


async function handleDynamicWebPage(){
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 60000
  });
  const page = await browser.newPage();

  //#region Olimpica
  console.log('Ingresando al sitio web de OLIMPICA');

  await page.goto('https://www.olimpica.com/cerave-locion-hidratante-x-473-ml/p', { timeout: 60000 });

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

  await page.goto('https://www.larebajavirtual.com/locion-hidratante-cerave-150821/p', { timeout: 60000 });

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

  //#region Cruz verde
  console.log('Ingresando al sitio web de CRUZ VERDE');

  await page.goto('https://www.cruzverde.com.co/cerave-moisturising-locion-hidratante-para-piel-seca-a-muy-seca-frasco-x-473ml/COCV_291911.html', { timeout: 60000 });

  console.log('Esperando que el sitio web cargue...');

  await new Promise(cb => setTimeout(cb, 7000));

  console.log('Obteniendo precio del producto...');

  const resultCruzVerde = await page.evaluate(() => {

    let CruzVerde;
    try {
      const title = document.querySelector('h1.text-28.leading-35.font-bold').innerText;

      const product = document.querySelector('span.font-bold.text-prices').innerText;

      CruzVerde = {
        title,
        product
      }
    } catch (error) {
      CruzVerde = {
        title: "Error",
        product: "Error"
      }
    }
    
    return { CruzVerde }
  });

  console.log('Proceso finalizado.');
  //#endregion

  //#region Farmatodo
  console.log('Ingresando al sitio web de FARMATODO');

  await page.goto('https://www.farmatodo.com.co/producto/237150082-locion-hidratante-cerave-473-ml', { timeout: 60000 });

  console.log('Esperando que el sitio web cargue...');

  await new Promise(cb => setTimeout(cb, 5000));

  console.log('Obteniendo precio del producto...');

  const resultFarmatodo = await page.evaluate(() => {

    const title = document.querySelector('h1.title .big-title').innerText;

    const product = document.querySelector('section.product-price .item-section.price p.p-blue').innerText;

    const Farmatodo = {
      title,
      product
    }

    return { Farmatodo }
  });

  console.log('Proceso finalizado.');
  //#endregion

  await browser.close();

  console.log(resultOlimpica, resultDrogasLaRebaja, resultCruzVerde, resultFarmatodo);

  fs.writeFile('quotes.json', JSON.stringify({resultOlimpica, resultDrogasLaRebaja, resultCruzVerde, resultFarmatodo}));
  
}

await handleDynamicWebPage();
import puppeteer from 'puppeteer';
import fs from 'fs/promises';

async function openWebPage(){
  const browser = await puppeteer.launch({
    headless: false,
    slowMode: 200,
  });
  const page = await browser.newPage();

  await page.goto('https://example.com');

  await browser.close();
}

// openWebPage();

async function captureScreenshoot(){
  const browser = await puppeteer.launch({
    headless: false,
    slowMode: 200,
  });
  const page = await browser.newPage();

  await page.goto('https://www.olimpica.com/cerave?_q=cerave&map=ft');
  await page.screenshot({path: 'example.png'});
  await browser.close();
}

// captureScreenshoot();

async function navigateWebpage(){
  const browser = await puppeteer.launch({
    headless: false,
    slowMode: 400,
  });
  const page = await browser.newPage();

  await page.goto('https://quotes.toscrape.com/');
  
  // Esperar antes de dar clic
  await new Promise(cb => setTimeout(cb, 5000));

  await page.click('a[href="/login"]');

  
  await browser.close();
}

// navigateWebpage();

async function getDateFromWebPage(){
  const browser = await puppeteer.launch({
    headless: false,
    slowMode: 400,
  });
  const page = await browser.newPage();

  await page.goto('https://example.com/');
  
  const result = await page.evaluate(() => {
    const title = document.querySelector('h1').innerText;
    const description = document.querySelector('p').innerText;
    const more = document.querySelector('a').innerText;
    return {
      title,
      description,
      more
    }
  });

  console.log(result);

  
  await browser.close();
}

// getDateFromWebPage();

async function handleDynamicWebPage(){
  const browser = await puppeteer.launch({
    headless: false,
    slowMode: 400,
  });
  const page = await browser.newPage();

  await page.goto('https://quotes.toscrape.com/');
  
  const result = await page.evaluate(() => {

    const quotes = document.querySelectorAll('.quote');
    console.log(quotes);

    const data = [...quotes].map(quote => {
      const quoteText = quote.querySelector('.text').innerText;
      const author = quote.querySelector('.author').innerText;
      const tags  = [...quote.querySelectorAll('.tag')].map((tag) => tag.innerText);

      return {quoteText, author, tags}
    });

    return {data}
  });

  console.log(result);

  fs.writeFile('quotes.json', JSON.stringify(result));
  
  // await browser.close();
}

handleDynamicWebPage();
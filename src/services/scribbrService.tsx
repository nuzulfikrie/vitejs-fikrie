const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the Scribbr homepage
  await page.goto('https://www.scribbr.com/');

  // Wait for the search input field to be ready and type the search string
  const searchSelector = 'input[placeholder="Search by title, URL, DOI, ISBN or keywords"]';
  await page.waitForSelector(searchSelector);
  await page.type(searchSelector, '10.1016/B978-0-12-800105-9.00039-1');

  // Wait for the "Cite" button to be clickable and click it
  const citeButtonSelector = 'button[type="submit"]:has(span:contains("Cite"))';
  await page.waitForSelector(citeButtonSelector);
  await page.click(citeButtonSelector);

  // Wait for the response after clicking "Cite", such as loading of the citation result
  // Add a waitForSelector or waitForNavigation as needed here, depending on the page behavior

  // Access the "Copy to clipboard" button
  const copySelector = 'button[aria-label="Copy to clipboard"]';
  await page.waitForSelector(copySelector);
  // If you want to click this button, you can use: await page.click(copySelector);

  // Access the "Narrative" citation format
// Wait for the "Narrative" citation to be ready and get its text
const narrativeSelector = 'tr.group td div[role="button"] span';
await page.waitForSelector(narrativeSelector);
const narrativeText = await page.$eval(narrativeSelector, el => el.textContent.trim());

// Output the narrative citation text
console.log(`Narrative Citation: ${narrativeText}`);

  // Output the narrative citation text
  console.log(narrativeText);

  // Close the browser
  await browser.close();
})();

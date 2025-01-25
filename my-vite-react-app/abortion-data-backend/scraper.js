const scrapeAbortionData = async () => {
  const puppeteer = require("puppeteer");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    console.log("Opening the page...");
    await page.goto(
      "https://www.guttmacher.org/state-policy/explore/state-policies-abortion-bans",
      {
        waitUntil: "domcontentloaded", // Ensure the DOM has loaded
        timeout: 60000, // Increase timeout if the site is slow
      }
    );

    console.log("Page loaded. Scraping data...");
    await page.waitForSelector(".slp-table"); // Replace with actual selector
    console.log("Found the table!");

    const data = await page.evaluate(() => {
      // Example logic; replace with actual selectors
      const rows = Array.from(document.querySelectorAll(".slp-table tr"));
      return rows.map((row) => {
        const columns = row.querySelectorAll("td");
        return {
          state: columns[0]?.innerText.trim(),
          total: columns[1]?.innerText.trim(),
          first18: columns[2]?.innerText.trim(),
          after18: columns[3]?.innerText.trim(),
          noBan: columns[4]?.innerText.trim(),
        };
      });
    });

    console.log("Scraping complete!");
    console.log(data);
    await browser.close();
    return data;
  } catch (err) {
    console.error("Error during scraping:", err);
    await browser.close();
    throw err;
  }
};

// Run the scraper
scrapeAbortionData()
  .then((data) => console.log("Scraped data:", data))
  .catch((err) => console.error("Failed to scrape:", err));

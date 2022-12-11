const { Builder, By } = require("selenium-webdriver");
require("chromedriver");

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://www.google.com");
  await driver.findElement(By.css('[name="q"]')).sendKeys("webElement");

  // Get attribute of current active element
  let attr = await driver.switchTo().activeElement().getAttribute("title");
  console.log(`${attr}`);
})();

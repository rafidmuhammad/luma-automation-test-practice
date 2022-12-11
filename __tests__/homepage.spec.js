//NOTE: Missing Hot Sellers
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

require("chromedriver");

const options = new chrome.Options();
const chromeOptions = process.env.GITHUB_ACTIONS ? options.headless() : options;

describe("Homepage navigation", () => {
  // test suite
  let browser;

  beforeEach(async () => {
    browser = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    browser.get("https://magento.softwaretestingboard.com/");
  });
  afterEach(() => {
    browser.close();
  });
  afterAll(() => {
    browser.quit();
  });

  test("Landing Page", async () => {
    const title = await browser.getTitle();
    expect(title).toEqual(
      "Home Page - Magento eCommerce - website to practice selenium | demo website for automation testing | selenium practice sites | selenium demo sites | best website to practice selenium automation | automation practice sites Magento Commerce - website to practice selenium | demo website for automation testing | selenium practice sites"
    );
  });

  test.each([
    {
      path: "//a[@class= 'block-promo home-main']",
      pagetitle:
        "New Luma Yoga Collection Magento Commerce - website to practice selenium | demo website for automation testing | selenium practice sites",
      expected: "New Luma Yoga Collection",
    },
    {
      path: "//a[@class= 'block-promo home-pants']",
      pagetitle:
        "Pants Magento Commerce - website to practice selenium | demo website for automation testing | selenium practice sites",
      expected: "Pants",
    },
    {
      path: "//a[@class= 'block-promo home-t-shirts']",
      pagetitle:
        "Tees Magento Commerce - website to practice selenium | demo website for automation testing | selenium practice sites",
      expected: "Tees",
    },
    {
      path: "//a[@class= 'block-promo home-performance']",
      pagetitle:
        "Performance Fabrics Magento Commerce - website to practice selenium | demo website for automation testing | selenium practice sites",
      expected: "Performance Fabrics",
    },
    {
      path: "//a[@class= 'block-promo home-eco']",
      pagetitle:
        "Eco Friendly Magento Commerce - website to practice selenium | demo website for automation testing | selenium practice sites",
      expected: "Eco Friendly",
    },
  ])(
    "should be navigated to ($expected) page",
    async ({ path, pagetitle, expected }) => {
      const lumaYogaLocator = await browser.findElement(By.xpath(path));
      await lumaYogaLocator.click();
      const yogaPageTitle = await browser.getTitle();
      const yogaSectionTitle = await browser.findElement(By.css("span.base"));
      expect(yogaPageTitle).toEqual(pagetitle);
      expect(await yogaSectionTitle.getText()).toEqual(expected);
      //expect(await header.getText()).toEqual("Sandbox");
    }
  );
});

const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

require("chromedriver");

const options = new chrome.Options();
const chromeOptions = process.env.GITHUB_ACTIONS ? options.headless() : options;

describe("Create New Account", () => {
  beforeAll(async () => {
    browser = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    browser.get("https://magento.softwaretestingboard.com/");
    const createAccountButton = await browser.findElement(
      By.linkText("Create an Account")
    );
    await createAccountButton.click();
  });

  afterAll(() => {
    browser.quit();
  });

  test("new account should be created successfully", async () => {
    const pageTitle = await browser.findElement(By.css("span.base"));
    expect(await pageTitle.getText()).toEqual("Create New Customer Account");
    //
    const firstName = await browser.findElement(By.id("firstname"));
    const lastName = await browser.findElement(By.id("lastname"));
    const email = await browser.findElement(By.name("email"));
    const password = await browser.findElement(By.name("password"));
    const rePassword = await browser.findElement(
      By.name("password_confirmation")
    );
    await firstName.sendKeys("Rafid");
    await lastName.sendKeys("Muhammad");
    await email.sendKeys("rafid.muhammad@gmail.com");
    await password.sendKeys("123456");
    await rePassword.sendKeys("123456");
  });
});

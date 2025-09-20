const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function testForm() {
  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--disable-gpu');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    console.log("Navigating to the website...");
    await driver.get('http://18.234.63.89/');

    console.log("Filling out the form...");
    await driver.findElement(By.name('name')).sendKeys('Alice');
    await driver.findElement(By.name('email')).sendKeys('alice@example.com');
    await driver.findElement(By.name('role')).sendKeys('Developer');

    console.log("Submitting the form...");
    await driver.findElement(By.id('submit')).click();

    console.log("Waiting for success message...");
    await driver.wait(until.elementLocated(By.id('success')), 10000); // Increased timeout

    console.log('✅ Test Success');
  } catch (e) {
    console.log('❌ Test Failed:', e);
  } finally {
    await driver.quit();
  }
})();

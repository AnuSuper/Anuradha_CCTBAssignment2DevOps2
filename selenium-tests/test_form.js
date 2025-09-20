const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function testForm() {
  // Configure Chrome options for Jenkins compatibility
  const options = new chrome.Options();
  options.addArguments('--headless'); // Run without GUI
  options.addArguments('--no-sandbox'); // Required for some CI environments
  options.addArguments('--disable-dev-shm-usage'); // Prevents shared memory issues
  options.addArguments('--disable-gpu'); // Optional but safe
  // Do NOT use --user-data-dir to avoid session conflicts

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('http://18.234.63.89/');
    await driver.findElement(By.name('name')).sendKeys('Alice');
    await driver.findElement(By.name('email')).sendKeys('alice@example.com');
    await driver.findElement(By.name('role')).sendKeys('Developer');
    await driver.findElement(By.id('submit')).click();

    await driver.wait(until.elementLocated(By.id('success')), 3000);
    console.log('Test Success');
  } catch (e) {
    console.log('Test Failed', e);
  } finally {
    await driver.quit();
  }
})();


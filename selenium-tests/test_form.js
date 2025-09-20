const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const os = require('os');
const fs = require('fs');

(async function testForm() {
  // Create a temporary unique Chrome profile directory
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-profile-'));

  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--disable-gpu');
  options.addArguments(`--user-data-dir=${userDataDir}`);

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
    await driver.wait(until.elementLocated(By.id('success')), 15000); // 15s timeout

    console.log(' Test Success');
  } catch (e) {
    console.log(' Test Failed:', e);
  } finally {
    await driver.quit();
  }
})();

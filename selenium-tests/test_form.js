

const { Builder, By, until } = require('selenium-webdriver');

(async function testForm() {
  // Start Chrome browser
  let driver = await new Builder().forBrowser('chrome').build();

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
    await driver.wait(until.elementLocated(By.id('success')), 10000); // 10 sec

    console.log(" Test Success");
  } catch (e) {
    console.log("Test Failed:", e);
  } finally {
    await driver.quit();
  }
})();

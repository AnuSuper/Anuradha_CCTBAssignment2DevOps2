const {Builder, By, until} = require('selenium-webdriver');

(async function testValidation() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://18.234.63.89/');

    // Fill in name and role, but leave email empty
    await driver.findElement(By.name('name')).sendKeys('Bob');
    await driver.findElement(By.name('role')).sendKeys('Tester');

    // Click submit
    await driver.findElement(By.id('submit')).click();

    // Wait for error message to appear
    await driver.wait(until.elementLocated(By.id('error')), 3000);

    // Get and print the error message
    const errorMsg = await driver.findElement(By.id('error')).getText();
    console.log('Validation Test Passed:', errorMsg);
  } catch (e) {
    console.log('Validation Test Failed', e);
  } finally {
    await driver.quit();
  }
})();

const base = require('@playwright/test');

// exports.textParameterLogIn = base.test.extend({
//   // Define an option and provide a default value.
//   // We can later override it in the config.
//   email: ['erika.musterfrau@example.com', { option: true }],
//   passwort: ['geheimesPasswort456', { option: true }],
// });
async function loginWithParameters(page, email, password) {
    await page.goto('http://localhost:9000'); 
  
    await page.fill('id=email', email);
    await page.fill('id=password', password);
  
    await page.click('button[type="submit"]');
    await page.waitForSelector(`text=Login successful! Welcome, ${email}.`);
  }
  
  module.exports = {
    loginWithParameters,
  };

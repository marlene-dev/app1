
const { test } = require("@playwright/test");

module.exports = async function easyLogin(page, email, password, expectedName, expectedAddress, expectedPhone){
  await page.goto("http://localhost:9000");

  await page.fill("id=email", email);
  await page.fill("id=password", password);

  // Click the login button
  await page.click('button[type="submit"]');

  // await page.waitForSelector(`text=${expectedName}`);
  // await page.waitForSelector(`text=${expectedAddress}`);
  // await page.waitForSelector(`text=${expectedPhone}`);
  return true; 
};

const { test } = require("@playwright/test");

module.exports = async function easyLogin(page, email, password){
  await page.goto("http://localhost:9000");

  await page.fill("id=email", email);
  await page.fill("id=password", password);

  await page.click('button[type="submit"]');
  return true; 
};
const { test, expect } = require('@playwright/test');
const easyLogin = require('./split-test');

test('successful login', async ({ page }) => {
  await easyLogin(page, 'max.mann@email.com', 'Passwort123');

  await page.waitForSelector(`text=Login successful! Welcome, max.mann@email.com.`);
});

test('logout', async ({ page }) => {
  await easyLogin(page, 'max.mann@email.com', 'Passwort123');

  await page.waitForSelector('text=Login successful! Welcome, max.mann@email.com.');
  await page.click('#logout');
  await page.waitForSelector('form.login_form');
});

test('logout and login', async ({ page }) => {
  await easyLogin(page, 'max.mann@email.com', 'Passwort123');

  await page.waitForSelector('text=Login successful! Welcome, max.mann@email.com.');
  await page.click('#logout');
  await page.waitForSelector('form.login_form');

  await easyLogin(page, 'franka.frau@email.com', 'keinPasswort456');

  await page.waitForSelector('text=Login successful! Welcome, franka.frau@email.com.');
});

test('invalid login', async ({ page }) => {
  await easyLogin(page, 'invalid@email.com', 'invalidpassword');

  await page.waitForSelector('text=Incorrect email or password');
});

test('invalid passwort', async ({ page }) => {
  await easyLogin(page, 'max.mann@email.com', 'invalidpassword');

  await page.waitForSelector('text=Incorrect email or password');
});

test('invalid email', async ({ page }) => {
  await easyLogin(page, 'invalid@email.com', 'Passwort123');
  
  await page.waitForSelector('text=Incorrect email or password');
});

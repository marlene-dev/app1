const { test, expect } = require('@playwright/test');
const easyLogin = require('./split-test');

test('Login Test', async ({ page }) => {
  const email = 'erika.musterfrau@example.com';
  const password = 'geheimesPasswort456';
  const expectedName = 'Erika Musterfrau';
  const expectedAddress = 'Beispielweg 456, 67890 Beispielstadt';
  const expectedPhone = '+49 987 654321';

  await easyLogin(page, email, password, expectedName, expectedAddress, expectedPhone);
});

test('successful login', async ({ page }) => {
  await easyLogin(page, 'max.mustermann@example.com', 'meinPasswort123');
  await page.waitForSelector(`text=Login successful! Welcome, max.mustermann@example.com.`);
});

test('logout', async ({ page }) => {
  await easyLogin(page, 'max.mustermann@example.com', 'meinPasswort123');
  await page.waitForSelector('text=Login successful! Welcome, max.mustermann@example.com.');

  await page.click('#logout');
  await page.waitForSelector('form.login_form');
});

test('invalid login', async ({ page }) => {
  await easyLogin(page, 'invalid@example.com', 'invalidpassword');
  await page.waitForSelector('text=Incorrect email or password');
});

test('invalid password', async ({ page }) => {
  await easyLogin(page, 'max.mustermann@example.com', 'invalidpassword');
  await page.waitForSelector('text=Incorrect email or password');
});

test('invalid email', async ({ page }) => {
  await easyLogin(page, 'invalid@example.com', 'meinPasswort123');
  await page.waitForSelector('text=Incorrect email or password');
});

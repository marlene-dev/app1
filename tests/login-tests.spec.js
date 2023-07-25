const { test, expect } = require('@playwright/test');
import {textParameterLogIn} from './export-test.js';
const { loginWithParameters } = require('./export-test.js'); // Import the login helper function

// Define a new test that uses the login helper function with custom parameters
test('login with parameters', async ({ page}) => {
  const email = 'max.mustermann@example.com';
  const password = 'meinPasswort123';
  await loginWithParameters(page, email, password); // Call the login helper function with custom parameters
});
textParameterLogIn('login with parameters', async ({ page, email, passwort}) => {

  await page.goto('http://localhost:9000'); 

  await page.fill('id=email', email);
  await page.fill('id=password', passwort);

  await page.click('button[type="submit"]');
  await page.waitForSelector(`text=Login successful! Welcome, ${email}.`);
});

test('successful login', async ({ page }) => {
  await page.goto('http://localhost:9000'); 

  await page.fill('id=email', 'max.mustermann@example.com');
  await page.fill('id=password', 'meinPasswort123');

  await page.click('button[type="submit"]');
  await page.waitForSelector(`text=Login successful! Welcome, max.mustermann@example.com.`);
});

test('logout', async ({ page }) => {
    await page.goto('http://localhost:9000');

    await page.fill('id=email', 'max.mustermann@example.com');
    await page.fill('id=password', 'meinPasswort123');
  
    await page.click('button[type="submit"]');;
    await page.waitForSelector('text=Login successful! Welcome, max.mustermann@example.com.');

    await page.click('#logout');
    await page.waitForSelector('form.login_form');
});

test('invalid login', async ({ page }) => {
    await page.goto('http://localhost:9000'); 
  
    await page.fill('id=email', 'invalid@example.com');
    await page.fill('id=password', 'invalidpassword');
  
    await page.click('button[type="submit"]');
  
    await page.waitForSelector('text=Incorrect email or password');
  });
  test('invalid passwort', async ({ page }) => {
    await page.goto('http://localhost:9000'); 
  
    await page.fill('id=email', 'max.mustermann@example.com');
    await page.fill('id=password', 'invalidpassword');
  
    await page.click('button[type="submit"]');
  
    await page.waitForSelector('text=Incorrect email or password');
  });
  test('invalid email', async ({ page }) => {
    await page.goto('http://localhost:9000'); 
  
    await page.fill('id=email', 'invalid@example.com');
    await page.fill('id=password', 'meinPasswort123 ');
  
    await page.click('button[type="submit"]');
  
    await page.waitForSelector('text=Incorrect email or password');
  });
  test('export login', async ({ page }) => {
    await page.goto('http://localhost:9000'); 
  
    await page.fill('id=email', 'invalid@example.com');
    await page.fill('id=password', 'meinPasswort123 ');
  
    await page.click('button[type="submit"]');
  
    await page.waitForSelector('text=Incorrect email or password');
  });
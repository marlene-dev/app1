const { test, expect } = require('@playwright/test');

test('successful login', async ({ page }) => {
  await page.goto('http://localhost:9000'); 

  await page.fill('id=email', 'max.mann@email.com');
  await page.fill('id=password', 'Passwort123');

  await page.click('button[type="submit"]');
  await page.waitForSelector(`text=Login successful! Welcome, max.mann@email.com.`);
});

test('logout', async ({ page }) => {
    await page.goto('http://localhost:9000');

    await page.fill('id=email', 'max.mann@email.com');
    await page.fill('id=password', 'Passwort123');
  
    await page.click('button[type="submit"]');;
    await page.waitForSelector('text=Login successful! Welcome, max.mann@email.com.');

    await page.click('#logout');
    await page.waitForSelector('form.login_form');
});

test('logout and login', async ({ page }) => {
    await page.goto('http://localhost:9000');

    await page.fill('id=email', 'max.mann@email.com');
    await page.fill('id=password', 'Passwort123');
  
    await page.click('button[type="submit"]');;
    await page.waitForSelector('text=Login successful! Welcome, max.mann@email.com.');

    await page.click('#logout');
    await page.waitForSelector('form.login_form');

    await page.fill('id=email', 'franka.frau@email.com');
    await page.fill('id=password', 'keinPasswort456');
  
    await page.click('button[type="submit"]');;
    await page.waitForSelector('text=Login successful! Welcome, franka.frau@email.com.');
});

test('invalid login', async ({ page }) => {
    await page.goto('http://localhost:9000'); 
  
    await page.fill('id=email', 'invalid@email.com');
    await page.fill('id=password', 'invalidpassword');
  
    await page.click('button[type="submit"]');
  
    await page.waitForSelector('text=Incorrect email or password');
  });

  test('invalid passwort', async ({ page }) => {
    await page.goto('http://localhost:9000'); 
  
    await page.fill('id=email', 'max.mann@email.com');
    await page.fill('id=password', 'invalidpassword');
  
    await page.click('button[type="submit"]');
  
    await page.waitForSelector('text=Incorrect email or password');
  });
  
  test('invalid email', async ({ page }) => {
    await page.goto('http://localhost:9000'); 
  
    await page.fill('id=email', 'invalid@email.com');
    await page.fill('id=password', 'Passwort123 ');
  
    await page.click('button[type="submit"]');
  
    await page.waitForSelector('text=Incorrect email or password');
  });
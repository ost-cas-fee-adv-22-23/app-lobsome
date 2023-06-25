import { test as setup } from '@playwright/test';

setup('authenticate as test user', async ({ page }) => {
  await page.goto('/login');
  await page.getByTestId('zitadel-login-button').click();
  const usernameField = page.getByPlaceholder('username');
  await usernameField.fill(process.env.ZITADEL_USERNAME as string);
  const usernameFwdBtn = page.getByText('next');
  await usernameFwdBtn.click();
  const passwordField = page.getByLabel('password');
  await passwordField.fill(process.env.ZITADEL_PASSWORD as string);
  const passwordFwdBtn = page.getByText('next');
  await passwordFwdBtn.click();
  await page.getByText('Willkommen auf Mumble').isVisible();
});

// test('test write mumble', async ({ page }) => {
//   await page.goto('http://localhost:3000/login');
//   await page.getByTestId('zitadel-login-button').click();
//   const usernameField = page.getByPlaceholder('username');
//   await usernameField.fill(process.env.ZITADEL_USERNAME as string);
//   const usernameFwdBtn = page.getByText('next');
//   await usernameFwdBtn.click();
//   const passwordField = page.getByLabel('password');
//   await passwordField.fill(process.env.ZITADEL_PASSWORD as string);
//   const passwordFwdBtn = page.getByText('next');
//   await passwordFwdBtn.click();
//   await page.getByText('Willkommen auf Mumble').isVisible();
//   await page.getByPlaceholder('Write something!').click();
//   await page.getByPlaceholder('Write something!').fill('This test was brought to you by #TeamLobsome');
//   await page.getByRole('button', { name: 'Submit' }).click();
//   await page.reload();
//   await page.getByText('This test was brought to you by #TeamLobsome').first().isVisible();
// });

// test('comment mumble', async ({ page }) => {
//   await page.goto('http://localhost:3000/login');
//   await page.getByTestId('zitadel-login-button').click();
//   const usernameField = page.getByPlaceholder('username');
//   await usernameField.fill(process.env.ZITADEL_USERNAME as string);
//   const usernameFwdBtn = page.getByText('next');
//   await usernameFwdBtn.click();
//   const passwordField = page.getByLabel('password');
//   await passwordField.fill(process.env.ZITADEL_PASSWORD as string);
//   const passwordFwdBtn = page.getByText('next');
//   await passwordFwdBtn.click();
//   await page.getByText('Willkommen auf Mumble').isVisible();
//   await page.getByLabel('Comments').first().click();
//   await page.getByPlaceholder('Write something!').click();
//   await page.getByPlaceholder('Write something!').fill('Nothing to see here, this post has been hijacked by #TeamLobsome');
//   await page.getByRole('button', { name: 'Submit' }).click();
//   await page.getByText('Nothing to see here, this post has been hijacked by #TeamLobsome').isVisible();
// });

// test('like ', async ({ page }) => {
//   await page.goto('http://localhost:3000/login');
//   await page.getByTestId('zitadel-login-button').click();
//   const usernameField = page.getByPlaceholder('username');
//   await usernameField.fill(process.env.ZITADEL_USERNAME as string);
//   const usernameFwdBtn = page.getByText('next');
//   await usernameFwdBtn.click();
//   const passwordField = page.getByLabel('password');
//   await passwordField.fill(process.env.ZITADEL_PASSWORD as string);
//   const passwordFwdBtn = page.getByText('next');
//   await passwordFwdBtn.click();
//   await page.getByText('Willkommen auf Mumble').isVisible();
//   await page.getByLabel('Likes').first().click();
//   await page.getByText('1 Like').isVisible();
// });

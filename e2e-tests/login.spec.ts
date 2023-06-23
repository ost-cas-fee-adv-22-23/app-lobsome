import { test as setup, test } from '@playwright/test';

setup('authenticate as test user', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByTestId('zitadel-login-button').click();

  const usernameField = page.getByPlaceholder('username');
  await usernameField.fill('lobsome-test@smartive.zitadel.cloud');
  // await loginnameField.fill(process.env.ZITADEL_USERNAME as string);
  const usernameFwdBtn = page.getByText('next');
  await usernameFwdBtn.click();

  const passwordField = page.getByLabel('password');
  await passwordField.fill('Lobsome_1234');
  // await passwordField.fill(process.env.ZITADEL_PASSWORD as string);
  const passwordFwdBtn = page.getByText('next');
  await passwordFwdBtn.click();
  await page.getByRole('heading', { name: 'Willkommen auf Mumble' }).click();
});

test('test premium modal', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await page.getByRole('heading', { name: 'Go Preimum' }).click();
});

test('like ', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByTestId('zitadel-login-button').click();

  const usernameField = page.getByPlaceholder('username');
  await usernameField.fill('lobsome-test@smartive.zitadel.cloud');
  // await loginnameField.fill(process.env.ZITADEL_USERNAME as string);
  const usernameFwdBtn = page.getByText('next');
  await usernameFwdBtn.click();

  const passwordField = page.getByLabel('password');
  await passwordField.fill('Lobsome_1234');
  // await passwordField.fill(process.env.ZITADEL_PASSWORD as string);
  const passwordFwdBtn = page.getByText('next');
  await passwordFwdBtn.click();
  await page.getByRole('heading', { name: 'Willkommen auf Mumble' }).click();
  await page.locator('div:nth-child(6) > button').first().click();
  await page.getByRole('button', { name: '1 Like' }).first().click();
});

test('test write mumble', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByTestId('zitadel-login-button').click();

  const usernameField = page.getByPlaceholder('username');
  await usernameField.fill('lobsome-test@smartive.zitadel.cloud');
  // await loginnameField.fill(process.env.ZITADEL_USERNAME as string);
  const usernameFwdBtn = page.getByText('next');
  await usernameFwdBtn.click();

  const passwordField = page.getByLabel('password');
  await passwordField.fill('Lobsome_1234');
  // await passwordField.fill(process.env.ZITADEL_PASSWORD as string);
  const passwordFwdBtn = page.getByText('next');
  await passwordFwdBtn.click();
  await page.getByPlaceholder('Write something!').click();
  await page.getByPlaceholder('Write something!').fill('This test was brought to you by #TeamLobsome');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Load new posts!' }).click();
  await page.locator('div:nth-child(6) > button').first().click();
  await page.getByText('This test was brought to you by #TeamLobsome').click();
});

test('comment mumble', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByTestId('zitadel-login-button').click();

  const usernameField = page.getByPlaceholder('username');
  await usernameField.fill('lobsome-test@smartive.zitadel.cloud');
  // await loginnameField.fill(process.env.ZITADEL_USERNAME as string);
  const usernameFwdBtn = page.getByText('next');
  await usernameFwdBtn.click();

  const passwordField = page.getByLabel('password');
  await passwordField.fill('Lobsome_1234');
  // await passwordField.fill(process.env.ZITADEL_PASSWORD as string);
  const passwordFwdBtn = page.getByText('next');
  await passwordFwdBtn.click();
  await page.getByRole('heading', { name: 'Willkommen auf Mumble' }).click();
  await page.locator('div:nth-child(6) > a > .flex').first().click();
  await page.getByPlaceholder('Write something!').click();
  await page.getByPlaceholder('Write something!').fill('Nothing to see here, this post has been hijacked by #TeamLobsome');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Nothing to see here, this post has been hijacked by #TeamLobsome').click();
});

import { test, expect } from '@playwright/test';
import { APIHelper } from './apiHelper';


const BASE_URL = 'http://localhost:3000';

test.describe('Test suite Tester Hotel backend', () => {
  let apiHelper: APIHelper;

  test.beforeAll(async ({ request }) => {
    apiHelper = new APIHelper(BASE_URL, `${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
    const loginResponse = await apiHelper.login(request);
    expect(loginResponse.ok()).toBeTruthy();
    const loginData = await loginResponse.json();
    expect(loginData).toHaveProperty('token');
  })

  test('Test case 01, login', async ({ request }) => {

    const loginResponse = await apiHelper.login(request);
    const loginData = await loginResponse.json();
    expect(loginResponse.ok()).toBeTruthy();
    expect(loginData).toMatchObject({
      username: `${process.env.TEST_USERNAME}`
    });

  });
});
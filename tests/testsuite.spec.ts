import { test, expect } from '@playwright/test';
import { APIHelper } from './apiHelper';
import { generateNewClientPayload } from './testData';
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

  test('Test case 02, Get rooms', async ({ request }) => {
    const roomsResponse = await apiHelper.getRooms(request);
    expect(roomsResponse.ok()).toBeTruthy();

  });

  test('Test case 03, Get clients', async ({ request }) => {
    const roomsResponse = await apiHelper.getClients(request);
    expect(roomsResponse.ok()).toBeTruthy();

  });

  test('Test case 04, New client', async ({ request }) => {
    const payload = generateNewClientPayload();
    const newClientResponse = await apiHelper.newClient(request, payload);
    expect(newClientResponse.ok()).toBeTruthy();
    const responseData = await newClientResponse.json();
    expect(responseData).toHaveProperty('id');
    expect(responseData).toMatchObject({
      name: payload.name,
      email: payload.email,
      telephone: payload.telephone
    });

  });
});

import { test, expect } from '@playwright/test';
import { APIHelper } from './apiHelper';
import { generateNewClientPayload, generateNewBillPayload } from './testData';
const BASE_URL = 'http://localhost:3000/api';

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
    const clientsResponse = await apiHelper.getClients(request);
    expect(clientsResponse.ok()).toBeTruthy();

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

  test('Test case 05, edit client', async ({ request }) => {
    const payload = generateNewClientPayload();
    const editClientResponse = await apiHelper.editClient(request, payload);
    expect(editClientResponse.ok()).toBeTruthy();
    const responseData = await editClientResponse.json();
    expect(responseData).toMatchObject({
      name: payload.name,
      email: payload.email,
      telephone: payload.telephone
    });

  });

  test('Test case 06 - delete client', async ({ request }) => {
    const getAllClients = await apiHelper.getClients(request);
    expect(getAllClients.ok()).toBeTruthy();
    const getClient = await getAllClients.json();
    const lastButOneID = getClient[getClient.length - 2].id;
    const deleteRequest = await apiHelper.deleteClient(request, lastButOneID);
    expect(deleteRequest.ok()).toBeTruthy();

  });

  test('Test case 07, Get bills', async ({ request }) => {
    const bilsResponse = await apiHelper.getBills(request);
    expect(bilsResponse.ok()).toBeTruthy();

  });

  test('Test case 08, New bill', async ({ request }) => {
    const payload = generateNewBillPayload();
    const newBillResponse = await apiHelper.newBill(request, payload);
    expect(newBillResponse.ok()).toBeTruthy();
    const responseData = await newBillResponse.json();
    expect(responseData).toHaveProperty('id');
    expect(responseData).toMatchObject({
      value: payload.value

    });
  });

  test('Test case 09, Get Reservations', async ({ request }) => {
    const bilsResponse = await apiHelper.getReservations(request);
    expect(bilsResponse.ok()).toBeTruthy();
  });

});
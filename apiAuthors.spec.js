const { test, expect } = require('@playwright/test');
const axios = require('axios');

test.describe('API /api/v1/Authors/authors/books/{idBook}', () => {
  const baseUrl = 'https://fakerestapi.azurewebsites.net';
  
  test('Verify API returns authors for a given book ID', async ({ request }) => {
    const idBook = 1; // Example book ID

    const response = await request.get(`${baseUrl}/api/v1/Authors/authors/books/${idBook}`);
    const status = response.status();
    const responseBody = await response.json();

    expect(status).toBe(200);

    console.log('Response:', responseBody);

    // Assert the response body is an array
    expect(Array.isArray(responseBody)).toBeTruthy();

    // Assert at least one author is returned
    expect(responseBody.length).toBeGreaterThan(0);

    // Validate structure of an author object
    const author = responseBody[0];
    expect(author).toHaveProperty('id');
    expect(author).toHaveProperty('idBook', idBook);
    expect(author).toHaveProperty('firstName');
    expect(author).toHaveProperty('lastName');
  });
});
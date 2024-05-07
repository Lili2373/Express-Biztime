process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

describe('GET /companies', () => {
    test('it should respond with a list of companies', async () => {
        const response = await request(app).get('/companies');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('companies');
        expect(Array.isArray(response.body.companies)).toBe(true);
    });
});

describe('GET /companies/:code', () => {
    test('it should respond with details of a company', async () => {
        const response = await request(app).get(`/companies/ ${test.companies.code}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('company');
        expect(response.body.company).toHaveProperty('code');
        expect(response.body.company).toHaveProperty('name');
        expect(response.body.company).toHaveProperty('description');
        expect(response.body.company).toHaveProperty('invoices');
        expect(Array.isArray(response.body.company.invoices)).toBe(true);
    });
});

describe('POST /companies', () => {
    test('it should add a new company', async () => {
        const newCompany = {
            name: 'New Company',
            description: 'Description of New Company'
        };
        const response = await request(app)
            .post('/companies')
            .send(newCompany);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('company');
        expect(response.body.company).toHaveProperty('code');
        expect(response.body.company).toHaveProperty('name', newCompany.name);
        expect(response.body.company).toHaveProperty('description', newCompany.description);
    });
});

describe('PUT /companies/:code', () => {
    test('it should update an existing company', async () => {
        const updatedCompany = {
            name: 'Updated Company Name',
            description: 'Updated Description'
        };
        const response = await request(app)
            .put(`/companies/ ${test.companies.code}`)
            .send(updatedCompany);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('company');
        expect(response.body.company).toHaveProperty('code', 'your_company_code');
        expect(response.body.company).toHaveProperty('name', updatedCompany.name);
        expect(response.body.company).toHaveProperty('description', updatedCompany.description);
    });
});

describe('DELETE /companies/:code', () => {
    test('it should delete an existing company', async () => {
        const response = await request(app)
            .delete(`/companies/ ${test.companies.code}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'deleted');
    });
});


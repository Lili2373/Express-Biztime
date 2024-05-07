process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

describe('GET /invoices', () => {
    test('it should respond with a list of invoices', async () => {
        const response = await request(app).get('/invoices');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('invoices');
        expect(Array.isArray(response.body.invoices)).toBe(true);
    });
});

describe('GET /invoices/:id', () => {
    test('it should respond with details of an invoice', async () => {
        const response = await request(app).get(`/invoices//${testinvoices.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('invoice');
        expect(response.body.invoice).toHaveProperty('id');
        expect(response.body.invoice).toHaveProperty('company');
        expect(response.body.invoice).toHaveProperty('amt');
        expect(response.body.invoice).toHaveProperty('paid');
        expect(response.body.invoice).toHaveProperty('add_date');
        expect(response.body.invoice).toHaveProperty('paid_date');
    });
});

describe('POST /invoices', () => {
    test('it should add a new invoice', async () => {
        const newInvoice = {
            comp_code: 'your_company_code', // Replace 'your_company_code' with an actual company code
            amt: 100
        };
        const response = await request(app)
            .post('/invoices')
            .send(newInvoice);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('invoice');
        expect(response.body.invoice).toHaveProperty('id');
        expect(response.body.invoice).toHaveProperty('comp_code', newInvoice.comp_code);
        expect(response.body.invoice).toHaveProperty('amt', newInvoice.amt);
    });
});

describe('PUT /invoices/:id', () => {
    test('it should update an existing invoice', async () => {
        const updatedInvoice = {
            amt: 200,
            paid: true
        };
        const response = await request(app)
            .put(`/invoices//${testinvoices.id}`)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('invoice');
        expect(response.body.invoice).toHaveProperty('id', testinvoices.id);
        expect(response.body.invoice).toHaveProperty('amt', updatedInvoice.amt);
        expect(response.body.invoice).toHaveProperty('paid', updatedInvoice.paid);
    });
});

describe('DELETE /invoices/:id', () => {
    test('it should delete an existing invoice', async () => {
        const response = await request(app)
            .delete(`/invoices//${testinvoices.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'deleted');
    });
});

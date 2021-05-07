import request from 'supertest';
import app from '../src/app';

let id = '';

interface testInterface {
  organization: string;
  products: string[];
  marketValue: string;
  address: string;
  ceo: string;
  country: string;
  noOfEmployees: number;
  employees: string[];
}

interface DataObject {
  id: number;
  organization: string;
  products: string[];
  marketValue: string;
  address: string;
  ceo: string;
  country: string;
  noOfEmployees: number;
  employees: string[];
  createdAt: Date;
  updatedAt?: Date;
}

let dataPreFilled: DataObject | {} = {};

const testData: testInterface = {
  organization: 'node ninja',
  products: ['developers', 'pizza'],
  marketValue: '90%',
  address: 'sangotedo',
  ceo: 'cn',
  country: 'Taiwan',
  noOfEmployees: 2,
  employees: ['james bond', 'jackie chan'],
};

describe('create organization', () => {
  it('should create an organization', async () => {
    const res = await request(app).post('/api').send(testData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual('success');

    id = res.body.data.id || res.body.data[0].id;
    if (Array.isArray(res.body.data)) {
      // eslint-disable-next-line prefer-destructuring
      dataPreFilled = res.body.data[0];
    } else {
      dataPreFilled = res.body.data;
    }
  });
});

describe('fetch data', () => {
  it('should get all organizations', async () => {
    const res = await request(app).get('/api');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual('success');
    expect(Array.isArray(res.body.data)).toBe(true);
  });
  it('should get one organization', async () => {
    const res = await request(app).get(`/api/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual('success');
    expect(res.body.data[0] || res.body.data).toMatchObject(dataPreFilled);
  });
});

describe('update an organization', () => {
  it('should update an organization', async () => {
    testData.organization = 'updated ninja';
    const res = await request(app).put(`/api/${id}`).send(testData);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual('success');
    expect(res.body.data.id).toBe(id);
    expect(res.body.data.organization).toBe('updated ninja');
  });
});

describe('delete an organization', () => {
  it('should delete an organization', async () => {
    const res = await request(app).delete(`/api/${id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual('success');
  });
});

describe('should show 404 error when trying to get a deleted data', () => {
  it('should show 404 error for deleted data', async () => {
    const res = await request(app).get(`/api/${id}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual('fail');
  });
});

describe('should show 404 error when trying to update a deleted data', () => {
  it('should show 404 error for deleted data', async () => {
    const res = await request(app).put(`/api/${id}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual('fail');
  });
});

describe('should show 404 error when trying to delete a deleted data', () => {
  it('should show 404 error for deleted data', async () => {
    const res = await request(app).delete(`/api/${id}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual('fail');
  });
});

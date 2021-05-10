import request from 'supertest';
import app from '../app';
import fs from 'fs';

interface rectData {
  a: number | string;
  b: number | string;
}

interface triData extends rectData {
  c: number | string;
}

interface dataInterface {
  shape: string;
  dimension: number | rectData | triData | string;
}

afterAll(async () => {
  await cleanUpDb();
});

describe('Square', () => {
  it('should calculate the area of a square', async () => {
    const testData: dataInterface = {
      shape: 'square',
      dimension: 3,
    };
    const res = await request(app).post('/calculate').send(testData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual('success');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data).toHaveProperty('shape');
    expect(res.body.data).toHaveProperty('dimension');
    expect(res.body.data).toHaveProperty('createdAt');
    expect(res.body.data.result).toBe(9);
  });

  it('should throw an error for a dimension of string -square', async () => {
    const testData: dataInterface = {
      shape: 'square',
      dimension: '3',
    };
    const res = await request(app).post('/calculate').send(testData);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('message');
    expect(res.body.status).toEqual('fail');
    expect(res.body.message).toBe('invalid dimension');
  });
});

describe('circle', () => {
  it('should calculate the area of a circle', async () => {
    const testData: dataInterface = {
      shape: 'circle',
      dimension: 3,
    };
    const res = await request(app).post('/calculate').send(testData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual('success');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data).toHaveProperty('shape');
    expect(res.body.data).toHaveProperty('dimension');
    expect(res.body.data).toHaveProperty('createdAt');
    expect(res.body.data.result).toBe(28.27);
  });

  it('should throw an error for an invalid dimension -circle', async () => {
    const testData: dataInterface = {
      shape: 'circle',
      dimension: '3',
    };
    const res = await request(app).post('/calculate').send(testData);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('message');
    expect(res.body.status).toEqual('fail');
    expect(res.body.message).toBe('invalid dimension');
  });
});

describe('rectangle', () => {
  it('should calculate the area of a rectangle', async () => {
    const testData: dataInterface = {
      shape: 'rectangle',
      dimension: { a: 3, b: 6 },
    };
    const res = await request(app).post('/calculate').send(testData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual('success');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data).toHaveProperty('shape');
    expect(res.body.data).toHaveProperty('dimension');
    expect(res.body.data).toHaveProperty('createdAt');
    expect(res.body.data.result).toBe(18);
  });

  it('should throw an error for an invalid -rectangle', async () => {
    const testData: dataInterface = {
      shape: 'circle',
      dimension: { a: 3, b: '6' },
    };
    const res = await request(app).post('/calculate').send(testData);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('message');
    expect(res.body.status).toEqual('fail');
    expect(res.body.message).toBe('invalid dimension');
  });
});

describe('triangle', () => {
  it('should calculate the area of a triangle', async () => {
    const testData: dataInterface = {
      shape: 'triangle',
      dimension: { a: 13, b: 6, c: 10 },
    };
    const res = await request(app).post('/calculate').send(testData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual('success');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data).toHaveProperty('shape');
    expect(res.body.data).toHaveProperty('dimension');
    expect(res.body.data).toHaveProperty('createdAt');
    expect(res.body.data.result).toBe(28.84);
  });

  it('should throw an error for an invalid dimension -triangle', async () => {
    const testData: dataInterface = {
      shape: 'circle',
      dimension: { a: 3, b: '6' },
    };
    const res = await request(app).post('/calculate').send(testData);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('message');
    expect(res.body.status).toEqual('fail');
    expect(res.body.message).toBe('invalid dimension');
  });
});

describe('Get all data', () => {
  it('should fetch all data', async () => {
    const res = await request(app).get('/fetchRecords');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual('success');
    expect(Array.isArray(res.body.data)).toBeTruthy();
  });
});

const cleanUpDb = async () => {
  const dbPath = `${__dirname}/../database-test.json`;
  await fs.promises.writeFile(dbPath, '');
};

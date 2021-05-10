import { Request, Response } from 'express';
import fs from 'fs';

const dbPath =
  process.env.NODE_ENV === 'test'
    ? `${__dirname}/../database-test.json`
    : `${__dirname}/../database.json`;

interface dataObj {
  id: number;
  shape: string;
  dimension: number | {};
  result: number;
  createdAt: Date;
}

interface rectDimension {
  a: number;
  b: number;
}

interface triangleDimension extends rectDimension {
  c: number;
}

export const calcResult = async (req: Request, res: Response) => {
  try {
    let result: number = 0;

    req.body.shape === 'square' ? (result = calcSquare(req.body.dimension)) : 0;
    req.body.shape === 'circle' ? (result = calcCircle(req.body.dimension)) : 0;
    req.body.shape === 'triangle'
      ? (result = calcTriangle(req.body.dimension))
      : 0;
    req.body.shape == 'rectangle'
      ? (result = calcRectangle(req.body.dimension))
      : 0;

    if (result && result > 1) {
      const db = await readDb();

      const data: dataObj = {
        id: db.id + 1,
        shape: req.body.shape,
        dimension: req.body.dimension,
        result,
        createdAt: new Date(Date.now()),
      };

      const allData = [...db.data, data];

      writeToDb(allData);
      return res.status(201).json({
        status: 'success',
        data,
      });
    }

    res.status(400).json({
      status: 'fail',
      message: 'invalid dimension',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'invalid dimension',
    });
  }
};

const calcSquare = (dimension: number): number => {
  if (typeof dimension !== 'number') throw new Error('invalid dimension');

  return dimension * dimension;
};

const calcCircle = (dimension: number): number => {
  if (typeof dimension !== 'number') throw new Error('invalid dimension');

  return +(Math.PI * dimension * dimension).toFixed(2);
};

const calcRectangle = (dimension: rectDimension): number => {
  if (typeof dimension.a !== 'number' || typeof dimension.b !== 'number')
    throw new Error('invalid dimension');

  return dimension.a * dimension.b;
};

const calcTriangle = (dimension: triangleDimension): number => {
  const { a, b, c } = dimension;

  if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number')
    throw new Error('invalid dimension');
  const s: number = (a + b + c) / 2;

  return +Math.sqrt(s * ((s - a) * (s - b) * (s - c))).toFixed(2);
};

export const readDb = async () => {
  try {
    const db = await fs.promises.readFile(dbPath, 'utf-8');
    const data = JSON.parse(db);

    return {
      data,
      id: data.length + 1,
    };
  } catch (error) {
    return {
      data: [],
      id: 0,
    };
  }
};

const writeToDb = (data: dataObj[]) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

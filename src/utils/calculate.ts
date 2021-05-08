import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';

const dbPath = `${__dirname}/../database.json`;

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

export const calcResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result: number = 0;
    console.log(req.body.dimension);

    req.body.shape === 'square' ? (result = calcSquare(req.body.dimension)) : 0;
    req.body.shape === 'circle' ? (result = calcCircle(req.body.dimension)) : 0;
    req.body.shape === 'triangle'
      ? (result = calcTriangle(req.body.dimension))
      : 0;
    req.body.shape == 'rectangle'
      ? (result = calcRectangle(req.body.dimension))
      : 0;

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

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'an error occurred',
    });
  }
};

const calcSquare = (dimension: number): number => {
  return dimension * dimension;
};

const calcCircle = (dimension: number): number => {
  return +(Math.PI * dimension * dimension).toFixed(2);
};

const calcRectangle = (dimension: rectDimension): number => {
  return dimension.a * dimension.b;
};

const calcTriangle = (dimension: triangleDimension): number => {
  const { a, b, c } = dimension;
  const s: number = (a + b + c) / 2;

  return +Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(2);
};

export const readDb = async () => {
  try {
    const db = await fs.promises.readFile(dbPath, 'utf-8');
    const data = JSON.parse(db);

    return {
      data,
      id: data.length + 1,
    };
  } catch (e) {
    return {
      data: [],
      id: 0,
    };
  }
};

const writeToDb = (data: dataObj[]) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

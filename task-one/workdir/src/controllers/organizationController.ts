import { Request, Response } from 'express';
import fs from 'fs';

const dbPath = `${__dirname}/../data/database.json`;

export interface DataObject {
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
const writeFile = (data: DataObject[]) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

export const createOrganization = (req: Request, res: Response) => {
  try {
    const database = fs.readFileSync(dbPath, 'utf-8');
    const oldData = JSON.parse(database);
    const lastId = oldData[oldData.length - 1].id;
    const newData = {
      ...req.body,
      createdAt: new Date(Date.now()),
      id: lastId + 1,
    };

    const allData = [...oldData, newData];

    writeFile(allData);
    res.status(201).json({
      status: 'success',
      data: newData,
    });
  } catch (error: any) {
    if (req.body) {
      const data = [{ ...req.body, id: 1, createdAt: new Date(Date.now()) }];
      writeFile(data);
      res.status(200).json({
        status: 'success',
        data,
      });
    } else {
      res.status(400).json({
        status: 'bad req ❌',
        message: 'missing body',
      });
    }
  }
};

export const getAllOrganizations = (req: Request, res: Response) => {
  try {
    const database = fs.readFileSync(dbPath, 'utf-8');
    const parsedData = JSON.parse(database);
    res.status(200).json({
      status: 'success',
      results: parsedData.length,
      data: parsedData,
    });
  } catch (error: any) {
    res.status(404).json({
      status: 'fail',
      message: 'data not found',
    });
  }
};

export const getOneOrganization = (req: Request, res: Response) => {
  try {
    const database = fs.readFileSync(dbPath, 'utf-8');
    const parsedData = JSON.parse(database);

    const requestedData = parsedData.find(
      (el: DataObject) => el.id === +req.params.id,
    );
    if (!requestedData) throw new Error('data not found');

    res.status(200).json({
      status: 'success',
      data: requestedData,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'data not found',
    });
  }
};

export const updateOrganization = (req: Request, res: Response) => {
  try {
    const database = fs.readFileSync(dbPath, 'utf-8');
    const parsedData = JSON.parse(database);
    const dataToUpdate = parsedData.find(
      (el: DataObject) => el.id === +req.params.id,
    );
    const dataIndex = parsedData.findIndex(
      (el: DataObject) => el.id === +req.params.id,
    );

    if (dataToUpdate) {
      const updatedData = {
        ...dataToUpdate,
        ...req.body,
        updatedAt: new Date(Date.now()),
      };
      parsedData.splice(dataIndex, 1, updatedData);
      writeFile(parsedData);
      res.status(200).json({
        status: 'success',
        data: updatedData,
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'document not found',
      });
    }
  } catch (error: any) {
    res.status(404).json({
      status: 'fail',
      message: 'an error occurred',
    });
  }
};

export const deleteOrganization = (req: Request, res: Response) => {
  try {
    const database = fs.readFileSync(dbPath, 'utf-8');
    const parsedData = JSON.parse(database);
    const dataToDelete = parsedData.find(
      (el: DataObject) => el.id === +req.params.id,
    );
    const dataIndex = parsedData.findIndex(
      (el: DataObject) => el.id === +req.params.id,
    );

    if (dataToDelete) {
      parsedData.splice(dataIndex, 1);
      writeFile(parsedData);
      res.status(200).json({
        status: 'success',
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'document not found',
      });
    }
  } catch (error: any) {
    res.status(404).json({
      status: 'fail',
      message: 'an error occurred',
    });
  }
};

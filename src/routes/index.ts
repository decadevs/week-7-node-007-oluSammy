import express, { Request, Response, NextFunction } from 'express';
import { calcResult, readDb } from '../utils/calculate';

const router = express.Router();

// const

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('home');
});

router.post('/calculate', (req: Request, res: Response, next: NextFunction) => {
  const shape: string = req.body.shape.toLocaleLowerCase();

  const shapesArr = ['square', 'circle', 'rectangle', 'triangle'];

  if (shapesArr.includes(req.body.shape.toLocaleLowerCase())) {
    calcResult(req, res);
  } else {
    return res.status(400).json({
      status: 'fail',
      message: 'your request does not contain a valid shape',
    });
  }
});

router.get(
  '/fetchRecords',
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await readDb();
    res.status(200).json({
      status: 'success',
      data: data.data,
    });
  }
);

export default router;

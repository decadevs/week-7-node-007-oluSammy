import morgan from 'morgan';
import express from 'express';
import router from './routes/organizationRoutes';

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use('/api', router);

export default app;

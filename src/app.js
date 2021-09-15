import express from 'express';
import morgan from 'morgan';
import mealsRouter from './routes/mealsRouter';
import ingredientsRouter from './routes/ingredientsRouter';

const app = express();

// Logging middleware
app.use(morgan('dev'));

// JSON req body parser middleware
app.use(express.json());

// Mount routers
app.use('/meals', mealsRouter);
app.use('/ingredients', ingredientsRouter);

export default app;

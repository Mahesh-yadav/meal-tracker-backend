import express from 'express';
import morgan from 'morgan';
import mealsRouter from './routes/mealsRouter';
import ingredientsRouter from './routes/ingredientsRouter';
import recipesRouter from './routes/recipesRouter';
import shoppingRouter from './routes/shoppingRouter';

const app = express();

// Logging middleware
app.use(morgan('dev'));

// JSON req body parser middleware
app.use(express.json());

// Mount routers
app.use('/meals', mealsRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/recipes', recipesRouter);
app.use('/shopping-items', shoppingRouter);

export default app;

import { Router } from 'express';
import { weatherController } from '../controllers/weatherController';

export const weatherRouter = Router();

weatherRouter.get('/:country', weatherController);

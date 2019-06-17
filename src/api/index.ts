import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import client from './routes/client';
import employee from './routes/employee';
import newSletter from './routes/newSletter';
import event from './routes/event';

const app = Router();
auth(app);
user(app);
client(app);
employee(app);
newSletter(app);
event(app);

export default app;
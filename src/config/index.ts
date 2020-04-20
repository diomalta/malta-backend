import * as dotenv from 'dotenv';
import * as path from 'path';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT, 10),
  databaseURLMaster: process.env.MONGODB_URI_MASTER,
  databaseURLDev: process.env.MONGODB_URI_DEV,
  jwtSecret: process.env.JWT_SECRET,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: process.env.AGENDA_CONCURRENCY,
  },
  mailer: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 0,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    templatesPath: path.resolve('./src/resources/mail'),
  },
  api: {
    prefix: '/api',
  },
};

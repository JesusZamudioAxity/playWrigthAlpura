import dotenv from 'dotenv';

dotenv.config();

export const ENV = process.env.ENV || 'qa';

const environments = {
  dev: {
    baseURL: process.env.DEV_BASE_URL,
  },
  qa: {
    baseURL: process.env.QA_BASE_URL,
  },
  uat: {
    baseURL: process.env.UAT_BASE_URL,
  },
};

export const BASE_URL = environments[ENV as keyof typeof environments].baseURL!;

console.log('ENV:', ENV);
console.log('BASE_URL:', BASE_URL);

export const DB_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const DEFAULT_TIMEOUT = Number(process.env.DEFAULT_TIMEOUT) || 30000;
import dotenv from 'dotenv';

dotenv.config();

export const ENV = process.env.ENV || 'qa';

const environments = {
  dev: {
    apiBaseURL: process.env.DEV_API_BASE_URL,
    webBaseURL: process.env.DEV_WEB_BASE_URL,
  },
  qa: {
    apiBaseURL: process.env.QA_API_BASE_URL,
    webBaseURL: process.env.QA_WEB_BASE_URL,
  },
  uat: {
    apiBaseURL: process.env.UAT_API_BASE_URL,
    webBaseURL: process.env.UAT_WEB_BASE_URL,
  },
};

export const API_BASE_URL =
  environments[ENV as keyof typeof environments].apiBaseURL!;

export const WEB_BASE_URL =
  environments[ENV as keyof typeof environments].webBaseURL!;

console.log('ENV:', ENV);
console.log('API_BASE_URL:', API_BASE_URL);
console.log('WEB_BASE_URL:', WEB_BASE_URL);

export const DB_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const DEFAULT_TIMEOUT = Number(process.env.DEFAULT_TIMEOUT) || 30000;
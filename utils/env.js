import dotenv from 'dotenv';

dotenv.config();

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Variable de entorno faltante: ${name}`);
  }
  return value;
}

export const ENV = {
  BASE_URL: required('TODOIST_BASE_URL'),
  EMAIL: required('TODOIST_EMAIL'),
  PASSWORD: required('TODOIST_PASSWORD')
};

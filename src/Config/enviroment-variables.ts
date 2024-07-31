import * as process from 'node:process';

interface Env {
  JWT_SECRET: string;
}

export const env = (): Env => {
  return {
    JWT_SECRET: process.env.JWT_SECRET
  }
}



import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const EnvSchema = Joi.object({
  NODE_ENV: Joi.string().required().valid('DEVELOPMENT', 'PRODUCTION'),
  NODE_COOKIE_EXPIRES_IN: Joi.number().required(),
  NODE_COOKIE_SECRET: Joi.string().required(),
  NODE_JWT_EXPIRES_IN: Joi.number().required(),
  NODE_JWT_SECRET: Joi.string().required(),
  NODE_HOST_NODEMAILER: Joi.string().required(),
  NODE_PORT_NODEMAILER: Joi.number().required(),
  NODE_USERNAME_NODEMAILER: Joi.string().required(),
  NODE_PASSWORD_NODEMAILER: Joi.string().required(),
  FRONT_URL: Joi.string().required(),
});

export default registerAs('env', () => {
  const values = {
    NODE_ENV: process.env.NODE_ENV,
    NODE_COOKIE_EXPIRES_IN: process.env.NODE_COOKIE_EXPIRES_IN,
    NODE_COOKIE_SECRET: process.env.NODE_COOKIE_SECRET,
    NODE_JWT_EXPIRES_IN: process.env.NODE_JWT_EXPIRES_IN,
    NODE_JWT_SECRET: process.env.NODE_JWT_SECRET,
    NODE_HOST_NODEMAILER: process.env.NODE_HOST_NODEMAILER,
    NODE_PORT_NODEMAILER: process.env.NODE_PORT_NODEMAILER,
    NODE_USERNAME_NODEMAILER: process.env.NODE_USERNAME_NODEMAILER,
    NODE_PASSWORD_NODEMAILER: process.env.NODE_PASSWORD_NODEMAILER,
    FRONT_URL: process.env.FRONT_URL,
  };

  const { error } = EnvSchema.validate(values, { abortEarly: false });

  if (error) {
    throw new Error(
      `Validation failed - Is there an environment variable missing?
        ${error.message}`,
    );
  }

  return values;
});

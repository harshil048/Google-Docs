require("dotenv").config();
if (
  process.env.NODE_ENV === undefined ||
  process.env.HOST === undefined ||
  process.env.PORT === undefined ||
  process.env.DATABASE_URL === undefined ||
  process.env.USER === undefined ||
  process.env.PASSWORD === undefined ||
  process.env.DB_HOST === undefined ||
  process.env.DB_PORT === undefined ||
  process.env.DATABASE === undefined ||
  process.env.SMTP_HOST === undefined ||
  process.env.SMTP_PORT === undefined ||
  process.env.SMTP_USER === undefined ||
  process.env.SMTP_PASSWORD === undefined ||
  process.env.REFRESH_TOKEN_SECRET === undefined ||
  process.env.ACCESS_TOKEN_SECRET === undefined ||
  process.env.ACCESS_TOKEN_EXPIRATION === undefined ||
  process.env.REFRESH_TOKEN_EXPIRATION === undefined ||
  process.env.EMAIL_VERIFICATION_SECRET === undefined
) {
  throw new Error("Environment variables missing.");
}

const env = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DATABASE: process.env.DATABASE,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,
  EMAIL_VERIFICATION_SECRET: process.env.EMAIL_VERIFICATION_SECRET,
};
console.log(env);

export default env;

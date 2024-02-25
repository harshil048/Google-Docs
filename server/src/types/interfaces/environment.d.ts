declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: "test" | "development" | "production";
      HOST?: string;
      PORT?: string;
      DATABASE_URL?: string;
      USER?: string;
      PASSWORD?: string;
      DB_HOST?: string;
      DB_PORT?: string;
      DATABASE?: string;
      SMTP_HOST?: string;
      SMTP_PORT?: number;
      SMTP_USER?: string;
      SMTP_PASSWORD?: string;
      REFRESH_TOKEN_SECRET?: string;
      ACCESS_TOKEN_SECRET?: string;
      ACCESS_TOKEN_EXPIRATION?: string;
      REFRESH_TOKEN_EXPIRATION?: string;
      EMAIL_VERIFICATION_SECRET?: string;
    }
  }
}

export {};

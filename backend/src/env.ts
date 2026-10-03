import "dotenv/config";

const port = Number(process.env.PORT);

if (!port) {
  throw new Error("ENV: PORT NOT SET");
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("ENV: DATABASE_URL NOT SET");
}

export const env = {
  PORT: port,
  DATABASE_URL: databaseUrl
};
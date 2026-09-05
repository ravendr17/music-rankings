import express from 'express';
import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL!);

const app = express();

const port = process.env.PORT ?? 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'hello world'
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
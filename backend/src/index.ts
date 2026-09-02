import 'dotenv/config';
import express from 'express';

const app = express();

const port = Number(process.env['PORT'] ?? 3000);

app.get('/', (_, res) => {
  res.send({message: 'hello world'});
});

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
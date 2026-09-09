import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import Fastify from 'fastify';

const db = drizzle(process.env.DATABASE_URL!);

const fastify = Fastify({
  logger: true
});

fastify.get('/', async (_, __) => {
  return { message: 'hello world'};
});


const start = async () => {
  try {
    await fastify.listen({port: 3000});
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start()
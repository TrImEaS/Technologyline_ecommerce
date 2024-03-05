import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/.';
import { productsImages } from './src/product-images';

const dbUrl = 'libsql://technologyline-database-trimeas.turso.io';
const dbToken = 'tu_token_de_autenticacion';

const client = createClient({
  url: dbUrl,
  authToken: dbToken,
});

const db = drizzle(client);

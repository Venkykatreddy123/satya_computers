const { createClient } = require('@libsql/client');
require('dotenv').config();

async function main() {
  const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN
  });

  try {
    const result = await client.execute('SELECT orderId, companyName, status FROM "Order" LIMIT 10');
    console.table(result.rows);
  } catch (err) {
    console.error(err);
  }
}

main();

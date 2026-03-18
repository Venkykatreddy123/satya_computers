require('dotenv').config();
const { createClient } = require('@libsql/client');

const db = createClient({ url: process.env.DATABASE_URL, authToken: process.env.DATABASE_AUTH_TOKEN });

db.execute("SELECT id, name, brand, price FROM Product ORDER BY brand, price")
  .then(r => {
    const products = r.rows.map(row => ({ id: row.id, name: row.name, brand: row.brand, price: row.price }));
    console.log(JSON.stringify(products, null, 2));
  })
  .catch(e => console.error(e.message));

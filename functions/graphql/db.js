require('dotenv').config();
const faunadb = require('faunadb');
const query = faunadb.query;
function createClient() {
  if (!process.env.FAUNA_ADMIN) {
    throw new Error(
      `No FAUNA_ADMIN in environment, skipping client creation`
    );
  }
  const client = new faunadb.Client({
    secret: process.env.FAUNA_ADMIN
  });
  return client;
}
exports.client = createClient();
exports.query = query;
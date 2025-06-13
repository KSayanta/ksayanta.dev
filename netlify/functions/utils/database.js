import { neon } from "@neondatabase/serverless";
import { Client } from "pg";
import retry from "retry";
const connectionString = process.env.NETLIFY_DATABASE_URL;

export async function getPgversion() {
  const sql = neon(connectionString);
  const result = await sql("SELECT version();");
  return result;
}

export async function connectWithRetry(query) {
  const operation = retry.operation({
    retries: 5,
    minTimeout: 500,
    maxTimeout: 10000,
    randomize: true,
  });

  return new Promise((resolve, reject) => {
    operation.attempt(async (currentAttempt) => {
      const client = new Client({ connectionString });
      try {
        await client.connect();
        const res = await client.query(query);
        resolve(res.rows);
        await client.end();
      } catch (err) {
        if (operation.retry(err)) {
          console.warn(
            `Failed to connect on attempt ${currentAttempt}, retrying...`,
          );
          return;
        } else {
          reject(operation.mainError());
        }
      }
    });
  });
}

import { neon } from "@neondatabase/serverless";

export async function getPgversion() {
  const sql = neon(process.env.NETLIFY_DATABASE_URL);
  const result = await sql("SELECT version();");
  return result;
}

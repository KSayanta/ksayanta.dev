import { neon } from "@neondatabase/serverless";
import * as jose from "jose";

const sql = neon(process.env.NETLIFY_DATABASE_URL);
const stack = process.env.STACK_PROJECT_ID;

export async function getVans(_, res) {
  try {
    const vans = await sql("SELECT * from vans;");
    res.json(vans);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export async function getVanById(req, res) {
  try {
    const { id } = req.params;
    const van = await sql(`SELECT * FROM vans WHERE vans.id = ${id};`);
    if (van.length < 1) {
      throw {
        message: "Incorrect id",
      };
    }
    res.json(van[0]);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export async function getAdminVans(req, res) {
  try {
    const { "x-stack-access-token": accessToken } = req.headers;
    if (!accessToken) {
      throw {
        status: 403,
        message: "Could not verify user",
      };
    }

    const jwks = jose.createRemoteJWKSet(
      new URL(
        `https://api.stack-auth.com/api/v1/projects/${stack}/.well-known/jwks.json`,
      ),
    );

    const { payload } = await jose.jwtVerify(accessToken, jwks);
    const userId = payload.sub;

    const adminVans = await sql(
      `SELECT * FROM vans WHERE vans.hostId='${userId}'`,
    );
    if (adminVans.length < 1) {
      throw {
        status: 404,
        message: "Incorrect id",
      };
    }
    res.json(adminVans);
  } catch (err) {
    console.error(err);
    res.status(err.status).json({ message: err.message });
  }
}

export async function getAdminVansById(req, res) {
  try {
    const { id } = req.params;
    const { "x-stack-access-token": accessToken } = req.headers;
    if (!accessToken) {
      throw {
        status: 403,
        message: "Could not verify user",
      };
    }

    const jwks = jose.createRemoteJWKSet(
      new URL(
        `https://api.stack-auth.com/api/v1/projects/${stack}/.well-known/jwks.json`,
      ),
    );
    const { payload } = await jose.jwtVerify(accessToken, jwks);
    const userId = payload.sub;

    const adminVan = await sql(
      `SELECT * FROM vans WHERE vans.hostId='${userId}' AND vans.id=${id}`,
    );
    if (adminVan.length < 1) {
      throw {
        message: "Incorrect id",
      };
    }
    res.json(adminVan[0]);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

// Mock user auth
// export function authUsers(req, res) {
//   const { email, password } = JSON.parse(req.body);
//   const user = users.find(
//     (user) => user.email === email && user.password == password,
//   );
//   if (!user) {
//     res.status(401).json({ message: "No user with those credentials found!" });
//     return;
//   }
//   res.json({ ...user, password: undefined, token: "some unique tokens" });
// }

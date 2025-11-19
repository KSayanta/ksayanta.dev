import { writeFileSync } from "fs";
import retry from "retry";

const URL = "https://osu.ppy.sh/api/v2/seasonal-backgrounds";
const OUT_FILE = "current_seasonal.json";

function fetchWithRetry(url) {
  const operation = retry.operation({
    retries: process.env.MAX_RETRIES || 5,
    minTimeout: 500,
    maxTimeout: 10000,
    randomize: true,
  });

  return new Promise((resolve, reject) => {
    operation.attempt(async (currentAttempt) => {
      try {
        const res = await fetch(url);
        const data = await res.text();
        resolve(data);
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

(async () => {
  try {
    const data = await fetchWithRetry(URL);
    writeFileSync(OUT_FILE, data);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

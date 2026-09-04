/**
 * Passenger-compatible entry point for Hostinger's Node.js app hosting.
 *
 * Hostinger (like cPanel's Node.js Selector) runs whatever file you set as
 * the app's "Application startup file" directly with `node`, rather than
 * running an npm script — so `next start` alone doesn't work there. This
 * wraps Next.js's programmatic server API and listens on the port Passenger
 * assigns via `process.env.PORT`.
 *
 * Only used in the Hostinger deployment path. Local development still uses
 * `npm run dev` (next dev) — this file is never involved there.
 */
const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res);
    }).listen(port, () => {
      console.log(`> ADHIVEX ready on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });

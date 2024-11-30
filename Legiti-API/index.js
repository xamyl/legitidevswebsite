import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import config from "./config.json" with { type: "json" };
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
});

fastify.get("/", function (req, res) {
  res.sendFile('home.html');
});

fastify.get("/browse", function (req, res) {
  res.sendFile('world-browser.html');
});

fastify.listen({ port: config.port }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})

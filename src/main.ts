import { flags } from "../packages.ts";
import { serve } from "./serve.ts";

const main = function () {
  const args = flags.parse(Deno.args, {
    alias: {
      p: "port",
      h: "help",
      t: "title",
    },
  });

  const dir = args._[0] ?? "/";

  const {
    index,
    port = 3030,
    "tls-cert": tlsCert,
    "tls-key": tlsKey,
    help,
    title = "dserve",
  } = args;

  serve({
    port,
    dir: dir.toString(),
    index,
    title,
    tlsKey,
    tlsCert,
  });
};

main();

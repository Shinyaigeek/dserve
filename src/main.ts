import { flags } from "../packages.ts";
import { serve } from "./serve.ts";
import { color } from "../packages.ts";

const main = function () {
  const args = flags.parse(Deno.args, {
    alias: {
      p: "port",
      h: "help",
      t: "title",
      i: "index"
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

  if (help) {
    console.log(`
${color.green("dserve")}
Developed by Shinobu Hayashi/Shinyaigeek <me@shinyaigeek.dev>

${color.yellow("Usage")}
    dserve [Flags] [Options] [--] [Path]

${color.yellow("Flags")}
    ${color.green("-h --help [Bool]")}
        Show this help message

${color.yellow("Options")}
    ${color.green("-p, --port [Number]")}
        Port number to listen to. default 3030
    ${color.green("-t, --title [String]")}
        Title of the page. default "dserve"
    ${color.green("-i, --index [String]")}
        Index file to serve. optional
    ${color.green("    --tls-cert [String]")}
        TLS certificate file. optional. if both of --tls-key and --tls-cert are specified, dserve will use TLS.
    ${color.green("    --tls-key [String]")}
        TLS key file. optional. if both of --tls-key and --tls-cert are specified, dserve will use TLS.
    
${color.yellow("Args")}
    ${color.green("<Path>")}
        Path to serve. default "."
`);
    return;
  }

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

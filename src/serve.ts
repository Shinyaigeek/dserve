import { Application } from "../packages.ts";
import { path } from "../packages.ts";
import { kindOfEntryWithPath } from "./kindOfEntryWithPath.ts";
import { dirHandler } from "./dirHandler.ts";
import { layout } from "./layout.ts";

export interface ServeOptions {
  dir: string;
  port: number;
  index?: string;
  tlsCert?: string;
  tlsKey?: string;
  title: string;
}

export const serve: (op: ServeOptions) => void = function ({
  dir,
  index,
  port,
  tlsCert,
  tlsKey,
  title,
}) {
  const _app = new Application();

  const targetPath = path.join(Deno.cwd(), dir);

  const app = _app
    .get("/*", async (req) => {
      const target = targetPath + req.url.pathname.replace("/", "");

      if (target.endsWith("favicon.ico")) {
        const faviconPath = path.join(
          path.dirname(path.fromFileUrl(import.meta.url)),
          "./favicon.ico",
        );
        return await Deno.readFile(faviconPath);
      }

      const pathState = await kindOfEntryWithPath(target);
      if (pathState === "file") {
        return await Deno.readTextFile(target);
      } else if (pathState === "dir") {
        return layout(await dirHandler(target), title);
      } else {
        return layout("404", title);
      }
    });

  if (tlsCert && tlsKey) {
    app.startTLS({ port, certFile: tlsCert, keyFile: tlsKey });
  } else {
    app.start({ port });
  }

  const scheme = tlsCert && tlsKey ? "https" : "http";

  const absDir = path.join(Deno.cwd(), dir);

  console.log(`Serving path ${absDir} at ${scheme}://localhost:${port}`);
};

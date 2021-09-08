import { Application } from "../packages.ts";
import { path } from "../packages.ts";
import { kindOfEntryWithPath } from "./kindOfEntryWithPath.ts";
import { dirHandler } from "./dirHandler.ts";

export interface ServeOptions {
  dir: string;
  port: number;
  index: string;
}

export const serve: (op: ServeOptions) => void = function ({
  dir,
  index,
  port,
}) {
  const app = new Application();

  const targetPath = path.join(Deno.cwd(), dir);

  app
    .get("/*", async (req) => {
      const target = targetPath + req.url.pathname.replace("/", "");

      if (target.endsWith("favicon.ico")) {
        const faviconPath = path.join(
          path.dirname(path.fromFileUrl(import.meta.url)),
          "./favicon.ico"
        );
        return await Deno.readFile(faviconPath);
      }

      const pathState = await kindOfEntryWithPath(target);
      if (pathState === "file") {
        return await Deno.readTextFile(target);
      } else if (pathState === "dir") {
        return await dirHandler(target);
      } else {
        return "404";
      }
    })
    .start({ port });

  const absDir = path.join(Deno.cwd(), dir);

  console.log(`Serving path ${absDir} at http://localhost:${port}`);
};

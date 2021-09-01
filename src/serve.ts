import { Application } from "../packages.ts";
import { path } from "../packages.ts";

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

  app.static("/", dir).start({ port });

  const absDir = path.join(Deno.cwd(), dir);

  console.log(`Serving path ${absDir} at http://localhost:${port}`);
};

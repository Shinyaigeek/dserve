import { Application } from "../packages.ts";

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
  console.log(dir);

  app.static("/", "/").start({ port });

  console.log(`Serving path ${dir} at http://localhost:${port}`);
};

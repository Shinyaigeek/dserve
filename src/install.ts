import { path } from "../packages.ts";
import { fs } from "../packages.ts";

const install: (version?: string) => Promise<void> = async function (
  version = "latest",
) {
  const denoExecPath = Deno.execPath();
  const cmdExists = fs.existsSync(
    path.join(path.dirname(denoExecPath), "dserve"),
  );

  const p = Deno.run({
    cmd: [
      denoExecPath,
      "install",
      "--allow-net",
      "--allow-read",
      "--unstable",
      "--no-check",
      "--location",
      "http://localhost/",
      "-n",
      "dserve",
      "-f",
      `https://deno.land/x/dserve@${version}/main.ts`,
    ],
    stdout: "null",
    stderr: "inherit",
  });

  const status = await p.status();
  if (status.success) {
    if (cmdExists) {
      console.log(`dserve is up to ${version}`);
    } else {
      console.log("dserve was installed successfully");
      console.log(`Run 'dserve -h' to get started`);
    }
  }
  Deno.exit(status.code);
};

install();

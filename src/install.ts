import { path } from "../packages.ts";
import { fs } from "../packages.ts";
import { color } from "../packages.ts";

const install: (_version?: string) => Promise<void> = async function (
  _version = "latest",
) {
  const denoExecPath = Deno.execPath();
  const cmdExists = fs.existsSync(
    path.join(path.dirname(denoExecPath), "dserve"),
  );

  const versionMetaUrl = "https://cdn.deno.land/dserve/meta/versions.json";
  const { latest, versions } = await (await fetch(versionMetaUrl)).json();

  const version: string = (() => {
    if (_version === "latest") {
      return latest;
    } else if (!versions.includes(_version)) {
      console.log(`${color.red("error")}: version(${_version}) not found!`);
      Deno.exit(1);
    } else {
      return _version;
    }
  })();

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
      `https://deno.land/x/dserve@${version}/src/main.ts`,
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

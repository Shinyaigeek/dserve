export const kindOfEntryWithPath: (
  path: string
) => Promise<"dir" | "file" | "404"> = async function (path) {
  const isFile = await (async () => {
    try {
      Deno.readFile(path);
      return true;
    } catch (_) {
      return false;
    }
  })();

  if (isFile) {
    return "file";
  }

  const isDir = await (async () => {
    try {
      Deno.readDir(path);
      return true;
    } catch (_) {
      return false;
    }
  })();

  if (isDir) {
    return "dir";
  }

  return "404";
};

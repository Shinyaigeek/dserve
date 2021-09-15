export const dirHandler: (dir: string) => Promise<string> = async function (
  dir,
) {
  const directories = Deno.readDir(dir);

  const templates: string[] = [];

  for await (const entry of directories) {
    const template = (() => {
      if (entry.isFile) {
        return `<li><a href="./${entry.name}">${entry.name}</a></li>`;
      } else if (entry.isDirectory) {
        return `<li><a href="./${entry.name}/">${entry.name}</a></li>`;
      } else {
        return `<li><a href="./${entry.name}">${entry.name}</a></li>`;
      }
    })();

    templates.push(template);
  }

  return `<ul>${templates.join("")}</ul>`;
};

export const dirHandler: (dir: string) => Promise<string> = async function (
  dir,
) {
  const directories = Deno.readDir(dir);

  const templates: string[] = [];

  templates.push(header);

  for await (const entry of directories) {
    const template = await (async () => {
      if (entry.isFile) {
        const fileStat = await Deno.stat(`${dir}/${entry.name}`);
        return `<li><span class="name"><a href="./${entry.name}">${entry.name}</a></span><span class="size">${fileStat.size}B</span><span class="last-modified">${fileStat
          .mtime?.toLocaleString() ?? ""}</span></li>`;
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

const header = `<li class="directory-header" id="header"></li>`;

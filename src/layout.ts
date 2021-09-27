import { version } from "./version.ts";

export const layout: (body: string, title?: string) => string = function (
  body,
  title = "dserve",
) {
  return `<!DOCTYPE html>
<html>
<head>
<title>${title}</title>
</head>
<body>
<header></header>
<div id="app">
${body}
</div>
</body>
<script>
const header = document.querySelector("header");
header.innerText = "dserve@${version} " + window.location.href;
</script>
<style>
body {
  background: #58555A;
  color: #FFFFFF;
}

header {
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  font-size: 36px;
  height: 28px;
}

#app {
  position: absolute;
  top: 28px;
}
</style>
</html>`;
};

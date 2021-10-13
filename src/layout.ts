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

const listHeader = document.getElementById("header");
if (window.location.pathname.length > 1) {
  const link = document.createElement("a");
  link.href = "../";
  link.innerText = "Parent Directory";
  const li = document.createElement("li");
  li.className = "goto-parent";
  li.appendChild(link);
  listHeader.after(li);
}
</script>
<style>
body {
  background: rgb(249,250,251);
  color: #000000;
}

header {
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  font-size: 36px;
  height: 28px;
}

li {
  list-style: none;
  background: #ffffff;
  border-color: #e5e7eb;
  border-style: solid;
  border-width: 1px;
  padding: 3px 2px;
}

a {
  color: #3f83f8;
  text-decoration: none;
}

ul {
  width: 80vw;
  margin: 36px auto;
  font-size: 18px;
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
}

li span {
  display: inline-block;
}

li:hover {
  background: #f4f5f7;
}

li .name {
  width: 60%;
}

li .size {
  width: 20%;
}

li .last-modified {
  width: 20%;
}

.directory-header {
  font-size: 24px;
  background: rgb(229,231,235);
}

.goto-parent {
  font-size: 24px;
}

#app {
  width: 100%;
  margin: 56px auto;
  padding: 0;
}
</style>
</html>`;
};

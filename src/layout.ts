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
${body}
</body>
<script>
const header = document.querySelector("header");
header.innerText = "dserve " + window.location.href;
</script>
</html>`;
};

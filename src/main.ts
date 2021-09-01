import { serve } from "./serve.ts";

serve({
  port: 1234,
  dir: Deno.cwd(),
  index: "",
});

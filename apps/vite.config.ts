import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import tsAlias from "@ruan-cat/vite-plugin-ts-alias";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [nitro(), tailwindcss(), tsAlias()],
});

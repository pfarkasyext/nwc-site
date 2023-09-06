import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/pages/vite-plugin";
import { cjsInterop } from "vite-plugin-cjs-interop";

export default defineConfig({
  plugins: [react(), yextSSG(), cjsInterop({ dependencies: ["lodash"] })],
});

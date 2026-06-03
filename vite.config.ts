import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true" && repository.length > 0;

export default defineConfig({
  base: isGitHubPagesBuild ? `/${repository}/` : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    port: 5173
  }
});

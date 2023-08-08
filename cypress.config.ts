import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "k1n4s3",
    e2e: {
        baseUrl: "http://localhost:4000",
        video: false,
        supportFile: false,
    },
});

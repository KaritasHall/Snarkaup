import type { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "https://graphql.datocms.com/": {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    },
  },
  documents: "src/app/dato/*.ts",
  generates: {
    "src/app/dato/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;

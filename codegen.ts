
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/**/*.graphql",
  documents: "./src/**/*.{graphql,tsx, ts}",
  generates: {
    'src/graphql/__generated__/types.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        'typescript-operations',
        'typed-document-node',
        'named-operations-object'
      ],
      config: {
        useIndexSignature: true,
        defaultMapper: 'Partial<{T}>',
        useConsts: true
      }
    }
  }
};

export default config;

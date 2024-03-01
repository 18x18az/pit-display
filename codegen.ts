import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://io.18x18az.org:1818/graphql',
  documents: ['./src/graphql/**/*.graphql'],
  generates: {
    './src/__generated__/graphql.ts': {
      config: {
        avoidOptionals: true
      },
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo']
    }
  }
}

export default config

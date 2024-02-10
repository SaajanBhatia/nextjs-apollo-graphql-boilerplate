import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { mergeTypeDefs } from '@graphql-tools/merge';

const translateSchema = () => {
  const typeArray = loadSchemaSync('./**/*.graphql', {
    loaders: [new GraphQLFileLoader()]
  });
  return mergeTypeDefs(typeArray);
};

export { translateSchema };
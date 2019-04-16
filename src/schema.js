import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import userQueries from './models/user/queries';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...userQueries,
      hi: {
        type: GraphQLString,
        args: {
          name: { type: GraphQLString },
        },
        resolve(v, { name }) {
          return `world ${name}`;
        },
      },
      goodbye: {
        type: GraphQLString,
        resolve() {
          return 'goodbye';
        },
      },
    },
  }),
});

import {
  GraphQLString,
  GraphQLList,
} from 'graphql';

import UserType from '../schema';
import UserModel from '../user';

export default {
  type: GraphQLList(UserType),
  args: {
    email: { type: GraphQLString },
  },
  resolve: async () => UserModel.findAll(),
};

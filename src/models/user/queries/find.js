import {
  GraphQLString,
} from 'graphql';

import UserType from '../schema';
import UserModel from '../user';

export default {
  type: UserType,
  args: {
    email: { type: GraphQLString },
  },
  resolve: async (v, { email }) => UserModel.findOne({ where: { email } }),
};

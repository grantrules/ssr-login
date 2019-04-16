import {
  GraphQLString,
} from 'graphql';

import UserModel from '../user';
import UserType from '../schema';


export default {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve:
    async (v, args, ctx) => UserModel.findOne({ where: { email: ctx.session.email } }),
};

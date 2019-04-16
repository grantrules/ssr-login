import {
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';

import bcrypt from 'bcrypt';

import UserModel from '../user';


export default {
  type: GraphQLBoolean,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve:
    async (v, { email, password }, ctx) => UserModel.findOne({ where: { email } })
      .then(user => bcrypt.compare(password, user.password).then((equal) => {
        if (equal) {
          ctx.session.email = user.email;
        }
        return equal;
      }))
      .catch(() => false),
};

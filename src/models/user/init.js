import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import UserModel from './user';


export default (sequelize) => {
  UserModel.init(
    {
      // attributes
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'user',
    },
  );
  UserModel.sync({ force: true }).then(() => bcrypt.hash('doink', 8))
    .then(hash => UserModel.create({
      email: 'gharding@gmail.com',
      password: hash,
    }));
};

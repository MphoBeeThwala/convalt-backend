import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class User extends Model {}
  User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: false, unique: true },
    national_id: { type: DataTypes.STRING(13), allowNull: false, unique: true },
    latitude: { type: DataTypes.FLOAT },
    longitude: { type: DataTypes.FLOAT },
    password: { type: DataTypes.STRING, allowNull: false }
  }, { sequelize, modelName: 'User', tableName: 'users' });
  return User;
};

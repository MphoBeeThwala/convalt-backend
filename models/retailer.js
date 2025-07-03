import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Retailer extends Model {}
  Retailer.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
    latitude: { type: DataTypes.FLOAT },
    longitude: { type: DataTypes.FLOAT }
  }, { sequelize, modelName: 'Retailer', tableName: 'retailers' });
  return Retailer;
};

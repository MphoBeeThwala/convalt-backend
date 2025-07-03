import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Product extends Model {}
  Product.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING }
  }, { sequelize, modelName: 'Product', tableName: 'products' });
  return Product;
};

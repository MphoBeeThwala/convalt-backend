import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class RetailerProduct extends Model {}
  RetailerProduct.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    retailer_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false }
  }, { sequelize, modelName: 'RetailerProduct', tableName: 'retailer_products' });
  return RetailerProduct;
};

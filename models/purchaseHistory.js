import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class PurchaseHistory extends Model {}
  PurchaseHistory.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, { sequelize, modelName: 'PurchaseHistory', tableName: 'purchase_history', timestamps: false });
  return PurchaseHistory;
};

import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class ShoppingList extends Model {}
  ShoppingList.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, { sequelize, modelName: 'ShoppingList', tableName: 'shopping_lists', timestamps: false });
  return ShoppingList;
};

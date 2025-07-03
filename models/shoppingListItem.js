import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class ShoppingListItem extends Model {}
  ShoppingListItem.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    shopping_list_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
  }, { sequelize, modelName: 'ShoppingListItem', tableName: 'shopping_list_items', timestamps: false });
  return ShoppingListItem;
};

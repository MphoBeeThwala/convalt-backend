import { Sequelize } from 'sequelize';
import UserFactory from './user.js';
import RetailerFactory from './retailer.js';
import ProductFactory from './product.js';
import RetailerProductFactory from './retailerProduct.js';
import ShoppingListFactory from './shoppingList.js';
import ShoppingListItemFactory from './shoppingListItem.js';
import PurchaseHistoryFactory from './purchaseHistory.js';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './backend/database.sqlite',
  logging: false
});

// Initialize models
const User = UserFactory(sequelize);
const Retailer = RetailerFactory(sequelize);
const Product = ProductFactory(sequelize);
const RetailerProduct = RetailerProductFactory(sequelize);
const ShoppingList = ShoppingListFactory(sequelize);
const ShoppingListItem = ShoppingListItemFactory(sequelize);
const PurchaseHistory = PurchaseHistoryFactory(sequelize);

// Model associations
User.hasMany(ShoppingList, { foreignKey: 'user_id' });
ShoppingList.belongsTo(User, { foreignKey: 'user_id' });

ShoppingList.hasMany(ShoppingListItem, { foreignKey: 'shopping_list_id' });
ShoppingListItem.belongsTo(ShoppingList, { foreignKey: 'shopping_list_id' });

Retailer.hasMany(RetailerProduct, { foreignKey: 'retailer_id' });
RetailerProduct.belongsTo(Retailer, { foreignKey: 'retailer_id' });

Product.hasMany(RetailerProduct, { foreignKey: 'product_id' });
RetailerProduct.belongsTo(Product, { foreignKey: 'product_id' });

User.hasMany(PurchaseHistory, { foreignKey: 'user_id' });
PurchaseHistory.belongsTo(User, { foreignKey: 'user_id' });

export {
  sequelize,
  User,
  Retailer,
  Product,
  RetailerProduct,
  ShoppingList,
  ShoppingListItem,
  PurchaseHistory
};

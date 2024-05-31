// Import important parts of Sequelize library
const { Model, DataTypes } = require('sequelize');

// Import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// Set up fields and rules for Product model
Product.init(
  {
    // Define columns

    // Define the id column
    id: {
      type: DataTypes.INTEGER,       
      allowNull: false,              
      primaryKey: true,              
      autoIncrement: true,           
    },
    // Define the product_name column
    product_name: {
      type: DataTypes.STRING,       
      allowNull: false,              
    },
    // Define the price column
    price: {
      type: DataTypes.DECIMAL,       
      allowNull: false,              
      validate: {
        isDecimal: true,            
      },
    },
    // Define the stock column
    stock: {
      type: DataTypes.INTEGER,       
      allowNull: false,              
      defaultValue: 10,              
      validate: {
        isNumeric: true,             
      },
    },
    // Define the category_id column
    category_id: {
      type: DataTypes.INTEGER,       
      references: {
        model: 'category',          
        key: 'id',                  
      },
    },
  },
  {
    sequelize,                       
    timestamps: false,               
    freezeTableName: true,           
    underscored: true,               
    modelName: 'product',            
  }
);

// Export the Product model
module.exports = Product;

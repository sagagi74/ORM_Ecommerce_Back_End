// Import Sequelize library
const { Model, DataTypes } = require('sequelize');

// database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model 
class Product extends Model {}

// Set up fields and rules for Product model
Product.init(
  {
    // Define columns
    
    // Define the id column
    id: {
      type: DataTypes.INTEGER,       
      allowNull: false,              // no null values allowed
      primaryKey: true,              // the primary key
      autoIncrement: true,           // Uses auto increment
    },
    // Define the product_name column
    product_name: {
      type: DataTypes.STRING,     
      allowNull: false,              // no null values allowed
    },
    // Define the price column
    price: {
      type: DataTypes.DECIMAL,      
      allowNull: false,              // no null values allowed
      validate: {
        isDecimal: true,             
      },
    },
    // Define the stock column
    stock: {
      type: DataTypes.INTEGER,     
      allowNull: false,              // no null values allowed
      defaultValue: 10,              // Sets a default value of 10
      validate: {
        isNumeric: true,             // Validates numeric
      },
    },
    // Define the category_id column
    category_id: {
      type: DataTypes.INTEGER,       
      references: {
        model: 'category',           // References the category model
        key: 'id',                   // References the id 
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

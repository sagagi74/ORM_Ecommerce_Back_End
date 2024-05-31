// Import Sequelize library
const { Model, DataTypes } = require('sequelize');

// Database connection from config.js
const sequelize = require('../config/connection');

// Initialize ProductTag model
class ProductTag extends Model {}

ProductTag.init(
  {
    // Define the id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,              // no null values allowed
      primaryKey: true,              // Sets this column as the primary key
      autoIncrement: true,           // Uses auto increment
    },
    // Define the product_id column
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',            // References the product
        key: 'id',                   // References the id
      },
    },
    // Define the tag_id column
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',                // References the tag
        key: 'id',                   // References the id
      },
    },
  },
  {
    sequelize,
    timestamps: false,              // Disable timestamps
    freezeTableName: true,          // Prevent Sequelize from renaming the table
    underscored: true,              // Use underscored naming convention
    modelName: 'product_tag',       // Set the model name
  }
);

// Export the ProductTag model
module.exports = ProductTag;

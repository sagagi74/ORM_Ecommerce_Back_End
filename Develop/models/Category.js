// Import sequelize library
const { Model, DataTypes } = require('sequelize');

// the database connection from the configuration file
const sequelize = require('../config/connection.js');

// Initialize the Category model 
class Category extends Model {}

// Define the columns for the Category model
Category.init(
  {
    // Define the id column
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false,        // no null values allowed
      primaryKey: true,        // the primary key
      autoIncrement: true,     // Uses auto increment
    },
    // Define the category_name column
    category_name: {
      type: DataTypes.STRING,  
      allowNull: false,        // no null values allowed
    },
  },
  {
    sequelize,                 // Pass the sequelize instance
    timestamps: false,         // Disable timestamps
    freezeTableName: true,     // Prevent Sequelize from renaming the table
    underscored: true,         // Use underscored naming convention
    modelName: 'category',     // Set the model name
  }
);

// Export the Category model
module.exports = Category;

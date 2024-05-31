// Import the necessary modules
const router = require('express').Router();
//const { Tag, Product, ProductTag } = require('../../models');
const sequelize = require('../../config/connection');

// The `/api/tags` endpoint

// Route to get all tags and include associated products through ProductTag

//router.get('/', async (req, res) => {
  //try {
    //const tagData = await Tag.findAll({
      //include: [{ model: Product, through: ProductTag }],
    //});
    //res.status(200).json(tagData); // Send the retrieved data with a 200 status code
  //} catch (err) {
    //res.status(500).json(err); // Send an error response with a 500 status code
 // }
//});


//!!!!! this join table was giving me errors so I am changing to raw sql systex  

// Route to get all tags and include associated products through ProductTag
router.get('/', async (req, res) => {
  try {
    const sqlQuery = `
      SELECT 
        t.id AS tag_id, 
        t.tag_name, 
        p.id AS product_id, 
        p.product_name, 
        p.price, 
        p.stock, 
        p.category_id
      FROM 
        tag t
      LEFT JOIN 
        product_tag pt ON t.id = pt.tag_id
      LEFT JOIN 
        product p ON pt.product_id = p.id`;

    console.log("Executing SQL query:", sqlQuery); // Log the SQL query

    const [results] = await sequelize.query(sqlQuery);

    console.log("Query results:", results); // Log the results

    res.status(200).json(results); // Send the structured data with a 200 status code
  } catch (err) {
    console.error("Error executing query:", err); // Log the error
    res.status(500).json({ message: 'An error occurred', error: err }); // Send an error response with a 500 status code
  }
});

// Route to get a single tag by its ID and include associated products through ProductTag
router.get('/:id', async (req, res) => {
  try {
    const sqlQuery = `
      SELECT 
        t.id AS tag_id, 
        t.tag_name, 
        p.id AS product_id, 
        p.product_name, 
        p.price, 
        p.stock, 
        p.category_id
      FROM 
        tag t
      LEFT JOIN 
        product_tag pt ON t.id = pt.tag_id
      LEFT JOIN 
        product p ON pt.product_id = p.id
      WHERE t.id = :id`;

    console.log("Executing SQL query:", sqlQuery); // Log the SQL query

    const [results] = await sequelize.query(sqlQuery, {
      replacements: { id: req.params.id }
    });

    console.log("Query results:", results); // Log the results

    if (results.length === 0) {
      return res.status(404).json({ message: 'No tag associated with this id!' });
    }

    res.status(200).json(results); // Send the structured data with a 200 status code
  } catch (err) {
    console.error("Error executing query:", err); // Log the error
    res.status(500).json({ message: 'An error occurred', error: err }); // Send an error response with a 500 status code
  }
});

// Route to create a new tag
router.post('/', async (req, res) => {
  try {
    const sqlQuery = `
      INSERT INTO tag (tag_name)
      VALUES (:tag_name)`;

    console.log("Executing SQL query:", sqlQuery); // Log the SQL query

    const [results] = await sequelize.query(sqlQuery, {
      replacements: { tag_name: req.body.tag_name }
    });

    console.log("Query results:", results); // Log the results

    res.status(200).json({ message: 'Tag created successfully', id: results.insertId }); // Send the structured data with a 200 status code
  } catch (err) {
    console.error("Error executing query:", err); // Log the error
    res.status(500).json({ message: 'An error occurred', error: err }); // Send an error response with a 500 status code
  }
});

// Route to update an existing tag by its ID
router.put('/:id', async (req, res) => {
  try {
    const sqlQuery = `
      UPDATE tag
      SET tag_name = :tag_name
      WHERE id = :id`;

    console.log("Executing SQL query:", sqlQuery); // Log the SQL query

    const [results] = await sequelize.query(sqlQuery, {
      replacements: { id: req.params.id, tag_name: req.body.tag_name }
    });

    console.log("Query results:", results); // Log the results

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'No tag associated with this id!' });
    }

    res.status(200).json({ message: 'Tag updated successfully' }); // Send the structured data with a 200 status code
  } catch (err) {
    console.error("Error executing query:", err); // Log the error
    res.status(500).json({ message: 'An error occurred', error: err }); // Send an error response with a 500 status code
  }
});

// Route to delete a tag by its ID
router.delete('/:id', async (req, res) => {
  try {
    const sqlQuery = `
      DELETE FROM tag
      WHERE id = :id`;

    console.log("Executing SQL query:", sqlQuery); // Log the SQL query

    const [results] = await sequelize.query(sqlQuery, {
      replacements: { id: req.params.id }
    });

    console.log("Query results:", results); // Log the results

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'No tag associated with this id!' });
    }

    res.status(200).json({ message: 'Tag deleted successfully' }); // Send the structured data with a 200 status code
  } catch (err) {
    console.error("Error executing query:", err); // Log the error
    res.status(500).json({ message: 'An error occurred', error: err }); // Send an error response with a 500 status code
  }
});

// Export the router to be used in other parts of the application
module.exports = router;

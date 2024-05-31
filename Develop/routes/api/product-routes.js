// Import the necessary modules
const router = require('express').Router();
const { Category, Product } = require('../../models');

// Route to get all categories and include associated products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }], // Include associated products
    });
    res.status(200).json(categoryData); 
  } catch (err) {
    res.status(500).json(err); 
  }
});

// Route to get a single category by its ID and include associated products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }], // Include associated products
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category associated with this id!' }); 
      return;
    }

    res.status(200).json(categoryData); 
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory); 
  } catch (err) {
    res.status(400).json(err); 
  }
});

// Route to update an existing category by its ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedCategory[0]) { // Check if any category was updated
      res.status(404).json({ message: 'No category associated with this id!' }); 
      return;
    }

    res.status(200).json(updatedCategory); 
  } catch (err) {
    res.status(500).json(err); 
  }
});

// Route to delete a category by its ID
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) { // Check if any category was deleted
      res.status(404).json({ message: 'No category associated with this id!' }); 
      return;
    }

    res.status(200).json(categoryData); 
  } catch (err) {
    res.status(500).json(err); 
  }
});

// Export the router to be used in other parts of the application
module.exports = router;

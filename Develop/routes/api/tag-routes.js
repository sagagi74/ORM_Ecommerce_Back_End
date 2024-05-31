// Import the express Router
const router = require('express').Router();

// Import the Tag, Product, and ProductTag models
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', (req, res) => {
  // Find all tags and include associated Product data
  Tag.findAll({
    include: [{ model: Product, through: ProductTag }],
  })
  .then(tagData => {
    res.status(200).json(tagData);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

// GET a single tag by its `id`
router.get('/:id', (req, res) => {
  // Find a single tag by its `id` and include associated Product data
  Tag.findByPk(req.params.id, {
    include: [{ model: Product, through: ProductTag }],
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag associated with this id!' });
      return;
    }
    res.status(200).json(tagData);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

// POST a new tag
router.post('/', (req, res) => {
  // Create a new tag
  Tag.create(req.body)
  .then(newTag => {
    res.status(200).json(newTag);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// PUT (update) a tag's name by its `id` value
router.put('/:id', (req, res) => {
  // Update a tag's name by its `id`
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then(updatedTag => {
    if (!updatedTag[0]) {
      res.status(404).json({ message: 'No tag associated with this id!' });
      return;
    }
    res.status(200).json(updatedTag);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

// DELETE a tag by its `id` value
router.delete('/:id', (req, res) => {
  // Delete a tag by its `id`
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag associated with this id!' });
      return;
    }
    res.status(200).json(tagData);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

// Export the router
module.exports = router;

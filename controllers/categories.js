const Category = require("../models/category");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const [updatedRowsCount, [updatedCategory]] = await Category.update(
      req.body,
      {
        returning: true,
        where: { id: req.params.id },
      }
    );
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const deletedRowCount = await Category.destroy({
      where: { id: req.params.id },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

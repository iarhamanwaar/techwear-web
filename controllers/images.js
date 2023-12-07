const Image = require("../models/image");

// Create a new image
exports.createImage = async (req, res) => {
  try {
    const image = await Image.create(req.body);
    return res.status(201).json(image);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.findAll();
    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get an image by ID
exports.getImageById = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    return res.status(200).json(image);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update an image by ID
exports.updateImage = async (req, res) => {
  try {
    const [updatedRowsCount, [updatedImage]] = await Image.update(req.body, {
      returning: true,
      where: { id: req.params.id },
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Image not found" });
    }
    return res.status(200).json(updatedImage);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete an image by ID
exports.deleteImage = async (req, res) => {
  try {
    const deletedRowCount = await Image.destroy({
      where: { id: req.params.id },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Image not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

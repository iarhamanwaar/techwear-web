const Order = require("../models/order");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
  try {
    const [updatedRowsCount, [updatedOrder]] = await Order.update(req.body, {
      returning: true,
      where: { id: req.params.id },
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const deletedRowCount = await Order.destroy({
      where: { id: req.params.id },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

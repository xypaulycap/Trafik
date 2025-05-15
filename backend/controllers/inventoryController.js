import inventory from "../models/inventoryModel.js";

const allInventoryItems = async (req, res) => {
    try {
        const items = await inventory.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, items });
    } catch (error) {
        console.error("Error fetching inventory items:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching inventory items",
            error: error.message,
        });
        
    }
}

const addInventoryItem = async (req, res) => {
    try {
        const { name, category, quantity } = req.body;

    // Validate input
    if (!name || !category || quantity == null || quantity < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input" });
    }

    if (!["perishable", "non-perishable"].includes(category)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category type" });
    }

    const newItem = await inventory.create({
        name,
        category,
        quantity,
      });

      return res.status(201).json({ success: true, item: newItem });

    } catch (error) {
        console.error("Error adding inventory item:", error);
        res.status(500).json({
            success: false,
            message: "Error adding inventory item",
            error: error.message,
        });
        
    }
}

const updateInventoryItem = async (req, res) => {
    try {
        
        const { itemId, quantity } = req.body;

    if (!itemId || quantity == null || quantity < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input" });
    }

    const item = await inventory.findByIdAndUpdate(
        itemId,
        { quantity },
        { new: true }
      );

      if (!item) {
        return res.status(404).json({ success: false, message: "Item not found" });
      }

      return res.status(200).json({ success: true, item });
    } catch (error) {
        console.error("Error updating inventory item:", error);
        res.status(500).json({
            success: false,
            message: "Error updating inventory item",
            error: error.message,
        });
        
    }
}

export {allInventoryItems, addInventoryItem, updateInventoryItem}
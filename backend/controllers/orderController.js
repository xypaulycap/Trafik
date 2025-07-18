import Order from "../models/orderModel.js";
import Menu from "../models/menuModel.js";
import { nanoid, customAlphabet } from "nanoid";
import DeletedOrder from "../models/deletedOrderModel.js";
import Inventory from "../models/inventoryModel.js";

// Utils for date comparison
const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const nanoidAlphaNum = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  6
);

const generateUniqueCode = async () => {
  let code;
  let exists = true;

  while (exists) {
    code = nanoidAlphaNum();
    exists = await Order.exists({ code }); // Check if code already exists
  }

  return code;
};

// const generateOrderCode = async (req, res) => {
//   try {
//     const { items, customerType = "regular" } = req.body;

//     // 👉 generates something like “7K2HDQ”, never “7K2-H_Q”
//     const code = await generateUniqueCode();

//     const itemsWithPrice = await Promise.all(
//       items.map(async ({ itemId, quantity }) => {
//         const menuItem = await Menu.findById(itemId);
//         if (!menuItem) throw new Error(`Menu item not found: ${itemId}`);

//         const price =
//           customerType === "vip"
//             ? menuItem.prices.vip
//             : menuItem.prices.regular;

//         return { itemId, quantity, price };
//       })
//     );

//     const order = new Order({ code, items: itemsWithPrice });
//     await order.save();

//     res.status(201).json({ code });
//   } catch (error) {
//     console.error("Error generating order code:", error);
//     res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// };


const generateOrderCode = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    const code = await generateUniqueCode();

    const itemsWithDetails = await Promise.all(
      items.map(async ({ itemId, quantity, price, customerType }) => {
        const menuItem = await Menu.findById(itemId);
        if (!menuItem) throw new Error(`Menu item not found: ${itemId}`);

        const allowedPrices = menuItem.prices || {};
        const validPrice = allowedPrices[customerType];

        if (validPrice === undefined) {
          throw new Error(`Invalid customer type for item: ${menuItem.name}`);
        }

        if (validPrice !== price) {
          throw new Error(`Price mismatch for item: ${menuItem.name}`);
        }

        return {
          itemId,
          quantity,
          price,
          customerType,
        };
      })
    );

    const order = new Order({
      code,
      items: itemsWithDetails,
    });

    await order.save();

    res.status(201).json({ code });
  } catch (error) {
    console.error("Error generating order code:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}


const getOrderCode = async (req, res) => {
  try {
    const { code } = req.params;
    const order = await Order.findOne({ code }).populate("items.itemId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    console.error("Error generating order code:", error);
    res.json({ message: "Internal server error", error: error.message });
  }
};

const acceptOrder = async (req, res) => {
  try {
    const { code, waiterName } = req.body;

    if (!code || !waiterName) {
      return res
        .status(400)
        .json({ message: "Code and waiter name are required" });
    }

    // Find the order and populate menu item details
    const order = await Order.findOne({ code }).populate("items.itemId");
    if (!order) return res.status(404).json({ message: "Order not found" });

    for (const { itemId, quantity } of order.items) {
      const itemName = itemId.name.toLowerCase();

      // Find inventory item by name (case-insensitive exact match)
      const inventoryItem = await Inventory.findOne({
        name: { $regex: new RegExp(`^${itemName}$`, "i") },
      });
      if (!inventoryItem) continue;

      const isDrink = inventoryItem.category === "drinks";
      const isChickenOrTurkey = ["chicken", "turkey"].includes(itemName);
      const normalizedName = itemName.trim().toLowerCase();
      const isBeef = normalizedName === "sauced beef";

      if (isDrink || isChickenOrTurkey || isBeef) {
        let deduction = quantity;

        if (isBeef) {
          deduction = quantity * 3; // 3 pieces per quantity of beef
        }

        inventoryItem.quantity = Math.max(
          0,
          inventoryItem.quantity - deduction
        );
        await inventoryItem.save();
      }
    }

    // Mark order as accepted
    order.status = "accepted";
    order.waiterName = waiterName;
    order.acceptedAt = new Date();
    await order.save();

    res.json({ message: "Order accepted and inventory updated", order });
  } catch (error) {
    console.error("Error accepting order:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// const acceptOrder = async (req, res) => {
//   try {
//     const { code, waiterName } = req.body;
//     if (!code || !waiterName) {
//       return res.status(400).json({ message: 'Code and waiter name are required' });
//     }

//     // 1️⃣  Find order and populate its menu items
//     const order = await Order.findOne({ code }).populate('items.itemId');
//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     // 2️⃣  Multiplier rules (extend freely)
//     const multipliers = {
//       beef: 3,              // deduct 3 inventory units per ordered “beef” quantity
//       // chicken: 1,        // default is already 1
//       // turkey: 1,
//       // fish: 2,
//     };

//     for (const { itemId, quantity } of order.items) {
//       // 3️⃣  Normalise item name once
//       const name = itemId.name.trim().toLowerCase();

//       // 3a: fetch inventory row by _id (never fails because it’s the same doc)
//       const inventoryItem = await Inventory.findById(itemId._id);
//       if (!inventoryItem) continue;         // should be rare, but keeps loop safe

//       // 3b: decide multiplier
//       let multiplier = 1;
//       if (inventoryItem.category === 'drinks') {
//         multiplier = 1;                     // drinks: 1 for 1
//       } else {
//         // pick first keyword that appears in the name
//         const key = Object.keys(multipliers).find(k => name.includes(k));
//         if (key) multiplier = multipliers[key];
//       }

//       // 3c: skip if nothing to deduct
//       if (multiplier === 0) continue;

//       // 3d: atomic update (can’t drop below zero)
//       const deduction = quantity * multiplier;
//       await Inventory.findByIdAndUpdate(
//         inventoryItem._id,
//         { $inc: { quantity: -deduction } },
//         { new: false }
//       );
//     }

//     // 4️⃣  Mark order as accepted
//     order.status = 'accepted';
//     order.waiterName = waiterName;
//     order.acceptedAt = new Date();
//     await order.save();

//     res.json({ message: 'Order accepted and inventory updated', order });
//   } catch (error) {
//     console.error('Error accepting order:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };


//api to get accepted orders
const getAcceptedOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ["accepted", "completed"] },
    }).populate("items.itemId");
    res.json(orders);
  } catch (error) {
    console.error("Error fetching accepted orders:", error);
    res.json({ message: "Internal server error", error: error.message });
  }
};

//api to mark an order as completed
const markOrderAsCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentMethod } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status: "completed", paymentMethod: paymentMethod },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    console.error("Error marking order as completed:", error);
    res.json({ message: "Internal server error", error: error.message });
  }
};

//api to get total sales today
const totalSalesToday = async (req, res) => {
  try {
    const today = new Date();
    const orders = await Order.find({ status: "completed" }).populate(
      "items.itemId"
    );
    const total = orders
      .filter((order) => isSameDay(new Date(order.updatedAt), today))
      .reduce(
        (sum, order) =>
          sum +
          order.items.reduce((s, item) => s + item.price * item.quantity, 0),
        0
      );
    res.json({ total });
  } catch (error) {
    console.error("Error fetching total sales:", error);
    res.json({ message: "Internal server error", error: error.message });
  }
};

//api for sales comparison
const totalSalesComparison = async (req, res) => {
  try {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const orders = await Order.find({ status: "completed" }).populate(
      "items.itemId"
    );

    const todayTotal = orders
      .filter((order) => isSameDay(new Date(order.updatedAt), now))
      .reduce(
        (sum, order) =>
          sum +
          order.items.reduce((s, item) => s + item.price * item.quantity, 0),
        0
      );

    const yesterdayTotal = orders
      .filter((order) => isSameDay(new Date(order.updatedAt), yesterday))
      .reduce(
        (sum, order) =>
          sum +
          order.items.reduce((s, item) => s + item.price * item.quantity, 0),
        0
      );

    res.json({
      today: todayTotal,
      yesterday: yesterdayTotal,
      difference: todayTotal - yesterdayTotal,
    });
  } catch (error) {
    console.error("Error fetching sales comparison:", error);
    res.json({ message: "Internal server error", error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("items.itemId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only allow deletion if order is accepted
    if (order.status !== "accepted") {
      return res.status(400).json({
        message: `Cannot delete order with status '${order.status}'. Only accepted orders can be deleted.`,
      });
    }

    // 🔁 Roll back inventory quantities
    for (const orderItem of order.items) {
      const { itemId, quantity } = orderItem;

      // Ensure we have full item data

      const item = itemId;
      if (!item) continue;

      const itemName = item.name?.toLowerCase() || "";

      // Find the inventory item using name
      const inventoryItem = await Inventory.findOne({
        name: new RegExp("^" + item.name + "$", "i"),
      });

      if (!inventoryItem) continue;

      const isDrink = inventoryItem.category?.toLowerCase() === "drinks";
      const isChickenOrTurkey =
        itemName.includes("chicken") || itemName.includes("turkey");

      if (isDrink || isChickenOrTurkey) {
        inventoryItem.quantity += quantity;
        await inventoryItem.save();
      }
    }

    // Archive the order
    const archivedOrder = new DeletedOrder({
      ...order.toObject(),
      deletedAt: new Date(),
    });

    await archivedOrder.save();

    // Delete the order
    await Order.findByIdAndDelete(id);

    res.json({
      message: "Order deleted, inventory restored, and archived successfully",
      order: archivedOrder,
    });
  } catch (error) {
    console.error("❌ Error deleting order and restoring inventory:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//api to fetch achieved orders
const deletedOrders = async (req, res) => {
  try {
    const deletedOrders = await DeletedOrder.find().sort({ deletedAt: -1 });
    res.json(deletedOrders);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to fetch deleted orders",
        error: error.message,
      });
  }
};

export {
  generateOrderCode,
  getOrderCode,
  acceptOrder,
  getAcceptedOrders,
  markOrderAsCompleted,
  totalSalesToday,
  totalSalesComparison,
  deleteOrder,
  deletedOrders,
};

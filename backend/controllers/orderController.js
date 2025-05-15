import Order from "../models/orderModel.js";
import Menu from "../models/menuModel.js";
import { nanoid } from "nanoid";


// Utils for date comparison
const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const generateOrderCode = async (req, res) => {
  try {
    const { items, customerType = 'regular' } = req.body; // include customerType
    const code = nanoid(6).toUpperCase();

    const itemsWithPrice = await Promise.all(
      items.map(async ({ itemId, quantity }) => {
        const menuItem = await Menu.findById(itemId);
        if (!menuItem) throw new Error(`Menu item not found: ${itemId}`);

        const price =
          customerType === 'vip'
            ? menuItem.prices.vip
            : menuItem.prices.regular;

        return {
          itemId,
          quantity,
          price,
        };
      })
    );

    const order = new Order({
      code,
      items: itemsWithPrice,
    });

    await order.save();
    res.status(201).json({ code });
  } catch (error) {
    console.error('Error generating order code:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

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
          return res.status(400).json({ message: 'Code and waiter name are required' });
        }
      
        const order = await Order.findOne({ code });
        if (!order) return res.status(404).json({ message: 'Order not found' });
      
        order.status = 'accepted';
        order.waiterName = waiterName;
        order.acceptedAt = new Date();
      
        await order.save();
      
        res.json({ message: 'Order accepted', order });

    } catch (error) {
        console.error("Error accepting order:", error);
        res.json({ message: "Internal server error", error: error.message });
        
    }
}

//api to get accepted orders
const getAcceptedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 
      status: { $in: ['accepted', 'completed'] } }).populate('items.itemId');
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
      { status: "completed", 
        paymentMethod: paymentMethod, 
      },
      { new: true }
    );
    res.json(order)
  } catch (error) {
    console.error("Error marking order as completed:", error);
    res.json({ message: "Internal server error", error: error.message });
  }
}

//api to get total sales today
const totalSalesToday = async (req, res) => {
  try {


    const today = new Date();
    const orders = await Order.find({ status: 'completed' }).populate('items.itemId');
    const total = orders.filter(order => isSameDay(new Date(order.updatedAt), today))
      .reduce((sum, order) => sum + order.items.reduce((s, item) => s + item.price * item.quantity, 0), 0);
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

    const orders = await Order.find({ status: 'completed' }).populate('items.itemId');

    const todayTotal = orders.filter(order => isSameDay(new Date(order.updatedAt), now))
      .reduce((sum, order) => sum + order.items.reduce((s, item) => s + item.price * item.quantity, 0), 0);

    const yesterdayTotal = orders.filter(order => isSameDay(new Date(order.updatedAt), yesterday))
      .reduce((sum, order) => sum + order.items.reduce((s, item) => s + item.price * item.quantity, 0), 0);

      res.json({ today: todayTotal, yesterday: yesterdayTotal, difference: todayTotal - yesterdayTotal });

  } catch (error) {
    console.error("Error fetching sales comparison:", error);
    res.json({ message: "Internal server error", error: error.message });
  }
};

//api to delete an order
// This function deletes an order by its ID
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;  // or use req.params.code if you prefer deleting by order code

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully', order });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


export { generateOrderCode, getOrderCode, acceptOrder, getAcceptedOrders, markOrderAsCompleted, totalSalesToday, totalSalesComparison, deleteOrder };

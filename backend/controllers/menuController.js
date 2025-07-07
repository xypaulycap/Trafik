import Menu from '../models/menuModel.js';

// Controller to add a new menu item
const addMenu = async (req, res) => {
    try {
        const { name, description, category, subcategory, prices } = req.body;

        // Validate required fields
        if (
            !name ||
            !category ||
            !subcategory ||
            !prices?.regular ||
            !prices?.vip
        ) {
            return res.status(400).json({
                success: false,
                message:
                    'Please provide all required fields: name, category, subcategory, and prices (regular and vip)',
            });
        }

        // Create new menu item
        const newMenuItem = new Menu({
            name,
            description,
            category: category._id || category,
            subcategory: subcategory._id || subcategory,
            prices: {
                regular: prices.regular,
                vip: prices.vip,
            },
        });

        // Save the menu item
        await newMenuItem.save();

        // Populate the category and subcategory
        const populatedMenuItem = await Menu.findById(newMenuItem._id)
            .populate({
                path: 'category',
                select: 'name',
            })
            .populate({
                path: 'subcategory',
                select: 'name',
            });

        // Return success response
        res.status(201).json({
            success: true,
            message: 'Menu item added successfully',
            data: populatedMenuItem,
        });
    } catch (error) {
        console.error('Error adding menu item:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding menu item',
            error: error.message,
        });
    }
};


// Controller to get menu items by category and subcategory
const getMenuItems = async (req, res) => {
    try {
        const { categoryId, subcategory } = req.query;
        
        let query = {};
        
        if (categoryId) {
            query.category = categoryId;
        }
        
        if (subcategory) {
            query.subcategory = subcategory;
        }

        const menuItems = await Menu.find(query)
            .populate({
                path: 'category',
                select: 'name'
            })
            .populate({
                path: 'subcategory',
                select: 'name'
            });
        
        res.status(200).json({
            success: true,
            data: menuItems
        });
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching menu items',
            error: error.message
        });
    }
};

// Controller to toggle menu item availability

const toggleAvailability = async (req, res) => {
    try {
        const { menuId, isAvailable } = req.body;

        if (!menuId) {
            return res.status(400).json({
                success: false,
                message: 'Menu ID is required'
            });
        }

        // Find the menu item
        const menuItem = await Menu.findById(menuId);
        
        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        // Update and save the availability
        menuItem.isAvailable = isAvailable;
        await menuItem.save(); // Save before emitting

        // Emit the updated item with populated fields
        const populatedItem = await Menu.findById(menuItem._id)
            .populate('category')
            .populate('subcategory');

            const io = req.app.get('io'); // Get the socket.io instance from app
        
        io.emit('availability-updated', populatedItem);

        // Return success response
        res.status(200).json({
            success: true,
            message: `Menu item ${menuItem.isAvailable ? 'enabled' : 'disabled'} successfully`,
            data: populatedItem
        });
    } catch (error) {
        console.error('Error toggling menu item availability:', error);
        res.status(500).json({
            success: false,
            message: 'Error toggling menu item availability',
            error: error.message
        });
    }
};

// Controller to update menu item prices
// This function updates the prices of a menu item
const updatePrice = async (req, res) => {
    try {
        const { menuId, prices } = req.body; // expecting { regular, vip }

        if (!menuId || !prices) {
            return res.status(400).json({
                success: false,
                message: 'Menu ID and prices are required'
            });
        }

        const { regular, vip } = prices;

        // Validate prices if provided
        if ((regular !== undefined && (isNaN(regular) || regular < 0)) ||
            (vip !== undefined && (isNaN(vip) || vip < 0))) {
            return res.status(400).json({
                success: false,
                message: 'Prices must be valid positive numbers'
            });
        }

        // Find the menu item
        const menuItem = await Menu.findById(menuId);
        
        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        // Update the prices
        if (regular !== undefined) menuItem.prices.regular = regular;
        if (vip !== undefined) menuItem.prices.vip = vip;

        // Save the updated menu item
        await menuItem.save();

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Menu item prices updated successfully',
            data: menuItem
        });

    } catch (error) {
        console.error('Error updating menu item prices:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating menu item prices',
            error: error.message
        });
    }
};


const getMenuStats = async (req, res) => {
    try {
      const [totalItems, unavailableItems] = await Promise.all([
        Menu.countDocuments(),
        Menu.countDocuments({ isAvailable: false })
      ]);
  
      res.json({
        total: totalItems,
        unavailable: unavailableItems
      });
    } catch (error) {
      console.error('Error fetching menu stats:', error);
      res.status(500).json({
        message: 'Internal server error',
        error: error.message
      });
    }
  };

export { addMenu, getMenuItems, toggleAvailability, updatePrice, getMenuStats };

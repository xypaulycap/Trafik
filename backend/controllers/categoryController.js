import Category from '../models/Category.js';
import Subcategory from '../models/Subcategory.js';

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { name, type, subcategories } = req.body;

        // Validate required fields
        if (!name || !type) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name and type for the category'
            });
        }

        // Create new category
        const newCategory = new Category({
            name,
            type,
            subcategories: subcategories || []
        });

        // Save the category
        await newCategory.save();

        // Return success response
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: newCategory
        });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating category',
            error: error.message
        });
    }
};

// Get all categories with their subcategories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('subcategories');
        res.json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch categories' });
    }
};

// Get categories by type
export const getCategoriesByType = async (req, res) => {
    try {
        const { type } = req.params;
        
        const categories = await Category.find({ type });
        
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error('Error fetching categories by type:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching categories by type',
            error: error.message
        });
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Delete all subcategories associated with this category
        await Subcategory.deleteMany({ category: id });
        
        // Delete the category
        await Category.findByIdAndDelete(id);
        
        res.json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete category' });
    }
};

// Add a new category
export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();
        res.json({ success: true, category });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: 'Category name already exists' });
        } else {
            res.status(500).json({ success: false, message: 'Failed to add category' });
        }
    }
};

// Add a new subcategory
export const addSubcategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name } = req.body;
        
        // Create the subcategory
        const subcategory = new Subcategory({
            name,
            category: categoryId
        });
        
        await subcategory.save();
        
        // Add the subcategory to the category's subcategories array
        await Category.findByIdAndUpdate(
            categoryId,
            { $push: { subcategories: subcategory._id } }
        );
        
        res.json({ success: true, subcategory });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: 'Subcategory name already exists in this category' });
        } else {
            res.status(500).json({ success: false, message: 'Failed to add subcategory' });
        }
    }
};

// Delete a subcategory
export const deleteSubcategory = async (req, res) => {
    try {
        const { id, categoryId } = req.params;
        
        // Get the subcategory to find its category
        const subcategory = await Subcategory.findById(id);
        if (!subcategory) {
            return res.status(404).json({ success: false, message: 'Subcategory not found' });
        }
        
        // Remove the subcategory from the category's subcategories array
        await Category.findByIdAndUpdate(
            categoryId,
            { $pull: { subcategories: id } }
        );
        
        // Delete the subcategory
        await Subcategory.findByIdAndDelete(id);
        
        res.json({ success: true, message: 'Subcategory deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete subcategory' });
    }
}; 
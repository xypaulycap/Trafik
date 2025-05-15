import React, { useState, useContext, useEffect, useMemo } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { SubAdminContext } from '../../context/SubAdminContext';
import { FaSearch, FaPlus, FaTrash, FaFolder, FaFolderOpen, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const { backendUrl, getAuthHeaders } = useContext(AdminContext);
  // const { saToken } = useContext(SubAdminContext);



  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/admin/categories`, {
        headers: getAuthHeaders()
      });
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      toast.error('Failed to fetch categories', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/admin/categories`,
        { name: newCategory },
        { headers: getAuthHeaders() }
      );

      if (response.data.success) {
        toast.success('Category added successfully');
        setNewCategory('');
        fetchCategories();
      }
    } catch (error) {
      toast.error('Failed to add category', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !newSubcategory.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/admin/categories/${selectedCategory}/subcategories`,
        { name: newSubcategory },
        { headers: getAuthHeaders() }
      );

      if (response.data.success) {
        toast.success('Subcategory added successfully');
        setNewSubcategory('');
        fetchCategories();
      }
    } catch (error) {
      toast.error('Failed to add subcategory');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      setLoading(true);
      const response = await axios.delete(
        `${backendUrl}/api/admin/categories/${categoryId}`,
        { headers: getAuthHeaders() }
      );

      if (response.data.success) {
        toast.success('Category deleted successfully');
        fetchCategories();
      }
    } catch (error) {
      toast.error('Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubcategory = async (subcategoryId, categoryId) => {
    if (!window.confirm('Are you sure you want to delete this subcategory?')) return;

    try {
      setLoading(true);
      const response = await axios.delete(
        `${backendUrl}/api/admin/categories/${categoryId}/subcategories/${subcategoryId}`,
        { headers: getAuthHeaders() }
      );

      if (response.data.success) {
        toast.success('Subcategory deleted successfully');
        fetchCategories();
      }
    } catch (error) {
      toast.error('Failed to delete subcategory');
    } finally {
      setLoading(false);
    }
  };

  // Filter categories and subcategories based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    
    const query = searchQuery.toLowerCase();
    return categories
      .map(category => ({
        ...category,
        subcategories: category.subcategories?.filter(subcategory => 
          subcategory.name.toLowerCase().includes(query)
        )
      }))
      .filter(category => 
        category.name.toLowerCase().includes(query) || 
        category.subcategories?.length > 0
      );
  }, [categories, searchQuery]);

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

    useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
            <p className="text-sm text-gray-500 mt-1">
              {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'} found
            </p>
          </div>
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Category Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FaFolder className="mr-2 text-blue-500" />
                  Add New Category
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleAddCategory} className="space-y-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category Name
                    </label>
                    <input
                      type="text"
                      id="category"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="e.g., Main Course"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !newCategory.trim()}
                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaPlus className="mr-2" />
                    {loading ? 'Adding...' : 'Add Category'}
                  </button>
                </form>
              </div>
            </div>

            {/* Add Subcategory Form */}
            <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FaFolderOpen className="mr-2 text-green-500" />
                  Add New Subcategory
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleAddSubcategory} className="space-y-4">
                  <div>
                    <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-1">
                      Select Category
                    </label>
                    <select
                      id="category-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
                      Subcategory Name
                    </label>
                    <input
                      type="text"
                      id="subcategory"
                      value={newSubcategory}
                      onChange={(e) => setNewSubcategory(e.target.value)}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="e.g., Pasta"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !selectedCategory || !newSubcategory.trim()}
                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaPlus className="mr-2" />
                    {loading ? 'Adding...' : 'Add Subcategory'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Categories and Subcategories List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                All Categories
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {loading && categories.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-500">Loading categories...</p>
                </div>
              ) : filteredCategories.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="mx-auto w-16 h-16 text-gray-300 mb-4">
                    <FaFolderOpen className="w-full h-full" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {searchQuery ? 'No matching categories found' : 'No categories yet'}
                  </h3>
                  <p className="text-gray-500">
                    {searchQuery 
                      ? 'Try adjusting your search or create a new category.'
                      : 'Get started by adding your first category.'}
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {filteredCategories.map((category) => (
                    <motion.div 
                      key={category._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="border-b border-gray-200 last:border-0"
                    >
                      <div 
                        className="flex justify-between items-center p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => toggleCategory(category._id)}
                      >
                        <div className="flex items-center">
                          {expandedCategories[category._id] ? (
                            <FaChevronDown className="text-gray-500 mr-3 w-4 h-4" />
                          ) : (
                            <FaChevronDown className="text-gray-300 mr-3 w-4 h-4 transform -rotate-90" />
                          )}
                          <h3 className="text-base font-medium text-gray-900">{category.name}</h3>
                          {category.subcategories?.length > 0 && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {category.subcategories.length} subcategories
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`Are you sure you want to delete "${category.name}" and all its subcategories?`)) {
                                handleDeleteCategory(category._id);
                              }
                            }}
                            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                            title="Delete category"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {expandedCategories[category._id] && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-12 pr-4 pb-4 space-y-2">
                              {category.subcategories?.length > 0 ? (
                                category.subcategories.map((subcategory) => (
                                  <div 
                                    key={subcategory._id} 
                                    className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                                  >
                                    <span className="text-sm text-gray-700">{subcategory.name}</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (window.confirm(`Are you sure you want to delete "${subcategory.name}"?`)) {
                                          handleDeleteSubcategory(subcategory._id, category._id);
                                        }
                                      }}
                                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                                      title="Delete subcategory"
                                    >
                                      <FaTrash className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <div className="text-sm text-gray-500 py-2">No subcategories yet</div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
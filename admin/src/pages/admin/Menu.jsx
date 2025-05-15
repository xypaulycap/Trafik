import React, { useContext, useState, useEffect, useMemo } from "react";
import { AdminContext } from "../../context/AdminContext";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import { SubAdminContext } from "../../context/SubAdminContext";

// Format price to Nigerian Naira with commas as thousand separators
const formatPrice = (price) => {
  if (price === null || price === undefined) return "₦0.00";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(price)
    .replace("NGN", "₦");
};

const Menu = () => {
  const {
    aToken,
    loading,
    menuItems,
    fetchMenuItems,
    updateMenuItem,
    updateMenuPrice,
    maToken,
    saToken,
  } = useContext(AdminContext);
  // const { saToken } = useContext(SubAdminContext);
  const [editingPrice, setEditingPrice] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [customerType, setCustomerType] = useState("regular"); // 'regular' or 'vip'

  useEffect(() => {
    if (aToken || saToken || maToken) {
      fetchMenuItems();
    }
  }, [aToken, saToken, maToken]);

  const handleToggleAvailability = async (itemId, currentAvailability) => {
    try {
      const success = await updateMenuItem(itemId, !currentAvailability);
      if (success) {
        fetchMenuItems();
      }
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  // const handlePriceUpdate = async (itemId, currentPrice) => {
  //   if (editingPrice === itemId) {
  //     // Format the price before saving (remove any non-numeric characters except decimal point)
  //     const numericValue = parseFloat(
  //       newPrice.toString().replace(/[^0-9.]/g, "")
  //     );

  //     if (isNaN(numericValue) || numericValue < 0) {
  //       // Handle invalid price
  //       alert("Please enter a valid price");
  //       return;
  //     }

  //     const success = await updateMenuPrice(itemId, numericValue);
  //     if (success) {
  //       setEditingPrice(null);
  //       setNewPrice("");
  //     }
  //   } else {
  //     // Start editing
  //     setEditingPrice(itemId);
  //     setNewPrice(currentPrice.toString().replace(/[^0-9.]/g, ""));
  //   }
  // };

  // Filter menu items based on search query
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query));

      return matchesSearch;
    });
  }, [menuItems, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between mt-6 mb-8">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold text-gray-800">Menu Items</h2>
            <div className="flex flex-wrap gap-4">
              {/* Customer Type Filter */}
              <select
                value={customerType}
                onChange={(e) => setCustomerType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="regular">Regular</option>
                <option value="vip">VIP</option>
              </select>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              {filteredMenuItems?.length || 0}{" "}
              {filteredMenuItems?.length === 1 ? "item" : "items"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-64"
              />
            </div>
            {(aToken || saToken) && (
              <Link
                to="/admin/add-menu"
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap"
              >
                <FaPlus className="mr-2" />
                Add Menu Item
              </Link>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredMenuItems && filteredMenuItems.length > 0 ? (
              filteredMenuItems.map((item) => (
                <div
                  key={item._id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 ${
                    !item.isAvailable ? "opacity-75" : ""
                  }`}
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            item.isAvailable ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <h3 className="text-xl font-semibold text-gray-800">
                          {item.name}
                        </h3>
                      </div>
                      <button
                        onClick={() =>
                          handleToggleAvailability(item._id, item.isAvailable)
                        }
                        className={`p-2 rounded-full ${
                          item.isAvailable
                            ? "bg-green-100 text-green-600 hover:bg-green-200"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                      >
                        {item.isAvailable ? <FaCheck /> : <FaTimes />}
                      </button>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-2">
                      {item.description || "No description available"}
                    </p>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 capitalize">
                          {customerType} Price:
                        </span>
                        <div className="flex items-center space-x-2">
                          {editingPrice === item._id ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={newPrice}
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /[^0-9.]/g,
                                    ""
                                  );
                                  const parts = value.split(".");
                                  if (parts.length <= 2) setNewPrice(value);
                                }}
                                onBlur={(e) => {
                                  const num = parseFloat(e.target.value);
                                  if (!isNaN(num)) setNewPrice(num.toFixed(2));
                                }}
                                className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="0.00"
                              />
                              <button
                                onClick={async () => {
                                  const success = await updateMenuPrice(
                                    item._id,
                                    {
                                      ...item.prices,
                                      [customerType]: parseFloat(newPrice),
                                    }
                                  );
                                  if (success) {
                                    setEditingPrice(null); // Exit edit mode
                                    setNewPrice(""); // Reset input
                                  }
                                }}
                                className="text-green-600 hover:text-green-800"
                              >
                                <FaCheck />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <span className="text-base font-semibold text-gray-800">
                                {formatPrice(item.prices?.[customerType])}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingPrice(item._id);
                                  setNewPrice(
                                    item.prices?.[customerType]?.toString() ||
                                      ""
                                  );
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <FaEdit className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Category:</span>
                        <span className="text-gray-800 font-medium">
                          {item.category?.name || "Uncategorized"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Subcategory:</span>
                        <span className="text-gray-800 font-medium">
                          {item.subcategory?.name || "None"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto w-16 h-16 text-gray-300 mb-4">
                  <svg
                    className="w-full h-full"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {searchQuery ? "No matching items found" : "No menu items"}
                </h3>
                <p className="text-gray-500">
                  {searchQuery
                    ? "Try adjusting your search or filter to find what you're looking for."
                    : "Get started by adding a new menu item."}
                </p>
                {!searchQuery && (
                  <div className="mt-6">
                    {(aToken || saToken) && (
                      <Link
                        to="/admin/add-menu"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FaPlus className="mr-2 -ml-1" />
                        Add Menu Item
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;

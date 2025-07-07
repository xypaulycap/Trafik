// MenuPage.jsx
import React, { useContext, useState, useEffect } from "react";
import { FaUtensils, FaWineGlassAlt, FaStar, FaSearch } from "react-icons/fa";
import { AppContext } from "../context/Appcontext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MenuPage = ({ customerType }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSection, setActiveSection] = useState("Food");
  const [searchQuery, setSearchQuery] = useState("");

  const { menuItemss, selectedItems, toggleSelectItem, fetchMenuItems } =
    useContext(AppContext);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const allCategories = [
    ...new Set(menuItemss.map((item) => item.category?.name).filter(Boolean)), 
  ];

  const currentSectionItems = menuItemss.filter(
    (item) => item.category?.name === activeSection
  );

  const subcategories = [
    "all",
    ...new Set(
      currentSectionItems
        .map((item) => item.subcategory?.name)
        .filter(Boolean)
    ),
  ];

  const filteredItems = currentSectionItems
    .filter(
      (item) =>
        activeCategory === "all" || item.subcategory?.name === activeCategory
    )
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

  const handleProceed = () => {
    if (selectedItems.length === 0) {
      toast.error("No items selected");
      return;
    }
    toast.success("Proceeding to checkout...");
  };

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-slate-900 bg-[url('/pattern.svg')] bg-fixed bg-cover relative overflow-hidden">
      {/* Header and Search */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-300 to-orange-400 rounded-full mb-6 shadow-lg">
            <FaUtensils className="text-2xl text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 mb-6 tracking-tight">
            Our Menu
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover our carefully curated selection of culinary masterpieces and artisanal beverages
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search delicious items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/50 dark:bg-white/10 backdrop-blur-md text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-lg"
            />
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-2 shadow-lg">
            {allCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveSection(category);
                  setActiveCategory("all");
                }}
                className={`flex items-center space-x-3 px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                  activeSection === category
                    ? "bg-gradient-to-r from-amber-300 to-orange-400 text-white shadow-lg transform scale-105"
                    : "text-gray-800 dark:text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {category === "Food" ? (
                  <FaUtensils className="text-lg" />
                ) : category === "Drinks" ? (
                  <FaWineGlassAlt className="text-lg" />
                ) : (
                  <FaStar className="text-lg" />
                )}
                <span>{category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        <div className="flex flex-col items-center mb-12">
          <h3 className="text-gray-800 dark:text-white text-lg font-medium mb-4">Filter by Category</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {subcategories.map((subcat) => (
              <button
                key={subcat || `subcat-${Math.random()}`}
                onClick={() => setActiveCategory(subcat)}
                className={`px-6 py-2 font-medium rounded-full transition-all duration-300 ${
                  activeCategory === subcat
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg"
                    : "bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
                }`}
              >
                {subcat.charAt(0).toUpperCase() + subcat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-32">
          {filteredItems.map((item) => {
            const isUnavailable = !item.isAvailable;
            const isSelected = selectedItems.some(entry => entry.itemId === item._id);
            return (
              <div
                key={item._id}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ${
                  isUnavailable
                    ? "opacity-50 grayscale cursor-not-allowed"
                    : "hover:transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl"></div>

                {isUnavailable && (
                  <div className="absolute top-4 right-4 z-20 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Unavailable
                  </div>
                )}

                <div className="relative z-10 p-6 h-full flex flex-col border border-gray-400">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white leading-tight flex-1 mr-4">
                      {item.name}
                    </h3>
                    <div className="flex items-center bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      <span className="mr-1">₦</span>
                      <span>
                        {Number(item.prices?.[customerType] || 0).toLocaleString("en-NG")}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-1">
                    {item.description}
                  </p>
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleSelectItem(item._id, customerType)}
                      disabled={isUnavailable}
                      className={`px-8 py-3 font-bold rounded-full transition-all duration-300 transform ${
                        isSelected
                          ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-lg scale-105"
                          : "bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:scale-105"
                      } disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none`}
                    >
                      {isSelected ? "✓ Selected" : "Select Item"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <FaSearch className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No items found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Floating Proceed Button */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <Link to="/selected-items">
            <button
              onClick={handleProceed}
              className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-orange-400/50 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Proceed with {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''}</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-sm">→</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MenuPage;

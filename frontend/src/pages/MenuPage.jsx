// MenuPage.jsx
import React, { useContext, useState } from "react";
import { FaUtensils, FaWineGlassAlt } from "react-icons/fa";
import { AppContext } from "../context/Appcontext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MenuPage = ({ customerType }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSection, setActiveSection] = useState("Food");
  const { menuItemss, selectedItems, toggleSelectItem } =
    useContext(AppContext);

  // useEffect(() => {
  //   fetchMenuItems();
  // }, []);

  const allCategories = [
    ...new Set(menuItemss.map((item) => item.category?.name)),
  ];
  const currentSectionItems = menuItemss.filter(
    (item) => item.category?.name === activeSection
  );

  const subcategories = [
    "all",
    ...new Set(currentSectionItems.map((item) => item.subcategory?.name)),
  ];
  const filteredItems = currentSectionItems.filter(
    (item) =>
      activeCategory === "all" || item.subcategory?.name === activeCategory
  );

  const handleProceed = () => {
    if (selectedItems.length === 0) {
      toast.error("No items selected");
      return;
    }
    // Navigate to checkout/review page, you can replace with actual routing
    toast.success("Proceeding to checkout...");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat pb-24"
      style={{ backgroundImage: "url(/images/menu-background.png)" }}
    >
      <div className="backdrop-blur-sm bg-black/50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Our Menu
            </h1>
            <p className="text-xl text-white/80">
              Discover our carefully curated selection of food and drinks
            </p>
          </div>

          {/* Section Tabs */}
          <div className="flex justify-center space-x-4 mb-8">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveSection(category);
                  setActiveCategory("all");
                }}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 font-medium transition-all duration-300 ${
                  activeSection === category
                    ? "bg-primary-light dark:bg-primary-dark text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {category === "Food" ? (
                  <FaUtensils className="text-lg sm:text-xl" />
                ) : (
                  <FaWineGlassAlt className="text-lg sm:text-xl" />
                )}
                <span>{category}</span>
              </button>
            ))}
          </div>

          {/* Subcategory Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <span className="text-white text-lg font-medium">
              Select Category:
            </span>
            <div className="w-full sm:w-auto overflow-x-auto">
              <div className="flex space-x-2 min-w-max px-2">
                {subcategories.map((subcat) => (
                  <button
                    key={subcat}
                    onClick={() => setActiveCategory(subcat)}
                    className={`px-4 py-2 font-medium transition-all duration-300 whitespace-nowrap ${
                      activeCategory === subcat
                        ? "bg-primary-light dark:bg-primary-dark text-white"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {subcat.charAt(0).toUpperCase() + subcat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isUnavailable = !item.isAvailable;
              const isSelected = selectedItems.some(entry => entry.itemId === item._id);
              return (
                <div
                  key={item._id}
                  className={`relative p-6 transition-all duration-300 backdrop-blur-sm ${
                    isUnavailable
                      ? "bg-white/10 opacity-50 grayscale cursor-not-allowed"
                      : "bg-white/10 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]"
                  }`}
                >
                  {isUnavailable && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      Out of Stock
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white">
                      {item.name}
                    </h3>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-base font-semibold text-primary-light dark:text-primary-dark">
                        ₦
                      </span>
                      <span className="text-lg font-bold text-primary-light dark:text-primary-dark">
                        {Number(
                          item.prices?.[customerType] || 0
                        ).toLocaleString("en-NG")}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-white/80 mb-4">
                    {item.description}
                  </p>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => toggleSelectItem(item._id, customerType)}
                      disabled={isUnavailable}
                      className={`px-4 py-2 text-sm font-bold rounded ${
                        isSelected
                          ? "bg-primary-dark text-white"
                          : "bg-white text-black hover:bg-gray-300"
                      } disabled:bg-gray-500 disabled:cursor-not-allowed`}
                    >
                      {isSelected ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Proceed Button Fixed */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-black/90 p-4 z-50 flex justify-center">
          <Link to="/selected-items">
            <button
              onClick={handleProceed}
              className="bg-primary-light dark:bg-primary-dark text-white px-8 py-3 rounded font-bold text-lg shadow-lg"
            >
              Proceed
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MenuPage;

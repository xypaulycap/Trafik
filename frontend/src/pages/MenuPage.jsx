// // MenuPage.jsx
// import React, { useContext, useState, useEffect } from "react";
// import { FaUtensils, FaWineGlassAlt, FaStar, FaSearch } from "react-icons/fa";
// import { AppContext } from "../context/Appcontext";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// const MenuPage = ({ customerType }) => {
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [activeSection, setActiveSection] = useState("Food");
//   const [searchQuery, setSearchQuery] = useState("");

//   const { menuItemss, selectedItems, toggleSelectItem, fetchMenuItems } =
//     useContext(AppContext);

//   useEffect(() => {
//     fetchMenuItems();
//   }, []);

//   const allCategories = [
//     ...new Set(menuItemss.map((item) => item.category?.name).filter(Boolean)), 
//   ];

//   const currentSectionItems = menuItemss.filter(
//     (item) => item.category?.name === activeSection
//   );

//   const subcategories = [
//     "all",
//     ...new Set(
//       currentSectionItems
//         .map((item) => item.subcategory?.name)
//         .filter(Boolean)
//     ),
//   ];

//   const filteredItems = currentSectionItems
//     .filter(
//       (item) =>
//         activeCategory === "all" || item.subcategory?.name === activeCategory
//     )
//     .filter((item) =>
//       item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
//     );

//   const handleProceed = () => {
//     if (selectedItems.length === 0) {
//       toast.error("No items selected");
//       return;
//     }
//     toast.success("Proceeding to checkout...");
//   };

//   return (
//     <div className="min-h-screen bg-amber-50 dark:bg-slate-900 bg-[url('/pattern.svg')] bg-fixed bg-cover relative overflow-hidden">
//       {/* Header and Search */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-300 to-orange-400 rounded-full mb-6 shadow-lg">
//             <FaUtensils className="text-2xl text-white" />
//           </div>
//           <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 mb-6 tracking-tight">
//             Our Menu
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
//             Discover our carefully curated selection of culinary masterpieces and artisanal beverages
//           </p>
//         </div>

//         {/* Search Bar */}
//         <div className="flex justify-center mb-12">
//           <div className="relative w-full max-w-md">
//             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//               <FaSearch className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search delicious items..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/50 dark:bg-white/10 backdrop-blur-md text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-lg"
//             />
//           </div>
//         </div>

//         {/* Section Tabs */}
//         <div className="flex justify-center mb-12">
//           <div className="inline-flex bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-2 shadow-lg">
//             {allCategories.map((category, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   setActiveSection(category);
//                   setActiveCategory("all");
//                 }}
//                 className={`flex items-center space-x-3 px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
//                   activeSection === category
//                     ? "bg-gradient-to-r from-amber-300 to-orange-400 text-white shadow-lg transform scale-105"
//                     : "text-gray-800 dark:text-gray-300 hover:text-white hover:bg-white/10"
//                 }`}
//               >
//                 {category === "Food" ? (
//                   <FaUtensils className="text-lg" />
//                 ) : category === "Drinks" ? (
//                   <FaWineGlassAlt className="text-lg" />
//                 ) : (
//                   <FaStar className="text-lg" />
//                 )}
//                 <span>{category}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Subcategory Filter */}
//         <div className="flex flex-col items-center mb-12">
//           <h3 className="text-gray-800 dark:text-white text-lg font-medium mb-4">Filter by Category</h3>
//           <div className="flex flex-wrap justify-center gap-3">
//             {subcategories.map((subcat) => (
//               <button
//                 key={subcat || `subcat-${Math.random()}`}
//                 onClick={() => setActiveCategory(subcat)}
//                 className={`px-6 py-2 font-medium rounded-full transition-all duration-300 ${
//                   activeCategory === subcat
//                     ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg"
//                     : "bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
//                 }`}
//               >
//                 {subcat.charAt(0).toUpperCase() + subcat.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Menu Items Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-32">
//           {filteredItems.map((item) => {
//             const isUnavailable = !item.isAvailable;
//             const isSelected = selectedItems.some(entry => entry.itemId === item._id);
//             return (
//               <div
//                 key={item._id}
//                 className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ${
//                   isUnavailable
//                     ? "opacity-50 grayscale cursor-not-allowed"
//                     : "hover:transform hover:scale-105 hover:shadow-2xl cursor-pointer"
//                 }`}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl"></div>

//                 {isUnavailable && (
//                   <div className="absolute top-4 right-4 z-20 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
//                     Unavailable
//                   </div>
//                 )}

//                 <div className="relative z-10 p-6 h-full flex flex-col border border-gray-400">
//                   <div className="flex justify-between items-start mb-4">
//                     <h3 className="text-xl font-bold text-gray-800 dark:text-white leading-tight flex-1 mr-4">
//                       {item.name}
//                     </h3>
//                     <div className="flex items-center bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
//                       <span className="mr-1">₦</span>
//                       <span>
//                         {Number(item.prices?.[customerType] || 0).toLocaleString("en-NG")}
//                       </span>
//                     </div>
//                   </div>
//                   <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-1">
//                     {item.description}
//                   </p>
//                   <div className="flex justify-center">
//                     <button
//                       onClick={() => toggleSelectItem(item._id, customerType)}
//                       disabled={isUnavailable}
//                       className={`px-8 py-3 font-bold rounded-full transition-all duration-300 transform ${
//                         isSelected
//                           ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-lg scale-105"
//                           : "bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:scale-105"
//                       } disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none`}
//                     >
//                       {isSelected ? "✓ Selected" : "Select Item"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {filteredItems.length === 0 && (
//           <div className="text-center py-16">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
//               <FaSearch className="text-2xl text-gray-400" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No items found</h3>
//             <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
//           </div>
//         )}
//       </div>

//       {/* Floating Proceed Button */}
//       {selectedItems.length > 0 && (
//         <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
//           <Link to="/selected-items">
//             <button
//               onClick={handleProceed}
//               className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-orange-400/50 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
//             >
//               <span>Proceed with {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''}</span>
//               <span className="bg-white/20 px-2 py-1 rounded-full text-sm">→</span>
//             </button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MenuPage;


// import React, { useContext, useState, useEffect, useMemo } from "react";
// import {
//   FaUtensils,
//   FaWineGlassAlt,
//   FaStar,
//   FaSearch,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";
// import { AppContext } from "../context/Appcontext";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// const MenuPage = ({ customerType }) => {
//   const [activeSection, setActiveSection] = useState("Food");
//   const [activeSubCat, setActiveSubCat] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const {
//     menuItemss,
//     selectedItems,
//     toggleSelectItem,
//     fetchMenuItems,
//   } = useContext(AppContext);

//   /* ─── Fetch once ─────────────────────────────────────────────── */
//   useEffect(() => {
//     fetchMenuItems();
//   }, []);

//   /* ─── Derive categories & sections ───────────────────────────── */
//   const categories = useMemo(
//     () => [
//       ...new Set(menuItemss.map((i) => i.category?.name).filter(Boolean)),
//     ],
//     [menuItemss]
//   );

//   const currentSectionItems = useMemo(
//     () => menuItemss.filter((i) => i.category?.name === activeSection),
//     [menuItemss, activeSection]
//   );

//   const subCats = useMemo(() => {
//     return [
//       "all",
//       ...new Set(
//         currentSectionItems.map((i) => i.subcategory?.name).filter(Boolean)
//       ),
//     ];
//   }, [currentSectionItems]);

//   /* ─── Filter, Search, then Group by sub‑category ─────────────── */
//   const grouped = useMemo(() => {
//     return currentSectionItems
//       .filter(
//         (i) => activeSubCat === "all" || i.subcategory?.name === activeSubCat
//       )
//       .filter((i) =>
//         i.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
//       )
//       .reduce((acc, item) => {
//         const key = item.subcategory?.name || "Misc";
//         acc[key] = acc[key] ? [...acc[key], item] : [item];
//         return acc;
//       }, {});
//   }, [currentSectionItems, activeSubCat, searchQuery]);

//   /* ─── Utilities ──────────────────────────────────────────────── */
//   const isSelected = (id) => selectedItems.some((e) => e.itemId === id);

//   const handleProceed = () => {
//     if (!selectedItems.length) return toast.error("No items selected");
//     toast.success("Proceeding to checkout...");
//   };

//   /* ─── Render ─────────────────────────────────────────────────── */
//   return (
//     <div className="min-h-screen bg-amber-50 dark:bg-slate-900 bg-[url('/pattern.svg')] bg-fixed bg-cover relative overflow-hidden">
//       {/* Header */}
//       <header className="relative z-10 max-w-7xl mx-auto px-4 py-12 text-center space-y-6">
//         <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-300 to-orange-400 rounded-full shadow-lg">
//           <FaUtensils className="text-2xl text-white" />
//         </div>
//         <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
//           Our Menu
//         </h1>
//         <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//           Discover our carefully curated selection of culinary masterpieces and artisanal beverages.
//         </p>

//         {/* Search */}
//         <div className="flex justify-center">
//           <label className="relative w-full max-w-md">
//             <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search delicious items..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/50 dark:bg-white/10 backdrop-blur-md text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-orange-400 outline-none"
//             />
//           </label>
//         </div>
//       </header>

//       {/* Category Tabs */}
//       <nav className="flex justify-center mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide px-4">
//         <div className="inline-flex bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-2 gap-2">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => {
//                 setActiveSection(cat);
//                 setActiveSubCat("all");
//               }}
//               className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-transform ${
//                 activeSection === cat
//                   ? "bg-gradient-to-r from-amber-300 to-orange-400 text-white shadow-lg scale-105"
//                   : "text-gray-800 dark:text-gray-300 hover:bg-white/10 hover:text-white"
//               }`}
//             >
//               {cat === "Food" ? (
//                 <FaUtensils />
//               ) : cat === "Drinks" ? (
//                 <FaWineGlassAlt />
//               ) : (
//                 <FaStar />
//               )}
//               {cat}
//             </button>
//           ))}
//         </div>
//       </nav>

//       {/* Sub‑category Ribbon */}
//       <section className="relative mb-12 px-4">
//         <h3 className="sr-only">Sub‑categories</h3>
//         <div className="flex items-center gap-2">
//           {/* Chevron Left */}
//           <button
//             onClick={() => document.getElementById("subcat-ribbon").scrollBy({ left: -200, behavior: "smooth" })}
//             className="p-2 bg-white/20 rounded-full backdrop-blur-md hidden md:block"
//           >
//             <FaChevronLeft />
//           </button>

//           <div
//             id="subcat-ribbon"
//             className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory w-full py-2"
//           >
//             {subCats.map((sc) => (
//               <button
//                 key={sc}
//                 onClick={() => setActiveSubCat(sc)}
//                 className={`px-6 py-2 snap-start rounded-full whitespace-nowrap font-medium transition-colors ${
//                   activeSubCat === sc
//                     ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg"
//                     : "bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/20 hover:text-white"
//                 }`}
//               >
//                 {sc.charAt(0).toUpperCase() + sc.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* Chevron Right */}
//           <button
//             onClick={() => document.getElementById("subcat-ribbon").scrollBy({ left: 200, behavior: "smooth" })}
//             className="p-2 bg-white/20 rounded-full backdrop-blur-md hidden md:block"
//           >
//             <FaChevronRight />
//           </button>
//         </div>
//       </section>

//       {/* Menu Items */}
//       <main className="max-w-7xl mx-auto px-4 pb-36 space-y-16">
//         {Object.keys(grouped).length === 0 && (
//           <p className="text-center text-xl text-gray-500 dark:text-gray-400">No items match your criteria.</p>
//         )}

//         {Object.entries(grouped).map(([subCatName, items]) => (
//           <section key={subCatName}>
//             {/* Sub‑category Heading */}
//             {activeSubCat === "all" && (
//               <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 capitalize">
//                 {subCatName}
//               </h2>
//             )}

//             {/* Item Grid */}
//             <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {items.map((item) => {
//                 const unavailable = !item.isAvailable;
//                 return (
//                   <article
//                     key={item._id}
//                     className={`relative group rounded-3xl overflow-hidden transition-transform ${
//                       unavailable
//                         ? "opacity-50 grayscale cursor-not-allowed"
//                         : "hover:scale-[1.03] hover:shadow-2xl"
//                     }`}
//                   >
//                     {/* Frosted glass background */}
//                     <div className="absolute inset-0 bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl" />

//                     {/* Unavailable badge */}
//                     {unavailable && (
//                       <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
//                         Unavailable
//                       </span>
//                     )}

//                     <div className="relative z-10 p-6 flex flex-col h-full">
//                       {/* Title & Price */}
//                       <header className="flex justify-between items-start mb-4">
//                         <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex-1 mr-3 break-words">
//                           {item.name}
//                         </h3>
//                         <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow inline-flex items-baseline">
//                           ₦{Number(item.prices?.[customerType] || 0).toLocaleString("en-NG")}
//                         </span>
//                       </header>

//                       <p className="text-sm text-gray-600 dark:text-gray-300 flex-1 mb-6 line-clamp-3">
//                         {item.description}
//                       </p>

//                       <button
//                         onClick={() => toggleSelectItem(item._id, customerType)}
//                         disabled={unavailable}
//                         className={`mt-auto px-6 py-2 rounded-full font-bold transition-all ${
//                           isSelected(item._id)
//                             ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-lg scale-105"
//                             : "bg-white text-gray-900 hover:bg-gray-100 shadow"
//                         } disabled:bg-gray-600 disabled:cursor-not-allowed`}
//                       >
//                         {isSelected(item._id) ? "✓ Selected" : "Select Item"}
//                       </button>
//                     </div>
//                   </article>
//                 );
//               })}
//             </div>
//           </section>
//         ))}
//       </main>

//       {/* Proceed Floating Button */}
//       {selectedItems.length > 0 && (
//         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
//           <Link to="/selected-items">
//             <button
//               onClick={handleProceed}
//               className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-transform flex items-center gap-2"
//             >
//               Proceed with {selectedItems.length} item
//               {selectedItems.length > 1 && "s"} →
//             </button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MenuPage;

// MenuPage.jsx
import React, { useContext, useState, useEffect } from "react";
import { FaUtensils, FaWineGlassAlt, FaStar, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
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

  // Filter items based on search and category
  const filteredItems = currentSectionItems
    .filter(
      (item) =>
        activeCategory === "all" || item.subcategory?.name === activeCategory
    )
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

  // Group items by subcategory for better organization when showing all
  const groupedItems = activeCategory === "all" 
    ? subcategories.slice(1).reduce((acc, subcat) => {
        const items = currentSectionItems.filter(item => 
          item.subcategory?.name === subcat &&
          item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
        );
        if (items.length > 0) {
          acc[subcat] = items;
        }
        return acc;
      }, {})
    : null;

  const handleProceed = () => {
    if (selectedItems.length === 0) {
      toast.error("No items selected");
      return;
    }
    toast.success("Proceeding to checkout...");
  };

  // Scroll functions for subcategory buttons
  const scrollSubcategories = (direction) => {
    const container = document.getElementById('subcategory-container');
    const scrollAmount = 200;
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const renderMenuItem = (item) => {
    const isUnavailable = !item.isAvailable;
    const isSelected = selectedItems.some(entry => entry.itemId === item._id);
    
    return (
      <div
        key={item._id}
        className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
          isUnavailable
            ? "opacity-50 grayscale cursor-not-allowed"
            : "hover:transform hover:scale-[1.02] hover:shadow-xl cursor-pointer"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl"></div>

        {isUnavailable && (
          <div className="absolute top-3 right-3 z-20 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            Unavailable
          </div>
        )}

        <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col border dark:border-none">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white leading-tight flex-1 mr-3">
              {item.name}
            </h3>
            <div className="flex items-center bg-gradient-to-r from-amber-400 to-orange-400 text-white px-2 sm:px-3 py-1 rounded-full text-sm font-bold shadow-lg shrink-0">
              <span className="mr-1">₦</span>
              <span className="text-xs sm:text-sm">
                {Number(item.prices?.[customerType] || 0).toLocaleString("en-NG")}
              </span>
            </div>
          </div>
          <p className="text-gray-600/60 dark:text-gray-400/70 text-sm leading-relaxed mb-4 sm:mb-6 flex-1 line-clamp-3">
            {item.description}
          </p>
          <div className="flex justify-center mt-auto">
            <button
              onClick={() => toggleSelectItem(item._id, customerType)}
              disabled={isUnavailable}
              className={`px-4 sm:px-6 py-2 sm:py-3 font-bold rounded-full transition-all duration-300 transform text-sm sm:text-base ${
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
  };

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-slate-900 bg-[url('/pattern.svg')] bg-fixed bg-cover relative overflow-hidden">
      {/* Header and Search */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-amber-300 to-orange-400 rounded-full mb-4 sm:mb-6 shadow-lg">
            <FaUtensils className="text-xl sm:text-2xl text-white" />
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 mb-4 sm:mb-6 tracking-tight">
            Our Menu
          </h1>
          <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
            Discover our carefully curated selection of culinary masterpieces and artisanal beverages
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search delicious items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-2xl bg-white/50 dark:bg-white/10 backdrop-blur-md text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-lg text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-1 sm:p-2 shadow-lg overflow-x-auto">
            <div className="flex space-x-1 sm:space-x-2 min-w-max">
              {allCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveSection(category);
                    setActiveCategory("all");
                  }}
                  className={`flex items-center space-x-2 sm:space-x-3 px-3 sm:px-6 py-2 sm:py-3 font-semibold rounded-xl transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                    activeSection === category
                      ? "bg-gradient-to-r from-amber-300 to-orange-400 text-white shadow-lg transform scale-105"
                      : "text-gray-800 dark:text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {category === "Food" ? (
                    <FaUtensils className="text-sm sm:text-lg" />
                  ) : category === "Drinks" ? (
                    <FaWineGlassAlt className="text-sm sm:text-lg" />
                  ) : (
                    <FaStar className="text-sm sm:text-lg" />
                  )}
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Subcategory Filter with Horizontal Scroll */}
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <h3 className="text-gray-800 dark:text-white text-base sm:text-lg font-medium mb-4 text-center">
            Filter by Category
          </h3>
          <div className="relative w-full max-w-4xl">
            {/* Scroll buttons */}
            <button
              onClick={() => scrollSubcategories('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-full p-2 shadow-lg hover:bg-white/30 transition-all duration-300 hidden sm:flex items-center justify-center"
            >
              <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={() => scrollSubcategories('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-full p-2 shadow-lg hover:bg-white/30 transition-all duration-300 hidden sm:flex items-center justify-center"
            >
              <FaChevronRight className="text-gray-600 dark:text-gray-300" />
            </button>
            
            {/* Scrollable container */}
            <div
              id="subcategory-container"
              className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2 px-8 sm:px-12 scrollbar-hide"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitScrollbar: { display: 'none' }
              }}
            >
              {subcategories.map((subcat) => (
                <button
                  key={subcat || `subcat-${Math.random()}`}
                  onClick={() => setActiveCategory(subcat)}
                  className={`px-4 sm:px-6 py-2 font-medium rounded-full transition-all duration-300 text-sm sm:text-base whitespace-nowrap flex-shrink-0 ${
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
        </div>

        {/* Menu Items - Grouped by Subcategory when showing all */}
        {activeCategory === "all" && groupedItems ? (
          <div className="space-y-12 pb-32">
            {Object.entries(groupedItems).map(([subcategory, items]) => (
              <div key={subcategory} className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {items.map(renderMenuItem)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Single Category View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pb-32">
            {filteredItems.map(renderMenuItem)}
          </div>
        )}

        {/* No items found message */}
        {filteredItems.length === 0 && (!groupedItems || Object.keys(groupedItems).length === 0) && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <FaSearch className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
              No items found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Floating Proceed Button */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-4">
          <Link to="/selected-items">
            <button
              onClick={handleProceed}
              className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg shadow-2xl hover:shadow-orange-400/50 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 whitespace-nowrap"
            >
              <span>Proceed with {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''}</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs sm:text-sm">→</span>
            </button>
          </Link>
        </div>
      )}

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MenuPage;

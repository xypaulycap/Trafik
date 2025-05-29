// import React, { useContext } from "react";
// import { AppContext } from "../context/Appcontext";
// import { toast } from "react-toastify";
// import axios from "axios";

// const SelectedItems = () => {
//   const {
//     menuItemss,
//     backendUrl,
//     toggleSelectItem,
//     selectedItems,
//     setSelectedItems,
//     quantities,
//     setQuantities,
//     total,
//   } = useContext(AppContext);

//   const [showModal, setShowModal] = React.useState(false);
//   const [generatedCode, setGeneratedCode] = React.useState("");

//   const handleQuantityChange = (id, value) => {
//     if (value < 1) return;
//     setQuantities((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleRemoveItem = (id) => {
//     // const updatedItems = selectedItems.filter(itemId => itemId !== id);
//     // const updatedQuantities = { ...quantities };
//     // delete updatedQuantities[id];

//     // setSelectedItems(updatedItems);
//     // setQuantities(updatedQuantities);
//     toggleSelectItem(id);
//   };

//   const handleGenerateCode = async () => {
//     try {
//       const items = selectedItems.map((entry) => ({
//         itemId: entry.itemId,
//         quantity: quantities[entry.itemId] || 1,
//         customerType: entry.customerType,
//         price: entry.price,
//       }));
//       const res = await axios.post(`${backendUrl}/api/order/code`, { items });
//       // toast.success(`Code generated: ${res.data.code}`);
//       setGeneratedCode(res.data.code);
//       setShowModal(true);
//       setSelectedItems([]);
//       setQuantities({});
//       localStorage.removeItem("selectedItems");
//     } catch (error) {
//       toast.error("Failed to generate code", error);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
//       style={{ backgroundImage: "url(/images/menu-background.png)" }}
//     >
//       <div className="backdrop-blur-sm bg-black/50 min-h-screen px-4 pt-12 pb-32">
//         <div className="max-w-4xl mx-auto text-white">
//           <h1 className="text-4xl font-bold mb-6 text-center">
//             Review Your Order
//           </h1>

//           <div className="space-y-6">
//             {selectedItems.map((entry) => {
//               const { itemId, price } = entry;
//               const item = menuItemss.find((i) => i._id === itemId);
//               const quantity = quantities[itemId] || 1;
//               if (!item) return null;

//               return (
//                 <div
//                   key={itemId}
//                   className="bg-white/10 p-4 sm:p-6 rounded shadow flex justify-between items-center relative"
//                 >
//                   <button
//                     onClick={() => handleRemoveItem(itemId)}
//                     className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center text-xs"
//                   >
//                     ×
//                   </button>

//                   <div>
//                     <h2 className="text-xl font-bold">
//                       {item.name}
//                     </h2>
//                     <p className="text-white/80">{item.description}</p>
//                     <span className="block mt-2 font-bold">
//                       ₦{price} x {quantity}
//                     </span>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => handleQuantityChange(itemId, quantity - 1)}
//                       disabled={quantity <= 1}
//                       className="bg-white text-black px-3 py-1 rounded disabled:opacity-50"
//                     >
//                       -
//                     </button>
//                     <input
//                       type="number"
//                       min="1"
//                       value={quantity}
//                       onChange={(e) =>
//                         handleQuantityChange(itemId, parseInt(e.target.value))
//                       }
//                       className="w-12 text-center px-2 py-1 text-black rounded"
//                     />
//                     <button
//                       onClick={() => handleQuantityChange(itemId, quantity + 1)}
//                       className="bg-white text-black px-3 py-1 rounded"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Fixed Footer */}
//       <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm py-4 px-6 flex justify-between items-center z-50 shadow-lg">
//         <span className="text-white font-bold text-xl">
//           Total: ₦{total}
//         </span>
//         <button
//           onClick={handleGenerateCode}
//           disabled={selectedItems.length === 0}
//           className={`px-6 py-3 rounded font-bold ${
//             selectedItems.length === 0
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-primary-light dark:bg-primary-dark text-white"
//           }`}
//         >
//           Generate Code
//         </button>
//       </div>
//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-8 max-w-sm text-center relative shadow-lg">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
//             >
//               ×
//             </button>
//             <h2 className="text-2xl font-bold text-primary-dark mb-4">
//               Your Order Code
//             </h2>
//             <p className="text-lg font-mono bg-gray-100 py-2 px-4 rounded text-black inline-block">
//               {generatedCode}
//             </p>
//             <p className="mt-4 text-sm text-gray-600">
//               Provide this code to a staff member to complete your order.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectedItems;

// import React, { useContext } from "react";
// import { FaUtensils, FaTrash } from "react-icons/fa";
// import { AppContext } from "../context/Appcontext";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// const SelectedItems = ({ customerType }) => {
//   const { selectedItems, toggleSelectItem, clearSelectedItems } = useContext(AppContext);

//   const handleRemoveItem = (itemId) => {
//     toggleSelectItem(itemId, customerType);
//     toast.info("Item removed from selection");
//   };

//   const handleProceedToCheckout = () => {
//     if (selectedItems.length === 0) {
//       toast.error("No items selected");
//       return;
//     }
//     toast.success("Proceeding to checkout...");
//     // Add navigation to checkout page here
//   };

//   const calculateTotal = () => {
//     return selectedItems.reduce((total, item) => 
//       total + (Number(item.prices?.[customerType]) || 0), 0
//     ).toLocaleString("en-NG");
//   };

//   return (
//     <div className="min-h-screen bg-amber-50 dark:bg-slate-900 bg-[url('/pattern.svg')] bg-fixed bg-cover relative overflow-hidden">
//       <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-300 to-orange-400 rounded-full mb-6 shadow-lg">
//             <FaUtensils className="text-2xl text-white" />
//           </div>
//           <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 mb-6 tracking-tight">
//             Your Selected Items
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
//             Review your carefully chosen culinary selections
//           </p>
//         </div>

//         {/* Selected Items Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//           {selectedItems.map((item) => (
//             <div
//               key={item.itemId}
//               className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20"
//             >
//               <div className="relative z-10 p-6 flex flex-col h-full">
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="text-xl font-bold text-gray-800 dark:text-white leading-tight flex-1 mr-4">
//                     {item.name}
//                   </h3>
//                   <div className="flex items-center bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
//                     <span className="mr-1">₦</span>
//                     <span>{Number(item.prices?.[customerType] || 0).toLocaleString("en-NG")}</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-1">
//                   {item.description}
//                 </p>
//                 <div className="flex justify-between items-center">
//                   <button
//                     onClick={() => handleRemoveItem(item.itemId)}
//                     className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-full transition-all duration-300"
//                   >
//                     <FaTrash className="text-sm" />
//                     <span>Remove</span>
//                   </button>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => {
//                         // Add quantity adjustment logic here if needed
//                         toast.info("Quantity adjustment coming soon!");
//                       }}
//                       className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full text-gray-800 dark:text-white hover:bg-white/20"
//                     >
//                       -
//                     </button>
//                     <span className="text-gray-800 dark:text-white font-medium">1</span>
//                     <button
//                       onClick={() => {
//                         // Add quantity adjustment logic here if needed
//                         toast.info("Quantity adjustment coming soon!");
//                       }}
//                       className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full text-gray-800 dark:text-white hover:bg-white/20"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {selectedItems.length === 0 && (
//           <div className="text-center py-16">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
//               <FaUtensils className="text-2xl text-gray-400" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
//               No items selected
//             </h3>
//             <p className="text-gray-500 dark:text-gray-400 mb-6">
//               Head back to the menu to choose your delicious items
//             </p>
//             <Link to="/menu">
//               <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-orange-400/50 transition-all duration-300">
//                 Back to Menu
//               </button>
//             </Link>
//           </div>
//         )}

//         {/* Summary and Proceed */}
//         {selectedItems.length > 0 && (
//           <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 mb-12">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="text-xl font-bold text-gray-800 dark:text-white">
//                   Order Summary
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300">
//                   {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-gray-600 dark:text-gray-300">Total</p>
//                 <p className="text-2xl font-bold text-gray-800 dark:text-white">
//                   ₦{calculateTotal()}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Floating Proceed Button */}
//         {selectedItems.length > 0 && (
//           <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
//             <div className="flex space-x-4">
//               <button
//                 onClick={clearSelectedItems}
//                 className="bg-red-500/10 text-red-500 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-red-500/20 transition-all duration-300"
//               >
//                 Clear All
//               </button>
//               <Link to="/checkout">
//                 <button
//                   onClick={handleProceedToCheckout}
//                   className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-2xl hover:shadow-orange-400/50 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
//                 >
//                   <span>Proceed to Checkout</span>
//                   <span className="bg-white/20 px-2 py-1 rounded-full text-sm">→</span>
//                 </button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SelectedItems;

import React, { useContext } from "react";
import { FaUtensils, FaTrash, FaCopy } from "react-icons/fa";
import { AppContext } from "../context/Appcontext";
import { toast } from "react-toastify";
import axios from "axios";

const SelectedItems = () => {
  const {
    menuItemss,
    backendUrl,
    toggleSelectItem,
    selectedItems,
    setSelectedItems,
    quantities,
    setQuantities,
    total,
  } = useContext(AppContext);

  const [showModal, setShowModal] = React.useState(false);
  const [generatedCode, setGeneratedCode] = React.useState("");

  const handleQuantityChange = (id, value) => {
    if (value < 1) return;
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const handleRemoveItem = (id) => {
    toggleSelectItem(id);
    toast.info("Item removed from selection");
  };

  const handleGenerateCode = async () => {
    try {
      const items = selectedItems.map((entry) => ({
        itemId: entry.itemId,
        quantity: quantities[entry.itemId] || 1,
        customerType: entry.customerType,
        price: entry.price,
      }));
      const res = await axios.post(`${backendUrl}/api/order/code`, { items });
      setGeneratedCode(res.data.code);
      setShowModal(true);
      setSelectedItems([]);
      setQuantities({});
      localStorage.removeItem("selectedItems");
      toast.success(`Code generated: ${res.data.code}`);
    } catch (error) {
      toast.error("Failed to generate code", error);
    }
  };

  const handleClearAll = () => {
    setSelectedItems([]);
    setQuantities({});
    localStorage.removeItem("selectedItems");
    toast.info("All items cleared");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode).then(
      () => {
        toast.success("Code copied to clipboard!");
      },
      () => {
        toast.error("Failed to copy code");
      }
    );
  };

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-slate-900 bg-[url('/pattern.svg')] bg-fixed bg-cover relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-300 to-orange-400 rounded-full mb-6 shadow-lg">
            <FaUtensils className="text-2xl text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 mb-6 tracking-tight">
            Your Selected Items
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Review your carefully chosen culinary selections
          </p>
        </div>

        {/* Selected Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {selectedItems.map((entry) => {
            const { itemId, price } = entry;
            const item = menuItemss.find((i) => i._id === itemId);
            const quantity = quantities[itemId] || 1;
            if (!item) return null;

            return (
              <div
                key={itemId}
                className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20"
              >
                <div className="relative z-10 p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white leading-tight flex-1 mr-4">
                      {item.name}
                    </h3>
                    <div className="flex items-center bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      <span className="mr-1">₦</span>
                      <span>{Number(price).toLocaleString("en-NG")} x {quantity}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-1">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleRemoveItem(itemId)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-full transition-all duration-300"
                    >
                      <FaTrash className="text-sm" />
                      <span>Remove</span>
                    </button>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(itemId, quantity - 1)}
                        disabled={quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full text-gray-800 dark:text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(itemId, parseInt(e.target.value))}
                        className="w-12 text-center bg-white/10 text-gray-800 dark:text-white rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                      <button
                        onClick={() => handleQuantityChange(itemId, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full text-gray-800 dark:text-white hover:bg-white/20"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {selectedItems.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <FaUtensils className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              No items selected
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Head back to the menu to choose your delicious items
            </p>
            <a href="/menu">
              <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-orange-400/50 transition-all duration-300">
                Back to Menu
              </button>
            </a>
          </div>
        )}

        {/* Order Summary */}
        {selectedItems.length > 0 && (
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 mb-12">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Order Summary
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedItems.length} item{selectedItems.length > 1 ? "s" : ""} selected
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 dark:text-gray-300">Total</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  ₦{Number(total).toLocaleString("en-NG")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Floating Buttons */}
        {selectedItems.length > 0 && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <div className="flex space-x-4">
              <button
                onClick={handleClearAll}
                className="bg-red-500/10 text-red-500 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-red-500/20 transition-all duration-300"
              >
                Clear All
              </button>
              <button
                onClick={handleGenerateCode}
                disabled={selectedItems.length === 0}
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-2xl hover:shadow-orange-400/50 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                <span>Generate Code</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-sm">→</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-sm text-center relative shadow-lg">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white text-xl"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Your Order Code
              </h2>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <p className="text-lg font-mono bg-gray-100 dark:bg-gray-700 py-2 px-4 rounded text-gray-800 dark:text-white">
                  {generatedCode}
                </p>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-orange-400/50 transition-all duration-300"
                >
                  <FaCopy className="text-sm" />
                  <span>Copy</span>
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Provide this code to a staff member to complete your order.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedItems;
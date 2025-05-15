import React, { useContext } from "react";
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
    // const updatedItems = selectedItems.filter(itemId => itemId !== id);
    // const updatedQuantities = { ...quantities };
    // delete updatedQuantities[id];

    // setSelectedItems(updatedItems);
    // setQuantities(updatedQuantities);
    toggleSelectItem(id);
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
      // toast.success(`Code generated: ${res.data.code}`);
      setGeneratedCode(res.data.code);
      setShowModal(true);
      setSelectedItems([]);
      setQuantities({});
      localStorage.removeItem("selectedItems");
    } catch (error) {
      toast.error("Failed to generate code", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url(/images/menu-background.png)" }}
    >
      <div className="backdrop-blur-sm bg-black/50 min-h-screen px-4 pt-12 pb-32">
        <div className="max-w-4xl mx-auto text-white">
          <h1 className="text-4xl font-playfair font-bold mb-6 text-center">
            Review Your Order
          </h1>

          <div className="space-y-6">
            {selectedItems.map((entry) => {
              const { itemId, price } = entry;
              const item = menuItemss.find((i) => i._id === itemId);
              const quantity = quantities[itemId] || 1;
              if (!item) return null;

              return (
                <div
                  key={itemId}
                  className="bg-white/10 p-4 sm:p-6 rounded shadow flex justify-between items-center relative"
                >
                  <button
                    onClick={() => handleRemoveItem(itemId)}
                    className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>

                  <div>
                    <h2 className="text-xl font-playfair font-bold">
                      {item.name}
                    </h2>
                    <p className="text-white/80">{item.description}</p>
                    <span className="block mt-2 font-montserrat font-bold">
                      ₦{price} x {quantity}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(itemId, quantity - 1)}
                      disabled={quantity <= 1}
                      className="bg-white text-black px-3 py-1 rounded disabled:opacity-50"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(itemId, parseInt(e.target.value))
                      }
                      className="w-12 text-center px-2 py-1 text-black rounded"
                    />
                    <button
                      onClick={() => handleQuantityChange(itemId, quantity + 1)}
                      className="bg-white text-black px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm py-4 px-6 flex justify-between items-center z-50 shadow-lg">
        <span className="text-white font-bold text-xl font-montserrat">
          Total: ₦{total}
        </span>
        <button
          onClick={handleGenerateCode}
          disabled={selectedItems.length === 0}
          className={`px-6 py-3 rounded font-bold ${
            selectedItems.length === 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-primary-light dark:bg-primary-dark text-white"
          }`}
        >
          Generate Code
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm text-center relative shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Your Order Code
            </h2>
            <p className="text-lg font-mono bg-gray-100 py-2 px-4 rounded text-black inline-block">
              {generatedCode}
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Provide this code to a staff member to complete your order.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedItems;

import React, { useEffect, useState, useMemo, useContext } from "react";
import { FaSearch, FaEdit, FaCheck } from "react-icons/fa";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "food",
    quantity: "",
  });

  const { backendUrl, aToken } = useContext(AdminContext);

  const fetchInventory = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/admin/inventory");
      setInventoryItems(response.data.items);
      console.log(response.data.items);
      
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleQuantityUpdate = async (itemId) => {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 0) return;

    try {
      await axios.post(backendUrl + "/api/admin/inventory/update-item", {
        itemId,
        quantity,
      }, {headers: {aToken} });
      await fetchInventory();
      setEditingItemId(null);
      setNewQuantity("");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("unauthorized",error)
    }
  };

  const handleAddItem = async () => {
    const { name, category, quantity } = newItem;
    if (!name || !quantity || isNaN(parseInt(quantity))) return;

    setAdding(true);
    try {
      await axios.post(backendUrl + "/api/admin/inventory/add-item", {
        name,
        category,
        quantity: parseInt(quantity),
      });
      await fetchInventory();
      setShowModal(false);
      setNewItem({ name: "", category: "food", quantity: "" });
    } catch (error) {
      console.error("Add item failed:", error);
    }
    setAdding(false);
  };

  const filteredItems = useMemo(() => {
    return (inventoryItems || []).filter((item) => {
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStock = showOutOfStock ? item.quantity === 0 : true;
      return matchesCategory && matchesSearch && matchesStock;
    });
  }, [inventoryItems, categoryFilter, searchQuery, showOutOfStock]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Inventory Item
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white shadow rounded-lg p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4 items-center">
          <select
            className="border rounded-lg px-4 py-2"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="perishable">Food</option>
            <option value="non-perishable">Drinks</option>
          </select>

          <button
            onClick={() => setShowOutOfStock((prev) => !prev)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
              showOutOfStock
                ? "bg-red-100 text-red-700 border-red-300"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            {showOutOfStock ? "Showing Out of Stock" : "Show Out of Stock"}
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Inventory Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className={`p-5 rounded-xl shadow-sm border bg-white transition hover:shadow-md ${
              item.quantity === 0 ? "border-red-400 bg-red-50" : ""
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              {item.quantity === 0 && (
                <span className="text-red-600 font-semibold text-sm">
                  Out of Stock
                </span>
              )}
            </div>

            <p className="text-gray-500 text-sm capitalize mb-2">
              Category: {item.category}
            </p>

            <div className="flex items-center gap-3">
              {editingItemId === item._id ? (
                <>
                  <input
                    type="number"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    className="w-20 px-2 py-1 border rounded"
                    min="0"
                  />
                  <button
                    onClick={() => handleQuantityUpdate(item._id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaCheck />
                  </button>
                </>
              ) : (
                <>
                  <p>
                    Quantity:{" "}
                    <span className="font-medium text-gray-700">
                      {item.quantity}
                    </span>
                  </p>
                  <button
                    onClick={() => {
                      setEditingItemId(item._id);
                      setNewQuantity(item.quantity);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative animate-slide-up">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">Add New Item</h3>

            <input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) =>
                setNewItem({ ...newItem, name: e.target.value })
              }
              className="w-full mb-3 px-4 py-2 border rounded-lg"
            />

            <select
              value={newItem.category}
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
              className="w-full mb-3 px-4 py-2 border rounded-lg"
            >
              <option value="food">Food</option>
              <option value="drinks">Drinks</option>
            </select>

            <input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            />

            <button
              onClick={handleAddItem}
              disabled={adding}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {adding ? "Adding..." : "Add Item"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;

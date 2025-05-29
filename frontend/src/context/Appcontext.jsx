import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import socket from "../utils/socket";


export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [menuItemss, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
const [quantities, setQuantities] = useState({});
const [total, setTotal] = useState(0);
const [isLoadedFromStorage, setIsLoadedFromStorage] = useState(false);

  

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //

  // Fetch menu items from the backend
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendUrl}/api/admin/menu/menu-itemss`,
        {}
      );

      // console.log("Menu Items Response:", response.data);

      const fetchedMenuItems = response.data.data || [];
      setMenuItems(fetchedMenuItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch menu items",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  // Listen for real-time updates
  socket.on("availability-updated", (updatedItem) => {
    setMenuItems((prevItems) => {
      // Find the index of the item to update
      const index = prevItems.findIndex(item => item._id === updatedItem._id);
      
      if (index !== -1) {
        // Create a new array with the updated item
        const updatedItems = [...prevItems];
        // Replace the item with the updated one, keeping all populated fields
        updatedItems[index] = {
          ...updatedItems[index], // Keep all existing properties including populated fields
          ...updatedItem,        // Override with updated properties
          isAvailable: updatedItem.isAvailable // Ensure availability is updated
        };
        return updatedItems;
      }
      
      // If item doesn't exist, add it to the array
      return [...prevItems, updatedItem];
    });
  });

  // Cleanup on unmount
  return () => {
    socket.off("availability-updated");
  };
}, []); // Empty dependency array since we only want to set this up once

 // ✅ Load from localStorage ONCE after first render
 useEffect(() => {
    const stored = localStorage.getItem('selectedItems');
    if (stored) {
      const parsed = JSON.parse(stored);
      setSelectedItems(parsed.items || []);
      setQuantities(parsed.quantities || {});
    }
    setIsLoadedFromStorage(true); // mark loading complete
  }, []);

  // ✅ Save to localStorage only AFTER loading from it is complete
  useEffect(() => {
    if (isLoadedFromStorage) {
      localStorage.setItem('selectedItems', JSON.stringify({ items: selectedItems, quantities }));
    }
  }, [selectedItems, quantities, isLoadedFromStorage]);

  useEffect(() => {
  const totalPrice = selectedItems.reduce((sum, entry) => {
    const qty = quantities[entry.itemId] || 1;
    return sum + (entry.price || 0) * qty;
  }, 0);
  setTotal(totalPrice);
}, [quantities, selectedItems]);


  // Toggle item selection

  const toggleSelectItem = (id, customerType) => {
  const item = menuItemss.find((i) => i._id === id);
  if (!item) return;

  setSelectedItems((prev) => {
    const existing = prev.find((entry) => entry.itemId === id);

    if (existing) {
      // Remove item
      const updated = prev.filter((entry) => entry.itemId !== id);
      const newQuantities = { ...quantities };
      delete newQuantities[id];
      setQuantities(newQuantities);
      return updated;
    } else {
      // Add item with extra data
      const selectedItem = {
        itemId: id,
        quantity: 1,
        customerType, // make sure this is available in scope
        price: item.prices?.[customerType] || 0,
      };
      setQuantities((prevQty) => ({ ...prevQty, [id]: 1 }));
      return [...prev, selectedItem];
    }
  });
};

  const clearSelectedItems = () => {
    setSelectedItems([]);
    setQuantities({});
    localStorage.removeItem("selectedItems");
  };
  const value = {
    backendUrl,
    menuItemss,
    setMenuItems,
    loading,
    setLoading,
    fetchMenuItems,
    selectedItems,
    setSelectedItems,
    toggleSelectItem,
    clearSelectedItems,
    quantities,
    setQuantities,
    total
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

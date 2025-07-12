import { createContext, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || null);
    const [aRole, setARole] = useState(localStorage.getItem('aRole') || null);
    const [maToken, setMaToken] = useState(localStorage.getItem('maToken') || null);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saToken, setSaToken] = useState(localStorage.getItem('saToken') || null)
    

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    // 

    const getAuthHeaders = () => {
    const headers = {};
    if (aToken) headers.aToken = aToken;
    if (saToken) headers.saToken = saToken;
    if (maToken) headers.maToken = maToken;
    return headers;
};

    
    const fetchMenuItems = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${backendUrl}/api/admin/menu/menu-items`, {
            headers: getAuthHeaders()
          });
      
        //   console.log('Menu Items Response:', response.data);
      
          const fetchedMenuItems = response.data.data || [];
          setMenuItems(fetchedMenuItems);
      
        } catch (error) {
          console.error('Error fetching menu items:', error);
          toast.error(
            error.response?.data?.message || 'Failed to fetch menu items',
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
      



    const updateMenuItem = async (menuId, isAvailable) => {
        try {
            setLoading(true);
            
            const response = await axios.post(
                `${backendUrl}/api/admin/menu/change-availability`,
                { menuId, isAvailable },
                {
                    headers: getAuthHeaders(),
                }
            );
            
            // console.log('Toggle availability response:', response.data);

            if (response.data.success) {
                toast.success('Menu item availability updated successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                await fetchMenuItems();
                return true;
            }
            return false;
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Failed to update menu item availability',
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateMenuPrice = async (menuId, priceObject) => {
    try {
        setLoading(true);
        const response = await axios.post(
            `${backendUrl}/api/admin/update-price`,
            { menuId, prices: priceObject },
            {
                headers: {
                    aToken
                }
            }
        );

        if (response.data.success) {
            toast.success('Menu item price updated successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            await fetchMenuItems();
            return true;
        }
        return false;
    } catch (error) {
        toast.error(
            error.response?.data?.message || 'Failed to update menu item price',
            {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            }
        );
        return false;
    } finally {
        setLoading(false);
    }
};

  const deleteMenuItem = async (menuId) => {
  try {
    const response = await axios.delete(
      `${backendUrl}/api/admin/menu/delete/${menuId}`,
      {
        headers: {
          aToken,
        },
      }
    );
    
     const { success, message } = response.data;

    if (success) {
      toast.success(message || "Deleted successfully");
    }
    return response.data;
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to delete menu item"
    );
  }
};

    const value = {
        aToken,
        setAToken,
        backendUrl,
        menuItems,
        setMenuItems,
        loading,
        setLoading,
        fetchMenuItems,
        // addMenuItem,
        updateMenuItem,
        updateMenuPrice,
        saToken,
        setSaToken,
        getAuthHeaders,
        maToken,
        setMaToken,
        aRole,
        setARole,
        deleteMenuItem
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
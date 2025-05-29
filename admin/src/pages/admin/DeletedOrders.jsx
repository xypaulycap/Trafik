import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { AdminContext } from '../../context/AdminContext';

const DeletedOrder = () => {

    const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [waiterFilter, setWaiterFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const { backendUrl, getAuthHeaders } = useContext(AdminContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/order/deleted-orders`, {
        headers: getAuthHeaders(),
      });
        setOrders(res.data);
        setFilteredOrders(res.data);
      } catch (error) {
        console.error('Failed to fetch deleted orders:', error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter(order => {
      const matchWaiter = waiterFilter ? order.waiterName.toLowerCase().includes(waiterFilter.toLowerCase()) : true;
      const matchDate = dateFilter ? format(new Date(order.deletedAt), 'yyyy-MM-dd') === dateFilter : true;
      return matchWaiter && matchDate;
    });
    setFilteredOrders(filtered);
  }, [waiterFilter, dateFilter, orders]);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 mt-10">Deleted Orders</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by waiter name"
          value={waiterFilter}
          onChange={e => setWaiterFilter(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 shadow-sm"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map(order => (
          <div key={order._id} className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Code: {order.code}</h2>
            <p className="text-sm text-gray-600 mb-1">Waiter: {order.waiterName || 'N/A'}</p>
            <p className="text-sm text-gray-600 mb-1">Status: {order.status}</p>
            <p className="text-sm text-gray-600 mb-1">Payment: {order.paymentMethod || 'N/A'}</p>
            <p className="text-sm text-gray-600 mb-1">Deleted At: {format(new Date(order.deletedAt), 'PPpp')}</p>
            <p className="text-sm text-gray-600 mb-2">Items:</p>
            <ul className="text-sm list-disc list-inside">
              {order.items.map(item => (
                <li key={item._id}>Price: ₦{item.price.toLocaleString()} | Qty: {item.quantity}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeletedOrder
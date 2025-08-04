import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import {
  FiFilter,
  FiX,
  FiCheck,
  FiClock,
  FiDollarSign,
  FiCreditCard,
  FiTrash2,
} from "react-icons/fi";

const AcceptedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");
  const [codeFilter, setCodeFilter] = useState(""); // state for filtering by order code
  const [startDate, setStartDate] = useState(""); // New start date filter
  const [endDate, setEndDate] = useState(""); // New end date filter
  const [itemFilter, setItemFilter] = useState(""); // new item filter
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [isLoading, setIsLoading] = useState(true);
  const { backendUrl, getAuthHeaders } = useContext(AdminContext);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${backendUrl}/api/order/accepted-orders`, {
        headers: getAuthHeaders(),
      });

      let allOrders = res.data;
      // console.log("Fetched accepted orders:", allOrders);

      const headers = getAuthHeaders();

      if (headers.saToken && !headers.aToken) {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        allOrders = allOrders.filter((order) => {
          const createdAt = new Date(order.createdAt);

          const isToday = createdAt >= startOfToday && createdAt <= endOfToday;
          const isNotCompleted = order.status !== "completed";

          return isToday || isNotCompleted; // show all today's + any not completed
        });
      }

      setOrders(allOrders);
    } catch (err) {
      console.error("Failed to load accepted orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger delete modal
  const confirmDelete = (orderId) => {
    setOrderToDelete(orderId);
    setShowDeleteModal(true);
  };

  // Actual delete handler after confirmation
  const handleDelete = async () => {
    if (!orderToDelete) return;
    try {
      await axios.delete(`${backendUrl}/api/order/order/${orderToDelete}`, {
        headers: getAuthHeaders(),
      });
      setShowDeleteModal(false);
      setOrderToDelete(null);
      fetchOrders(); // refresh after deletion
    } catch (err) {
      console.error("Failed to delete order:", err);
      alert("Failed to delete order. Please try again.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const baseClass = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "completed":
        return (
          <span className={`${baseClass} bg-green-100 text-green-800`}>
            Completed
          </span>
        );
      case "accepted":
      default:
        return (
          <span className={`${baseClass} bg-yellow-100 text-yellow-800`}>
            In Progress
          </span>
        );
    }
  };

  const formatCurrency = (amount) =>
    amount.toLocaleString("en-NG", { style: "currency", currency: "NGN" });


  let filteredOrders = orders;

  // Filter by waiter name
  if (filter.trim()) {
    filteredOrders = filteredOrders.filter((order) =>
      (order.waiterName || "").toLowerCase().includes(filter.toLowerCase())
    );
  }

  // Filter by order code
  if (codeFilter.trim()) {
    filteredOrders = filteredOrders.filter((order) =>
      (order.code || "").toLowerCase().includes(codeFilter.toLowerCase())
    );
  }

  // Filter by start date
  if (startDate) {
    const start = new Date(startDate);
    filteredOrders = filteredOrders.filter(
      (order) => new Date(order.createdAt) >= start
    );
  }

  // Filter by end date
  if (endDate) {
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    filteredOrders = filteredOrders.filter(
      (order) => new Date(order.createdAt) <= end
    );
  }

  // Sort so latest orders come first
  filteredOrders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  let itemFilteredTotalQty = 0;
let itemFilteredTotalAmount = 0;

if (itemFilter.trim()) {
  filteredOrders = filteredOrders.filter((order) =>
    order.items.some((item) =>
      (item.itemId?.name || "")
        .toLowerCase()
        .includes(itemFilter.toLowerCase())
    )
  );

  // Calculate total quantity & amount of that item
  filteredOrders.forEach((order) => {
    order.items.forEach((item) => {
      if (
        (item.itemId?.name || "")
          .toLowerCase()
          .includes(itemFilter.toLowerCase())
      ) {
        itemFilteredTotalQty += item.quantity;
        itemFilteredTotalAmount += item.quantity * item.price;
      }
    });
  });
}


  const handleCompleteClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowCompleteModal(true);
  };

  const handleCompleteSubmit = async () => {
    try {
      await axios.put(
        `${backendUrl}/api/order/mark-completed/${selectedOrderId}`,
        {
          paymentMethod,
        },
        {
          headers: getAuthHeaders(),
        }
      );
      setShowCompleteModal(false);
      setPaymentMethod("Cash");
      setSelectedOrderId(null);
      fetchOrders(); // refresh orders
    } catch (err) {
      console.error("Failed to mark order as completed:", err);
    }
  };

  const totalAccepted = orders.reduce(
    (sum, order) =>
      sum + order.items.reduce((s, item) => s + item.price * item.quantity, 0),
    0
  );

  const totalCompleted = orders
    .filter((order) => order.status === "completed")
    .reduce(
      (sum, order) =>
        sum +
        order.items.reduce((s, item) => s + item.price * item.quantity, 0),
      0
    );

  const net = totalAccepted - totalCompleted;

  return (
    <div className="min-h-screen bg-gray-50 px-2 sm:px-4 pt-20 pb-8 relative">
      {/* Sticky Header */}
      <div className="sticky top-16 z-30 bg-gray-50 py-2 -mx-2 sm:-mx-4 px-2 sm:px-4 border-b border-gray-200 mb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Accepted Orders
            </h1>

            {/* Date Filter Inputs */}
            <div className="flex space-x-2 items-center">
              <label className="text-sm font-medium text-gray-700">From:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">To:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="text-gray-500 hover:text-gray-700"
                  title="Clear date filters"
                >
                  <FiX className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Filter Input */}
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Filter by waiter..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {filter && (
                <button
                  onClick={() => setFilter("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Filter by order code..."
                value={codeFilter}
                onChange={(e) => setCodeFilter(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {codeFilter && (
                <button
                  onClick={() => setCodeFilter("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            <div className="relative w-full sm:w-64">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <FiFilter className="text-gray-400" />
  </div>
  <input
    type="text"
    placeholder="Filter by item name..."
    value={itemFilter}
    onChange={(e) => setItemFilter(e.target.value)}
    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
  />
  {itemFilter && (
    <button
      onClick={() => setItemFilter("")}
      className="absolute inset-y-0 right-0 pr-3 flex items-center"
    >
      <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600" />
    </button>
  )}
</div>

          </div>

          {/* Totals Summary */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {getAuthHeaders().aToken && (
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <p className="text-sm font-medium text-gray-500">
                  Total Accepted
                </p>
                <p className="text-2xl font-semibold text-blue-600">
                  {formatCurrency(totalAccepted)}
                </p>
              </div>
            )}

            {getAuthHeaders().aToken && (
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <p className="text-sm font-medium text-gray-500">
                  Total Completed
                </p>
                <p className="text-2xl font-semibold text-green-600">
                  {formatCurrency(totalCompleted)}
                </p>
              </div>
            )}

            <div
              className={`p-4 rounded-lg shadow-sm ${
                net === 0 ? "bg-green-600" : "bg-red-600"
              }`}
            >
              <p className="text-sm font-medium text-white opacity-90">
                Net Balance
              </p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(net)}
              </p>
            </div>
          </div>

          {itemFilter && (
  <div className="mt-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <h4 className="text-sm font-medium text-gray-700 mb-1">
      Totals for "<span className="font-semibold">{itemFilter}</span>"
    </h4>
    <p className="text-gray-800 text-sm">
      Quantity:{" "}
      <span className="font-semibold text-blue-600">
        {itemFilteredTotalQty}
      </span>{" "}
      | Amount:{" "}
      <span className="font-semibold text-blue-600">
        {formatCurrency(itemFilteredTotalAmount)}
      </span>
    </p>
  </div>
)}

        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex flex-col items-center space-y-2 text-gray-400">
              <FiClock className="h-12 w-12" />
              <p className="text-lg font-semibold">No orders found.</p>
            </div>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const totalPrice = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-sm p-6 mb-4 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {/* Order ID: {order._id.slice(-6).toUpperCase()} */}
                      Order CODE: {order.code}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Created: {formatDate(order.createdAt)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Waiter: {order.waiterName || "N/A"}
                    </p>
                    {order.notes && (
                      <p className="mt-1 text-gray-600 italic">
                        Notes: {order.notes}
                      </p>
                    )}
                  </div>
                  <div>{getStatusBadge(order.status)}</div>
                </div>

                <ul className="mb-4">
                  {order.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between border-b border-gray-100 py-1"
                    >
                      <span>Section: {item.customerType}</span>
                      <span>{item.itemId?.name || 'Item Unknown'}</span>
                      <span className="font-semibold">
                        {item.quantity} x {formatCurrency(item.price)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-gray-800">
                    Total: {formatCurrency(totalPrice)}
                  </div>

                  <div className="flex space-x-2">
                    {order.status !== "completed" && (
                      <button
                        onClick={() => handleCompleteClick(order._id)}
                        className="flex items-center space-x-1 text-green-600 hover:text-green-800"
                        title="Mark as Completed"
                      >
                        <FiCheck className="h-5 w-5" />
                        <span>Complete</span>
                      </button>
                    )}

                    <button
                      onClick={() => confirmDelete(order._id)}
                      className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                      title="Delete Order"
                    >
                      <FiTrash2 className="h-5 w-5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Complete Modal */}
      {showCompleteModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setShowCompleteModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">
              Mark Order as Completed
            </h3>
            <label className="block mb-2 font-medium text-gray-700">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            >
              <option>Cash</option>
              <option>Card</option>
              <option>Mobile Payment</option>
              <option>Other</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowCompleteModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteSubmit}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Delete Order</h3>
            <p>Are you sure you want to delete this order?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptedOrders;

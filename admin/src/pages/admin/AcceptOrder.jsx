import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';

const AcceptOrder = () => {
  const [code, setCode] = useState('');
  const [waiterName, setWaiterName] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [accepted, setAccepted] = useState(false);
  const { backendUrl, getAuthHeaders } = useContext(AdminContext);

  const printRef = useRef();

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/order/code/${code}`, {
        headers: getAuthHeaders(),
      });
      setOrder(res.data);
      setError('');
      setAccepted(false);
    } catch (err) {
      setOrder(null);
      setError('❌ Order not found. Please check the code.', err);
    }
  };

  const handleAccept = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/order/accept-order`,
        { code, waiterName },
        { headers: getAuthHeaders() }
      );
      setAccepted(true);
    } catch (err) {
      setError('❌ Failed to accept order. Please try again.', err);
    }
  };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp || Date.now());
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 mt-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Accept Order</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Order Code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full p-3 border rounded-md text-lg"
          />

          <button
            onClick={fetchOrder}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Fetch Order
          </button>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {order && (
            <>
              <div className="border-t pt-4">
                <h2 className="font-semibold text-xl mb-2">Selected Items</h2>
                <ul className="text-gray-700 space-y-1 mb-4">
                  {order.items.map(({ itemId, quantity, price }) => (
  <li key={itemId._id}>
    <span className="font-medium">{itemId.name}</span> – {formatCurrency(price)} × {quantity}
  </li>
))}

                </ul>
              </div>

              <input
                type="text"
                placeholder="Enter Waiter's Name"
                value={waiterName}
                onChange={(e) => setWaiterName(e.target.value)}
                className="w-full p-3 border rounded-md"
              />

              <button
                onClick={handleAccept}
                disabled={!waiterName}
                className={`w-full py-2 font-semibold rounded-md transition ${
                  waiterName
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                Accept Order
              </button>

              {accepted && (
                <div className="mt-4 text-center">
                  <p className="text-green-600 font-semibold mb-3">✅ Order Accepted!</p>
                  <button
                    onClick={handlePrint}
                    className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md"
                  >
                    Print Order
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Printable Receipt */}
      {order && accepted && (
        <div ref={printRef} className="hidden print:block p-6 font-sans text-black">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold uppercase">Trafik Lounge</h1>
            <p className="text-sm">Order Receipt</p>
            <hr className="my-2 border-black" />
          </div>

          <div className="text-sm">
            <p><strong>Order Code:</strong> {order.code}</p>
            <p><strong>Waiter:</strong> {waiterName}</p>
            <p><strong>Date/Time:</strong> {formatDate(order.createdAt)}</p>
            <hr className="my-2 border-black" />

            <ul className="space-y-1">
              {order.items.map(({ itemId, quantity, price }) => (
  <li key={itemId._id}>
    {itemId.name} – {formatCurrency(price)} × {quantity} = <strong>{formatCurrency(price * quantity)}</strong>
  </li>
))}

            </ul>

            <hr className="my-2 border-black" />
            <p className="font-bold text-lg">
              Total:{' '}
              {formatCurrency(
                order.items.reduce(
                  (sum, {price, quantity}) => sum + price *quantity,
                  0
                )
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptOrder;

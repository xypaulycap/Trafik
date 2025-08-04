import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { useReactToPrint } from "react-to-print";

const AcceptOrder = () => {
  const [code, setCode] = useState("");
  const [waiterName, setWaiterName] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [canPrint, setCanPrint] = useState(false);
  const { backendUrl, getAuthHeaders } = useContext(AdminContext);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Receipt_${order?.code || "Order"}`,
    onAfterPrint: () => {
      console.log("Print completed");
    },
    onPrintError: (errorLocation, error) => {
      console.error("Print error:", errorLocation, error);
      setError("❌ Print failed. Please try again.");
    },
  });

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/order/code/${code}`, {
        headers: getAuthHeaders(),
      });
      console.log(res);

      setOrder(res.data);
      setError("");
      setAccepted(false);
      setCanPrint(false);
    } catch (err) {
      setOrder(null);
      setError("❌ Order not found. Please check the code.", err);
      setCanPrint(false);
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
      setError("");
    } catch (err) {
      setError("❌ Failed to accept order. Please try again.", err);
      setCanPrint(false);
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp || Date.now());
    return date.toLocaleString();
  };

  // Update canPrint based on printRef, order, and accepted
  useEffect(() => {
    if (printRef.current && order && accepted) {
      console.log("printRef is assigned:", printRef.current);
      setCanPrint(true);
    } else {
      console.log("printRef is not assigned or conditions not met");
      setCanPrint(false);
    }
  }, [order, accepted]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 mt-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Accept Order
        </h1>

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
                  {order.items?.map(
                    ({ itemId, quantity, price, customerType }) => (
                      <li key={itemId._id}>
                        <p className="font-medium tex-lg mb-2">
                          SECTION: {customerType}
                        </p>
                        <span className="font-medium">{itemId.name}</span> –{" "}
                        {formatCurrency(price)} × {quantity}
                      </li>
                    )
                  )}
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
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Accept Order
              </button>

              {accepted && (
                <div className="mt-4 text-center">
                  <p className="text-green-600 font-semibold mb-3">
                    ✅ Order Accepted!
                  </p>
                  <button
                    onClick={() => {
                      if (canPrint) {
                        handlePrint();
                      } else {
                        setError(
                          "❌ Cannot print: Receipt content is not available."
                        );
                      }
                    }}
                    disabled={!canPrint}
                    className={`bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md ${
                      !canPrint && "opacity-50 cursor-not-allowed"
                    }`}
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
        <div className="mt-4 border-t pt-2">
          <h3 className="text-lg font-semibold mb-4">Receipt Preview:</h3>
          {/* <div
            ref={printRef}
            className="receipt border px-6 pb-6 bg-white text-black text-sm font-mono max-w-sm mx-auto"
          >
          <div className="text-center mb-2 flex flex-col items-center">
            <img src="/images/logo.png" alt="" className="w-32 invert" />
            <h1 className="text-lg font-bold uppercase">Trafik Lounge</h1>
            <p className="text-xs">Order Receipt</p>
            <hr className="my-1 border-black" />
          </div>

          <div>
            <p><strong>Order Code:</strong> {order.code}</p>
            <p><strong>Waiter:</strong> {waiterName}</p>
            <p><strong>Date/Time:</strong> {formatDate(order.createdAt)}</p>
            <hr className="my-1 border-black" />
            <ul className="mb-2">
              {order.items?.map(({ itemId, quantity, price, customerType }) => (
                <div key={itemId._id}>
                  {customerType === "vip" && (
      <p className="text-[10px] uppercase">VIP</p>
    )}
                <li className="flex justify-between text-xs mb-1 border-b ">
                  <span>{itemId.name} × {quantity}</span>
                  <span>{formatCurrency(price * quantity)}</span>
                </li>
                </div>
              ))}
            </ul>
            <hr className="my-1 border-black" />
            <p className="font-bold text-sm text-right">
              Total:{" "}
              {formatCurrency(
                order.items?.reduce(
                  (sum, { price, quantity }) => sum + price * quantity,
                  0
                ) || 0
              )}
            </p>
          </div> */}
          {/* </div> */}
          <div
            ref={printRef}
            className="receipt border px-6 pb-6 bg-white text-black text-sm font-mono max-w-sm mx-auto"
          >
            <div className="text-center mb-2 flex flex-col items-center">
              <img src="/images/logo.png" alt="" className="w-32 invert" />
              <h1 className="text-lg font-bold uppercase">Trafik Lounge</h1>
              <p className="text-xs">Order Receipt</p>
              <hr className="my-1 border-black" />
            </div>

            <div>
              <p>
                <strong>Order Code:</strong> {order.code}
              </p>
              <p>
                <strong>Waiter:</strong> {waiterName}
              </p>
              <p>
                <strong>Date/Time:</strong> {formatDate(order.createdAt)}
              </p>
              <hr className="my-1 border-black" />

              <ul className="mb-2">
                {order.items?.map(
                  ({ itemId, quantity, price, customerType }) => (
                    <div key={itemId._id}>
                      {customerType === "vip" && (
                        <p className="text-[10px] uppercase font-bold">VIP</p>
                      )}
                      <li className="flex justify-between text-xs mb-1 border-b border-black">
                        <span>
                          {itemId.name} × {quantity}
                        </span>
                        <span>{formatCurrency(price * quantity)}</span>
                      </li>
                    </div>
                  )
                )}
              </ul>

              <hr className="my-1 border-black" />

              <p className="font-bold text-sm text-right">
                Total:{" "}
                {formatCurrency(
                  order.items?.reduce(
                    (sum, { price, quantity }) => sum + price * quantity,
                    0
                  ) || 0
                )}
              </p>

              <hr className="my-2 border-black" />

              {/* Payment Information */}
              <div className="mb-3">
                <p className="font-bold text-xs text-center mb-2 uppercase">
                  Payment Information
                </p>
                <p className="text-xs">
                  <strong>Account Name:</strong> TRAFIK LOUNGE LIMITED
                </p>
                <p className="text-xs">
                  <strong>Account Number:</strong> 0123456789
                </p>
                <p className="text-xs">
                  <strong>Bank:</strong> MONIE POINT
                </p>
              </div>

              <hr className="my-2 border-black" />

              {/* Disclaimer */}
              <div className="border border-black p-2 mb-3">
                <p className="text-[10px] font-bold text-center mb-1 uppercase">
                  ⚠️ Important Notice
                </p>
                <p className="text-[10px] text-center leading-tight">
                  Please ensure payments are made ONLY to accounts bearing the
                  name "TRAFIK" or "TRAFIK LOUNGE". Do NOT pay into any personal
                  accounts. For verification, contact management.
                </p>
              </div>

              {/* Footer */}
              <div className="text-center text-xs">
                <p className="mb-1">Thank you for dining with us!</p>
                <p>Visit us again soon</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptOrder;

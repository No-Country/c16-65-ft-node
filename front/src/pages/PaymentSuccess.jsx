import React, { useState } from "react";

const PaymentSuccess = () => {
  const [showMessage, setShowMessage] = useState(true);

  const handleClose = () => {
    setShowMessage(false);
  };

  return (
    <>
      {showMessage && (
        <div className="bg-green-50 border border-green-200 text-green-900 px-6 py-4 rounded-lg flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-10 w-10 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="ml-4">
            <div className="font-semibold">¡Pago exitoso!</div>
            <div>Tu compra se ha realizado con éxito.</div>
          </div>
          <button className="ml-auto focus:outline-none" onClick={handleClose}>
            <svg
              className="h-6 w-6 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-13.293a1 1 0 00-1.414 1.414L9 10.414 6.707 8.121a1 1 0 00-1.414 1.414L7.586 11l-2.293 2.293a1 1 0 001.414 1.414L9 12.414l2.293 2.293a1 1 0 001.414-1.414L10.414 11l2.293-2.293a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default PaymentSuccess;

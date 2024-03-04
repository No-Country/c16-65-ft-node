// CancelPayment.jsx
import React from "react";

const CancelPayment = () => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg flex items-center">
      <div className="flex-shrink-0">
        <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div className="ml-4">
        <div className="font-semibold">¡Pago cancelado!</div>
        <div>Tu compra ha sido cancelada.</div>
      </div>
    </div>
  );
};

export default CancelPayment; // Asegúrate de exportar el componente aquí

import React from 'react';

export default function Products() {
  const stored = JSON.parse(localStorage.getItem('products') || '[]');
  const products = stored.length
    ? stored
    : [
        { id: 1, name: 'Shampoo', price: 12.99 },
        { id: 2, name: 'Conditioner', price: 9.99 },
        { id: 3, name: 'Haircut', price: 25.0 },
      ];

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Products & Services (View Only)
      </h1>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md flex justify-between items-center hover:shadow-lg transition"
          >
            <div>
              <div className="font-semibold text-gray-800 dark:text-gray-100 text-base md:text-lg">
                {p.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                ${p.price.toFixed(2)}
              </div>
            </div>

            <div className="text-xs md:text-sm text-gray-400">
              View only
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

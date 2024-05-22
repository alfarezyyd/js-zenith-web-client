'use client'
import React, {useEffect, useState} from 'react';
import useAuthStore from "@/lib/authStore";

export default function ProductCart({product, selectedProducts, handleCheckboxChange, handleQuantityChange}) {
  const accessToken = useAuthStore((state) => state.accessToken);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    handleQuantityChange(product.id, quantity);
  }, [quantity]);

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const removeProductFromCart = (async () => {
    let responseCart = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carts/delete/${product.id}`, {
      method: "DELETE",
      cache: "no-store",
      headers: {
        Referer: '127.0.0.1:8000',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
    });
    if (responseCart.status === 200) {
      window.location.reload()
    }
  })

  return (
    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0 md:mb-8 sm:mb-4">
      <input
        type="checkbox"
        checked={selectedProducts.some((value) => value.id === product.id)}
        onChange={() => handleCheckboxChange(product)}
        className="mx-4 my-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />

      <a href="#" className="shrink-0 md:order-1">
        <img
          className="hidden h-20 w-20 dark:block"
          src={process.env.NEXT_PUBLIC_BACKEND_URL + `/storage/stores/${product.resources[0].image_path}`}
          alt="product image"
        />
      </a>

      <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
      <div className="flex items-center justify-between md:order-3 md:justify-end">
        <div className="flex items-center">
          <button
            type="button"
            onClick={decrementQuantity}
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          >
            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
            </svg>
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
          />
          <button
            type="button"
            onClick={incrementQuantity}
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          >
            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 1v16M1 9h16"/>
            </svg>
          </button>
        </div>
        <div className="text-end md:order-4 md:w-32">
          <p className="text-base font-bold text-gray-900 dark:text-white">${product.price * quantity}</p>
        </div>
      </div>
      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
        <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">
          {product.name}
        </a>
        <div className="flex items-center gap-4">

          <button
            type="button" onClick={removeProductFromCart}
            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
          >
            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M6 18 17.94 6M18 18 6.06 6"/>
            </svg>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

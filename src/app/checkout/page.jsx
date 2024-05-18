"use client"
import React, {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import useCartStore from "@/lib/useCartStore";
import useAuthStore from "@/lib/authStore";

export default function Page() {
  const midtransParams = useSearchParams();
  const accessToken = useAuthStore((state) => state.accessToken);
  const {cart, initializeCartFromStorage} = useCartStore();
  const [token, setToken] = React.useState("");
  let [totalPrice, setTotalPrice] = useState(0)
  const checkout = async () => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/checkout`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Referer: '127.0.0.1:8000',
        Accept: 'application/json',
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({gross_amount: totalPrice}),
    });

    const requestData = await response.json();
    window.snap.pay(requestData.data.token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        alert("payment success!");
        console.log(result);
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        alert("wating your payment!");
        console.log(result);
      },
      onError: function (result) {
        /* You may add your own implementation here */
        alert("payment failed!");
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert('you closed the popup without finishing the payment');
      }
    })
  };

  useEffect(() => {
    const token = midtransParams.get('token');
    setToken(token)
    // You can also change below url value to any script url you wish to load,
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    initializeCartFromStorage()

  }, []);

// Menghitung total price setiap kali cart berubah atau komponen dirender ulang
  useEffect(() => {
    let calculatedTotalPrice = 0;

    // Iterasi melalui setiap item dalam cart dan menghitung total price
    cart.forEach((item) => {
      calculatedTotalPrice += item.product.price * item.quantity;
    });

    // Mengupdate state totalPrice dengan nilai yang dihitung
    setTotalPrice(calculatedTotalPrice);
  }, [cart]);

  return (
    <section className="bg-white p-4 antialiased dark:bg-gray-900 md:p-16">
      <htmlForm action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Order Summary</h2>

          <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Billing & Delivery
              Formation</h4>

            <dl>
              <dt className="text-base font-medium text-gray-900 dark:text-white">Individual</dt>
              <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">Bonnie Green - +1 234 567
                890, San
                Francisco, CalihtmlFornia, United States, 3454, Scott Street
              </dd>
            </dl>

            <button type="button" data-modal-target="billingInhtmlFormationModal"
                    data-modal-toggle="billingInhtmlFormationModal"
                    className="text-base font-medium text-primary-700 hover:underline dark:text-primary-500">Edit
            </button>
          </div>

          <div className="mt-6 sm:mt-8">
            <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
              <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                <thead>
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4 text-right">Price</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {
                  cart.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td className="whitespace-nowrap py-4 md:w-[384px]">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center aspect-square w-10 h-10 shrink-0">
                              <img className="h-auto w-full max-h-full dark:hidden"
                                   src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"/>
                              <img className="hidden h-auto w-full max-h-full dark:block"
                                   src={process.env.NEXT_PUBLIC_BACKEND_URL + `/storage/stores/${value.product.resources[0].image_path}`}/>
                            </div>
                            <p className="hover:underline">{value.product.name}</p>
                          </div>
                        </td>
                        <td className="p-4 text-base font-normal text-gray-900 dark:text-white">x{value.quantity}</td>
                        <td
                          className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">Rp. {value.product.price}</td>
                      </tr>
                    )
                  })
                }

                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-6">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Order Summary</h4>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-gray-500 dark:text-gray-400">Original Price</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">Rp. {totalPrice}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-gray-500 dark:text-gray-400">Store Pickup</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-gray-500 dark:text-gray-400">Tax</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">Rp. {totalPrice * 0.1}</dd>
                  </dl>
                </div>
                <dl
                  className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd
                    className="text-lg font-bold text-gray-900 dark:text-white">Rp. {totalPrice + (totalPrice * 0.1)}</dd>
                </dl>
              </div>

              <div className="flex items-start sm:items-center">
                <input id="terms-checkbox-2" type="checkbox" value=""
                       className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"/>
                <label htmlFor="terms-checkbox-2"
                       className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> I
                  agree
                  with the <a href="#" title=""
                              className="text-primary-700 underline hover:no-underline dark:text-primary-500">Terms
                    and
                    Conditions</a> of use of the Flowbite marketplace </label>
              </div>

              <div className="gap-4 sm:flex sm:items-center">
                <button type="button"
                        className="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Return
                  to Shopping
                </button>

                <button type="submit" onClick={checkout}
                        className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">Send
                  the order
                </button>
              </div>
            </div>
          </div>
        </div>
      </htmlForm>
    </section>
  );
}
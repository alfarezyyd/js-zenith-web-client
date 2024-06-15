"use client"
import {useSearchParams} from 'next/navigation'
import {useEffect, useState} from "react";
import useAuthStore from "@/lib/authStore";

export default function Page() {
  const searchParams = useSearchParams()
  const [order, setOrder] = useState();
  const orderId = searchParams.get('order_id')
  const [loading, setLoading] = useState(true);
  const accessToken = useAuthStore((state) => state.accessToken);

  const fetchDataOrder = (async () => {
    let responseOrder = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/find/${orderId}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Referer: '127.0.0.1:8000',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
    });
    let dataOrder = await responseOrder.json();
    setOrder(dataOrder.data)
    setLoading(false);

  })
  useEffect(() => {
    fetchDataOrder()
    console.log(order)
  }, []);

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-2xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">Thanks for your order!</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">Your order
          <a href="#" className="font-medium text-gray-900 dark:text-white hover:underline">
            {" "} {orderId}
          </a> will
          be processed within 24 hours during working days. We will notify you by email once your order has been
          shipped.</p>
        <div
          className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Date</dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{order.created_at}</dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Name</dt>
            <dd
              className="font-medium text-gray-900 dark:text-white sm:text-end">{order.user.first_name + ' ' + order.user.last_name}</dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Address</dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {order.address.street}, RT. {order.address.neighbourhood_number}, RW. {order.address.hamlet_number},
              Desa {order.address.village}, Kelurahan {order.address.urban_village},
              Kecamatan {order.address.sub_district}, Kode
              POS {order.address.postal_code}
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Phone</dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{order.user.phone}</dd>
          </dl>
        </div>
        <div className="flex items-center space-x-4">
          <a href={process.env.NEXT_PUBLIC_BASE_URL}
             className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Return
            to shopping</a>
        </div>
      </div>
    </section>
  )
}
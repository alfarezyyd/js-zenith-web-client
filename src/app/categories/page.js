'use client'

import useAuthStore from "@/lib/authStore";
import {useEffect, useState} from "react";
import {Button} from "@nextui-org/react";
import Link from "next/link";

export default function Page() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [categories, setCategories] = useState([])
  const fetchData = (async () => {
    let responseCategory = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Referer: '127.0.0.1:8000',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
    });
    let dataCategory = await responseCategory.json();
    setCategories(dataCategory.data)
  })
  useEffect(() => {
    fetchData()
  }, []);
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5 mt-14 sm:mt-6 rounded-xl">
      <div className="p-4 mx-auto max-w-screen-2xl lg:px-12">
        <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          All Categories
        </h2>
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div
              className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
              <Button type="button" as={Link} href={`/categories/create`}
                      className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg"
                     aria-hidden="true">
                  <path clipRule="evenodd" fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
                </svg>
                Add new product
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">Id</th>
                <th scope="col" className="px-4 py-3">Name</th>
              </tr>
              </thead>
              <tbody>
              {categories.length > 0 ? (categories.map((value, index) => {
                console.log(value)
                  return (
                    <tr key={index}
                        className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          {value.id}
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          {value.name}
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center">
                      No categories found
                    </div>
                  </td>
                </tr>
              )
              }
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </section>
  )
}
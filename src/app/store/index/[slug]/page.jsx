'use client'
import {
  Button,
  Checkbox,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader, useDisclosure
} from "@nextui-org/react";
import Link from "next/link";
import useAuthStore from "@/lib/authStore";
import {useEffect, useState} from "react";
import {LockIcon} from "@/assets/LockIcon";

export default function Page({params}) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [store, setStore] = useState();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Tambahkan state untuk pemuatan
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [receiptNumber, setReceiptNumber] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState();

  const handleOpenModal = (orderId) => {
    setSelectedOrderId(orderId);
    onOpen();
  };

  const handleSubmitReceiptNumber = async () => {
    if (!selectedOrderId || !receiptNumber) {
      return;
    }
    console.log(selectedOrderId);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/sent`, {
        method: "POST",
        cache: "no-store",
        headers: {
          Referer: '127.0.0.1:8000',
          Accept: 'application/json',
          "Content-Type": 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            order_id: selectedOrderId,
            receipt_number: receiptNumber,
          }
        )
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Receipt number submitted successfully:', data);
        onOpenChange(false);
      } else {
        console.error('Failed to submit receipt number:', data);
      }
    } catch (error) {
      console.error('Error submitting receipt number:', error);
    }
  };


  const fetchData = (async () => {
    try {
      let responseStore = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stores/${params.slug}`, {
        method: "GET",
        cache: "no-store",
        headers: {
          Referer: '127.0.0.1:8000',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
      });
      let dataStore = await responseStore.json();
      setStore(dataStore.data)
      console.log(dataStore)
      let responseOrder = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${dataStore.data.id}`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            Referer: '127.0.0.1:8000',
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
        });
      let dataOrders = await responseOrder.json();
      setOrders(dataOrders.data)
      setLoading(false); // Set pemuatan menjadi false setelah data berhasil diambil
    } catch (error) {
      console.error(error)
      setLoading(false); // Set pemuatan menjadi false setelah data berhasil diambil
    }
  });
  useEffect(() => {
    fetchData()
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900 rounded-xl">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              {store.name}
            </h2>
            <p className="mb-4">
              {store.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Image className="w-full rounded-lg"
                   src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                   alt="office content 1"/>
            <Image className="mt-4 w-full lg:mt-10 rounded-lg"
                   src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
                   alt="office content 2"/>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5 mt-14 sm:mt-6 rounded-xl">

        <div className="p-4 mx-auto max-w-screen-2xl lg:px-12">
          <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            All Product
          </h2>
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div
              className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex items-center flex-1 space-x-4">
                <h5>
                  <span className="text-gray-500">All Products:</span>
                  <span className="dark:text-white">123456</span>
                </h5>
                <h5>
                  <span className="text-gray-500">Total sales:</span>
                  <span className="dark:text-white">$88.4k</span>
                </h5>
              </div>
              <div
                className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                <Button type="button" as={Link} href={`/store/product/create/${store.slug}`}
                        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                  <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                       xmlns="http://www.w3.org/2000/svg"
                       aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
                  </svg>
                  Add new product
                </Button>
                <button type="button"
                        className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none"
                       viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                  </svg>
                  Update stocks 1/250
                </button>
                <button type="button"
                        className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       strokeWidth="2" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                  </svg>
                  Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input id="checkbox-all" type="checkbox"
                             className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">Product</th>
                  <th scope="col" className="px-4 py-3">Category</th>
                  <th scope="col" className="px-4 py-3">Price</th>
                  <th scope="col" className="px-4 py-3">Minimum Order</th>
                  <th scope="col" className="px-4 py-3">SKU</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                  <th scope="col" className="px-4 py-3">Height</th>
                  <th scope="col" className="px-4 py-3">Width</th>
                  <th scope="col" className="px-4 py-3">Weight</th>
                </tr>
                </thead>
                <tbody>
                {
                  store.products.map((value, index) => {
                    return (
                      <tr key={index}
                          className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="w-4 px-4 py-3">
                          <div className="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox"
                                   className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                          </div>
                        </td>

                        <th scope="row"
                            className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/stores/${value.resources[0].image_path}`}
                            alt="iMac Front Image" className="w-auto h-8 mr-3"/>
                        </th>
                        <td className="px-4 py-2">
                  <span
                    className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{value.category[0].name}</span>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center">
                            <div className="inline-block w-4 h-4 mr-2 bg-green-500 rounded-full"></div>
                            {value.price}
                          </div>
                        </td>
                        <td
                          className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{value.minimum_order}</td>
                        <td
                          className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{value.sku}</td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center">
                            <span className="ml-1 text-gray-500 dark:text-gray-400">{value.status}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true">
                              <path
                                d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"/>
                            </svg>
                            {value.height}
                          </div>
                        </td>
                        <td className="px-4 py-2">{value.width}</td>
                        <td
                          className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{value.weight}
                        </td>
                      </tr>

                    )
                  })
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5 mt-14 sm:mt-6 rounded-xl">
        <div className="p-4 mx-auto max-w-screen-2xl lg:px-12">
          <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            All Order
          </h2>
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">Id</th>
                  <th scope="col" className="px-4 py-3">Total Price</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                  <th scope="col" className="px-4 py-3">Expedition</th>
                  <th scope="col" className="px-4 py-3">User</th>
                  <th scope="col" className="px-4 py-3">Action</th>
                </tr>
                </thead>
                <tbody>
                {
                  orders.map((value, index) => {
                    console.log(value)
                    return (
                      <tr key={index}
                          className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">

                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center">
                            {value.id}
                          </div>
                        </td>
                        <td
                          className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{value.total_price}</td>
                        <td
                          className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{value.status}</td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center">
                            <span className="ml-1 text-gray-500 dark:text-gray-400">{value.expedition.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center">

                            {value.user.first_name + " " + value.user.last_name}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <Button size="sm" onPress={() => handleOpenModal(value.id)} color="primary"
                                  className="mr-2 md: mb-2">Sent</Button>
                          <Button size={"sm"} onPress={onOpen} color="danger">Reject</Button>
                        </td>
                      </tr>

                    )
                  })
                }
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                  }
                  label="Receipt Number"
                  placeholder="Enter Receipt Number for the order"
                  type="text"
                  variant="bordered"
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                />
                <div className="flex py-2 px-1 justify-between">

                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmitReceiptNumber}>Submit</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
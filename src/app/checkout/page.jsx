"use client"
import React, {useEffect, useState} from "react";
import useCartStore from "@/lib/useCartStore";
import useAuthStore from "@/lib/authStore";
import {
  Button,
  Card, CardBody, CardFooter,
  CardHeader, Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import {redirect} from "next/navigation";

export default function Page() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [addresses, setAddresses] = React.useState([]);
  const [expeditions, setExpeditions] = React.useState([]);
  let [totalPrice, setTotalPrice] = useState(0)
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedExpedition, setSelectedExpedition] = useState(1);
  const {selectedProducts} = useCartStore();


  const calculateTotalPrice = () => {
    const total = selectedProducts.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedProducts]);


  const fetchInitializeData = async () => {
    try {
      let responseAddresses = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/addresses`, {
        method: "GET",
        cache: "no-store",
        headers: {
          Referer: '127.0.0.1:8000',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
      });
      let dataAddresses = await responseAddresses.json();
      setAddresses(dataAddresses.data);
      setSelectedAddress(dataAddresses.data[0])
      let responseExpedition = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expeditions`, {
        method: "GET",
        cache: "no-store",
        headers: {
          Referer: '127.0.0.1:8000',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
      });
      let dataExpeditions = await responseExpedition.json();
      setExpeditions(dataExpeditions.data)
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const checkout = async () => {
    const orderPayload = {
      address_id: selectedAddress['id'],
      expedition_id: selectedExpedition,
      store_id: selectedProducts[0].store_id,
      order_payload: [],
      gross_amount: totalPrice
    }

    selectedProducts.forEach(product => {
      orderPayload.order_payload.push({
        id: product.id,
        quantity: product.quantity,
        price: product.price
      });
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/checkout`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Referer: '127.0.0.1:8000',
        Accept: 'application/json',
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(orderPayload),
    });

    const requestData = await response.json();
    console.log(requestData)
    window.snap.pay(requestData.data.token, {
      onSuccess: function (result) {
        console.log(result);
      },
      onPending: function (result) {
        alert("waiting for your payment!");
        console.log(result);
      },
      onError: function (result) {
        alert("payment failed!");
        console.log(result);
      },
      onClose: function () {
        alert('you closed the popup without finishing the payment');
      }
    })
  };

  useEffect(() => {
    fetchInitializeData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while data is being fetched
  }

  const handlePickAddress = (address) => {
    setSelectedAddress(address);
    onClose(); // Close the modal after an address is selected
  };

  const handleExpeditionChange = (event) => {
    setSelectedExpedition(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    checkout();
  };

  return (
    <>
      <section className="bg-white p-4 antialiased dark:bg-gray-900 md:p-16">
        <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0" onSubmit={handleSubmit}>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Order Summary</h2>

            <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Billing & Delivery Information</h4>
              <dl>
                {selectedAddress !== null ? (
                  <>
                    <dt className="text-base font-medium text-gray-900 dark:text-white">
                      {selectedAddress.label}
                    </dt>
                    <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                      {selectedAddress.street}, RT. {selectedAddress.neighbourhood_number},
                      RW. {selectedAddress.hamlet_number},
                      Desa {selectedAddress.village}, Kelurahan {selectedAddress.urban_village},
                      Kecamatan {selectedAddress.sub_district}, Kode
                      POS {selectedAddress.postal_code}
                    </dd>
                  </>
                ) : (
                  <dt className="text-base font-medium text-gray-900 dark:text-white">Pick Address</dt>
                )}
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                  <Button onPress={onOpen} className="mt-2 hover:bg-cyan-500 text-white" color="default"> Edit</Button>
                </dd>
              </dl>
            </div>
            <div className="mt-6 space-y-4 border-b border-gray-200 py-4 dark:border-gray-700 sm:mt-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Pick Courier</h4>
              <div className="flex flex-row gap-6">
                {expeditions !== null ? expeditions.map((value, index) => {
                  return (
                    <div key={index}
                         className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 basis-1/3">
                      <input id={`bordered-radio-${index}`} type="radio" value={value.id}
                             name={`bordered-radio-${value.id}`}
                             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                             onChange={handleExpeditionChange}/>
                      <label htmlFor={`bordered-radio-${index}`}
                             className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {value.name}
                      </label>
                    </div>
                  )
                }) : (
                  <dt className="text-base font-medium text-gray-900 dark:text-white">Courier</dt>
                )}
              </div>
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
                    selectedProducts.map((value, index) => {
                      return (
                        <tr key={index}>
                          <td className="whitespace-nowrap py-4 md:w-[384px]">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center aspect-square w-10 h-10 shrink-0">
                                <img className="h-auto w-full max-h-full dark:hidden"
                                     src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"/>
                                <img className="hidden h-auto w-full max-h-full dark:block"
                                     src={process.env.NEXT_PUBLIC_BACKEND_URL + `/storage/stores/${value.resources[0].image_path}`}/>
                              </div>
                              <p className="hover:underline">{value.name}</p>
                            </div>
                          </td>
                          <td
                            className="p-4 text-base font-normal text-gray-900 dark:text-white">x{value.quantity}</td>
                          <td
                            className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">Rp. {value.price}</td>
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

                  <button type="submit"
                          className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">Send
                    the order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
      <Modal size="xl"
             isOpen={isOpen}
             onClose={onClose}
             className="bg-gray-700 text-white w-full"
             backdrop="blur"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">All Addresses</ModalHeader>
              <ModalBody>
                {addresses.length > 0 ? addresses.map((value, index) => (
                  <Card key={index} className="max-w-full bg-gray-800 text-white p-4 mb-4">
                    <CardHeader className="flex gap-3">
                      <div className="flex flex-col">
                        <p className="text-md text-default-300">{value.label}</p>
                        <p className="text-medium  font-bold text-white">{value.receiver_name}</p>
                        <p className="text-md text-default-300">{value.telephone}</p>
                      </div>
                    </CardHeader>
                    <Divider className="bg-white"/>
                    <CardBody>
                      <div className="flex flex-col">
                        <p className="text-medium font-semibold text-white">
                          {value.street}, RT. {value.neighbourhood_number}, RW. {value.hamlet_number},
                          Desa {value.village}, Kelurahan {value.urban_village}, Kecamatan {value.sub_district}, Kode
                          POS {value.postal_code}
                        </p>
                      </div>
                    </CardBody>
                    <Divider className="bg-white"/>
                    <CardFooter>
                      <div className="flex flex-col">
                        <p className="text-md text-default-300">{value.note}</p>
                        <Divider className="bg-white my-4 w-full"/>
                        <Button color="primary" size="xl" onClick={() => handlePickAddress(value)}>
                          Pick
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                )) : (
                  <p>No addresses found</p>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
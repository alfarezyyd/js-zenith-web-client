"use client"
import React, {useEffect, useState} from "react";
import useAuthStore from "@/lib/authStore";
import ProductCart from "@/components/ProductCart";
import Link from "next/link";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";


export default function Page() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedProducts]);

  const calculateTotalPrice = () => {
    const newTotalPrice = selectedProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = selectedProducts.map((product) =>
      product.id === productId ? {...product, quantity: newQuantity} : product
    );
    setSelectedProducts(updatedProducts);
  };

  async function fetchData() {
    try {
      const responseCart = await fetch(`http://127.0.0.1:8000/api/carts`, {
        method: "GET",
        cache: "no-store",
        headers: {
          Referer: "127.0.0.1:8000",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const dataCart = await responseCart.json();
      setCart(dataCart.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }


  const handleCheckboxChange = (selectedProduct) => {
    const {id: productId, store_id: selectedStoreId} = selectedProduct;

    // Cek apakah ada produk yang dipilih dari toko yang berbeda
    const isDifferentStoreSelected = selectedProducts.some((value) => value.store_id !== selectedStoreId);

    // Jika ada produk yang dipilih dari toko yang berbeda, tampilkan pesan kesalahan dan batalkan pemilihan produk
    if (isDifferentStoreSelected) {
      // Tampilkan pesan kesalahan menggunakan modal atau alert
      // Contoh menggunakan modal:
      onOpen(); // Buka modal
      return; // Hentikan eksekusi selanjutnya
    }
    if (selectedProducts.some((value) => value.id === selectedProduct.id)) {
      // Jika produk sudah ada, hapus dari selectedProducts
      setSelectedProducts(selectedProducts.filter((value) => value.id !== selectedProduct.id));
    } else {
      // Jika produk belum ada, tambahkan ke selectedProducts
      setSelectedProducts([...selectedProducts, selectedProduct]);
    }
    console.log(selectedProducts)
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return null;
  }


  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 rounded-3xl px-4">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cart.map((value, index) => {
                  return (
                    <div key={index}>
                      <div
                        className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div
                          className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
                          <div>
                            <h5 className="mr-3 font-semibold dark:text-white">{value.store.name}</h5>
                            <p className="text-gray-500 dark:text-gray-400">{value.store.slogan}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6 mt-4">
                        {value.products.map((product, index) => {
                          return (
                            <div className="mt-4" key={index}>
                              <ProductCart product={product} selectedProducts={selectedProducts}
                                           handleCheckboxChange={handleCheckboxChange} storeId={value.store.id}
                                           handleQuantityChange={handleQuantityChange}/>
                              <Divider className="bg-white"/>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}

              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div
                className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order Summary</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original Price</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">Rp. {totalPrice}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">Rp. {totalPrice * 0.11}</dd>
                    </dl>
                  </div>

                  <dl
                    className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd
                      className="text-base font-bold text-gray-900 dark:text-white">Rp. {totalPrice + (totalPrice * 0.11)}</dd>
                  </dl>
                </div>
                <Link href={process.env.NEXT_PUBLIC_BASE_URL + "/checkout"} passHref>
                  <button
                    className="mt-2 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed
                    to Checkout
                  </button>
                </Link>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                  <a href="#" title=""
                     className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                    Continue Shopping
                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M19 12H5m14 0-4 4m4-4-4-4"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-4 bg-white py-4 antialiased dark:bg-gray-900 md:py-8 rounded-3xl px-8">
        <div className="hidden xl:mt-8 xl:block">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
          <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
            <div
              className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <a href="#" className="overflow-hidden rounded">
                <img className="mx-auto h-44 w-44 dark:hidden"
                     src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image"/>
                <img className="mx-auto hidden h-44 w-44 dark:block"
                     src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                     alt="imac image"/>
              </a>
              <div>
                <a href="#"
                   className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">iMac
                  27”</a>
                <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some
                  improvements, including a longer continuous battery life.</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  <span className="line-through"> $399,99 </span>
                </p>
                <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$299</p>
              </div>
              <div className="mt-6 flex items-center gap-2.5">
                <button data-tooltip-target="favourites-tooltip-1" type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                       viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                  </svg>
                </button>
                <div id="favourites-tooltip-1" role="tooltip"
                     className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                  Add to favourites
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button type="button"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                       height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"/>
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <div
              className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <a href="#" className="overflow-hidden rounded">
                <img className="mx-auto h-44 w-44 dark:hidden"
                     src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg" alt="imac image"/>
                <img className="mx-auto hidden h-44 w-44 dark:block"
                     src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg" alt="imac image"/>
              </a>
              <div>
                <a href="#"
                   className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">Playstation
                  5</a>
                <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some
                  improvements, including a longer continuous battery life.</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  <span className="line-through"> $799,99 </span>
                </p>
                <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$499</p>
              </div>
              <div className="mt-6 flex items-center gap-2.5">
                <button data-tooltip-target="favourites-tooltip-2" type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                       viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                  </svg>
                </button>
                <div id="favourites-tooltip-2" role="tooltip"
                     className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                  Add to favourites
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button type="button"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                       height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"/>
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <div
              className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <a href="#" className="overflow-hidden rounded">
                <img className="mx-auto h-44 w-44 dark:hidden"
                     src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg"
                     alt="imac image"/>
                <img className="mx-auto hidden h-44 w-44 dark:block"
                     src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg"
                     alt="imac image"/>
              </a>
              <div>
                <a href="#"
                   className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">Apple
                  Watch Series 8</a>
                <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some
                  improvements, including a longer continuous battery life.</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  <span className="line-through"> $1799,99 </span>
                </p>
                <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$1199</p>
              </div>
              <div className="mt-6 flex items-center gap-2.5">
                <button data-tooltip-target="favourites-tooltip-3" type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                       viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                  </svg>
                </button>
                <div id="favourites-tooltip-3" role="tooltip"
                     className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                  Add to favourites
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>

                <button type="button"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                       height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"/>
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-gray-900 text-white">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Failed!</ModalHeader>
              <ModalBody>
                <p>
                  Hanya dapat memilih produk dari satu toko!
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
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
import useCartStore from "@/lib/useCartStore";


export default function Page() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const {selectedProducts, setSelectedProducts} = useCartStore();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedProducts]);

  const calculateTotalPrice = () => {
    console.log(selectedProducts)
    const newTotalPrice = selectedProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
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

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = selectedProducts.map(product =>
      product.id === productId ? {...product, quantity: newQuantity} : product
    );
    setSelectedProducts(updatedProducts);
  };

  const handleCheckboxChange = (selectedProduct) => {
    const {store_id: selectedStoreId} = selectedProduct;

    // Cek apakah ada produk yang dipilih dari toko yang berbeda
    const isDifferentStoreSelected = selectedProducts.some((value) => value.store_id !== selectedStoreId);

    // Jika ada produk yang dipilih dari toko yang berbeda, tampilkan pesan kesalahan dan batalkan pemilihan produk
    if (isDifferentStoreSelected) {
      // Tampilkan pesan kesalahan menggunakan modal atau alert
      // Contoh menggunakan modal:
      onOpen(); // Buka modal
      return; // Hentikan eksekusi selanjutnya
    }
    console.log(selectedProducts)
    if (selectedProducts.some((value) => value.id === selectedProduct.id)) {
      // Jika produk sudah ada, hapus dari selectedProducts
      setSelectedProducts(selectedProducts.filter((value) => value.id !== selectedProduct.id));
    } else {
      // Jika produk belum ada, tambahkan ke selectedProducts
      selectedProduct['quantity'] = 1;
      setSelectedProducts([...selectedProducts, selectedProduct]);
    }
    console.log(selectedProducts)
  };

  useEffect(() => {
    fetchData();
    console.log(accessToken)
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
                                           handleCheckboxChange={handleCheckboxChange}
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
                  <a href={`${process.env.NEXT_PUBLIC_BASE_URL}}`} title=""
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
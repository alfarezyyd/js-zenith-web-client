'use client'
import {useEffect, useState} from "react";
import useAuthStore from "@/lib/authStore";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const ProductPage = ({params}) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [product, setProduct] = useState([]);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [loading, setLoading] = useState(true);

  const handleOpen = () => {
    onOpen();
  }
  const fetchData = async () => {
    try {
      const responseProduct = await fetch(`http://127.0.0.1:8000/api/products/${params.slug[0]}/${params.slug[1]}`, {
        method: "GET",
        cache: "no-store",
        headers: {
          Referer: '127.0.0.1:8000',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
      })
      const dataProduct = await responseProduct.json()
      setProduct(dataProduct.data)
      setLoading(false);
    } catch (error) {
      console.error(error)
    }
  }


  async function addIntoCart() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carts/${product.id}`, {
        method: "POST",
        cache: "no-store",
        headers: {
          Referer: '127.0.0.1:8000',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
      });
      handleOpen()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  if (loading) {
    return null;
  }

  return (
    <>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased rounded-2xl">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img className="w-full dark:hidden"
                   src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/stores/${product.resources[0].image_path}`}
                   alt="imac image"/>
              <img className="w-full hidden dark:block"
                   src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/stores/${product.resources[0].image_path}`}/>
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1
                className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
              >
                {product.name}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex lg:flex-col lg:items-start">
                <p
                  className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                >
                  Rp. {product.price}
                </p>
                <h1
                  className="text-sm font-semibold text-gray-900 sm:text-sm dark:text-white"
                >
                  Minimum Order: {product.minimum_order}
                </h1>
                <h1
                  className="text-sm font-semibold text-gray-900 sm:text-sm dark:text-white"
                >
                  Stock Keeping Unit: {product.sku}
                </h1>
                <h1
                  className="text-sm font-semibold text-gray-900 sm:text-sm dark:text-white"
                >
                  Status: {product.status}
                </h1>
                <h1
                  className="text-sm font-semibold text-gray-900 sm:text-sm dark:text-white"
                >
                  Height: {product.height}
                </h1>
<h1
                  className="text-sm font-semibold text-gray-900 sm:text-sm dark:text-white"
                >
                  Width: {product.width}
                </h1>
<h1
                  className="text-sm font-semibold text-gray-900 sm:text-sm dark:text-white"
                >
                  Weight: {product.weight}
                </h1>



              </div>

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">

                <button
                  onClick={addIntoCart}
                  title=""
                  className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>

                  Add to cart
                </button>
              </div>

              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800"/>

              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {product.description}
              </p>

            </div>
          </div>
        </div>
      </section>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-gray-900 text-white">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Success</ModalHeader>
              <ModalBody>
                <p>
                  {product.name} succesfully inserted to cart
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductPage;

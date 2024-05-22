"use client"
import {useState} from "react";
import {ZenithLogo} from "@/assets/ZenithLogo";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import useAuthStore from "@/lib/authStore";
import {redirect} from "next/navigation";

export default function Page() {

  const accessToken = useAuthStore((state) => state.accessToken);
  const [formData, setFormData] = useState({
    name: ""
  });
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => {
    window.location.reload()
  };
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kirim data ke API
    console.log(formData)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/categories", {
        method: "POST",
        cache: "no-store",
        headers: {
          Referer: "127.0.0.1:8000",
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData)
      });
      const newVar = await response.json();
      console.log(newVar)
      if (response.ok) {
        setIsOpen(true);
      } else {
        console.error("Gagal membuat alamat baru:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900 h-full rounded-2xl">
        <a href="#"
           className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white justify-center">
          <span className="mt-8">
            <ZenithLogo/>
          </span>
        </a>
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 bg-gray-800 rounded-2xl">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Create new address</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 gap-y-10">
              <div className="sm:col-span-2">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label htmlFor="name"
                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Category Name
                  </label>
                </div>
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <br/>
        <br/>
      </section>
      <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p>
                  Address created successfully
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleCloseModal}>
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

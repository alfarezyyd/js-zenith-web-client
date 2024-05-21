"use client"
import React, {useEffect, useState} from 'react';
import {ZenithLogo} from "@/assets/ZenithLogo";
import useAuthStore from "@/lib/authStore";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure
} from "@nextui-org/react";
import {redirect} from "next/navigation";

export default function Page() {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [availableCities, setAvailableCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [provinces, setProvinces] = useState([])
  const accessToken = useAuthStore((state) => state.accessToken);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [createStatus, setCreateStatus] = useState(0);

  const fetchData = (async () => {
    let responseExpeditionProvince = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expedition-provinces`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Referer: "127.0.0.1:8000",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    let dataExpeditionProvince = await responseExpeditionProvince.json();
    setProvinces(dataExpeditionProvince.data)
  })
  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    if (createStatus === 201) {
      redirect(process.env.NEXT_PUBLIC_URL + "/addresses")
    }
  }, [createStatus]);

  useEffect(() => {
    if (selectedProvince) {
      const province = provinces.find((p) => p.id === parseInt(selectedProvince));
      setAvailableCities(province ? province.expedition_cities : []);
    } else {
      setAvailableCities([]);
    }
  }, [selectedProvince, provinces]);

  const handleProvinceChange = (e) => {
    const value = e.target.value;
    setSelectedProvince(value);
    setSelectedCity(''); // Reset city selection
    setFormData({
      ...formData,
      expedition_province_id: value,
      expedition_city_id: '' // Reset city id
    });
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setSelectedCity(value);
    setFormData({
      ...formData,
      expedition_city_id: value
    });
  };


  const [formData, setFormData] = useState({
    label: "",
    street: "",
    neighbourhood_number: "",
    hamlet_number: "",
    village: "",
    urban_village: "",
    sub_district: "",
    postal_code: "",
    note: "",
    receiver_name: "",
    telephone: "",
    expedition_province_id: selectedProvince,
    expedition_city_id: selectedCity
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    try {
      // Handle form submission, e.g., send the data to an API
      let responseAddresses = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/addresses`, {
        method: "POST",
        cache: "no-store",
        headers: {
          Referer: '127.0.0.1:8000',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: formDataToSend
      });
      setCreateStatus(responseAddresses.status)
    } catch (err) {
      console.error(err)
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
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    id="label"
                    name="label"
                    value={formData.label}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label htmlFor="label"
                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Label
                  </label>
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label htmlFor="street"
                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Street
                  </label>
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="relative">
                  <input
                    type="text"
                    id="neighbourhood_number"
                    name="neighbourhood_number"
                    value={formData.neighbourhood_number}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label htmlFor="neighbourhood_number"
                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Neighbourhood Number
                  </label>
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    id="hamlet_number"
                    name="hamlet_number"
                    value={formData.hamlet_number}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label htmlFor="hamlet_number"
                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Hamlet Number
                  </label>
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    id="village"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label htmlFor="village"
                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Village
                  </label>
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    id="urban_village"
                    name="urban_village"
                    value={formData.urban_village}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label htmlFor="urban_village"
                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Urban Village
                  </label>
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    id="sub_district"
                    name="sub_district"
                    value={formData.sub_district}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label htmlFor="sub_district"
                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Sub District
                  </label>
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label htmlFor="postal_code"
                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Postal Code
                  </label>
                </div>
              </div>

              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label htmlFor="note"
                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Note
                  </label>
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    id="receiver_name"
                    name="receiver_name"
                    value={formData.receiver_name}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label htmlFor="receiver_name"
                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Receiver Name
                  </label>
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label htmlFor="telephone"
                         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Telephone
                  </label>
                </div>
              </div>
              <div className="w-full">
                <Select
                  isRequired
                  label="Province"
                  placeholder="Select an province"
                  className="max-w-xs"
                  id="province"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                >
                  {provinces.length > 0 ? (provinces.map((province) => (
                    <SelectItem key={province.id} value={province.id}>
                      {province.name}
                    </SelectItem>
                  ))) : (
                    <SelectItem key="loading" value="loading">
                      Loading
                    </SelectItem>
                  )}
                </Select>
              </div>
              <div className="w-full">
                <Select
                  isRequired
                  label="City"
                  placeholder="Select an city"
                  className="max-w-xs"
                  id="city"
                  value={selectedCity}
                  onChange={handleCityChange}
                  disabled={!selectedProvince}
                >
                  {availableCities.map((city, index) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </Select>
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p>
                  Address created succesfully
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => {
                  redirect(process.env.NEXT_PUBLIC_BASE_URL)
                }}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
    ;
}

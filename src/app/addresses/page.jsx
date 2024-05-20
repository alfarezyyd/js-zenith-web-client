"use client"
import {Button, Card, CardBody, CardFooter, CardHeader, Divider, Image} from "@nextui-org/react";
import {useEffect, useState} from "react";
import useAuthStore from "@/lib/authStore";
import Link from "next/link";

export default function Page() {
  const [addresses, setAddresses] = useState([])
  const accessToken = useAuthStore((state) => state.accessToken);
  const fetchAddressesData = (async () => {
    let responseAddresses = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/addresses`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Referer: "127.0.0.1:8000",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    let dataAddresses = await responseAddresses.json();
    setAddresses(dataAddresses.data)
  })
  useEffect(() => {
    fetchAddressesData()
  }, []);
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 rounded-2xl">
      <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-4">
          <h2 className="shrink-0 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">All Addresses
            ({addresses.length})</h2>

          <form className="mt-4 w-full gap-4 sm:flex sm:items-center sm:justify-end lg:mt-0">

            <Button as={Link} href={"/addresses/create"}
              className="mt-4 w-full shrink-0 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0 sm:w-auto">
              Create new address
            </Button>

          </form>
        </div>

        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-800">
            <div className="space-y-4 py-6 md:py-8">
              {addresses.length > 0 ? addresses.map((value, index) => (
                <Card key={index} className="max-w-full bg-gray-800 p-4 mb-4 text-white">
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">{value.label}</p>
                      <p className="text-medium  font-bold">{value.receiver_name}</p>
                      <p className="text-md">{value.telephone}</p>
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
                      <p className="text-md">{value.note}</p>
                      <Divider className="bg-white my-4 w-full"/>
                    </div>
                  </CardFooter>
                </Card>
              )) : (
                <p>No addresses found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
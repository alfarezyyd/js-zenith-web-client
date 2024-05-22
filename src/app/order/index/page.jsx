"use client"
import {useEffect, useState} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Divider} from "@nextui-org/react";
import useAuthStore from "@/lib/authStore";

export default function Page() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true);

  const confirmOrder = (async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/complete/`)
  })
  const fetchDataOrder = (async () => {
    let responseOrders = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/user`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Referer: "127.0.0.1:8000",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    let dataOrders = await responseOrders.json();
    setOrders(dataOrders.data)
    setLoading(false);
  })

  useEffect(() => {
    fetchDataOrder()
    console.log(orders)
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while data is being fetched
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 rounded-2xl">
      <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-4">
          <h2 className="shrink-0 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">All Orders
            ({orders.length ?? 0})</h2>
        </div>

        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-800">
            <div className="space-y-4 py-6 md:py-8">
              {orders.length > 0 ? orders.map((value, index) => (
                <Card key={index} className="max-w-full bg-gray-800 p-4 mb-4 text-white">
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">Rp. {value.total_price}</p>
                      <p className="text-medium  font-bold">Status {value.status}</p>
                      <p className="text-md">Expedition Name: {value.expedition.name}</p>
                    </div>
                  </CardHeader>
                  <Divider className="bg-white"/>
                  <CardBody>
                    <div className="flex flex-col">
                      <p className="text-medium font-semibold text-white">
                        {value.address.street}, RT. {value.address.neighbourhood_number},
                        RW. {value.address.hamlet_number},
                        Desa {value.address.village}, Kelurahan {value.address.urban_village},
                        Kecamatan {value.address.sub_district}, Kode
                        POS {value.address.postal_code}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-md">Receiver Name: {value.address.receiver_name}</p>
                      <p className="text-md">Telephone: {value.address.telephone}</p>
                    </div>
                  </CardBody>
                  <CardFooter>
                    {value.status !== "FINISHED" ? (
                      <Button color="primary" onClick={() => confirmOrder(value.id)}>
                        Confirm
                      </Button>
                    ) : (
                      <p>Order has been done at : {value.updated_at}</p>
                    )}
                  </CardFooter>
                </Card>
              )) : (
                <p>No Order found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
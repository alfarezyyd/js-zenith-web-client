'use client'

import ListboxLink from "@/components/ListboxLink";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Divider, Image} from "@nextui-org/react";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import {useEffect, useState} from "react";
import {redirect, useSearchParams} from "next/navigation";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import useAuthStore from "@/lib/authStore";

export default function Home() {
  const [product, setProduct] = useState([])
  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/products", {
        method: "GET",
        cache: "no-store",
        headers: {
          Referer: '127.0.0.1:8000',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
      });
      const data = await response.json();
      setProduct(data.data);
    } catch (err) {
      console.log(err);
    }


  }
  const accessToken = useAuthStore((state) => state.accessToken);
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <div className="flex mt-4">
        <div className="w-1/3">
          <ListboxLink/>
        </div>
        <div className="w-max mx-auto rounded-xl overflow-hidden h-max">
          <Carousel width={850} autoPlay interval={3000} showStatus={false} infiniteLoop
                    showThumbs={false}>
            <div>
              <Image src={"banners/slide-banner.jpg"} className="bg-cover"/>
            </div>
            <div>
              <Image src={"banners/slide-banner.jpg"} className="bg-cover"/>
            </div>
            <div className="">
              <Image src={"banners/slide-banner.jpg"} className="bg-cover"/>
            </div>
          </Carousel>
        </div>
      </div>
      <div className="xl:mt-14">
        <h1 className="text-left text-2xl font-semibold subpixel-antialiased">Browse By Category</h1>
        <div className="flex flex-row gap-x-8 mt-5">
          <CategoryCard/>
          <CategoryCard/>
          <CategoryCard/>
          <CategoryCard/>
          <CategoryCard/>
        </div>
      </div>
      <Divider className="my-8"/>
      <div className="xl:mt-14">
        <h1 className="text-left text-2xl font-semibold subpixel-antialiased pb-2">Explore Our Products</h1>
        <div className="grid xl:grid-cols-4 gap-3.5 mt-5 gap-y-8">
          {
            product.map((item, index) => {
              return (
                <ProductCard key={index} name={item.name} price={item.price} slug={item.slug}
                             imagePath={"/products/hero.jpeg"}/>
              )
            })
          }
        </div>
      </div>
    </>
  )
    ;
}

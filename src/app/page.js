'use client'

import ListboxLink from "@/components/ListboxLink";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Divider, Image} from "@nextui-org/react";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import useAuthStore from "@/lib/authStore";
import Link from "next/link";

export default function Home() {
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])
  const fetchData = async () => {
    try {
      const responseProduct = await fetch("http://127.0.0.1:8000/api/products", {
        method: "GET",
        cache: "no-store",
        headers: {
          Referer: '127.0.0.1:8000',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
      });

      const responseCategory = await fetch("http://127.0.0.1:8000/api/categories", {
        method: "GET",
        cache: "no-store",
        headers: {
          Referer: '127.0.0.1:8000',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
      });
      if (responseProduct.status === 401) {
        redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`);
      }
      const dataProduct = await responseProduct.json();
      setProduct(dataProduct.data);
      const dataCategory = await responseCategory.json();
      setCategory(dataCategory.data);
    } catch (err) {
      console.log(err);
    }


  }
  const accessToken = useAuthStore((state) => state.accessToken);
  useEffect(() => {
    fetchData()
    if (accessToken === undefined) {
      redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`);
    }
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
          {
            category.map((item, index) => {
              return (
                <CategoryCard categoryName={item.name} key={index} categorySlug={item.slug}/>
              )
            })
          }
        </div>
      </div>
      <Divider className="my-8"/>
      <div className="xl:mt-14">
        <h1 className="text-left text-2xl font-semibold subpixel-antialiased pb-2">Explore Our Products</h1>
        <div className="grid xl:grid-cols-4 gap-3.5 mt-5 gap-y-8">
          {
            product.map((item, index) => {
              console.log(item)
              return (
                <ProductCard as
                             key={index} name={item.name} price={item.price} slug={item.slug}
                             imagePath={`storage/stores/${item.resources[0].image_path}`} storeSlug={item.store.slug}/>
              )
            })
          }
        </div>
      </div>
    </>
  )
    ;
}

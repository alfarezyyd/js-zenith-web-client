'use client'

import ListboxLink from "@/components/ListboxLink";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Image} from "@nextui-org/react";
import ProductCard from "@/components/ProductCard";

export default function Home() {
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
        <h1 className="text-left text-2xl font-semibold subpixel-antialiased">Explore Our Products</h1>
        <div className="grid xl:grid-cols-4 gap-3.5 mt-5">
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </div>
      </div>
    </>
  )
    ;
}

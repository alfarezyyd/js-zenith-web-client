'use client'

import ListboxLink from "@/components/ListboxLink";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Image} from "@nextui-org/react";

export default function Home() {
  return (
    <div className="flex mt-4">
      <div className="w-1/3">
        <ListboxLink/>
      </div>
      <div className="w-max mx-auto rounded-xl overflow-hidden h-max">
        <Carousel width={600} transitionTime={3} autoPlay interval={3000} showStatus={false} infiniteLoop
                  showThumbs={false}>
          <div>
            <Image src={"banners/slide-banner.jpg"}  className="bg-cover"/>
          </div>
          <div>
            <Image src={"banners/slide-banner.jpg"}  className="bg-cover"/>
          </div>
          <div className="">
            <Image src={"banners/slide-banner.jpg"}  className="bg-cover"/>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

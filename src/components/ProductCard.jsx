import {Card, CardHeader, CardBody, Image, CardFooter, Button} from "@nextui-org/react";
import Link from 'next/link'

import RatingStar from "./RatingStar.jsx";

export default function ProductCard({name, price, slug, imagePath, storeSlug}) {
  return (
    <Card className="py-4 border-none" as={Link} href={{
      pathname: `products/${storeSlug}/${slug}`,
    }}>
      <CardHeader className="overflow-visible py-1">
        <Card
        >
          <Image
            alt="Woman listing to music"
            className="object-cover"
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${imagePath}`}
            width={300}
          />
          <CardFooter
            className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">

          </CardFooter>
        </Card>
      </CardHeader>
      <CardBody className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{name}</p>
        <p className="text-sm text-red-500 mb-2 mt-2">{price}</p>
        <RatingStar/>
      </CardBody>
    </Card>
  );
}

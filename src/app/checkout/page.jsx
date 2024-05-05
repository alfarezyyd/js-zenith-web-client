"use client"
import React from "react";
import {
  Card, CardHeader, Divider, CardBody, CardFooter, Link, Image
} from "@nextui-org/react";

export default function Page() {
  return (
    <div className="flex flex-row">
      <div className="w-2/3 mr-14">
        <Card className="max-w-full mb-5">
          <CardHeader className="flex gap-3">

            <div className="flex flex-col p-2">
              <p className="text-md">ALAMAT PENGIRIMAN</p>
              <p className="text-small text-default-500">nextui.org</p>
            </div>
          </CardHeader>
          <Divider/>
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <Divider/>
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/nextui-org/nextui"
            >
              Visit source code on GitHub.
            </Link>
          </CardFooter>
        </Card>
        <Card className="max-w-full mb-5">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col p-2">
              <p className="text-md font-bold">PESANAN 1</p>
              <p className="text-small text-default-500 font-semibold">STORE NAME</p>
            </div>
          </CardHeader>
          <Divider/>
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <Divider/>
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/nextui-org/nextui"
            >
              Visit source code on GitHub.
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="w-1/3">
        <Card className="max-w-full">
          <CardHeader className="flex gap-3">

            <div className="flex flex-col p-2">
              <p className="text-md">ALAMAT PENGIRIMAN</p>
              <p className="text-small text-default-500">nextui.org</p>
            </div>
          </CardHeader>
          <Divider/>
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <Divider/>
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/nextui-org/nextui"
            >
              Visit source code on GitHub.
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
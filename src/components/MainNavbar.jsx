"use client";

import React, {useEffect, useState} from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar, Button
} from "@nextui-org/react";
import {ZenithLogo} from "@/assets/ZenithLogo";
import {SearchIcon} from "@/assets/SearchIcon";
import Link from "next/link";
import useAuthStore from "@/lib/authStore";

export default function App() {
  const [isBlurred, setIsBlurred] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isMounted) {
    return null; // Render nothing or a loading indicator
  }

  return (
    <Navbar
      isBordered
      isBlurred={false}
      className={`bg-opacity-0 transition-all duration-500 ${
        isBlurred ? "backdrop-blur-md bg-opacity-50 bg-blue-950/30" : ""
      }`}
    >
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link href={process.env.NEXT_PUBLIC_BASE_URL}>
            <ZenithLogo/>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">

          <NavbarItem isActive>
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/store/create`} aria-current="page" color="secondary">
              Store
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/cart`}>
              Cart
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      {
        accessToken ? (
          <NavbarContent as="div" className="items-center" justify="end">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[25rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<SearchIcon size={18}/>}
              type="search"
            />
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="/avatar/default.png"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="user-information" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="profile" as={Link} href={"/profile"}>Profile</DropdownItem>
                <DropdownItem key="addresses" as={Link} href={"/addresses"}>Addresses</DropdownItem>
                <DropdownItem key="system">Wishlist</DropdownItem>
                <DropdownItem key="my-order"  as={Link} href={"/order/index"}>
                  Orders
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        ) : (
          <NavbarContent as="div" className="items-center" justify="end">
            <Button variant="flat" className="bg-white text-sky-700" as={Link}
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/login`}>
              Sign in
            </Button>
          </NavbarContent>
        )
      }
    </Navbar>
  )
    ;
}

"use client";

import React, {useEffect, useState} from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar, Button, Divider
} from "@nextui-org/react";
import {ZenithLogo} from "@/assets/ZenithLogo";
import Link from "next/link";
import useAuthStore from "@/lib/authStore";
import useUserStore from "@/lib/useUserStore";

export default function App() {
  const [isBlurred, setIsBlurred] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);
  const userProfile = useUserStore((state) => state.userProfile);
  const [responseStatus, setResponseStatus] = useState(0);


  const handlingLogout = (async () => {
    let responseLogout = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logout`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Referer: '127.0.0.1:8000',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
    });
    if (responseLogout.status !== 200) {
      window.location.reload()
    }
  })


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
        <NavbarContent className="hidden sm:flex gap-3 ml-64">
          {responseStatus !== 401 ? (
            <>
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
              <NavbarItem>
                <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/categories`}>
                  Category
                </Link>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem>

            </NavbarItem>
          )}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center ml-28" justify="end">
        {responseStatus !== 401 ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="user-information" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userProfile.first_name + ' ' + userProfile.last_name}</p>
              </DropdownItem>
              <DropdownItem key="profile" as={Link} href={"/profile"}>Profile</DropdownItem>
              <DropdownItem key="addresses" as={Link} href={"/addresses"}>Addresses</DropdownItem>
              <DropdownItem key="my-order" as={Link} href={"/order/index"}>
                Orders
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handlingLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarContent>
            <Button color={"primary"} as={Link} href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}>
              Login
            </Button>
          </NavbarContent>
        )}
      </NavbarContent>
    </Navbar>
  );
}



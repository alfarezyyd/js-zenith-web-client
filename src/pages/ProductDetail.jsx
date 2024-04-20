import {BreadcrumbItem, Breadcrumbs, Button, ButtonGroup, Divider, Image} from "@nextui-org/react";
import RatingStar from "../components/RatingStar.jsx";
import {UserIcon} from "../assets/UserIcon.jsx";

export default function ProductDetail() {
  return (
    <>
      <div className="h-screen xl: mt-12">
        <div className="flex flex-col flex-wrap gap-4">
          <Breadcrumbs key="md" size="md">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Music</BreadcrumbItem>
            <BreadcrumbItem>Artist</BreadcrumbItem>
            <BreadcrumbItem>Album</BreadcrumbItem>
            <BreadcrumbItem>Song</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div className="flex mt-6 gap-3">
          <div className="flex basis-1/12">
            <div className="flex flex-col">
              <Image
                src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                alt="NextUI Album Cover"
                width={250}
                className="m-5"
              />
              <Image
                src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                alt="NextUI Album Cover"
                width={250}
                className="m-5"
              />
              <Image
                src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                alt="NextUI Album Cover"
                className="m-5"
                width={250}
              />
            </div>
          </div>
          <div className="flex basis-5/12 grow">
            <div className="mx-auto my-auto">
              <Image
                src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                alt="NextUI Album Cover"
                className="m-5"
              />
            </div>
          </div>
          <div className="flex basis-6/12">
            <div className="flex flex-col gap-5">
              <h1
                className="text-xl text-left font-semibold text-gray-900 sm:text-2xl dark:text-white">
                Apple iMac &quot All-In-One Computer, Apple M1, 8GB RAM, 256GB SSD,
                Mac OS, Pink
              </h1>
              <div className="flex flex-row">
                <RatingStar/>
              </div>
              <div className=" sm:items-center sm:gap-4 sm:flex">
                <p className="text-lg font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  $1,249.99
                </p>
              </div>
              <div className="text-left">
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  Studio quality three mic array for crystal clear calls and voice
                  recordings. Six-speaker sound system for a remarkably robust and
                  high-quality audio experience. Up to 256GB of ultrafast SSD storage.
                </p>

                <p className="text-gray-500 dark:text-gray-400">
                  Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
                  Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
                  Magic Keyboard or Magic Keyboard with Touch ID.
                </p>
              </div>
              <Divider className="my-4"/>
              <div className="flex flex-row gap-4">
                <ButtonGroup radius="sm">
                  <Button className="text-lg">-</Button>
                  <Button isDisabled className="bg-default-300">Two</Button>
                  <Button>+</Button>
                </ButtonGroup>
                <Button radius="sm" variant="flat" color="default" startContent={<UserIcon/>}
                        className="hover:bg-primary-500 hover:text-white text-default-400">
                  Delete user
                </Button>
                <Button radius="sm" variant="flat" color="primary" startContent={<UserIcon/>}
                        className="hover:bg-primary-500 hover:text-white">
                  Delete user
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
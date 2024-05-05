"use client"
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  ButtonGroup, Button, Card, CardHeader, Divider, CardBody, CardFooter, Link, BreadcrumbItem, Breadcrumbs
} from "@nextui-org/react";
import {DeleteIcon} from "@/assets/DeleteIcon.jsx";

const columns = [
  {name: "IMAGE", uid: "image"},
  {name: "NAME", uid: "name"},
  {name: "PRICE", uid: "price"},
  {name: "QUANTITY", uid: "quantity"},
  {name: "SUBTOTAL", uid: "subtotal"},
  {name: "ACTION", uid: "action"},
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
];


export default function Page() {
  const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case "image":
        return (
          <p>PRODUCT IMAGE</p>
        );
      case "name":
        return (
          <p>PRODUCT NAME</p>
        );
      case "price":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "quantity":
        return (
          <ButtonGroup radius="sm" size="sm">
            <Button>-</Button>
            <Button isDisabled className="bg-default-300">Two</Button>
            <Button>+</Button>
          </ButtonGroup>
        );
      case "subtotal": {
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            600
          </Chip>

        )
      }
      case "action":
        return (
          <div className="flex justify-center">
              <span className="text-center text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon/>
              </span>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  return (
    <div className="">
      <div className="flex flex-col flex-wrap gap-4">
        <Breadcrumbs key="foregroudn" color="foreground">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Music</BreadcrumbItem>
          <BreadcrumbItem>Artist</BreadcrumbItem>
          <BreadcrumbItem>Album</BreadcrumbItem>
          <BreadcrumbItem>Song</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="flex flex-row">
        <div className="w-2/3 mr-5">
          <Table
            isStriped
            aria-label="Controlled table example with dynamic content"
            selectionMode="multiple"
            className="text-left"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn className="text-center" key={column.uid}
                             align={column.uid === "actions" ? "center" : "start"}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={users}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell className="text-center">{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="w-1/3">
          <Card className="max-w-[400px] p-5">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-md">Ringkasan Belanja</p>
              </div>
            </CardHeader>
            <Divider/>
            <CardBody>
              <div className="flex flex-row justify-between">
                <p className="text-md">Total</p>
                <p className="text-md text-default-500">Rp. 599</p>
              </div>
            </CardBody>
            <Divider/>
            <CardFooter className="flex flex-row justify-end">
              <Button
                href="https://github.com/nextui-org/nextui"
                as={Link}
                color="primary"
                variant="solid"
              >
                Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
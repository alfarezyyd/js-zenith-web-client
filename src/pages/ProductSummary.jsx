import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

export default function ProductSummary() {
  return (
    <Table hideHeader aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>INFORMATION</TableColumn>
        <TableColumn>PRICE</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1" className="text-left">
          <TableCell>SUBTOTAL</TableCell>
          <TableCell>Rp. 1000</TableCell>
        </TableRow>
        <TableRow key="2" className="text-left">
          <TableCell>SHIPPING</TableCell>
          <TableCell>Rp. 1000</TableCell>
        </TableRow>
        <TableRow key="3" className="text-left">
          <TableCell>TOTAL</TableCell>
          <TableCell>Rp. 1000</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

const Row = React.memo(function Row({
  customer,
  shouldActive,
  handleSelectRow,
}: {
  customer: Customer;
  shouldActive: boolean;
  handleSelectRow: (customerId: string, checked: boolean) => void;
}) {
  return (
    <TableRow key={customer.id}>
      <TableCell>
        <input
          type="checkbox"
          checked={shouldActive}
          onChange={(e) => handleSelectRow(customer.id, e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </TableCell>
      <TableCell className="font-medium">{customer.id}</TableCell>
      <TableCell>
        {customer.firstName} {customer.lastName}
      </TableCell>
      <TableCell>{customer.company}</TableCell>
      <TableCell>
        {customer.city}, {customer.country}
      </TableCell>
      <TableCell>{customer.email}</TableCell>
      <TableCell>{customer.phone1}</TableCell>
      <TableCell>{customer.registrationDate}</TableCell>
    </TableRow>
  );
});

Row.displayName = "Row";

export default Row;

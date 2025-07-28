import { TableCell, TableRow } from "@/components/ui/table";
import React, { useMemo } from "react";
import TableCellMemo from "./CeilMemo";
import { Checkbox } from "@/components/ui/checkbox";

const Row = React.memo(function Row({
  customer,
  shouldActive,
  handleSelectRow,
}: {
  customer: Customer;
  shouldActive: boolean;
  handleSelectRow: (customerId: string, checked: boolean) => void;
}) {
  const customerName = useMemo(
    () => `${customer.firstName} ${customer.lastName}`,
    [customer.firstName, customer.lastName]
  );

  const cityCountry = useMemo(
    () => `${customer.city}, ${customer.country}`,
    [customer.city, customer.country]
  );

  return (
    <TableRow key={customer.id}>
      <TableCellMemo>
        <Checkbox
          checked={shouldActive}
          onCheckedChange={() => handleSelectRow(customer.id, !shouldActive)}
        />
      </TableCellMemo>
      <TableCellMemo>{customer.id}</TableCellMemo>
      <TableCellMemo>{customerName}</TableCellMemo>
      <TableCellMemo>{customer.company}</TableCellMemo>
      <TableCellMemo>{cityCountry}</TableCellMemo>
      <TableCellMemo>{customer.email}</TableCellMemo>
      <TableCellMemo>{customer.phone1}</TableCellMemo>
      <TableCellMemo>{customer.registrationDate}</TableCellMemo>
    </TableRow>
  );
});

Row.displayName = "Row";

export default Row;

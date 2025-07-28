import { TableCell } from "@/components/ui/table";
import React from "react";

const TableCellMemo = React.memo(function TableCellMemo({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TableCell>{children}</TableCell>;
});

TableCellMemo.displayName = "TableCellMemo";

export default TableCellMemo;

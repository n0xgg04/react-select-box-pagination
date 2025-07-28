import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

const TableMainHeader = React.memo(function TableMainHeader({
  isSelectAll,
  isLoading,
  onChangeSelectAll,
}: {
  isSelectAll: boolean;
  isLoading: boolean;
  onChangeSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">
          <input
            type="checkbox"
            checked={isSelectAll}
            disabled={isLoading}
            onChange={onChangeSelectAll}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
          />
        </TableHead>
        <TableHead>ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Company</TableHead>
        <TableHead>Location</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Phone</TableHead>
        <TableHead>Registration Date</TableHead>
      </TableRow>
    </TableHeader>
  );
});

TableMainHeader.displayName = "TableMainHeader";

export default TableMainHeader;

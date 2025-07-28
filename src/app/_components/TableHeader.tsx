import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import { SelectStatus } from "../_hooks/useDataTable";

const TableMainHeader = React.memo(function TableMainHeader({
  selectStatus,
  isLoading,
  onChangeSelectAll,
}: {
  selectStatus: SelectStatus;
  isLoading: boolean;
  onChangeSelectAll: () => void;
}) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">
          <Checkbox
            checked={
              selectStatus === "all"
                ? true
                : selectStatus === "none"
                ? false
                : "indeterminate"
            }
            onCheckedChange={onChangeSelectAll}
            disabled={isLoading}
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

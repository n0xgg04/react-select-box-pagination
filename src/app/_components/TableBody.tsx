import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import React, { useEffect } from "react";
import Row from "./Row";

const TableMain = React.memo(function TableMain({
  isLoading,
  isError,
  error,
  customers,
  shouldActive,
  handleSelectRow,
}: {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  customers: Customer[];
  shouldActive: (customerId: string) => boolean;
  handleSelectRow: (customerId: string, checked: boolean) => void;
}) {
  useEffect(() => {
    console.log("isLoading changed");
  }, [isLoading]);

  useEffect(() => {
    console.log("isError changed");
  }, [isError]);

  useEffect(() => {
    console.log("customers changed");
  }, [customers]);

  useEffect(() => {
    console.log("shouldActive changed");
  }, [shouldActive]);

  useEffect(() => {
    console.log("handleSelectRow changed");
  }, [handleSelectRow]);

  return (
    <TableBody>
      {isLoading ? (
        <TableRow>
          <TableCell colSpan={8} className="h-32 text-center">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-500">Loading data...</span>
            </div>
          </TableCell>
        </TableRow>
      ) : isError ? (
        <TableRow>
          <TableCell colSpan={8} className="h-32 text-center">
            <div className="text-red-500">
              Error:{" "}
              {error instanceof Error ? error.message : "Something went wrong"}
            </div>
          </TableCell>
        </TableRow>
      ) : customers.length === 0 ? (
        <TableRow>
          <TableCell colSpan={8} className="h-32 text-center">
            <div className="text-gray-500">No data available</div>
          </TableCell>
        </TableRow>
      ) : (
        customers.map((customer) => (
          <Row
            key={customer.id}
            customer={customer}
            shouldActive={shouldActive(customer.id)}
            handleSelectRow={handleSelectRow}
          />
        ))
      )}
    </TableBody>
  );
});

TableMain.displayName = "TableMain";

export default TableMain;

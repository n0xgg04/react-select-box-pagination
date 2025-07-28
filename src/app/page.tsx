"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Row from "./_components/Row";
import TableMain from "./_components/TableBody";
import generatePaginationRange from "./_utils/generatePage";
import React from "react";
import TableMainHeader from "./_components/TableHeader";
import PerPageOption from "./_components/PerPageOption";

const fetchCustomers = async (
  page: number,
  perPage: number
): Promise<ApiResponse> => {
  const response = await fetch(`/api/data?page=${page}&perPage=${perPage}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["customers", currentPage, perPage],
    queryFn: () => fetchCustomers(currentPage, perPage),
    staleTime: 5 * 60 * 1000,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const [selectStatus, setSelectStatus] = useState<"all" | "none">("none");
  const [rowSelect, setRowSelect] = useState<Set<string>>(new Set());
  const [rowExclude, setRowExclude] = useState<Set<string>>(new Set());

  const onChangeSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectStatus(e.target.checked ? "all" : "none");
  };

  const handleSelectRow = React.useCallback(
    (customerId: string, checked: boolean) => {
      if (selectStatus === "all") {
        setRowExclude((pre) => {
          const newSet = new Set(pre);
          if (newSet.has(customerId)) {
            newSet.delete(customerId);
          } else {
            newSet.add(customerId);
          }
          return newSet;
        });
        return;
      }
      setRowSelect((pre) => {
        const newSet = new Set(pre);
        if (checked) {
          newSet.add(customerId);
        } else {
          newSet.delete(customerId);
        }
        return newSet;
      });
    },
    [selectStatus]
  );

  const customers = React.useMemo(() => data?.data || [], [data]);
  const totalPages = data?.totalPages || 0;
  const totalCustomers = data?.totalCustomers || 0;
  const paginationRange = React.useMemo(
    () => generatePaginationRange(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const rowExcludeKey = React.useMemo(
    () => Array.from(rowExclude).sort().join(","),
    [rowExclude]
  );

  const rowSelectKey = React.useMemo(
    () => Array.from(rowSelect).sort().join(","),
    [rowSelect]
  );

  const shouldActive = React.useMemo(() => {
    return (customerId: string) => {
      if (selectStatus === "all") {
        return !rowExclude.has(customerId);
      }
      return rowSelect.has(customerId);
    };
  }, [selectStatus, rowExcludeKey, rowSelectKey, rowExclude, rowSelect]);

  useEffect(() => {
    console.log("shouldActive is re");
  }, [shouldActive]);

  const isSelectAll = React.useMemo(() => {
    return selectStatus === "all";
  }, [selectStatus]);

  useEffect(() => {
    console.log("Select", rowSelect);
  }, [rowSelect]);

  useEffect(() => {
    console.log("Exclude", rowExclude);
  }, [rowExclude]);

  useEffect(() => {
    console.log("customers", customers);
  }, [customers]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            {isLoading
              ? "Loading..."
              : `Showing ${customers.length} of ${totalCustomers} customers`}
          </p>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <PerPageOption
          perPage={perPage}
          handlePerPageChange={handlePerPageChange}
          isLoading={isLoading}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableMainHeader
            isSelectAll={isSelectAll}
            isLoading={isLoading}
            onChangeSelectAll={onChangeSelectAll}
          />
          <TableMain
            isLoading={isLoading}
            isError={isError}
            error={error}
            customers={customers}
            handleSelectRow={handleSelectRow}
            shouldActive={shouldActive}
          />
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-gray-500">
          {isLoading
            ? "Loading..."
            : `Page ${currentPage} of ${totalPages} (${totalCustomers} total items)`}
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1 || isLoading}
          >
            Previous
          </button>

          {paginationRange.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-1 text-sm text-gray-500"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                className={`px-3 py-1 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed ${
                  currentPage === page
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : ""
                }`}
                onClick={() => handlePageChange(page as number)}
                disabled={isLoading}
              >
                {page}
              </button>
            );
          })}

          <button
            className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || isLoading}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

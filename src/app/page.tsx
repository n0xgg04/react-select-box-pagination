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
import useDataTable from "./_hooks/useDataTable";
import { Button } from "@/components/ui/button";
import Pagnation from "./_components/Pagnation";

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

  const {
    selectAll,
    selectRow,
    isActive,
    selectStatus,
    getData,
    selectingCount,
  } = useDataTable({
    currentPageData: data?.data || [],
    totalRecords: data?.totalCustomers || 0,
  });

  const handlePageChange = React.useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePerPageChange = React.useCallback((newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  }, []);

  const customers = React.useMemo(() => data?.data || [], [data]);
  const totalPages = data?.totalPages || 0;
  const totalCustomers = data?.totalCustomers || 0;
  const paginationRange = React.useMemo(
    () => generatePaginationRange(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const handleGetData = React.useCallback(() => {
    alert(JSON.stringify(getData()));
  }, [getData]);

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
            selectStatus={selectStatus}
            isLoading={isLoading}
            onChangeSelectAll={selectAll}
          />
          <TableMain
            isLoading={isLoading}
            isError={isError}
            error={error}
            customers={customers}
            handleSelectRow={selectRow}
            shouldActive={isActive}
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

          <Pagnation
            paginationRange={paginationRange}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            isLoading={isLoading}
          />

          <button
            className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || isLoading}
          >
            Next
          </button>
        </div>
      </div>
      <Button onClick={handleGetData} className="float-right ">
        Get data {selectingCount} selected
      </Button>
    </div>
  );
}

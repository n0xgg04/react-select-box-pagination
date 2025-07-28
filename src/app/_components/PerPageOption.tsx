import React from "react";

const PerPageOption = React.memo(
  ({
    perPage,
    handlePerPageChange,
    isLoading,
  }: {
    perPage: number;
    handlePerPageChange: (newPerPage: number) => void;
    isLoading: boolean;
  }) => {
    return (
      <div className="flex items-center gap-2">
        <label htmlFor="perPage" className="text-sm font-medium">
          Items per page:
        </label>
        <select
          id="perPage"
          value={perPage}
          onChange={(e) => handlePerPageChange(Number(e.target.value))}
          disabled={isLoading}
          className="px-3 py-1 text-sm border rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={500}>500</option>
          <option value={1000}>1000</option>
        </select>
      </div>
    );
  }
);

PerPageOption.displayName = "PerPageOption";

export default PerPageOption;

import React, { useCallback, useMemo, useState } from "react";

type Props<T> = {
  currentPageData: T[];
  totalRecords: number;
};

export type SelectStatus = "all" | "some" | "none";

export default function useDataTable<T>({
  currentPageData,
  totalRecords,
}: Props<T>) {
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [rowSelect, setRowSelect] = useState<Set<string>>(new Set());
  const [rowExclude, setRowExclude] = useState<Set<string>>(new Set());

  const selectAll = React.useCallback(() => {
    setIsSelectAll((prev) => {
      if (prev) {
        setRowExclude(new Set());
        return false;
      } else {
        setRowSelect(new Set());
        return true;
      }
    });
  }, []);

  const selectRow = React.useCallback(
    (id: string) => {
      if (isSelectAll) {
        setRowExclude((pre) => {
          const newSet = new Set(pre);
          if (newSet.has(id)) {
            newSet.delete(id);
          } else {
            newSet.add(id);
          }
          return newSet;
        });
        return;
      }
      setRowSelect((pre) => {
        const newSet = new Set(pre);
        if (!newSet.has(id)) {
          newSet.add(id);
        } else {
          newSet.delete(id);
        }
        return newSet;
      });
    },
    [isSelectAll]
  );

  const isActive = useCallback(
    (id: string) => {
      if (isSelectAll) {
        return !rowExclude.has(id);
      }
      return rowSelect.has(id);
    },
    [isSelectAll, rowExclude, rowSelect]
  );

  const selectStatus = useMemo((): SelectStatus => {
    if (isSelectAll) {
      return rowExclude.size === 0 ? "all" : "some";
    }

    if (rowSelect.size === 0) {
      return "none";
    }

    if (rowExclude.size > 0 && rowExclude.size === totalRecords) {
      return "all";
    }

    return "some";
  }, [isSelectAll, rowExclude, rowSelect, totalRecords]);

  const getData = useCallback(() => {
    return {
      all: isSelectAll,
      exclude: Array.from(rowExclude),
      select: Array.from(rowSelect),
    };
  }, [isSelectAll, rowExclude, rowSelect]);

  return {
    rowSelect,
    rowExclude,
    selectAll,
    selectRow,
    isActive,
    selectStatus,
    getData,
  };
}

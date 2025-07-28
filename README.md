## useDataTable Hook

This project includes a custom `useDataTable` hook (`src/app/_hooks/useDataTable.tsx`) for managing complex data table selection states with support for "select all" functionality across large datasets.

### Features

- ✅ Select/deselect individual rows
- ✅ Select all functionality with exclusion tracking
- ✅ Efficient handling of large datasets
- ✅ Multi-state selection (all, some, none)
- ✅ TypeScript support with generics

### Usage

```tsx
import useDataTable from "@/app/_hooks/useDataTable";

const MyDataTable = () => {
  const currentPageData = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    // ... more data
  ];
  const totalRecords = 1000; // Total records in the dataset

  const { selectAll, selectRow, isActive, selectStatus, getData } =
    useDataTable({
      currentPageData,
      totalRecords,
    });

  return (
    <div>
      {/* Select All Checkbox */}
      <input
        type="checkbox"
        checked={selectStatus === "all"}
        ref={(el) => {
          if (el) el.indeterminate = selectStatus === "some";
        }}
        onChange={selectAll}
      />

      {/* Data Rows */}
      {currentPageData.map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            checked={isActive(item.id)}
            onChange={() => selectRow(item.id)}
          />
          {item.name}
        </div>
      ))}

      {/* Get Selected Data */}
      <button onClick={() => console.log(getData())}>Get Selection Data</button>
    </div>
  );
};
```

### API Reference

#### Parameters

| Parameter         | Type     | Description                                     |
| ----------------- | -------- | ----------------------------------------------- |
| `currentPageData` | `T[]`    | Array of current page data items                |
| `totalRecords`    | `number` | Total number of records in the complete dataset |

#### Return Values

| Property       | Type                      | Description                                              |
| -------------- | ------------------------- | -------------------------------------------------------- |
| `selectAll`    | `() => void`              | Toggle select all state                                  |
| `selectRow`    | `(id: string) => void`    | Toggle selection state of a specific row                 |
| `isActive`     | `(id: string) => boolean` | Check if a row is selected                               |
| `selectStatus` | `SelectStatus`            | Current selection status: `'all'`, `'some'`, or `'none'` |
| `getData`      | `() => SelectionData`     | Get current selection data                               |

#### Types

```tsx
type SelectStatus = "all" | "some" | "none";

type SelectionData = {
  all: boolean; // True if "select all" is active
  exclude: string[]; // Array of excluded row IDs (when all=true)
  select: string[]; // Array of selected row IDs (when all=false)
};
```

### How It Works

The hook uses an intelligent selection strategy:

1. **Individual Selection Mode**: When `isSelectAll` is `false`, it tracks selected rows in `rowSelect` set
2. **Select All Mode**: When `isSelectAll` is `true`, it assumes all rows are selected and tracks excluded rows in `rowExclude` set

This approach efficiently handles large datasets by avoiding the need to store thousands of selected row IDs when "select all" is used.

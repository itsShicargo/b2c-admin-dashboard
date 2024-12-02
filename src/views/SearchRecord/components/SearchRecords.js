import React from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  ColumnDef,
} from "@tanstack/react-table";

const SearchRecords = () => {
  const data = React.useMemo(() => [], []); 
  const columns = React.useMemo(
    () => [
      { Header: "Order Details", accessor: "orderDetails" },
      { Header: "Courier Details", accessor: "courierDetails" },
      { Header: "Status Update", accessor: "statusUpdate" },
      { Header: "Item Details", accessor: "itemDetails" },
      { Header: "Payment Details", accessor: "paymentDetails" },
      { Header: "Customer Address", accessor: "customerAddress" },
      { Header: "Seller Email", accessor: "sellerEmail" },
      { Header: "POC", accessor: "poc" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="p-4 bg-gray-100">
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table
          {...getTableProps()}
          className="min-w-full text-sm text-left text-gray-500 bg-white"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-4 py-2 border-b"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="divide-y divide-gray-200"
          >
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-gray-400 py-6"
                >
                  <div className="flex justify-center items-center flex-col">
                    <div className="text-2xl">📦</div>
                    <p className="mt-2 text-sm">No Data</p>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-100">
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-4 py-2 border-b"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchRecords;

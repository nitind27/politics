"use client"
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function BasicTable({ data, columns }: any) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Define currentPage based on the table state
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();

  const renderPagination = () => {
    // Create an array of page numbers to display
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      if (
        i === 1 ||
        i === pageCount ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return (
      <div className="pagination">
        {pages.map((page, index) => (
          <button
            key={index}
            className={`btn ${
              page === currentPage ? "btn-primary" : "btn-outline-secondary"
            } mx-1`}
            onClick={() => {
              if (typeof page === "number") {
                table.setPageIndex(page - 1);
              }
            }}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Basic Table</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span>
          Page {currentPage} of {pageCount}
        </span>
        {renderPagination()}
      </div>
    </div>
  );
}

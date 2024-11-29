
import React, { useState, useMemo } from 'react';
import {Table,Select, Button} from 'components/ui';
import Pagination from 'components/ui/Pagination';
import "./Pinncode.css"


import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';

const { Tr, Th, Td, THead, TBody } = Table;

const tableData = () => {
    const arr = [];
    for (let i = 0; i < 30; i++) {
        arr.push({
            carriername: `VRL Logistics (Surface) `,
            logo: `Logo ${i}`, // Added logo field
            action: i,
        });
    }
    return arr;
};

const totalData = tableData().length;

const pageSizeOption = [
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 40, label: '40 / page' },
    { value: 50, label: '50 / page' },
];

const logoUrl = 'https://dp-logos.s3.ap-south-1.amazonaws.com/bluedart.png';

const PincodeDownload = () => {
    const columns = useMemo(
        () => [
            {
                header: 'Carrier Name',
                accessorKey: 'carriername',
            },
            {
                header: 'Carrier Logo',
                accessorKey: 'logo',
                // We can define a custom cell renderer for the logo field
                cell: () => <img src={logoUrl} alt="Logo" style={{ width: 50, height: 50 }} />,
            },
            {
                header: 'Action',
                accessorKey: 'action',
                // Custom cell renderer for the age column
                cell: ({ value }) => (
                    <div>
                        <span>{value}</span>


                        <Button
                                variant="solid"
                                className="next-btn"
                                // disabled={isDownloading}
                                onClick={handleDownload}
                            >
                                Download
                            </Button>
                      
                    </div>
                ),
            },
        ],
        []
    );

    const [data] = useState(() => tableData());

    const table = useReactTable({
        data,
        columns,
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const onPaginationChange = (page) => {
        table.setPageIndex(page - 1);
    };

    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value));
    };

    const handleDownload = (Action) => {
        // Implement your download logic here
        console.log(`Downloading data for age: ${Action}`);
    };

    return (
        <div className="table-container">
            <Table className="table">
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        // style={{
                                        //     padding: '8px',
                                        //     textAlign: 'center',
                                        // }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                );
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id} >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </TBody>
            </Table>
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={table.getState().pagination.pageSize}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    total={totalData}
                    onChange={onPaginationChange}
                />
                <div style={{ minWidth: 130 }}>
                    <Select
                        size="sm"
                        isSearchable={false}
                        value={pageSizeOption.filter(
                            (option) =>
                                option.value ===
                                table.getState().pagination.pageSize
                        )}
                        options={pageSizeOption}
                        onChange={(option) => onSelectChange(option?.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default PincodeDownload;

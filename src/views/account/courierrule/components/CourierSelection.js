import React, { useState, useMemo } from 'react';
import { Table, Select } from 'components/ui';
import Pagination from 'components/ui/Pagination';
import Switcher from 'components/ui/Switcher'; // Import the Switcher component
import './CourierSelection.css';

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
            carriername: `CargoPrime`,
            logo: `Logo ${i}`, 
            action: i,
        });
    }
    return arr;
};

const totalData = tableData().length;

const pageSizeOptions = [
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 40, label: '40 / page' },
    { value: 50, label: '50 / page' },
];

const logoUrl = 'https://dp-logos.s3.ap-south-1.amazonaws.com/tciexpress.png';

const CourierSelection = () => {
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
                header: 'Active',
                accessorKey: 'action',
                // Custom cell renderer for the age column
                cell: ({ value }) => (
                    <div>
                        <span>{value}</span>
                        <div>
                            <Switcher defaultChecked onChange={onSwitcherToggle} />
                        </div>
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

    const onSwitcherToggle = (val, e) => {
        console.log(val, e);
        // Add your logic here based on the switcher state
    };

    return (
        <div className="table-container">
            <Table className="table">
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th key={header.id} colSpan={header.colSpan}>
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
                                        <Td key={cell.id}>
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
                        value={pageSizeOptions.filter(
                            (option) =>
                                option.value ===
                                table.getState().pagination.pageSize
                        )}
                        options={pageSizeOptions}
                        onChange={(option) => onSelectChange(option?.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default CourierSelection;

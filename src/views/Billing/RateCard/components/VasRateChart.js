
import React, { useState } from 'react';
import { Table } from 'components/ui';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

const VasRateChart = () => {
    const [sorting, setSorting] = useState([]);

    const columns = [
        { header: '', accessorKey: 'zone' },
        { header: 'Value', accessorKey: 'value' },
        { header: 'Min Charge', accessorKey: 'minCharge' },
        { header: 'Max Charge', accessorKey: 'maxCharge' },
        { header: 'From Range', accessorKey: 'fromRange' },
        { header: 'To Range', accessorKey: 'toRange' },
    ];
    
    
        const data = [
        { zone: 'fuelSurcharge', value: '1.50 Rs.perKg', minCharge:'', maxCharge: '', fromRange: '', toRange: '' },
        { zone: 'rovCharges', value: '0.10% on Invoice value', minCharge: 50.00, maxCharge: '', fromRange: '', toRange: '' },
        { zone: 'waybillCharge', value: '50.00 Rs.', minCharge: '', maxCharge: '', fromRange: '', toRange: '' },
        { zone: 'handlingCharges1', value: '3.00 Rs.', minCharge: '', maxCharge: '', fromRange: 200.01 , toRange: '' },
        { zone: 'handlingCharges2', value: '2.00 Rs.', minCharge: '', maxCharge: '', fromRange: 100.00 , toRange: 200.00  },
        { zone: 'minBillableWeight', value: '25.00 Kgs', minCharge: '', maxCharge: '', fromRange: '', toRange: '' },
        { zone: 'minAwbCharge', value: '350.00 Rs.', minCharge: '', maxCharge: '', fromRange: '', toRange: '' },
        { zone: 'cft', value: '6.00 Kgs', minCharge: '', maxCharge: '', fromRange: '', toRange: '' },
        { zone: 'odaCharges', value: '3.00 Rs.', minCharge: 750.00, maxCharge: 11.7, fromRange: '', toRange: '' },
        { zone: 'toPayCharges', value: '200.00 Rs.', minCharge: '', maxCharge: '', fromRange: '', toRange: '' },
        { zone: 'mallDeliveriesCharge', value: '0.00 Rs.', minCharge: 1000.00, maxCharge: 11.7, fromRange: '', toRange: '' },
        { zone: 'podCharges', value: '100.00 Rs.', minCharge: '', maxCharge: '', fromRange: '', toRange: 11.7 },
        { zone: 'demurrageCharges', value: '0.25 Rs. per Kg', minCharge: '', maxCharge: '', fromRange: 11.7, toRange: 11.7 },
        { zone: 'AdemurrageDaysP', value: '7.00 Days', minCharge: '', maxCharge: '', fromRange: '', toRange: '' },
    ];
    
    

    const { Tr, Th, Td, THead, TBody } = Table;

    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <div
                                            className={
                                                header.column.getCanSort()
                                                    ? 'cursor-pointer select-none'
                                                    : ''
                                            }
                                            onClick={
                                                header.column.getToggleSortingHandler()
                                            }
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </div>
                                    )}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.slice(0, 10).map((row) => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <Td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </>
    );
};

export default VasRateChart;

import React, { useState } from 'react';
import { Table } from 'components/ui';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

const ZonePriceTable = () => {
    const [sorting, setSorting] = useState([]);

    const columns = [
        { header: 'Zone', accessorKey: 'zone' },
        { header: 'C 1', accessorKey: 'c1' },
        { header: 'C 2', accessorKey: 'c2' },
        { header: 'E 1', accessorKey: 'e1' },
        { header: 'E 2', accessorKey: 'e2' },
        { header: 'N 1', accessorKey: 'n1' },
        { header: 'N 2', accessorKey: 'n2' },
        { header: 'N 3', accessorKey: 'n3' },
        { header: 'N 4', accessorKey: 'n4' },
        { header: 'NE 1', accessorKey: 'ne1' },
        { header: 'NE 2', accessorKey: 'ne2' },
        { header: 'S 1', accessorKey: 's1' },
        { header: 'S 2', accessorKey: 's2' },
        { header: 'S 3', accessorKey: 's3' },
        { header: 'S 4', accessorKey: 's4' },
        { header: 'W 1', accessorKey: 'w1' },
        { header: 'W 2', accessorKey: 'w2' },
    ];

    const data = [
        { zone: 'HP', c1: 6.9, c2: 8.1, e1: 8.1, e2: 8.1, n1: 9.3, n2: 9.3, n3: 9.3, n4: 10.5, ne1: 11.7, ne2: 10.5, s1: 11.7, s2: 12.9, s3: 12.9, s4: 12.9, w1: 12.9, w2: 12.9 },
        { zone: 'PB', c1: 8.1, c2: 6.9, e1: 9.3, e2: 8.1, n1: 8.1, n2: 9.3, n3: 9.3, n4: 10.5, ne1: 11.7, ne2: 10.5, s1: 11.7, s2: 12.9, s3: 12.9, s4: 12.9, w1: 12.9, w2: 12.9 },
        { zone: 'UK', c1: 8.1, c2: 9.3, e1: 6.9, e2: 9.3, n1: 9.3, n2: 9.3, n3: 8.1, n4: 9.3, ne1: 10.5, ne2: 10.5, s1: 10.5, s2: 12.9, s3: 11.7, s4: 12.9, w1: 12.9, w2: 12.9 },
        { zone: 'HA', c1: 8.1, c2: 8.1, e1: 9.3, e2: 6.9, n1: 8.1, n2: 8.1, n3: 8.1, n4: 9.3, ne1: 10.5, ne2: 9.3, s1: 10.5, s2: 11.7, s3: 11.7, s4: 12.9, w1: 12.9, w2: 12.9 },
        { zone: 'NCR+', c1: 9.3, c2: 8.1, e1: 9.3, e2: 8.1, n1: 6.9, n2: 8.1, n3: 8.1, n4: 9.3, ne1: 10.5, ne2: 9.3, s1: 10.5, s2: 11.7, s3: 11.7, s4: 12.9, w1: 12.9, w2: 12.9 },
        { zone: 'RJ', c1: 9.3, c2: 9.3, e1: 9.3, e2: 8.1, n1: 8.1, n2: 6.9, n3: 8.1, n4: 8.1, ne1: 9.3, ne2: 8.1, s1: 9.3, s2: 10.5, s3: 10.5, s4: 11.7, w1: 12.9, w2: 12.9 },
        { zone: 'UP', c1: 9.3, c2: 9.3, e1: 8.1, e2: 8.1, n1: 8.1, n2: 8.1, n3: 6.9, n4: 8.1, ne1: 9.3, ne2: 9.3, s1: 9.3, s2: 10.5, s3: 10.5, s4: 11.7, w1: 12.9, w2: 12.9 },
        { zone: 'MP', c1: 10.5, c2: 10.5, e1: 9.3, e2: 9.3, n1: 9.3, n2: 8.1, n3: 8.1, n4: 6.9, ne1: 8.1, ne2: 8.1, s1: 8.1, s2: 9.3, s3: 9.3, s4: 10.5, w1: 11.7, w2: 11.7 },
        { zone: 'CG', c1: 11.7, c2: 11.7, e1: 10.5, e2: 10.5, n1: 10.5, n2: 9.3, n3: 9.3, n4: 8.1, ne1: 9.3, ne2: 8.1, s1: 10.5, s2: 8.1, s3: 9.3, s4: 10.5, w1: 8.1, w2: 9.3 },
        { zone: 'GJ', c1: 10.5, c2: 10.5, e1: 10.5, e2: 9.3, n1: 9.3, n2: 8.1, n3: 9.3, n4: 8.1, ne1: 9.3, ne2: 6.9, s1: 8.1, s2: 9.3, s3: 9.3, s4: 10.5, w1: 11.7, w2: 10.5 },
        { zone: 'MH', c1: 11.7, c2: 11.7, e1: 10.5, e2: 10.5, n1: 10.5, n2: 9.3, n3: 9.3, n4: 8.1, ne1: 8.1, ne2: 8.1, s1: 6.9, s2: 8.1, s3: 8.1, s4: 9.3, w1: 8.1, w2: 10.5 },
        { zone: 'GA', c1: 12.9, c2: 12.9, e1: 12.9, e2: 11.7, n1: 11.7, n2: 10.5, n3: 10.5, n4: 9.3, ne1: 10.5, ne2: 9.3, s1: 8.1, s2: 10.5, s3: 9.3, s4: 12.9, w1: 12.9, w2: 9.3 },
        { zone: 'TS', c1: 12.9, c2: 12.9, e1: 11.7, e2: 11.7, n1: 11.7, n2: 10.5, n3: 10.5, n4: 9.3, ne1: 8.1, ne2: 9.3, s1: 8.1, s2: 9.3, s3: 8.1, s4: 9.3, w1: 6.9, w2: 8.1 },
        { zone: 'AP', c1: 12.9, c2: 12.9, e1: 12.9, e2: 12.9, n1: 12.9, n2: 11.7, n3: 11.7, n4: 10.5, ne1: 9.3, ne2: 10.5, s1: 9.3, s2: 8.1, s3: 6.9, s4: 8.1, w1: 8.1, w2: 9.3 },
        { zone: 'KA', c1: 12.9, c2: 12.9, e1: 12.9, e2: 12.9, n1: 12.9, n2: 12.9, n3: 12.9, n4: 11.7, ne1: 10.5, ne2: 11.7, s1: 8.1, s2: 8.1, s3: 8.1, s4: 6.9, w1: 8.1, w2: 8.1 },
        { zone: 'TN', c1: 12.9, c2: 12.9, e1: 12.9, e2: 12.9, n1: 12.9, n2: 12.9, n3: 12.9, n4: 11.7, ne1: 10.5, ne2: 10.5, s1: 10.5, s2: 9.3, s3: 9.3, s4: 8.1, w1: 8.1, w2: 9.3 }
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

export default ZonePriceTable;

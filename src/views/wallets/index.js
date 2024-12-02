import { useMemo } from 'react';
import { Table, Pagination, Select } from 'components/ui';
import { HiEye, HiOutlinePencil } from 'react-icons/hi';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import { BsCloudDownloadFill } from 'react-icons/bs';

const { Tr, Th, Td, THead, TBody } = Table;

const DownloadInvoice = () => {
    // Dummy data for the table
    const data = [
        {
            id: '001',
            order_details: 'Order 001',
            courier_details: 'Courier A',
            status_update: 'Pending',
            item_details: '10 units of electronics',
            payment_details: 'Paid',
            customer_address: '123 Main St, NY',
            seller_email: 'seller@example.com',
            poc: 'John Doe',
        },
        {
            id: '002',
            order_details: 'Order 002',
            courier_details: 'Courier B',
            status_update: 'Shipped',
            item_details: '5 units of furniture',
            payment_details: 'Unpaid',
            customer_address: '456 Elm St, CA',
            seller_email: 'seller2@example.com',
            poc: 'Jane Smith',
        },
    ];

    // Define the columns for the table
    const columns = useMemo(
        () => [
            { header: 'Order Details', accessorKey: 'order_details' },
            { header: 'Courier Details', accessorKey: 'courier_details' },
            { header: 'Status Update', accessorKey: 'status_update' },
            { header: 'Item Details', accessorKey: 'item_details' },
            { header: 'Payment Details', accessorKey: 'payment_details' },
            { header: 'Customer Address', accessorKey: 'customer_address' },
            { header: 'Seller Email', accessorKey: 'seller_email' },
            { header: 'POC', accessorKey: 'poc' },
        ],
        []
    );

    // Initialize the React Table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageIndex: 0, pageSize: 5 },
        },
    });

    // Pagination change handlers
    const onPaginationChange = (page) => {
        table.setPageIndex(page - 1);
    };

    const pageSizeOption = [
        { value: 5, label: '5 / page' },
        { value: 10, label: '10 / page' },
    ];

    const onSelectChange = (value) => {
        table.setPageSize(Number(value));
    };

    return (
        <div>
            {/* Title */}
            <h1 className="text-3xl font-bold text-blue-900 mb-20 md:mb-0">
                Single Search Record
            </h1>
            <br/>
            <br/>

            {/* Table */}
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <Td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </TBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={table.getState().pagination.pageSize}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    total={data.length}
                    onChange={onPaginationChange}
                />
                <div style={{ minWidth: 130 }}>
                    <Select
                        size="sm"
                        isSearchable={false}
                        value={pageSizeOption.find(
                            (option) => option.value === table.getState().pagination.pageSize
                        )}
                        options={pageSizeOption}
                        onChange={(option) => onSelectChange(option?.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default DownloadInvoice;

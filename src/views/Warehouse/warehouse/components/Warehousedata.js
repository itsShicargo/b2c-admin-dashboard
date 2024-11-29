import React, { useState, useMemo, useEffect } from 'react';
import { Table, Select } from 'components/ui';
import Pagination from 'components/ui/Pagination';
import axios from 'axios'; // Import axios for API requests
import useThemeClass from 'utils/hooks/useThemeClass';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePencil } from 'react-icons/hi';

const { Tr, Th, Td, THead, TBody } = Table;

const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass();
    const navigate = useNavigate();

    const onEdit = () => {
        navigate(`/app/sales/product-edit/${row.id}`);
    };

    return (
        <div className="flex justify-end text-lg">
            <span className={`cursor-pointer p-2 hover:${textTheme}`} onClick={onEdit}>
                <HiOutlinePencil />
            </span>
        </div>
    );
};

const PincodeDownload = () => {
    const [warehouses, setWarehouses] = useState([]); 
    const [warehouseLoading, setWarehouseLoading] = useState(true); 
    const [warehouseError, setWarehouseError] = useState(null); 

    // Define pageSizeOption array
    const pageSizeOption = [
        { value: 10, label: '10 / page' },
        { value: 20, label: '20 / page' },
        { value: 30, label: '30 / page' },
        { value: 40, label: '40 / page' },
        { value: 50, label: '50 / page' },
    ];

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => <span className="capitalize">{props.row.original.name}</span>,
            },
            {
                header: 'Warehouse Code',
                accessorKey: 'warehouse_id',
                cell: (props) => <span className="capitalize">{props.row.original.warehouse_id}</span>,
            },
            {
                header: 'Address',
                sortable: true,
                cell: (props) => (
                    <span className="capitalize">{props.row.original.address}, {props.row.original.city}, {props.row.original.state}, Pincode - {props.row.original.pincode}</span>
                ),
            },
            {
                header: 'Phone',
                accessorKey: 'phone',
                cell: (props) => <span>{props.row.original.phone}</span>,
            },
            {
                header: 'Email',
                accessorKey: 'email',
                cell: (props) => <span>{props.row.original.email}</span>,
            },
            {
                header: 'Actions',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulating fetching data from an API endpoint
                const warehouseData = [
                    {
                        "name": "Prince shipclues",
                        "warehouse_id": "WHekgqjrWBaT",
                        "address": "Shipclues, Business Hub, 8th Floor",
                        "pincode": "121001",
                        "city": "Faridabad",
                        "state": "Haryana",
                        "phone": "08569065690",
                        "email": "prince@shipclues.com"
                    },
                   
                ];

                setWarehouses(warehouseData); 
                setWarehouseLoading(false); 
            } catch (error) {
                console.error('API Error:', error); 
                setWarehouseError('Failed to fetch warehouses'); 
                setWarehouseLoading(false); 
            }
        };

        fetchData(); 
    }, []); 

    const tableData = useMemo(() => warehouses, [warehouses]); 

    const handleDownload = (Action) => {
        console.log(`Downloading data for age: ${Action}`);

    };

    return (
        <div className="table-container">
            <Table className="table">
                <THead>
                    <Tr>
                        {columns.map((column) => (
                            <Th key={column.header}>{column.header}</Th>
                        ))}
                    </Tr>
                </THead>
                <TBody>
                    {tableData.map((warehouse) => (
                        <Tr key={warehouse.warehouse_id}>
                            {columns.map((column) => (
                                <Td key={column.header}>
                                    {column.cell({ row: { original: warehouse } })}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </TBody>
            </Table>
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={pageSizeOption[0].value} 
                    currentPage={1} 
                    total={warehouses.length} 
                    onChange={() => {}} 
                />
                <div style={{ minWidth: 130 }}>
                    <Select
                        size="sm"
                        isSearchable={false}
                        value={pageSizeOption[0]} 
                        options={pageSizeOption}
                        onChange={() => {}} 
                    />
                </div>
            </div>
        </div>
    );
};

export default PincodeDownload;

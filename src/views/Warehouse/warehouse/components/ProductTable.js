import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'components/shared';
import { HiOutlinePencil } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, setTableData } from '../store/dataSlice';
import ProductDeleteConfirmation from './ProductDeleteConfirmation';
import { useLocation,useNavigate } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';

const ActionColumn = ({ row }) => {

    //  const location = useLocation()
    //  console.log(".adddwarehouse.location...",location.state)
    //  const massage = location
    const navigate = useNavigate();
       


    const onEdit = () => {
        navigate(`/app/AddWarehouse/AddWarehouse/${row.id}`);
    };

    return (
        <div className="flex justify-end text-lg">
            <span className="cursor-pointer p-2 text-blue-500 hover:text-blue-700" onClick={onEdit}>
                <HiOutlinePencil />
            </span>
        </div>
    );
};

const ProductTable = () => {
    const tableRef = useRef(null);
    const dispatch = useDispatch();

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.salesProductList.data.tableData
    );
    const filterData = useSelector((state) => state.salesProductList.data.filterData);
    const loading = useSelector((state) => state.salesProductList.data.loading);

    const [warehouses, setWarehouses] = useState([]);
    const [warehouseError, setWarehouseError] = useState(null);

    useEffect(() => {
        const fetchWarehouseData = async () => {
            const token = localStorage.getItem('accessToken');
            console.log("token",token)

            try {
                const response = await axios.get('https://api.shipcluescargo.com/warehouse/get_by_seller/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setWarehouses(response.data.warehouses);
            } catch (error) {
                console.error('API Error:', error);
                setWarehouseError(error);
            }
        };

        fetchWarehouseData();

    }, []);

    useEffect(() => {
        fetchData();

    }, [pageIndex, pageSize, sort, query, filterData]);

    useEffect(() => {
        if (tableRef.current) {
            tableRef.current.resetSorting();
        }
    }, [filterData]);

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    );

    const fetchData = () => {
        dispatch(getProducts({ pageIndex, pageSize, sort, query, filterData }));
    };

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => <span className="capitalize">{props.row.original.name}</span>,
            },
            {
                header: 'Warehouse Code',
                cell: (props) => <span className="capitalize">{props.row.original.id}</span>,
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
                sortable: true,
                cell: (props) => (
                    <span className="capitalize">{props.row.original.phone}</span>
                ),
            },
            {
                header: 'Email',
                sortable: true,
                cell: (props) => (
                    <span className="capitalize">{props.row.original.email}</span>
                ),
            },
            {
                header: 'Actions',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    );

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData);
        newTableData.pageIndex = page;
        dispatch(setTableData(newTableData));
    };

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData);
        newTableData.pageSize = Number(value);
        newTableData.pageIndex = 1;
        dispatch(setTableData(newTableData));
    };

    const onSort = (sort, sortingColumn) => {
        const newTableData = cloneDeep(tableData);
        newTableData.sort = sort;
        dispatch(setTableData(newTableData));
    };

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={warehouses}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                // loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <ProductDeleteConfirmation />
        </>
    );
};

export default ProductTable;

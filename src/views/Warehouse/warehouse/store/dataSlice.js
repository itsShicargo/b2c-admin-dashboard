import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { apiDeleteSalesProducts } from 'services/SalesService'

export const fetchSalesProducts = async (data) => {

}

export const deleteProduct = async (data) => {
    const response = await apiDeleteSalesProducts(data)
    return response.data
}

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    name: '',
    category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
    status: [0, 1, 2],
    productStatus: 0,
}

export const getProducts = createAsyncThunk(
  
    async (data) => {
        try {
            const response = await fetchSalesProducts(data);
            return response; // Assuming the API response directly contains data
        } catch (error) {
            throw error; // Propagate the error upwards
        }
    }
);

const dataSlice = createSlice({
    name: 'warehouse',
    initialState: {
        loading: false,
        productList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        updateProductList: (state, action) => {
            state.productList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getProducts.fulfilled]: (state, action) => {
            state.productList = action.payload.data; 
            state.tableData.total = action.payload.total;
            state.loading = false;
        },
        [getProducts.pending]: (state) => {
            state.loading = true;
        },
    },
})

export const {
    updateProductList,
    setTableData,
    setFilterData,
} = dataSlice.actions

export default dataSlice.reducer

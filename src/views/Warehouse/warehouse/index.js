import React from 'react';
import { injectReducer } from 'store/index';
import reducer from './store';
import { AdaptableCard } from 'components/shared';
import ProductTable from './components/ProductTable';
import ProductTableTools from './components/ProductTableTools';


injectReducer('salesProductList', reducer);

function WarehouseTable() {
    

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Warehouses List</h3>
                <ProductTableTools />
            </div>
           
                <ProductTable  />
        </AdaptableCard>
    );
}

export default WarehouseTable;

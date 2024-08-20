import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/Product';
import { getAllProducts } from '../../services/product.service';

// Types
interface ProductState {
    status: string;
    error: string | null;
    products: Product[];
}

const initialState: ProductState = {
    status: '',
    error: null,
    products: [],
};

// Slice
export const productSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {
        changeStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<{ products: Product[] }>) => {
                state.status = 'succeeded';
                state.error = null;
                state.products = action.payload.products;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch products';
            });
    },
});

export const { changeStatus } = productSlice.actions;
export default productSlice.reducer;

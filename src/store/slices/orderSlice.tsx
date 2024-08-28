import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createOrder, getOrders } from '../../services/order.service';
import { Order } from '../../models/Order';

// Types
interface OrderState {
    status: string;
    error: string | null;
    orders: Order[];
}

const initialState: OrderState = {
    status: '',
    error: null,
    orders: [],
};

// Slice
export const orderSlice = createSlice({
    name: 'Order',
    initialState,
    reducers: {
        changeStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.status = 'succeeded';
                state.error = null;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch orders';
            })
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<Partial<Order>>) => {
                state.status = 'succeeded';
                state.error = null;
                state.orders.push(action.payload as Order);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch orders';
            });
    },
});

export const { changeStatus } = orderSlice.actions;
export default orderSlice.reducer;

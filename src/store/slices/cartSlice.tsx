import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/Product';
import { RootState } from '../Store';

// Types
interface CartState {
    items: Product[];
    totalQuantity: number;
    totalPrice: number;
    status: string;
    error: string | null;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    status: '',
    error: null,
};

// Slice
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push({ ...action.payload });
            }
            state.totalQuantity += action.payload.quantity;
            state.totalPrice += action.payload.price * action.payload.quantity;
        },
        removeItemFromCart: (state, action: PayloadAction<string>) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.price * existingItem.quantity;
                state.items = state.items.filter(item => item.id !== action.payload);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
        incrementItemQuantity: (state, action: PayloadAction<string>) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                existingItem.quantity += 1;
                state.totalQuantity += 1;
                state.totalPrice += existingItem.price;
            }
        },
        decrementItemQuantity: (state, action: PayloadAction<string>) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
                state.totalQuantity -= 1;
                state.totalPrice -= existingItem.price;
            } else if (existingItem && existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== action.payload);
                state.totalQuantity -= 1;
                state.totalPrice -= existingItem.price;
            }
        },
    },
    extraReducers: (builder) => {
    },
});

export const selectIsItemInCart = (state: RootState, itemId: string) => {
    return state.cart.items.some(item => item.id === itemId);
};

export const {
    addItemToCart,
    removeItemFromCart,
    clearCart,
    incrementItemQuantity,
    decrementItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

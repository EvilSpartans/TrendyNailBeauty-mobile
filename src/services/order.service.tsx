import { createAsyncThunk } from "@reduxjs/toolkit";
import { Order } from "../models/Order";
import axios, { AxiosError } from "axios";

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

interface APIError {
    message: string;
    detail?: string;
}

export const getOrders = createAsyncThunk<Order[], string, { rejectValue: APIError }>(
    'api/orders',
    async (token, { rejectWithValue }) => {
        try {
            const { data } = await axios.get<Order[]>(`${BASE_URL}/orders/user`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                } 
            });
            return data; 
        } catch (error) {
            const axiosError = error as AxiosError<APIError>;
            return rejectWithValue(axiosError.response?.data || { message: 'Unknown error' });
        }
    }
);

export const createOrder = createAsyncThunk<Partial<Order>, { token: string; values: Partial<Order> & { productIds: string[] }; }, { rejectValue: APIError }>(    'api/order',
    async ({ token, values }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/order/create`, values, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                } 
            });
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<APIError>;
            return rejectWithValue(axiosError.response?.data || { message: 'Unknown error' });
        }
    }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from 'axios';
import { User } from "../models/user";

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

interface APIResponse {
    data: {
        user: User;
        token: string;
        message?: string;
    };
}

interface APIError {
    message: string;
    detail?: string;
}

export const registerUser = createAsyncThunk<APIResponse, Partial<User>, { rejectValue: APIError }>(
    'api/signup',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post<APIResponse>(`${BASE_URL}/signup`, values);
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<APIError>;
            return rejectWithValue(axiosError.response?.data || { message: 'Unknown error' });
        }
    }
);

export const loginUser = createAsyncThunk<APIResponse, Partial<User>, { rejectValue: APIError }>(
    'api/signin',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post<APIResponse>(`${BASE_URL}/signin`, values);
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<APIError>;
            return rejectWithValue(axiosError.response?.data || { message: 'Unknown error' });
        }
    }
);
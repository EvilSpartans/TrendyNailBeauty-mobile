import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from 'axios';
import { User } from "../models/user";
import { APIResponse } from "../store/slices/userSlice";

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

interface APIError {
    message: string;
    detail?: string;
}

interface updatePassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
  
interface resetPassword {
    token: string;
    newPassword: string;
}

export const registerUser = createAsyncThunk<APIResponse, Partial<User>, { rejectValue: APIError }>(
    'api/register',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post<APIResponse>(`${BASE_URL}/register`, values);
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<APIError>;
            return rejectWithValue(axiosError.response?.data || { message: 'Unknown error' });
        }
    }
);

export const loginUser = createAsyncThunk<APIResponse, Partial<User>, { rejectValue: APIError }>(
    'api/login',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post<APIResponse>(`${BASE_URL}/login`, values);
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<APIError>;
            return rejectWithValue(axiosError.response?.data || { message: 'Unknown error' });
        }
    }
);

export const updateUser = createAsyncThunk<User, { id: string | undefined, values: Partial<User> }, { rejectValue: APIError }>(
    'api/profile',
    async ({ id, values }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put<User>(`${BASE_URL}/user/${id}`, values);
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<APIError>;
            return rejectWithValue(axiosError.response?.data || { message: 'Unknown error' });
        }
    }
);

export const updatePassword = createAsyncThunk<APIResponse, { oldPassword: string; newPassword: string; confirmPassword: string; token: string }, { rejectValue: APIError }>(
    'api/resetPassword/update',
    async ({ oldPassword, newPassword, confirmPassword, token }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('oldPassword', oldPassword);
            formData.append('newPassword', newPassword);
            formData.append('confirmPassword', confirmPassword);

            const { data } = await axios.post<APIResponse>(
                `${BASE_URL}/resetPassword/update`, 
                formData, 
                { 
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    } 
                }
            );
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<APIError>;
            return rejectWithValue(axiosError.response?.data || { message: 'Unknown error' });
        }
    }
);

export const resetPassword = createAsyncThunk<APIResponse, { token: string; newPassword: string }, { rejectValue: APIError }>(
    'api/resetPassword/reset',
    async ({ token, newPassword }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('token', token);
            formData.append('newPassword', newPassword);

            const { data } = await axios.post<APIResponse>(
                `${BASE_URL}/resetPassword/reset`, 
                formData, 
                { 
                    headers: { 
                        'Content-Type': 'multipart/form-data'
                    } 
                }
            );
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<APIError>;
            return rejectWithValue(axiosError.response?.data || { message: 'Unknown error' });
        }
    }
);

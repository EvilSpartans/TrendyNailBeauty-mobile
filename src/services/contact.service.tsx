import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Contact } from "../models/Contact";

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

interface APIError {
    message: string;
    detail?: string;
}

export const createContact = createAsyncThunk<Partial<Contact>, { values: Partial<Contact>; }, { rejectValue: APIError }>(
    'api/contact',
    async ({ values }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/contact/create`, values);
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<APIError>;
            return rejectWithValue(axiosError.response?.data || { message: 'Unknown error' });
        }
    }
);
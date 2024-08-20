import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "../models/category";
import axios, { AxiosError } from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

interface APIError {
    message: string;
    detail?: string;
}

export const getAllCategories = createAsyncThunk<
  Category[],
  Partial<Category>,
  {rejectValue: APIError}
>('api/categories', async (params, {rejectWithValue}) => {
  try {
    const url = `${BASE_URL}/categories`;
    // console.log('API Route:', url);
    const {data} = await axios.get<Category[]>(url, {params}); 
    return data; 
  } catch (error) {
    const axiosError = error as AxiosError<APIError>;
    return rejectWithValue(
      axiosError.response?.data || {message: 'Unknown error'},
    );
  }
});
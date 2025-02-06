import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from 'axios';
import { ProductResponse, ProductQueryParams } from "../models/Product";
import { APIError } from "../models/APIError";

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const getAllProducts = createAsyncThunk<
  ProductResponse,
  ProductQueryParams,
  { rejectValue: APIError }
>('api/products', async (params, { rejectWithValue }) => {
  try {
    const url = `${BASE_URL}/products`;
    // console.log('API Route:', url);
    const { data } = await axios.get<ProductResponse>(url, { params }); 
    // console.log("DATA :", JSON.stringify(data, null, 2)); 
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<APIError>;
    return rejectWithValue(
      axiosError.response?.data || { message: 'Unknown error' },
    );
  }
});
